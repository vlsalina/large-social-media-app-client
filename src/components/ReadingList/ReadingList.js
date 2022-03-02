import React, { useEffect, useContext } from "react";
import "./ReadingList.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { MainFeedContext } from "../../screens/MainFeedScreen/MainFeedScreen";
import { TopicContext } from "../../screens/TopicScreen/TopicScreen";
import { formatDate, userIsLogged } from "../../utils";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useDispatch } from "react-redux";
import { unfavorite } from "../actions/actions";
import IsLogged from "../IsLogged/IsLogged";
import { IconContext } from "react-icons/lib";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { styles } from "../../styles/styles";

const Favorites = ({ favorites, setFavorites, dispatch }) => {
  const unfavHandler = (articleId) => {
    try {
      dispatch(unfavorite(articleId));
      setFavorites(favorites.filter((x) => x._id !== articleId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="favorites">
      <ul>
        {favorites.slice(0, 3).map((fav) => (
          <li key={fav._id}>
            <div className="favorites--box-1">
              <div className="favorites__avatar">
                <Avatar article={fav} />
              </div>
              <Link to={`/profile/${fav.authorId}?breadcrumb=articles`}>
                <div className="favorites__author card--spacer">
                  <h2>{fav.author}</h2>
                </div>
              </Link>
              <Link to={`/topic/${fav.category}`}>
                <div className="card__topic">{fav.category}</div>
              </Link>
            </div>
            <Link to={`/article/${fav._id}`}>
              <div className="favorites__title">
                <h2>{fav.title}</h2>
              </div>
            </Link>
            <div className="favorites--box-2">
              <div className="favorites__date">{formatDate(fav.createdAt)}</div>
              <div>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => unfavHandler(fav._id)}
                >
                  <IconContext.Provider value={styles.icons2}>
                    <BsFillBookmarkDashFill />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ReadingList = ({ type }) => {
  const { favorites, setFavorites } = useContext(
    type ? MainFeedContext : TopicContext
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncCall = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN}/api/users/getUser?id=${user._id}`,
          {
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((result) => {
          Promise.all(
            result.data.favorites.map((x) => {
              return axios.get(
                `${process.env.REACT_APP_DOMAIN}/api/articles/getArticle?articleId=${x}`,
                { headers: { authorization: `Bearer ${user.accessToken}` } }
              );
            })
          )
            .then((response) => setFavorites(response.map((x) => x.data)))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };
    userIsLogged(asyncCall);
  }, [process.env.REACT_APP_DOMAIN, setFavorites, user._id, user.accessToken]);

  return (
    <div className="readingList">
      <div className="readingList__title">
        <h2>Your Favorite Articles</h2>
      </div>
      <IsLogged>
        {favorites.length === 0 ? (
          <div className="readingList--box-1">
            <p>
              Click the
              <img
                className="favorite__icon"
                src={"/assets/icons8-favorite-512.png"}
                alt="favorite"
              />
              on any story to easily add it to your reading list or a custom
              list that you can share.
            </p>
          </div>
        ) : (
          <Favorites
            favorites={favorites}
            setFavorites={setFavorites}
            dispatch={dispatch}
          />
        )}
      </IsLogged>
    </div>
  );
};

export default ReadingList;
