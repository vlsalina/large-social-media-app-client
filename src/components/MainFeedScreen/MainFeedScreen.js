import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import "./MainFeedScreen.css";
import axios from "axios";
import { Context } from "../../App";
import { getAllArticles } from "../actions/actions";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MainFeedArticleCard from "../MainFeedArticleCard/MainFeedArticleCard";

const MainFeedScreen = () => {
  const { domain } = useContext(Context);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    setLoading(true);

    let promise = dispatch(getAllArticles(domain));

    promise
      .then((result) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="mainFeedScreen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main className="mainfeed">
            <ul>
              {articles.map((article) => (
                <li key={article._id}>
                  <MainFeedArticleCard article={article} />
                </li>
              ))}
            </ul>
          </main>
        </>
      )}
    </div>
  );
};

export default MainFeedScreen;
