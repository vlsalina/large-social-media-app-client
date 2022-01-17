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
import Recommended from "../Recommended/Recommended";
import ReadingList from "../ReadingList/ReadingList";
import { Link } from "react-router-dom";

const MainFeedScreen = () => {
  const { domain } = useContext(Context);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
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
        <div className="mainFeedScreen-wrapper">
          <Header />
          <div className="mainFeedScreen-main-wrapper">
            <main className="mainFeedScreen-main">
              <ul>
                {articles &&
                  articles.map((article) => (
                    <li key={article._id}>
                      <MainFeedArticleCard article={article} />
                    </li>
                  ))}
              </ul>
            </main>
          </div>
          <div className="mainFeedScreen-aside-wrapper">
            <aside className="mainFeedScreen-aside">
              <div className="mainFeedScreen-aside-spacer">
                <Recommended />
              </div>
              <div className="mainFeedScreen-aside-spacer">
                <ReadingList />
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainFeedScreen;
