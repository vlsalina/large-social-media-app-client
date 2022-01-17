import "./ActionMenu.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ActionMenu = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const signOutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("articles");
    navigate("/login");
  };

  return (
    <div className="actionMenu">
      <div className="actionMenu-header">
        <div className="actionMenu-avatar">
          <img src={"/assets/icons8-circled-v-100.png"} />
        </div>
        <div className="actionMenu-user-data">
          <div>
            {user.firstname} {user.lastname}
          </div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="actionMenu-items">
        <ul>
          <li>
            <Link to="/account">Settings</Link>
          </li>
          <li>
            <button type="button" onClick={signOutHandler}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionMenu;
