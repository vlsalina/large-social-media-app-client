import React, { useEffect } from "react";
import "./SocialMenu.css";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { BsBookmarkDashFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favorite, unfavorite } from "../actions/actions";
import { useSelector } from "react-redux";
import { userIsLogged, loggedIn } from "../../utils";
import { styles } from "../../styles/styles";

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

const SocialMenu = ({ article, favd, setFavd }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedIn()) {
      // check if article already exists in user's favorites
      let exists =
        article && user.favorites.find((x) => x.articleId === article._id);
      if (exists) {
        setFavd(true);
      } else {
        setFavd(false);
      }
    }
  }, [article, setFavd, user.favorites]);

  const favoriteHandler = (e) => {
    if (user._id === article.authorId) {
      return;
    }

    try {
      if (!favd) {
        dispatch(favorite(article._id));
      } else {
        dispatch(unfavorite(article._id));
      }
      setFavd(!favd);
    } catch (error) {
      console.log(error);
    }
  };

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
          <button
            className="social__favorite"
            type="button"
            onClick={() => userIsLogged(favoriteHandler)}
          >
            {loggedIn() && favd ? (
              <IconContext.Provider value={styles.icons3}>
                <BsBookmarkDashFill />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={styles.icons3}>
                <BsBookmarkPlusFill />
              </IconContext.Provider>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SocialMenu;
