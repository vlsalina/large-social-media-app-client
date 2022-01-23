import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import "./TopicScreen.css";
import axios from "axios";
import { Context } from "../../App";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import MainFeedArticleCard from "../MainFeedArticleCard/MainFeedArticleCard";
import Recommended from "../Recommended/Recommended";
import ReadingList from "../ReadingList/ReadingList";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import TopicArticleCard from "../TopicArticleCard/TopicArticleCard";

export const MainFeedContext = React.createContext();

const TopicScreen = () => {
  const { domain } = useContext(Context);
  const { topic } = useParams();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const [articles, setArticles] = useState();

  useEffect(() => {
    const asyncCall = async () => {
      try {
        const { data } = await axios.get(
          `${domain}/api/articles/getArticlesByCategory?category=${topic}`,
          { headers: { authorization: `Bearer ${user.accessToken}` } }
        );
        setArticles(data);
      } catch (error) {
        console.log(error);
      }
    };

    asyncCall();
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
                        <TopicArticleCard article={article} />
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
                <div></div>
              </aside>
            </div>
          </div>
        )}
      </MainFeedContext.Provider>
    </div>
  );
};

export default TopicScreen;
