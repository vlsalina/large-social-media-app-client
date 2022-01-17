import "./Header.css";
import { useSelector } from "react-redux";

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
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <img className="header-menu-icon" src={item.icon} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
