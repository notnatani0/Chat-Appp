import {
  ChevronRight,
  EllipsisVertical,
  Mic,
  Paperclip,
  PhoneCall,
  Search,
  Send,
  SmilePlus,
  User,
} from "lucide-react";
import "../styles/chat.css";
import { useEffect, useRef, useState } from "react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import UserDetail from "./UserDetail";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../lib/firebase";
import { useChatStore } from "../lib/chatStore";

const Chat = () => {
  const { chatId } = useChatStore();
  const [chat, setChat] = useState(false);
  const [addCall, setAddCall] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [addMode, setAddMode] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(database, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.native);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="header">
        <div className="aboutUser">
          <User />
          <div className="text">
            <span>userName</span>
            <p>Typing</p>
          </div>
        </div>
        <div className="icons">
          <button onClick={() => setAddCall((prev) => !prev)}>
            {addCall ? <PhoneCall className="features" /> : <span>Call</span>}
          </button>
          <Search className="features" />
          <button
            className="userDetail"
            onClick={() => setAddMode((prev) => !prev)}
          >
            {addMode ? (
              <ChevronRight className="features" />
            ) : (
              <EllipsisVertical className="features" />
            )}
          </button>
          {addMode && <UserDetail />}
        </div>
      </div>

      {/* --> The Message / Input Window of chat components */}

      <div className="chatWindow">
        {chat?.messages?.map((message) => (
          <div className="messageOwn" key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} />}
              <p>{message.text}</p>
              {/* <span>5:15</span> */}
            </div>
          </div>
        ))}
      </div>
      <div ref={endRef}></div>

      {/* --> Bottom of the Chat component */}

      <div className="messageInput">
        <div className="textArea">
          <Paperclip className="features" color="#7a7a73" />
          <input
            type="text"
            placeholder="Write messages..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="emoji">
            <SmilePlus
              className="features"
              color="#7a7a73"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <Picker
                data={data}
                onEmojiSelect={handleEmoji}
                theme="dark"
                className="picker"
              />
            )}
          </div>
          <Mic className="features" color="#7a7a73" />
        </div>
        <button className="sendButton">
          <Send className="send" />
        </button>
      </div>
    </div>
  );
};
export default Chat;
