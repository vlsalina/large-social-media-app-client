import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import "./ArticleScreen.css";
import { formatDate } from "../../utils";
import Footer from "../Footer/Footer";

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
    <main className="articleScreen">
      <Header />
      <article className="articleScreen-main">
        {article && (
          <div className="articleScreen-title">
            <h1>{article.title}</h1>
          </div>
        )}
        {article && (
          <div className="articleScreen-data">
            <div className="articleScreen-avatar">
              <img src={`/assets/icons8-circled-v-100.png`} />
            </div>
            <div className="articleScreen-author">{article.author}</div>
            <div className="articleScreen-date">
              {formatDate(article.createdAt)}
            </div>
          </div>
        )}
        {article && (
          <div className="articleScreen-picture">
            <img src={"/assets/ssfasfsafasffs-e1460147167824.jpg"} />
          </div>
        )}
        <div className="articleScreen-wrapper">
          {article && (
            <div className="articleScreen-description">
              <p>{article.description}</p>
            </div>
          )}
          {article && (
            <div className="articleScreen-content">
              <p>{article.content}</p>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default ArticleScreen;
