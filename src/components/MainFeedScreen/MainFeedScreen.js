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

const Favorites = ({ toShow }) => {
  return (
    <div className="favorites">
      <ul>
        {toShow.map((fav) => (
          <li key={fav._id}>{fav.title}</li>
        ))}
      </ul>
    </div>
  );
};

const ReadingList = ({ favorites }) => {
  return (
    <div className="readingList">
      <div className="readingList-title">
        <h2>Your Favorite Articles</h2>
      </div>
      {favorites.length === 0 ? (
        <div className="readingList-list-empty">
          <p>
            Click the{" "}
            <img
              className="readingList-favorite-icon"
              src={"/assets/icons8-favorite-512.png"}
            />{" "}
            on any story to easily add it to your reading list or a custom list
            that you can share.
          </p>
        </div>
      ) : (
        <Favorites toShow={favorites} />
      )}
    </div>
  );
};

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

  useEffect(() => {
    const asyncCall = async () => {
      try {
        await axios
          .get(`${domain}/api/getUser`, {
            header: { authorization: `Bearer ${user.accessToken}` },
          })
          .then((result) => setFavorites(user.favorites))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
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
                {articles.map((article) => (
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
                <ReadingList favorites={favorites} />
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainFeedScreen;
