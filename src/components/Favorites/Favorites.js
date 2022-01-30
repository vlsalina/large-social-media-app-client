import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Favorites.css";
import { Context } from "../../App";
import { MainFeedContext } from "../MainFeedScreen/MainFeedScreen";
import { TopicContext } from "../TopicScreen/TopicScreen";
import { useDispatch } from "react-redux";
import { unfavorite } from "../actions/actions";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";

const Favorites = ({ type }) => {
  const { domain } = useContext(Context);
  const { favorites, setFavorites } = useContext(
    type ? MainFeedContext : TopicContext
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const asyncCall = () => {
      Promise.all(
        user.favorites.map((x) => {
          return axios.get(
            `${domain}/api/articles/getArticle?articleId=${x.articleId}`,
            {
              headers: { authorization: `Bearer ${user.accessToken}` },
            }
          );
        })
      )
        .then((response) => setFavorites(response.map((x) => x.data)))
        .catch((error) => console.log(error));
    };
    asyncCall();
  }, [user]);

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
        {favorites &&
          favorites.slice(0, 3).map((fav) => (
            <li key={fav._id}>
              <div className="favorites--box-1">
                <div className="favorites__avatar">
                  <Avatar article={fav} />
                </div>
                <Link to={`/profile/${fav.authorId}`}>
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
                <div className="favorites__date">asdf</div>
                <div>
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => unfavHandler(fav._id)}
                  >
                    <img src={"/assets/icons8-unfavorite-512.png"} />
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Favorites;
