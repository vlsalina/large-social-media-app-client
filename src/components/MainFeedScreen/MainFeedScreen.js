import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import "./MainFeedScreen.css";
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
    setLoading(true);

    let promise = dispatch(getAllArticles(domain));

    promise
      .then((result) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, domain]);

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
                    <div className="home__title">
                      <h2> Large is a place to write, read, and connect </h2>
                    </div>
                    <div className="home__description">
                      <p>
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
                        articles.map((article) => (
                          <li key={article._id}>
                            <MainFeedArticleCard
                              article={article}
                              type={true}
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
