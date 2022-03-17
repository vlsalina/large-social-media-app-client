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
import { topics } from "../../components/_constants/general.constants";
import IsLogged from "../../components/IsLogged/IsLogged";
import { bgc } from "../../components/_helpers/general.helpers";
import { articlesActions } from "../../components/_actions/articles.actions";
import { useDispatch } from "react-redux";
import LoadMore from "../../components/LoadMore/LoadMore";
import ContentLoader from "../../components/ContentLoader/ContentLoader";

export const TopicContext = React.createContext();

const getbanner = (topic) => {
  switch (topic) {
    case topics.TECH:
      return topics.TECH;
    case topics.MON:
      return topics.MON;
    case topics.BUS:
      return topics.BUS;
    case topics.PROD:
      return topics.PROD;
    case topics.PSYC:
      return topics.PSYC;
    case topics.MIND:
      return topics.MIND;
    case topics.ART:
      return topics.ART;
    default:
      return topics.NON;
  }
};

const TopicScreen = () => {
  const { topic } = useParams();
  const dispatch = useDispatch();
  const [save, setSave] = useState(topic);
  //const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const { articles, loading, hasMore } = data;
  //const [articles, setArticles] = useState();

  useEffect(() => {
    if (topic !== save) {
      setSave(topic);
      window.location.reload();
    }
  }, [topic, save]);

  useEffect(() => {
    dispatch(articlesActions.clear());
    dispatch(articlesActions.load({ category: topic }));
  }, []);

  // Load more content on scroll
  let options = {
    rootMargin: "0px",
    threshold: 1.0,
  };
  const observer = React.useRef();
  const lastBookElementRef = React.useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(articlesActions.load({ category: topic }));
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [loading]
  );
  // end Load more content on scroll

  //useEffect(() => {
  //  setLoading(true);

  //  const asyncCall = async () => {
  //    try {
  //      const { data } = await axios.get(
  //        `${process.env.REACT_APP_DOMAIN}/api/articles/getArticlesByCategory?category=${topic}`
  //      );
  //      setLoading(false);
  //      setArticles(data.reverse());
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };
  //  asyncCall();
  //}, [process.env.REACT_APP_DOMAIN, topic, user.accessToken]);

  return (
    <div className="home">
      <TopicContext.Provider value={{ favorites, setFavorites }}>
        <main className="home--box-1">
          <Header />
          <div className="home--box-2">
            {topic && (
              <div className={`topic__banner ${bgc(topic.toUpperCase())}`}>
                <div className="topic--box-3">
                  <h1 className={`topic__name`}>{topic}</h1>
                </div>
              </div>
            )}
            <div className="home__content">
              <div className="home--box-6">
                <div className="home--box-7">
                  <ul className="home__articles">
                    {articles &&
                      articles.map((article) => (
                        <li key={`topic-${article._id}`}>
                          <MainFeedArticleCard article={article} type={false} />
                        </li>
                      ))}
                  </ul>
                  <ContentLoader target={lastBookElementRef} />
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
      </TopicContext.Provider>
    </div>
  );
};

export default TopicScreen;
