import "../styles/userList.css";
import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

const UserList = () => {
  return (
    <div className="userlist">
      <ChatList />
      <UserInfo />
    </div>
  );
};
export default UserList;
