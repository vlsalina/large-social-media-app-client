import React, { useContext, useEffect, useState } from "react";
import "./MainFeedArticleCard.css";
import { formatDate, redirect, userIsLogged } from "../../utils";
import { MainFeedContext } from "../../screens/MainFeedScreen/MainFeedScreen";
import { TopicContext } from "../../screens/TopicScreen/TopicScreen";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";
import Avatar from "../Avatar/Avatar";
import { useDispatch } from "react-redux";
import {
  favorite,
  //like,
  //dislike
} from "../actions/actions";
import { useNavigate } from "react-router-dom";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { repliesHelpers } from "../_helpers/replies.helper";
import { articlesActions } from "../_actions/articles.actions";

const MainFeedArticleCard = ({ article, type }) => {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useContext(
    type ? MainFeedContext : TopicContext
  );
  const user = useSelector((state) => state.user);
  const [replies, setReplies] = useState(false);
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLikes(article.likes);

    return () => setLikes([]);
  }, [article.likes]);

  useEffect(() => {
    let exists = article.likes.find((x) => x.userId === user._id);
    if (exists) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [article.likes, user._id]);

  useEffect(() => {
    //axios
    //  .get(
    //    `${process.env.REACT_APP_DOMAIN}/api/replies/getAllReplies?articleId=${article._id}`,
    //    {
    //      headers: { authorization: `Bearer ${user.accessToken}` },
    //    }
    //  )
    //  .then((response) => setReplies(response.data))
    //  .catch((error) => console.log(error));

    repliesHelpers
      .getAllReplies(article._id)
      .then((replies) => setReplies(replies));

    return () => setReplies([]);
  }, [article._id, process.env.REACT_APP_DOMAIN]);

  const likeHandler = () => {
    if (!liked) {
      dispatch(articlesActions.like(article._id));
      setLikes([...likes, { userId: user._id }]);
    } else {
      dispatch(articlesActions.unlike(article._id));
      setLikes(likes.filter((x) => x.userId !== user._id));
    }
    setLiked(!liked);
  };

  const clickHandler = (e) => {
    if (user._id === article.authorId) {
      return;
    }

    try {
      dispatch(favorite(article._id));
      setFavorites([...favorites, article]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="card">
      <div className="card--box-7">
        <div className="card--box-1">
          <div className="card--box-3">
            <div className="card__avatar-wrapper card--spacer">
              <Avatar article={article} />
            </div>
            <div className="card__author card--spacer">
              <Link to={`/profile/${article.authorId}?breadcrumb=articles`}>
                {article.author}
              </Link>
            </div>
            <Link
              className="card__category-1"
              to={`/topic/${article.category}`}
            >
              <div className="card__topic">{article.category}</div>
            </Link>
          </div>
          <Link
            className="card__category-2 card--spacer"
            to={`/topic/${article.category}`}
          >
            <div className="card__topic">{article.category}</div>
          </Link>
          <Link className="card--spacer" to={`/article/${article._id}`}>
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
                <button
                  type="button"
                  className="buttonA"
                  onClick={() => userIsLogged(likeHandler)}
                >
                  <IconContext.Provider value={styles.icons}>
                    {liked ? <AiFillLike /> : <AiOutlineLike />}
                  </IconContext.Provider>
                  &nbsp;
                  {likes && <div>{likes.length}</div>}
                </button>
              </div>
              <div className="card__replies card--spacer">
                <button
                  type="button"
                  className="buttonA"
                  onClick={() =>
                    userIsLogged(() =>
                      navigate(`/article/${article._id}?open=${true}`)
                    )
                  }
                >
                  <IconContext.Provider value={styles.icons}>
                    <TiMessages />
                  </IconContext.Provider>
                  &nbsp;
                  {replies && <div>{replies.length}</div>}
                </button>
              </div>
            </div>
            <div>
              <button
                className="favorite"
                type="button"
                onClick={(e) => userIsLogged(() => clickHandler(e))}
              >
                <IconContext.Provider value={styles.icons2}>
                  <BsFillBookmarkPlusFill />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
        <div className="card--box-2">
          <Link to={`/article/${article._id}`}>
            <img
              className={`card__image ${
                !article.image ? "card--placeholder" : ""
              }`}
              src={article.image ? article.image : "/assets/large-logo.png"}
              alt="article"
            />
          </Link>
        </div>
      </div>
      <div className="card--box-6">
        <div className="card--box-5">
          <div className="card__date card--spacer">
            {formatDate(article.createdAt)}
          </div>
          <div className="card__likes card--spacer">
            <button
              type="button"
              className="buttonA"
              onClick={() => userIsLogged(likeHandler)}
            >
              <IconContext.Provider value={styles.icons}>
                {liked ? <AiFillLike /> : <AiOutlineLike />}
              </IconContext.Provider>
              &nbsp;
              {likes && <div>{likes.length}</div>}
            </button>
          </div>
          <div className="card__replies card--spacer">
            <button
              type="button"
              className="buttonA"
              onClick={() =>
                userIsLogged(() =>
                  navigate(`/article/${article._id}?open=${true}`)
                )
              }
            >
              <IconContext.Provider value={styles.icons}>
                <TiMessages />
              </IconContext.Provider>
              &nbsp;
              {replies && <div>{replies.length}</div>}
            </button>
          </div>
        </div>
        <div>
          <button
            className="favorite"
            type="button"
            onClick={(e) => userIsLogged(() => clickHandler(e))}
          >
            <IconContext.Provider value={styles.icons2}>
              <BsFillBookmarkPlusFill />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </article>
  );
};

export default MainFeedArticleCard;
