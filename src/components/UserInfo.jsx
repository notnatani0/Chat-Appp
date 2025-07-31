import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import "../styles/userInfo.css";
import { Edit, Ellipsis, LogOut, User } from "lucide-react";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  return (
    <div className="userinfo">
      <div className="user">
        {currentUser.avatarURL ? (
          <img src={currentUser.avatarURL} alt="avatar" className="avatar" />
        ) : (
          <User className="avatar" />
        )}
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <Ellipsis />
        <Edit />
        <button
          className="logout cursor-pointer"
          onClick={() => auth.signOut()}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
};
export default UserInfo;
