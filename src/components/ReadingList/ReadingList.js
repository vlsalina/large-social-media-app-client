import React, { useState, useEffect, useContext } from "react";
import "./ReadingList.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Context } from "../../App";
import { MainFeedContext } from "../MainFeedScreen/MainFeedScreen";
import { TopicContext } from "../TopicScreen/TopicScreen";
import { formatDate } from "../../utils";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useDispatch } from "react-redux";
import { unfavorite } from "../actions/actions";

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
              <div className="favorites__date">{formatDate(fav.createdAt)}</div>
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

const ReadingList = ({ type }) => {
  const { domain } = useContext(Context);
  const { favorites, setFavorites } = useContext(
    type ? MainFeedContext : TopicContext
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncCall = async () => {
      await axios
        .get(`${domain}/api/users/getUser?id=${user._id}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        })
        .then((result) => {
          Promise.all(
            result.data.favorites.map((x) => {
              return axios.get(
                `${domain}/api/articles/getArticle?articleId=${x}`,
                { headers: { authorization: `Bearer ${user.accessToken}` } }
              );
            })
          )
            .then((response) => setFavorites(response.map((x) => x.data)))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };
    asyncCall();
  }, []);

  return (
    <div className="readingList">
      <div className="readingList__title">
        <h2>Your Favorite Articles</h2>
      </div>
      {favorites.length === 0 ? (
        <div className="readingList--box-1">
          <p>
            Click the
            <img
              className="favoirte__icon"
              src={"/assets/icons8-favorite-512.png"}
            />
            on any story to easily add it to your reading list or a custom list
            that you can share.
          </p>
        </div>
      ) : (
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default ReadingList;
