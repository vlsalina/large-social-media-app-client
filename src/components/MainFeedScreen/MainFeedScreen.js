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

export const MainFeedContext = React.createContext();

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
    <div className="home">
      <MainFeedContext.Provider value={{ favorites, setFavorites }}>
        {loading ? (
          <Loader />
        ) : (
          <div className="home--box-1">
            <Header />
            <div className="home--box-2">
              <main className="home--box-4">
                <ul>
                  {articles &&
                    articles.map((article) => (
                      <li key={article._id}>
                        <MainFeedArticleCard article={article} type={true} />
                      </li>
                    ))}
                </ul>
              </main>
            </div>
            <div className="home--box-3">
              <aside className="home--box-5">
                <div>
                  <Recommended />
                </div>
                <div>
                  <ReadingList />
                </div>
              </aside>
            </div>
          </div>
        )}
      </MainFeedContext.Provider>
    </div>
  );
};

export default MainFeedScreen;
