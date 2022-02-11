import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileArticleCard.css";
import { TiMessages } from "react-icons/ti";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";
import { formatDate } from "../../utils";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { favorite, unfavorite, like, dislike } from "../actions/actions";

const ProfileArticleCard = ({ article }) => {
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false);
  const [replies, setReplies] = useState();
  const [favd, setFavd] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLikes(article.likes);

    // if user has already liked article, set liked state to true. false otherwise.
    let exists = article.likes.find((x) => x.userId === user._id);
    if (exists) {
      setLiked(true);
    }
  }, [article.likes, user._id]);

  useEffect(() => {
    // check if article already exists in user's favorites
    let exists =
      article && user.favorites.find((x) => x.articleId === article._id);
    if (exists) {
      setFavd(true);
    } else {
      setFavd(false);
    }
  }, [article, user.favorites]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DOMAIN}/api/replies/getAllReplies?articleId=${article._id}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((response) => setReplies(response.data))
      .catch((error) => console.log(error));
  }, [article._id, process.env.REACT_APP_DOMAIN, user.accessToken]);

  const likeHandler = () => {
    let exists = likes.find((x) => x.userId === user._id);
    if (!exists) {
      dispatch(like(article._id));
      setLikes([...likes, { userId: user._id }]);
    } else {
      dispatch(dislike(article._id));
      setLikes(likes.filter((x) => x.userId !== user._id));
    }
    setLiked(!liked);
  };

  const favoriteHandler = async (e) => {
    try {
      if (favd) {
        dispatch(unfavorite(article._id));
      } else {
        dispatch(favorite(article._id));
      }
      setFavd(!favd);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="profilecard">
      <Link to={`/topic/${article.category}`}>
        <div className="profilecard__category card__topic">
          {article.category}
        </div>
      </Link>
      <div className="card--box-3 profilecard--spacer">
        <div className="card__avatar-wrapper card--spacer">
          <Avatar article={article} />
        </div>
        <div className="card__author card--spacer">
          <Link to={`/profile/${article.authorId}?breadcrumb=articles`}>
            <h4>{article.author}</h4>
          </Link>
        </div>
      </div>
      <Link to={`/article/${article._id}`}>
        <div className="profilecard__title">
          <h2> {article.title} </h2>
        </div>
      </Link>
      <Link to={`/article/${article._id}`}>
        <div className="profilecard__snippet">{article.snippet}</div>
      </Link>
      {article.image && (
        <Link to={`/article/${article._id}`}>
          <div className="profilecard__image">
            <img src={article.image} alt="article" />
          </div>
        </Link>
      )}
      {!article.image && <div className="profilecard__placeholder" />}
      <Link to={`/article/${article._id}`}>
        <div className="profilecard__description">{article.description}</div>
      </Link>
      <div className="card--box-4 profilecard__spacer">
        <div className="card--box-5">
          {article && (
            <div className="card__date card--spacer">
              {formatDate(article.createdAt)}
            </div>
          )}
          <div className="card__likes card--spacer">
            <button type="button" className="buttonA" onClick={likeHandler}>
              <IconContext.Provider value={styles.icons}>
                {liked ? <AiFillLike /> : <AiOutlineLike />}
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
            onClick={(e) => favoriteHandler(e)}
          >
            {favd ? (
              <img
                className="favorite__icon"
                src={"/assets/icons8-unfavorite-512.png"}
                alt="unfavorite"
              />
            ) : (
              <img
                className="favorite__icon"
                src={"/assets/icons8-favorite-512.png"}
                alt="favorite"
              />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProfileArticleCard;
