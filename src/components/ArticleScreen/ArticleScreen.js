import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../App";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import "./ArticleScreen.css";
import { formatDate } from "../../utils";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import SocialMenu from "../SocialMenu/SocialMenu";
import Replies from "../Replies/Replies";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { follow, unfollow, like, dislike } from "../actions/actions";

const styles = {
  icons: {
    size: "2rem",
  },
};

export const ArticleContext = React.createContext();

const ArticleScreen = () => {
  const [article, setArticle] = useState();
  const [following, setFollowing] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [favd, setFavd] = useState(false);
  const [numReplies, setNumReplies] = useState(0);
  const user = useSelector((state) => state.user);
  const { articleId } = useParams();
  const articles = useSelector((state) => state.articles);
  const search = useLocation().search;
  const open = new URLSearchParams(search).get("open");
  const dispatch = useDispatch();

  useEffect(() => {
    let result = articles && articles.find((x) => x._id === articleId);
    setArticle(result);
    setLikes(result.likes);

    // if user is already following author, set following state to true. False otherwise.
    let alreadyFollowing = user.following.find(
      (x) => x.userId === result.authorId
    );
    if (alreadyFollowing) {
      setFollowing(true);
    }

    // if user has already liked article, set liked state to true. False otherwise.
    let alreadyLiked = result.likes.find((x) => x.userId === user._id);
    if (alreadyLiked) {
      setLiked(true);
    }
  }, [articleId, articles, user._id, user.following]);

  const followHandler = () => {
    try {
      if (!follow) {
        dispatch(follow(article.authorId));
      } else {
        dispatch(unfollow(article.authorId));
      }
      setFollowing(!following);
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async () => {
    let exists = article.likes.find((x) => x.userId === user._id);
    if (!exists) {
      dispatch(like(article._id));
      setLikes([...likes, { userId: user._id }]);
    } else {
      dispatch(dislike(article._id));
      setLikes(likes.filter((x) => x.userId !== user._id));
    }
    setLiked(!liked);
  };

  const openHandler = () => {
    document
      .getElementsByClassName("replies")[0]
      .classList.remove("replies--close");

    document
      .getElementsByClassName("replies")[0]
      .classList.add("replies--open");
  };

  useEffect(() => {
    if (open) {
      openHandler();
    }
  }, [open]);

  return (
    <main className="article">
      <ArticleContext.Provider
        value={{ articleId, numReplies, setNumReplies, article }}
      >
        <Header />
        <Replies />
        <article className="article__main">
          {article && (
            <div className="article__title">
              <h1>{article.title}</h1>
            </div>
          )}
          <div className="article--box-4">
            {article && (
              <SocialMenu article={article} favd={favd} setFavd={setFavd} />
            )}
          </div>
          {article && (
            <div className="article--box-1">
              <div className="article--box-7">
                <div className="article__avatar">
                  <img src={`/assets/icons8-circled-v-100.png`} alt="avatar" />
                </div>
                <div className="article--box-3">
                  <Link to={`/profile/${article.authorId}`}>
                    <div className="article__author">{article.author}</div>
                  </Link>
                  <div className="article__date">
                    {formatDate(article.createdAt)}
                  </div>
                </div>
              </div>
              <div className="article--box-6">
                <div className="article--box-8">
                  <button
                    className="article__button--1 article--padding-1"
                    type="button"
                    onClick={openHandler}
                  >
                    Reply
                  </button>
                </div>
                <div className="article--box-8">
                  <button
                    className="article__button--1 article--padding-1"
                    type="button"
                    onClick={followHandler}
                    disabled={article.authorId === user._id ? true : false}
                  >
                    {following ? "Unfollow" : "Follow"}
                  </button>
                </div>
                <div className="article--box-8">
                  <button
                    className="article__button--1 article--padding-2"
                    type="button"
                  >
                    <IconContext.Provider value={styles.icons}>
                      <AiOutlineMessage />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            </div>
          )}
          {article && (
            <div className="article__picture">
              <img src={article.image} alt="article" />
            </div>
          )}
          <div className="article--box-2">
            {article && (
              <div className="article__description">
                <p>{article.description}</p>
              </div>
            )}
            {article && (
              <div className="article__content">{parse(article.content)}</div>
            )}
          </div>
        </article>
        <div className="article--box-5">
          <div className="article--box-9">
            {article && (
              <div className="article--box-10">
                <button
                  type="button"
                  className="article__button--2"
                  onClick={likeHandler}
                >
                  {likes && (
                    <>
                      <IconContext.Provider value={styles.icons}>
                        {liked ? <AiFillLike /> : <AiOutlineLike />}
                      </IconContext.Provider>
                      &nbsp; &nbsp;{likes.length}
                    </>
                  )}
                </button>
              </div>
            )}
            {article && (
              <div className="article--box-10">
                <button
                  type="button"
                  className="article__button--2"
                  onClick={openHandler}
                >
                  <IconContext.Provider value={styles.icons}>
                    <TiMessages />
                    &nbsp; &nbsp;{numReplies}
                  </IconContext.Provider>
                </button>
              </div>
            )}
          </div>
          {article && (
            <SocialMenu article={article} favd={favd} setFavd={setFavd} />
          )}
        </div>
        <Footer />
      </ArticleContext.Provider>
    </main>
  );
};

export default ArticleScreen;
