import "./SocialMenu.css";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

const links = [
  {
    name: "twitter",
    icon: <FaTwitterSquare />,
    url: "#",
  },
  {
    name: "facebook",
    icon: <FaFacebookSquare />,
    url: "#",
  },
  {
    name: "linkedin",
    icon: <FaLinkedin />,
    url: "#",
  },
];

const styles = {
  icons: {
    size: "2rem",
  },
};

const SocialMenu = () => {
  return (
    <div className="social">
      <ul>
        {links.map((x) => (
          <li key={x.name}>
            <Link to={x.url}>
              <IconContext.Provider value={styles.icons}>
                {x.icon}
              </IconContext.Provider>
            </Link>
          </li>
        ))}
        <li key={"favorite"}>
          <button className="social__favorite" type="button">
            <img src={"/assets/icons8-favorite-512.png"} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SocialMenu;
