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
import { useLocation } from "react-router-dom";
import { topics } from "../../data/data";

export const TopicContext = React.createContext();

const getbanner = (topic) => {
  switch (topic) {
    case "technology":
      return topics[0].url;
    case "money":
      return topics[1].url;
    case "business":
      return topics[2].url;
    case "productivity":
      return topics[3].url;
    case "psychology":
      return topics[4].url;
    case "mindfulness":
      return topics[5].url;
    case "art":
      return topics[6].url;
  }
};

const TopicScreen = () => {
  const { domain } = useContext(Context);
  const type = false;
  const { topic } = useParams();
  const [save, setSave] = useState(topic);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const [articles, setArticles] = useState();
  const location = useLocation();
  const base = location.pathname.split("/")[1];

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
          <main className="home--box-1">
            <Header />
            <div className="home--box-2">
              {topic && (
                <div
                  className="topic__banner topic--background"
                  style={{ backgroundImage: `url(${getbanner(topic)}` }}
                >
                  <div
                    className={`topic__name ${
                      topic === "technology" ? "topic--black" : ""
                    }`}
                  >
                    <h1>{topic}</h1>
                  </div>
                </div>
              )}
              <div className="home__content">
                <div className="home--box-6">
                  <div className="home--box-7">
                    <ul>
                      {articles &&
                        articles.map((article) => (
                          <li key={article._id}>
                            <MainFeedArticleCard
                              article={article}
                              type={false}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="home--box-8">
                    <div className="home__recommended">
                      <Recommended />
                    </div>
                    <div className="home__readinglist">
                      <ReadingList type={false} />
                    </div>
                    {favorites && favorites.length > 3 && (
                      <div>
                        <Link to={`/profile/${user._id}`}>
                          <div className="home__seemore">
                            See all {favorites.length}
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </TopicContext.Provider>
    </div>
  );
};

export default TopicScreen;
