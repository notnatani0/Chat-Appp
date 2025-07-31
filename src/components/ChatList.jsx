import { Search, User, UserMinus, UserPlus } from "lucide-react";
import "../styles/chatList.css";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { useUserStore } from "../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "../lib/firebase";
import { useChatStore } from "../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(database, "userchats", currentUser.uid),
      async (res) => {
        const userdata = res.data().chats;

        const promises = userdata.map(async (userdata) => {
          const docRef = doc(database, "users", userdata.receiverId);
          const userDocSnap = await getDoc(docRef);

          const user = userDocSnap.data();

          return { ...userdata, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.uid]);

  const handleSearch = async (chat) => {
    changeChat(chat.chatId);
  };

  return (
    <div className="chatlist">
      <div className="search">
        <button
          className="userbutton"
          onClick={() => setAddMode((prev) => !prev)}
        >
          {addMode ? (
            <UserMinus className="userplus" />
          ) : (
            <UserPlus className="userplus" />
          )}
        </button>
        <div className="searchbar">
          <input
            type="text"
            name="search"
            placeholder="Search"
            autoComplete="on"
          />
          <Search color="#7A7A73" />
        </div>
      </div>
      {chats.map((chat) => (
        <div
          className="userdata"
          key={chat.chatId}
          onClick={() => {
            handleSearch(chat);
          }}
        >
          {chat.user.avatarURL ? (
            <img src={chat.user.avatarURL} alt="avatar" className="avatar" />
          ) : (
            <User className="avatar" />
          )}
          <div>
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}!</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
