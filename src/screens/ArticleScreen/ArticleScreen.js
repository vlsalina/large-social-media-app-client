import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import "./ArticleScreen.css";
import {
  userIsLogged,
  loggedIn,
  formatDate,
} from "../../components/_helpers/general.helpers";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { BsBookmarkDashFill } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import SocialMenu from "../../components/SocialMenu/SocialMenu";
import Replies from "../../components/Replies/Replies";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { userActions } from "../../components/_actions/user.actions";
import { articlesActions } from "../../components/_actions/articles.actions";
import Avatar from "../../components/Avatar/Avatar";
import { styles } from "../../styles/styles";

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
  const data = useSelector((state) => state.data);
  const { loading, articles } = data;
  const search = useLocation().search;
  const open = new URLSearchParams(search).get("open");
  const dispatch = useDispatch();

  useEffect(() => {
    let result = articles && articles.find((x) => x._id === articleId);

    setArticle(result);
    setLikes(result.likes);

    const fn = () => {
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

      // if user has already favorited article, set favd state to true. False otherwise.
      let alreadyFavd = user.favorites.find((x) => x.articleId === result._id);
      if (alreadyFavd) {
        setFavd(true);
      }
    };

    if (loggedIn()) {
      fn();
    }
  }, [articleId, articles, user._id, user.following]);

  const followHandler = () => {
    try {
      if (!following) {
        dispatch(userActions.follow(article.authorId));
      } else {
        dispatch(userActions.unfollow(article.authorId));
      }
      setFollowing(!following);
    } catch (error) {
      console.log(error);
    }
  };

  const favoriteHandler = (e) => {
    if (user._id === article.authorId) {
      return;
    }

    try {
      if (!favd) {
        dispatch(userActions.favorite(article._id));
      } else {
        dispatch(userActions.unfavorite(article._id));
      }
      setFavd(!favd);
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async () => {
    let exists = article.likes.find((x) => x.userId === user._id);
    if (!exists) {
      dispatch(articlesActions.like(article._id));
      setLikes([...likes, { userId: user._id }]);
    } else {
      dispatch(articlesActions.unlike(article._id));
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
          {article && (
            <div className="article--box-1">
              <div className="article--box-7">
                <div className="article__avatar">
                  {article && <Avatar article={article} />}
                </div>
                <div className="article--box-3">
                  <Link to={`/profile/${article.authorId}?breadcrumb=articles`}>
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
                    className="article__button-2"
                    type="button"
                    onClick={() => userIsLogged(favoriteHandler)}
                    disabled={article.authorId === user._id ? true : false}
                  >
                    {loggedIn() && favd ? (
                      <IconContext.Provider value={styles.icons5}>
                        <BsBookmarkDashFill />
                      </IconContext.Provider>
                    ) : (
                      <IconContext.Provider value={styles.icons5}>
                        <BsBookmarkPlusFill />
                      </IconContext.Provider>
                    )}
                  </button>
                </div>
                <div className="article--box-8">
                  <button
                    className="article__button--1 article--padding-1"
                    type="button"
                    onClick={() => userIsLogged(openHandler)}
                  >
                    Reply
                  </button>
                </div>
                <div className="article--box-8">
                  <button
                    className="article__button--1 article--padding-1"
                    type="button"
                    onClick={() => userIsLogged(followHandler)}
                    disabled={article.authorId === user._id ? true : false}
                  >
                    {loggedIn && following ? "Unfollow" : "Follow"}
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
                  onClick={() => userIsLogged(likeHandler)}
                >
                  {likes && (
                    <>
                      <IconContext.Provider value={styles.icons}>
                        {loggedIn && liked ? <AiFillLike /> : <AiOutlineLike />}
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
                  onClick={() => userIsLogged(openHandler)}
                >
                  <IconContext.Provider value={styles.icons}>
                    <TiMessages />
                    &nbsp; &nbsp;{numReplies}
                  </IconContext.Provider>
                </button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </ArticleContext.Provider>
    </main>
  );
};

export default ArticleScreen;
