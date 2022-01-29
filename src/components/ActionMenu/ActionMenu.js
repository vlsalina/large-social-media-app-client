import "./ActionMenu.css";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";
import { topics } from "../../data/data";
import Recommended from "../Recommended/Recommended";
import { useNavigate } from "react-router-dom";

const ActionMenu = () => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("articles");
    navigate("/login");
  };

  const closeHandler = () => {
    let backdrop = document.getElementsByClassName("actionmenu")[0];
    let drawer = document.getElementsByClassName("actionmenu__drawer")[0];

    drawer.classList.remove("actionmenu__drawer--open");
    drawer.classList.add("actionmenu__drawer--close");
    backdrop.classList.remove("actionmenu--open");
    backdrop.classList.add("actionmenu--close");
  };

  return (
    <div className="actionmenu">
      <div className="actionmenu__drawer">
        <div className="actionmenu--box-1">
          <button type="button" onClick={closeHandler}>
            <IconContext.Provider value={styles.icons}>
              <GrClose />
            </IconContext.Provider>
          </button>
        </div>
        <Recommended />
        <hr />
        <div className="settings">Settings</div>
        <div className="actionmenu--box-2">
          <button
            className="actionmenu__signout"
            type="button"
            onClick={signOutHandler}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionMenu;
