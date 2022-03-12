import "./NotificationsCard.css";
import Avatar from "../Avatar/Avatar";
import { formatDate } from "../_helpers/general.helpers";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const NotificationsCard = ({ article }) => {
  return (
    <div className="notificationscard--box-4">
      <div className="notificationscard--box-5">
        <div className="notificationscard__avatar">
          <Avatar
            article={{
              avatar: article.avatar,
              author: article.author,
            }}
          />
        </div>
        {article && (
          <Link to={`/profile/${article.userId}?breadcrumb=articles`}>
            <div className="notificationscard__author">
              <h4>{article.author}</h4>
            </div>
          </Link>
        )}
      </div>
      {article && (
        <Link to={`/article/${article.articleId}?open=true`}>
          <div className="notificationscard__content">
            {parse(article.content)}
          </div>
        </Link>
      )}
      {article && (
        <div className="notificationscard__date">
          {formatDate(article.createdAt)}
        </div>
      )}
    </div>
  );
};

export default NotificationsCard;
