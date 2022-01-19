import React, { useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import ActionMenu from "../ActionMenu/ActionMenu";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "search",
    icon: "/assets/icons8-search-500.png",
  },
  { name: "bookmarks", icon: "/assets/icons8-bookmark-512.png" },
  { name: "notifications", icon: "/assets/icons8-notification-96.png" },
  {
    name: "avatar",
    icon: "/assets/icons8-circled-v-100.png",
  },
];

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
                {menuItems.slice(0, 3).map((item) => (
                  <li key={item.name}>
                    <img className="header__icon" src={item.icon} />
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
