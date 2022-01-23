import React from "react";
import "./TopicArticleCard.css";
import { formatDate } from "../../utils";

const TopicArticleCard = ({ article }) => {
  return (
    <article className="topiccard">
      <div className="topiccard--box-1">Likes</div>
      <div className="topiccard--box-2">
        <div className="topiccard--box-3">
          <div className="topiccard__avatar">
            <img src={`/assets/icons8-circled-v-100.png`} />
          </div>
          <div className="topiccard__author">
            <p>{article.author}</p>
          </div>
        </div>
        <div className="topiccard--box-4">
          <div className="topiccard--box-6">
            <div className="topiccard__title">
              <h2>{article.title}</h2>
            </div>
            <div className="topiccard__snippet">
              <p> {article.snippet} </p>
            </div>
            <div className="topiccard__date">
              {formatDate(article.createdAt)}
            </div>
          </div>
        </div>
        <div className="topiccard--box-5">
          <div>Replies</div>
          <div>Bookmark</div>
        </div>
      </div>
    </article>
  );
};

export default TopicArticleCard;
