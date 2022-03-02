import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./TopicScreen.css";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import MainFeedArticleCard from "../../components/MainFeedArticleCard/MainFeedArticleCard";
import Recommended from "../../components/Recommended/Recommended";
import ReadingList from "../../components/ReadingList/ReadingList";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { topics } from "../../data/data";
import IsLogged from "../../components/IsLogged/IsLogged";

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
    default:
      return "technology";
  }
};

const TopicScreen = () => {
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
  }, [topic, save]);

  useEffect(() => {
    setLoading(true);

    const asyncCall = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_DOMAIN}/api/articles/getArticlesByCategory?category=${topic}`
        );
        setLoading(false);
        setArticles(data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    asyncCall();
  }, [process.env.REACT_APP_DOMAIN, topic, user.accessToken]);

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
                    <IsLogged>
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
                    </IsLogged>
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