import React, { useState, useEffect, useContext } from "react";
import "./ReadingList.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Context } from "../../App";
import { formatDate } from "../../utils";
import { Link } from "react-router-dom";

const Favorites = ({ favs, domain, token }) => {
  const unfavHandler = (articleId) => {
    try {
      const { data } = axios.patch(
        `${domain}/api/users/unfavorite`,
        { articleId: articleId },
        { headers: { authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="favorites">
      <ul>
        {favs.map((fav) => (
          <li key={fav._id}>
            <Link to={`/article/${fav._id}`}>
              <div className="favorites-header">
                <div>
                  <img
                    className="favorites-avatar"
                    src={"/assets/icons8-circled-v-100.png"}
                  />
                </div>
                <div className="favorites-author">
                  <h2>{fav.author}</h2>
                </div>
              </div>
              <div className="favorites-title">
                <h2>{fav.title}</h2>
              </div>
            </Link>
            <div className="favorites-footer">
              <div className="favorites-date">{formatDate(fav.createdAt)}</div>
              <div>
                <button
                  type="button"
                  className="favorites-cancel"
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

const ReadingList = () => {
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      axios
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="readingList">
      <div className="readingList-title">
        <h2>Your Favorite Articles</h2>
      </div>
      {favorites.length === 0 ? (
        <div className="readingList-list-empty">
          <p>
            Click the{" "}
            <img
              className="readingList-favorite-icon"
              src={"/assets/icons8-favorite-512.png"}
            />{" "}
            on any story to easily add it to your reading list or a custom list
            that you can share.
          </p>
        </div>
      ) : (
        <Favorites favs={favorites} domain={domain} token={user.accessToken} />
      )}
    </div>
  );
};

export default ReadingList;
