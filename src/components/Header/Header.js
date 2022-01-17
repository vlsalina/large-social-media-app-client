import React, { useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import ActionMenu from "../ActionMenu/ActionMenu";

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
      <div className="header-wrapper">
        <div className="header-menu">
          <ul>
            <li className="header-li-left">
              <img
                className="header-menu-icon"
                src={"/assets/large-logo.png"}
              />
            </li>
            <li className="header-li-right">
              <div>
                <ul>
                  {menuItems.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <img className="header-menu-icon" src={item.icon} />
                    </li>
                  ))}
                  <li key={menuItems[3].name}>
                    <button
                      className="header-actionMenu-button"
                      type="button"
                      onClick={clickHandler}
                    >
                      <img
                        className="header-menu-icon"
                        src={menuItems[3].icon}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ActionMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
