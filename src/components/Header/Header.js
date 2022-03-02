import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Avatar from "../Avatar/Avatar";
import ActionMenu from "../ActionMenu/ActionMenu";
import IsLogged from "../IsLogged/IsLogged";
import { loggedIn } from "../../utils";

const styles = {
  icon: {
    size: "2rem",
  },
};

const Header = () => {
  const user = useSelector((state) => state.user);

  const menuItems = [
    {
      name: "userArticles",
      icon: "/assets/icons8-bookmark-512.png",
      url: `/profile/${user._id}?breadcrumb=favorites`,
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

  const drawerHandler = () => {
    let backdrop = document.getElementsByClassName("actionmenu")[0];
    let drawer = document.getElementsByClassName("actionmenu__drawer")[0];

    backdrop.classList.remove("actionmenu--close");
    backdrop.classList.add("actionmenu--open");
    drawer.classList.remove("actionmenu__drawer--close");
    drawer.classList.add("actionmenu__drawer--open");
  };

  return (
    <div className="header">
      <ActionMenu />
      <div className="header--box-1">
        <ul>
          <li className="header--box-2">
            <Link to="/">
              <div className="header--box-5">
                <img
                  className="header__icon"
                  src={"/assets/large-logo.png"}
                  alt="logo"
                />
                <h1 className="logo logo--margin">Large</h1>
              </div>
            </Link>
          </li>
          <li className={loggedIn() ? "header--box-3" : "header--box-6"}>
            <IsLogged
              text={
                <p>
                  <span className="header--span-1">
                    Already have an account?{" "}
                    <a className="header__link" href="/login">
                      Sign In.
                    </a>{" "}
                    Or{" "}
                    <a className="header__link" href="/register">
                      Create One.
                    </a>
                  </span>
                  <span className="header--span-2">
                    <a className="header__link" href="/login">
                      Sign In
                    </a>{" "}
                    or{" "}
                    <a className="header__link" href="/register">
                      Create
                    </a>{" "}
                    an account.
                  </span>
                </p>
              }
            >
              <div className="header--box-4">
                <ul>
                  <li key={"create article"}>
                    <Link to="/create">
                      <IconContext.Provider value={styles.icon}>
                        <BsPlusCircleFill />
                      </IconContext.Provider>
                    </Link>
                  </li>
                  <li key={"search"}>
                    <button
                      type="button"
                      className="header__drawer header--noborder"
                    >
                      <img
                        className="header__icon"
                        src={`/assets/icons8-search-500.png`}
                        alt="search"
                      />
                    </button>
                  </li>
                  {menuItems.slice(0, 2).map((item) => (
                    <li key={item.name}>
                      <Link to={item.url}>
                        <img
                          className="header__icon"
                          src={item.icon}
                          alt={item.name}
                        />
                      </Link>
                    </li>
                  ))}
                  <li key={"action menu"}>
                    <button
                      className="actionmenubutton"
                      type="button"
                      onClick={drawerHandler}
                    >
                      <Avatar
                        article={{
                          avatar: user.avatar,
                          author: user.firstname,
                        }}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </IsLogged>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
