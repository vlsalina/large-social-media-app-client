import React, { useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import ActionMenu from "../ActionMenu/ActionMenu";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const styles = {
  icon: {
    size: "2rem",
  },
};

const Header = () => {
  const user = useSelector((state) => state.user);
  const [actionMenuToDisplay, setActionMenuToDisplay] = useState(false);

  const clickHandler = () => {
    const actionMenu = document.getElementsByClassName("actionMenu")[0];
    if (!actionMenuToDisplay) {
      actionMenu.style.display = "block";
      setActionMenuToDisplay(!actionMenuToDisplay);
    } else {
      actionMenu.style.display = "none";
      setActionMenuToDisplay(!actionMenuToDisplay);
    }
  };

  const menuItems = [
    {
      name: "search",
      icon: "/assets/icons8-search-500.png",
      url: "/",
    },
    {
      name: "userArticles",
      icon: "/assets/icons8-bookmark-512.png",
      url: `/profile/${user._id}?breadcrumb=articles`,
    },
    {
      name: "notifications",
      icon: "/assets/icons8-notification-96.png",
      url: `/profile/${user._id}?breadcrumb=notifications`,
    },
    {
      name: "avatar",
      icon: "/assets/icons8-circled-v-100.png",
    },
  ];

  return (
    <div className="header">
      <div className="header--box-1">
        <ul>
          <li className="header--box-2">
            <Link to="/">
              <img className="header__icon" src={"/assets/large-logo.png"} />
            </Link>
          </li>
          <li className="header--box-3">
            <div>
              <ul>
                <li key={"create article"}>
                  <Link to="/create">
                    <IconContext.Provider value={styles.icon}>
                      <BsPlusCircleFill />
                    </IconContext.Provider>
                  </Link>
                </li>
                {menuItems.slice(0, 3).map((item) => (
                  <li key={item.name}>
                    <Link to={item.url}>
                      <img className="header__icon" src={item.icon} />
                    </Link>
                  </li>
                ))}
                <li key={menuItems[3].name}>
                  <button
                    className="actionmenubutton"
                    type="button"
                    onClick={clickHandler}
                  >
                    <img className="header__icon" src={menuItems[3].icon} />
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <ActionMenu />
        </ul>
      </div>
    </div>
  );
};

export default Header;
