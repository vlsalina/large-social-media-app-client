import React, { useEffect, useState } from "react";
import "./ProfileScreen.css";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfileArticleCard from "../../components/ProfileArticleCard.js/ProfileArticleCard";
import Loader from "../../components/Loader/Loader";
import { useLocation } from "react-router-dom";
import { breadcrumbs } from "../../data/data";
import AuthorProfile from "../../components/AuthorProfile/AuthorProfile";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../components/actions/actions";
import FollowingCard from "../../components/FollowingCard/FollowingCard";
import NotificationsCard from "../../components/NotificationsCard/NotificationsCard";

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
      setFlag(breadcrumb);
      // get articles written by author
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN
          }/api/articles/getArticlesByAuthor?authorId=${
            userId === user._id ? user._id : userId
          }`
        )
        .then((response) => {
          setUsersArticles(response.data.reverse());
          if (breadcrumb === "articles") {
            setArticles(response.data);
          }
        })
        .catch((error) => console.log(error));
      // get author info
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN}/api/users/getUser?id=${
            userId === user._id ? user._id : userId
          }`
        )
        .then((response) => setAuthor(response.data))
        .catch((error) => console.log(error));
      if (userId === user._id) {
        // get users favorite articles
        await axios
          .get(
            `${process.env.REACT_APP_DOMAIN}/api/users/getUser?id=${user._id}`
          )
          .then((result) => {
            Promise.all(
              result.data.favorites.map((x) => {
                return axios.get(
                  `${process.env.REACT_APP_DOMAIN}/api/articles/getArticle?articleId=${x}`
                );
              })
            )
              .then((response) => {
                setFavorites(response.reverse().map((x) => x.data));
                if (breadcrumb === "favorites") {
                  setArticles(response.map((x) => x.data));
                }
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
        // get other users replies from articles written by user
        await axios
          .get(
            `${process.env.REACT_APP_DOMAIN}/api/replies/getRepliesByAuthor`,
            {
              headers: { authorization: `Bearer ${user.accessToken}` },
            }
          )
          .then((response) => {
            setReplies(response.data.reverse());
            if (breadcrumb === "notifications") {
              setArticles(response.data);
            }
          })
          .catch((error) => console.log(error));
        // get following data of all following users
        Promise.all(
          user.following.map((x) => {
            return axios.get(
              `${process.env.REACT_APP_DOMAIN}/api/users/getUser?id=${x.userId}`
            );
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
  }, [
    userId,
    breadcrumb,
    process.env.REACT_APP_DOMAIN,
    user._id,
    user.accessToken,
    user.following,
  ]);

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
                    {flag === "articles" && <h2>No articles written.</h2>}
                    {flag === "favorites" && <h2>No articles bookmarked.</h2>}
                    {flag === "notifications" && (
                      <h2>No replies to any of your articles.</h2>
                    )}
                    {flag === "following" && (
                      <h2>No authors being followed.</h2>
                    )}
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
                        <ProfileArticleCard article={article} />
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
                        <NotificationsCard article={article} />
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
