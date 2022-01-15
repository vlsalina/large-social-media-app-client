import "./MainFeedArticleCard.css";
import { formatDate } from "../../utils";

const MainFeedArticleCard = ({ article }) => {
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
            <button className="card-favorite-button" type="button">
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
