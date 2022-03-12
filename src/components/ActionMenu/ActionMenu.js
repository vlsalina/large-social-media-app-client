import "./ActionMenu.css";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";
import Recommended from "../Recommended/Recommended";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../_actions/user.actions";

const ActionMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeHandler = () => {
    let backdrop = document.getElementsByClassName("actionmenu")[0];
    let drawer = document.getElementsByClassName("actionmenu__drawer")[0];

    drawer.classList.remove("actionmenu__drawer--open");
    drawer.classList.add("actionmenu__drawer--close");
    backdrop.classList.remove("actionmenu--open");
    backdrop.classList.add("actionmenu--close");
  };

  const signOutHandler = () => {
    dispatch(userActions.logout());
    closeHandler();
    navigate("/");
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
