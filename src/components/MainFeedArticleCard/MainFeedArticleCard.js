import React, { useContext } from "react";
import "./MainFeedArticleCard.css";
import { formatDate } from "../../utils";
import { Context } from "../../App";
import { useSelector } from "react-redux";
import axios from "axios";

const MainFeedArticleCard = ({ article }) => {
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);

  const clickHandler = async () => {
    try {
      const { data } = await axios.patch(
        `${domain}/api/users/favorite`,
        { articleId: article._id },
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="card">
      <div className="card-col1">
        <div className="card-header">
          <div className="card-avatar-wrapper">
            <img
              className="card-avatar"
              src={"/assets/icons8-circled-v-100.png"}
            />
          </div>
          <div className="card-author">
            <h4>{article.author}</h4>
          </div>
        </div>
        <div className="card-title">
          <h2>{article.title}</h2>
        </div>
        <div className="card-snippet">{article.snippet}</div>
        <div className="card-metadata">
          <div>{formatDate(article.createdAt)}</div>
          <div>
            <button
              className="card-favorite-button"
              type="button"
              onClick={clickHandler}
            >
              <img
                className="card-favorite-icon"
                src={"/assets/icons8-favorite-512.png"}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="card-col2">
        <img
          className="card-img"
          src={"/assets/ssfasfsafasffs-e1460147167824.jpg"}
        />
      </div>
    </article>
  );
};

export default MainFeedArticleCard;
