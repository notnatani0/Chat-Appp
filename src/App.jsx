import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import Notification from "./components/Notification";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import { auth } from "./lib/firebase";
import { useEffect } from "react";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <UserList />
          {chatId && <Chat />}
          {chatId && <UserDetail />}
        </>
      ) : (
        <Auth />
      )}
      <Notification />
    </div>
  );
}

export default App;
