import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./MainFeedScreen.css";
//import { getAllArticles } from "../../components/actions/actions";
import { articlesActions } from "../../components/_actions/articles.actions";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MainFeedArticleCard from "../../components/MainFeedArticleCard/MainFeedArticleCard";
import Recommended from "../../components/Recommended/Recommended";
import ReadingList from "../../components/ReadingList/ReadingList";
import { Link } from "react-router-dom";
import IsLogged from "../../components/IsLogged/IsLogged";
import LoginModal from "../../components/LoginModal/LoginModal";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import "../../components/_helpers/scroll-load-more.helpers";

export const MainFeedContext = React.createContext();

const MainFeedScreen = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const { loading, articles } = data;

  useEffect(() => {
    dispatch(articlesActions.load({ category: "" }));
  }, []);

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
        if (entries[0].isIntersecting) {
          dispatch(articlesActions.load({ category: "" }));
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="home">
      <MainFeedContext.Provider value={{ favorites, setFavorites }}>
        <main className="home--box-1">
          <Header />
          <div className="home--box-2">
            <div className="home__banner">
              <div className="home--box-3">
                <div className="home--box-4">
                  <div>
                    <h2 className="home__title">
                      Large is a place to read, write, and connect
                    </h2>
                  </div>
                  <div>
                    <p className="home__description">
                      It's easy and free to post your thinking on any topic and
                      connect with millions of readers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="home__content">
              <div className="home--box-6">
                <div className="home--box-7">
                  <ul className="home__articles">
                    {articles &&
                      articles.map((article, index) => {
                        if (articles.length === index + 1) {
                          return (
                            <li
                              key={`home-${article._id}`}
                              ref={lastBookElementRef}
                            >
                              <MainFeedArticleCard
                                article={article}
                                type={true}
                              />
                            </li>
                          );
                        } else {
                          return (
                            <li key={`home-${article._id}`}>
                              <MainFeedArticleCard
                                article={article}
                                type={true}
                              />
                            </li>
                          );
                        }
                      })}
                  </ul>
                  {loading && <ContentLoader />}
                </div>
                <div className="home--box-8">
                  <div className="home__recommended">
                    <Recommended />
                  </div>
                  <IsLogged>
                    <div className="home__readinglist">
                      <ReadingList type={true} />
                    </div>
                    {favorites && favorites.length > 3 && (
                      <div>
                        <Link to={`/profile/${user._id}?breadcrumb=favorites`}>
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
      </MainFeedContext.Provider>
    </div>
  );
};

export default MainFeedScreen;
