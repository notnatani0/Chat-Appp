import { Search, User, UserRoundPlus } from "lucide-react";
import "../styles/addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../lib/userStore";
const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(database, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        const docSnap = querySnapShot.docs[0];
        setUser({ ...docSnap.data(), id: docSnap.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(database, "chats");
    const userChatRef = collection(database, "userchats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatRef, currentUser.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder="Search here" />
        <button>
          <Search />
        </button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            {user.avatarURL ? (
              <img src={user.avatarURL} alt="avatar" className="avatar" />
            ) : (
              <User className="avatar" />
            )}
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>
            <UserRoundPlus />
          </button>
        </div>
      )}
    </div>
  );
};
export default AddUser;
