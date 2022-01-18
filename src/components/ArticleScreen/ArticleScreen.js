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
    <main className="article">
      <Header />
      <article className="article__main">
        {article && (
          <div className="article__title">
            <h1>{article.title}</h1>
          </div>
        )}
        {article && (
          <div className="article--box-a">
            <div className="article__avatar">
              <img src={`/assets/icons8-circled-v-100.png`} />
            </div>
            <div className="article__author">{article.author}</div>
            <div className="article__date">{formatDate(article.createdAt)}</div>
          </div>
        )}
        {article && (
          <div className="article__picture">
            <img src={"/assets/ssfasfsafasffs-e1460147167824.jpg"} />
          </div>
        )}
        <div className="article--box-b">
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
      <Footer />
    </main>
  );
};

export default ArticleScreen;
