import { ChevronDown, Download, User } from "lucide-react";
import "../styles/userDetail.css";

const UserDetail = () => {
  return (
    <div className="userDetail">
      <div className="user">
        <User className="userImage" />
        <h2>userName</h2>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <ChevronDown className="navArrow" />
          </div>

          <div className="files">
            <div className="filesItem">
              <div className="filesDetail">
                <img src="/src/assets/bg.jpeg" />
                <span>lofi-cafe.jpeg</span>
              </div>
              <Download className="downloads" />
            </div>
          </div>
          <div className="title">
            <span>Shared Links</span>
            <ChevronDown className="navArrow" />
          </div>
        </div>
        <button>Block</button>
      </div>
    </div>
  );
};
export default UserDetail;
