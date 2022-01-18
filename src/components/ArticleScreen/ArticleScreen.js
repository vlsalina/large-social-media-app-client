import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const styles = {
  icons: {
    size: "2rem",
  },
};

const ArticleScreen = () => {
  const [article, setArticle] = useState();
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
  }, []);

  return (
    <main className="article">
      <Header />
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
                >
                  Reply
                </button>
              </div>
              <div className="article--box-8">
                <button
                  className="article__button--1 article--padding-1"
                  type="button"
                >
                  Follow
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
          <div className="article--box-10">
            <button type="button" className="article__button--2">
              <IconContext.Provider value={styles.icons}>
                <AiOutlineLike />
                &nbsp; &nbsp;{article.likes.length}
              </IconContext.Provider>
            </button>
          </div>
          <div className="article--box-10">
            <button type="button" className="article__button--2">
              <IconContext.Provider value={styles.icons}>
                <AiOutlineMessage />
                &nbsp; &nbsp;{article.replies.length}
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <SocialMenu />
      </div>
      <Footer />
    </main>
  );
};

export default ArticleScreen;
