import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../App";
import { Link } from "react-router-dom";
import "./ProfileArticleCard.css";
import { TiMessages } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";
import { formatDate } from "../../utils";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileArticleCard = ({ article }) => {
  const [likes, setLikes] = useState();
  const [replies, setReplies] = useState();
  const [favorites, setFavorites] = useState();
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLikes(article.likes);
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/api/replies/getAllReplies?articleId=${article._id}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => setReplies(response.data))
      .catch((error) => console.log(error));
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
    <article className="profilecard">
      <Link to={`/topic/${article.category}`}>
        <div className="profilecard__category card__topic">
          {article.category}
        </div>
      </Link>
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
            <img src={article.image} />
          </div>
        </Link>
      )}
      {!article.image && <div className="profilecard__placeholder" />}
      <Link to={`/article/${article._id}`}>
        <div className="profilecard__description">{article.description}</div>
      </Link>
      <div className="card--box-4 profilecard__spacer">
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
    </article>
  );
};

export default ProfileArticleCard;
