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
import LoadMore from "../../components/LoadMore/LoadMore";

export const MainFeedContext = React.createContext();

const MainFeedScreen = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const articlesData = useSelector((state) => state.articles);
  const { loading, articles } = articlesData;

  window.addEventListener("scroll", () => {
    let aside = document.getElementsByClassName("home--box-8")[0];
    if (aside) {
      if (window.scrollY > 400) {
        aside.classList.add("home--fixed");
      } else {
        aside.classList.remove("home--fixed");
      }
    }
  });

  window.addEventListener("click", (e) => {
    let backdrop = document.getElementsByClassName("actionmenu")[0];
    let drawer = document.getElementsByClassName("actionmenu")[0];
    if (e.target === backdrop) {
      drawer.classList.remove("actionmenu--open");
      drawer.classList.add("actionmenu--close");
      backdrop.classList.remove("actionmenu--open");
      backdrop.classList.add("actionmenu--close");
    }
  });

  useEffect(() => {
    dispatch(articlesActions.load());
  }, [dispatch]);

  return (
    <div className="home">
      <MainFeedContext.Provider value={{ favorites, setFavorites }}>
        {loading ? (
          <Loader />
        ) : (
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
                        It's easy and free to post your thinking on any topic
                        and connect with millions of readers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home__content">
                <div className="home--box-6">
                  <div className="home--box-7">
                    <ul>
                      {articles &&
                        articles.map((article, index) => (
                          <li key={index}>
                            <MainFeedArticleCard
                              article={article}
                              type={true}
                            />
                          </li>
                        ))}
                    </ul>
                    <LoadMore />
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
                          <Link
                            to={`/profile/${user._id}?breadcrumb=favorites`}
                          >
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
      </MainFeedContext.Provider>
    </div>
  );
};

export default MainFeedScreen;
