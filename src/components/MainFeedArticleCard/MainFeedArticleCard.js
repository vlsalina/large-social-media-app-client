import React, { useContext, useEffect, useState } from "react";
import "./MainFeedArticleCard.css";
import { formatDate } from "../../utils";
import { Context } from "../../App";
import { MainFeedContext } from "../MainFeedScreen/MainFeedScreen";
import { TopicContext } from "../TopicScreen/TopicScreen";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";
import { RepliesContext } from "../Replies/Replies";

const MainFeedArticleCard = ({ article, type }) => {
  const { domain } = useContext(Context);
  const { favorites, setFavorites } = useContext(
    type ? MainFeedContext : TopicContext
  );
  const user = useSelector((state) => state.user);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState();

  useEffect(() => {
    setLikes(article.likes);

    return () => setLikes([]);
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/api/replies/getAllReplies?articleId=${article._id}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => setReplies(response.data))
      .catch((error) => console.log(error));

    return () => setReplies([]);
  }, []);

  const likeHandler = async () => {
    let sofar = likes.find((x) => x.userId === user._id);
    try {
      let { data } = await axios.patch(
        `${domain}/api/articles/${sofar ? "unlikeArticle" : "likeArticle"}`,
        { articleId: article._id },
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );
      if (sofar) {
        setLikes(likes.filter((x) => x.userId !== user._id));
      } else {
        setLikes([...likes, { userId: user._id }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = async (e) => {
    try {
      const { data } = await axios.patch(
        `${domain}/api/users/favorite`,
        { articleId: article._id },
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );
      setFavorites([...favorites, article]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="card">
      <div className="card--box-1">
        <div className="card--box-3">
          <div className="card__avatar-wrapper card--spacer">
            <img
              className="card__avatar"
              src={"/assets/icons8-circled-v-100.png"}
            />
          </div>
          <div className="card__author card--spacer">
            <Link to={`/profile/${article.authorId}`}>
              <h4>{article.author}</h4>
            </Link>
          </div>
          <Link to={`/topic/${article.category}`}>
            <div className="card__topic">{article.category}</div>
          </Link>
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
          <div className="card--box-5">
            <div className="card__date card--spacer">
              {formatDate(article.createdAt)}
            </div>
            <div className="card__likes card--spacer">
              <button type="button" className="buttonA" onClick={likeHandler}>
                <IconContext.Provider value={styles.icons}>
                  <AiOutlineLike />
                </IconContext.Provider>
                &nbsp;
                {likes && <div>{likes.length}</div>}
              </button>
            </div>
            <div className="card__replies card--spacer">
              <Link to={`/article/${article._id}?open=${true}`}>
                <IconContext.Provider value={styles.icons}>
                  <TiMessages />
                </IconContext.Provider>
                &nbsp;
                {replies && <div>{replies.length}</div>}
              </Link>
            </div>
          </div>
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
            src={article.image ? article.image : "/assets/large-logo.png"}
          />
        </Link>
      </div>
    </article>
  );
};

export default MainFeedArticleCard;
