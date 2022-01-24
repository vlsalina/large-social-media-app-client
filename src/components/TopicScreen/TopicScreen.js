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

export const TopicContext = React.createContext();

const TopicScreen = () => {
  const { domain } = useContext(Context);
  const type = false;
  const { topic } = useParams();
  const [save, setSave] = useState(topic);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const [articles, setArticles] = useState();

  useEffect(() => {
    if (topic !== save) {
      setSave(topic);
      window.location.reload();
    }
  }, [topic]);

  useEffect(() => {
    setLoading(true);

    const asyncCall = async () => {
      try {
        const { data } = await axios.get(
          `${domain}/api/articles/getArticlesByCategory?category=${topic}`,
          { headers: { authorization: `Bearer ${user.accessToken}` } }
        );
        setLoading(false);
        setArticles(data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    asyncCall();
  }, []);

  return (
    <div className="home">
      <TopicContext.Provider value={{ favorites, setFavorites }}>
        {loading ? (
          <Loader />
        ) : (
          <div className="home--box-1">
            <Header />
            <div className="home--box-2">
              <div className="topicscreen--box-6">
                <h1 class="text">
                  {topic}
                  &nbsp; &nbsp;
                  {articles && (
                    <span class="link">{articles.length} articles</span>
                  )}
                </h1>
              </div>
              <main className="home--box-4">
                <ul>
                  {articles &&
                    articles.map((article) => (
                      <li key={article._id}>
                        <MainFeedArticleCard article={article} type={type} />
                      </li>
                    ))}
                </ul>
              </main>
            </div>
            <div className="home--box-3">
              <div className="topicscreen--box-6">
                <h1 class="text">
                  {topic}
                  &nbsp; &nbsp;
                  {articles && (
                    <span class="link">{articles.length} articles</span>
                  )}
                </h1>
              </div>
              <aside className="home--box-5">
                <div>
                  <Recommended />
                </div>
                <div>
                  <ReadingList type={type} />
                </div>
              </aside>
            </div>
          </div>
        )}
      </TopicContext.Provider>
    </div>
  );
};

export default TopicScreen;
