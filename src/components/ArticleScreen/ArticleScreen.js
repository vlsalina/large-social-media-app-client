import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import "./ArticleScreen.css";
import { formatDate } from "../../utils";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { IconContext } from "react-icons";
import Footer from "../Footer/Footer";
import SocialMenu from "../SocialMenu/SocialMenu";
import axios from "axios";
import Replies from "../Replies/Replies";

const styles = {
  icons: {
    size: "2rem",
  },
};

export const ArticleContext = React.createContext();

const ArticleScreen = () => {
  const { domain } = useContext(Context);
  const [article, setArticle] = useState();
  const [following, setFollowing] = useState(false);
  //const [likes, setLikes] = useState();
  const user = useSelector((state) => state.user);
  const { articleId } = useParams();
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    let result =
      articles &&
      articles.find((x) => {
        if (x._id === articleId) {
          return x;
        }
      });
    setArticle(result);
    //setLikes(result.likes);
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/api/users/getUser?id=${user._id}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => {
        if (response.data.following.includes(article.authorId)) {
          setFollowing(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const followHandler = async () => {
    try {
      let { data } = await axios.patch(
        `${domain}/api/users/${following ? "unfollow" : "follow"}`,
        { userId: article.authorId },
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );
      setFollowing(!following);
    } catch (error) {
      console.log(error);
    }
  };

  //const likeHandler = async () => {
  //  let sofar = likes.find((x) => x.userId === user._id);
  //  try {
  //    let { data } = await axios.patch(
  //      `${domain}/api/articles/${sofar ? "unlikeArticle" : "likeArticle"}`,
  //      { articleId: article._id },
  //      { headers: { authorization: `Bearer ${user.accessToken}` } }
  //    );
  //    setLikes(data.likes);
  //  } catch (error) {
  //    console.log(error);
  //  }
  //};

  const openHandler = () => {
    document
      .getElementsByClassName("replies")[0]
      .classList.remove("replies--close");

    document
      .getElementsByClassName("replies")[0]
      .classList.add("replies--open");
  };

  return (
    <main className="article">
      <ArticleContext.Provider value={{ articleId }}>
        <Header />
        <Replies />
        <article className="article__main">
          {article && (
            <div className="article__title">
              <h1>{article.title}</h1>
            </div>
          )}
          <div className="article--box-4">
            <SocialMenu />
          </div>
          {article && (
            <div className="article--box-1">
              <div className="article--box-7">
                <div className="article__avatar">
                  <img src={`/assets/icons8-circled-v-100.png`} />
                </div>
                <div className="article--box-3">
                  <div className="article__author">{article.author}</div>
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
              <img src={"/assets/ssfasfsafasffs-e1460147167824.jpg"} />
            </div>
          )}
          <div className="article--box-2">
            {article && (
              <div className="article__description">
                <p>{article.description}</p>
              </div>
            )}
            {article && (
              <div className="article__content">
                <p>{article.content}</p>
              </div>
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
                  onClick={() => console.log("Liked")}
                >
                  <IconContext.Provider value={styles.icons}>
                    <AiOutlineLike />
                    &nbsp; &nbsp;{"0"}
                  </IconContext.Provider>
                </button>
              </div>
            )}
            {article && (
              <div className="article--box-10">
                <button type="button" className="article__button--2">
                  <IconContext.Provider value={styles.icons}>
                    <TiMessages />
                    &nbsp; &nbsp;{"0"}
                  </IconContext.Provider>
                </button>
              </div>
            )}
          </div>
          <SocialMenu />
        </div>
        <Footer />
      </ArticleContext.Provider>
    </main>
  );
};

export default ArticleScreen;
