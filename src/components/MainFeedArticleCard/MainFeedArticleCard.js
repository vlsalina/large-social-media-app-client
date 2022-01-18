import React, { useContext } from "react";
import "./MainFeedArticleCard.css";
import { formatDate } from "../../utils";
import { Context } from "../../App";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const MainFeedArticleCard = ({ article }) => {
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);

  const clickHandler = async (e) => {
    try {
      const { data } = await axios.patch(
        `${domain}/api/users/favorite`,
        { articleId: article._id },
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <article className="card">
      <div className="card--box-1">
        <div className="card--box-3">
          <div className="card__avatar-wrapper">
            <img
              className="card__avatar"
              src={"/assets/icons8-circled-v-100.png"}
            />
          </div>
          <div className="card__author">
            <h4>{article.author}</h4>
          </div>
        </div>
        <Link to={`/article/${article._id}`}>
          <div className="card__title">
            <h2>{article.title}</h2>
          </div>
        </Link>
        <Link to={`/article/${article._id}`}>
          <div className="card__snippet">{article.snippet}</div>
        </Link>
        <div className="card--box-4">
          <div>{formatDate(article.createdAt)}</div>
          <div>
            <button
              className="favorite"
              type="button"
              onClick={(e) => clickHandler(e)}
            >
              <img
                className="favorite__icon"
                src={"/assets/icons8-favorite-512.png"}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="card--box-2">
        <Link to={`/article/${article._id}`}>
          <img
            className="card__image"
            src={"/assets/ssfasfsafasffs-e1460147167824.jpg"}
          />
        </Link>
      </div>
    </article>
  );
};

export default MainFeedArticleCard;
