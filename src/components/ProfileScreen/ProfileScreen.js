import React, { useEffect, useState, useContext } from "react";
import "./ProfileScreen.css";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfileArticleCard from "../ProfileArticleCard.js/ProfileArticleCard";
import Loader from "../Loader/Loader";
import parse from "html-react-parser";
import { formatDate } from "../../utils";
import FadeInSection from "../FadeInSection/FadeInSection";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { breadcrumbs } from "../../data/data";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../actions/actions";
import FollowingCard from "../FollowingCard/FollowingCard";

const FadeIn = ({ children }) => {
  const [isVisib, setIsVisib] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsVisib(true);
    }, 100);
  }, []);

  return <div className={`fadein ${isVisib ? "isVisib" : ""}`}>{children}</div>;
};

const Breadcrumbs = ({ getData }) => {
  return (
    <div className="breadcrumbs">
      <ul>
        {breadcrumbs.map((crumb) => (
          <li key={crumb}>
            <button
              className={`breadcrumbs__crumb`}
              type="button"
              onClick={() => getData(crumb)}
            >
              {crumb}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Wrapper = ({ children, author, userId, user, getData }) => {
  return (
    <>
      <div className="profilescreen__heading">
        {author && (
          <h1>
            Welcome to {author.firstname} {author.lastname}'s Page
          </h1>
        )}
      </div>
      {userId === user._id && <Breadcrumbs getData={getData} />}
      {children}
    </>
  );
};

const ProfileScreen = () => {
  const { userId } = useParams();
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const dispatch = useDispatch();

  // base articles
  const [articles, setArticles] = useState();

  // user's articles, favorites, replies, and following states
  const [usersArticles, setUsersArticles] = useState();
  const [favorites, setFavorites] = useState();
  const [replies, setReplies] = useState();
  const [following, setFollowing] = useState();

  // set which state to use (articles, favorites, replies, following)
  const [flag, setFlag] = useState("");

  const search = useLocation().search;
  const breadcrumb = new URLSearchParams(search).get("breadcrumb");

  useEffect(() => {
    const asyncCall = async () => {
      setLoading(true);
      setFlag("articles");
      // get articles written by author
      await axios
        .get(
          `${domain}/api/articles/getArticlesByAuthor?authorId=${
            userId === user._id ? user._id : userId
          }`,
          {
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((response) => {
          setUsersArticles(response.data.reverse());
          setArticles(response.data);
        })
        .catch((error) => console.log(error));
      // get author info
      await axios
        .get(
          `${domain}/api/users/getUser?id=${
            userId === user._id ? user._id : userId
          }`,
          {
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((response) => setAuthor(response.data))
        .catch((error) => console.log(error));
      if (userId === user._id) {
        // get users favorite articles
        await axios
          .get(`${domain}/api/users/getUser?id=${user._id}`, {
            headers: { authorization: `Bearer ${user.accessToken}` },
          })
          .then((result) => {
            Promise.all(
              result.data.favorites.map((x) => {
                return axios.get(
                  `${domain}/api/articles/getArticle?articleId=${x}`,
                  { headers: { authorization: `Bearer ${user.accessToken}` } }
                );
              })
            )
              .then((response) => {
                setFavorites(response.reverse().map((x) => x.data));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));

        // get other users replies from articles written by user
        await axios
          .get(`${domain}/api/replies/getRepliesByAuthor`, {
            headers: { authorization: `Bearer ${user.accessToken}` },
          })
          .then((response) => {
            setReplies(response.data.reverse());
          })
          .catch((error) => console.log(error));
        // get following data of all following users
        Promise.all(
          user.following.map((x) => {
            return axios.get(`${domain}/api/users/getUser?id=${x.userId}`, {
              headers: { authorization: `Bearer ${user.accessToken}` },
            });
          })
        )
          .then((response) => {
            setFollowing(response.map((x) => x.data));
          })
          .catch((error) => console.log(error));
      }
      setLoading(false);
    };
    asyncCall();
  }, [userId]);

  const getData = (crumb) => {
    if (crumb === "articles") {
      setArticles(usersArticles);
      setFlag("articles");
    }
    if (crumb === "favorites") {
      setArticles(favorites);
      setFlag("favorites");
    }
    if (crumb === "notifications") {
      setArticles(replies);
      setFlag("notifications");
    }
    if (crumb === "following") {
      setArticles(following);
      setFlag("following");
    }
  };

  const followHandler = (userId) => {
    if (userId === user._id) {
      return;
    }

    try {
      if (isFollowing) {
        dispatch(unfollow(userId));
      } else {
        dispatch(follow(userId));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profilescreen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="profilescreen__placeholder">
            {author && (
              <h1>
                Welcome to {author.firstname} {author.lastname}'s Page
              </h1>
            )}
          </div>
          <main className="profilescreen--box-1">
            {author && (
              <div className="profilescreen--box-3">
                <FadeIn>
                  <AuthorProfile author={author} />
                </FadeIn>
              </div>
            )}
            {articles && !(articles.length > 0) && (
              <Wrapper
                author={author}
                userId={userId}
                user={user}
                getData={getData}
              >
                <div className="profilescreen--box-2">
                  <div>
                    <h2>No articles written by this author. </h2>
                  </div>
                </div>
              </Wrapper>
            )}
            {flag === "articles" && articles && articles.length > 0 && (
              <Wrapper
                author={author}
                userId={userId}
                user={user}
                getData={getData}
              >
                <ul>
                  {articles &&
                    articles.map((article, index) => (
                      <li key={index} className="profilescreen__item">
                        <ProfileArticleCard
                          article={article}
                          key={article._id}
                        />
                      </li>
                    ))}
                </ul>
              </Wrapper>
            )}
            {flag === "favorites" && articles && articles.length > 0 && (
              <Wrapper
                author={author}
                userId={userId}
                user={user}
                getData={getData}
              >
                <ul>
                  {articles &&
                    articles.map((article, index) => (
                      <li key={index} className="profilescreen__item">
                        <ProfileArticleCard article={article} />
                      </li>
                    ))}
                </ul>
              </Wrapper>
            )}
            {flag === "notifications" && articles && articles.length > 0 && (
              <Wrapper
                author={author}
                userId={userId}
                user={user}
                getData={getData}
              >
                <ul className="profilescreen--list-1">
                  {articles &&
                    articles.map((article, index) => (
                      <li key={index}>
                        <div className="profilescreen--box-4">
                          <div className="profilescreen--box-5">
                            <div className="profilescreen__avatar">
                              <Avatar
                                article={{
                                  avatar: article.avatar,
                                  author: article.author,
                                }}
                              />
                            </div>
                            {article && (
                              <Link to={`/profile/${article.userId}`}>
                                <div className="profilescreen__author">
                                  <p>{article.author}</p>
                                </div>
                              </Link>
                            )}
                          </div>
                          {article && (
                            <Link
                              to={`/article/${article.articleId}?open=true`}
                            >
                              <div className="profilescreen__content">
                                {parse(article.content)}
                              </div>
                            </Link>
                          )}
                          {article && (
                            <div className="profilescreen__date">
                              {formatDate(article.createdAt)}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </Wrapper>
            )}
            {flag === "following" && articles && articles.length > 0 && (
              <Wrapper
                author={author}
                userId={userId}
                user={user}
                getData={getData}
              >
                <ul>
                  {articles &&
                    articles.map((article) => (
                      <li className="profilescreen--box-7" key={article._id}>
                        <FollowingCard
                          article={article}
                          isFollowing={isFollowing}
                          followHandler={followHandler}
                        />
                      </li>
                    ))}
                </ul>
              </Wrapper>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
