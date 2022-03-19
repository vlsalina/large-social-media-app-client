import React from "react";
import "./ProfileScreen.css";
import Header from "../../components/Header/Header";
import ProfileArticleCard from "../../components/ProfileArticleCard/ProfileArticleCard";
import Loader from "../../components/Loader/Loader";
import { breadcrumbs } from "../../data/data";
import AuthorProfile from "../../components/AuthorProfile/AuthorProfile";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../components/actions/actions";
import FollowingCard from "../../components/FollowingCard/FollowingCard";
import NotificationsCard from "../../components/NotificationsCard/NotificationsCard";
import ButtonD from "../../components/buttons/ButtonD/ButtonD";
import useGetProfileData from "../../components/_hooks/useGetProfileData";
import Metadata from "../../components/Metadata/Metadata";

const FadeIn = ({ children }) => {
  const [isVisib, setIsVisib] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsVisib(true);
    }, 100);
  }, []);

  return <div className={`fadein ${isVisib ? "isVisib" : ""}`}>{children}</div>;
};

const Nav = ({ getData, flag }) => {
  return (
    <div className="profilescreen--box-4">
      <ul className="breadcrumbs">
        {breadcrumbs.map((crumb) => (
          <li key={crumb}>
            <ButtonD crumb={crumb} action={() => getData(crumb)} flag={flag} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Wrapper = ({ children, author, userId, user, getData, flag }) => {
  return (
    <>
      <div className="profilescreen__heading">
        {author && (
          <h1>
            Welcome to {author.firstname} {author.lastname}'s Page
          </h1>
        )}
      </div>
      {userId === user._id && <Nav getData={getData} flag={flag} />}
      {children}
    </>
  );
};

const ProfileScreen = () => {
  const dispatch = useDispatch();

  let {
    userId,
    user,
    author,
    loading,
    isFollowing,
    setIsFollowing,
    flag,
    setFlag,
    usersArticles,
    favorites,
    replies,
    following,
    articles,
    setArticles,
  } = useGetProfileData();

  const getData = (crumb) => {
    if (crumb === "articles") {
      setFlag("articles");
      setArticles(usersArticles);
    } else if (crumb === "favorites") {
      setFlag("favorites");
      setArticles(favorites);
    } else if (crumb === "notifications") {
      setFlag("notifications");
      setArticles(replies);
    } else {
      setFlag("following");
      setArticles(following);
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
          {author && (
            <Metadata
              title={`${author.firstname} ${author.lastname}\'s Profile Page`}
              description={`${author.firstname} ${author.lastname}\'s Profile Page`}
            />
          )}
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
                flag={flag}
              >
                <div className="profilescreen--box-2">
                  <div>
                    {flag === "articles" && (
                      <h2 className="profilescreen--text-align">
                        No articles written.
                      </h2>
                    )}
                    {flag === "favorites" && (
                      <h2 className="profilescreen--text-align">
                        No articles bookmarked.
                      </h2>
                    )}
                    {flag === "notifications" && (
                      <h2 className="profilescreen--text-align">
                        No replies to any of your articles.
                      </h2>
                    )}
                    {flag === "following" && (
                      <h2 className="profilescreen--text-align">
                        No authors being followed.
                      </h2>
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
                flag={flag}
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
                flag={flag}
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
                flag={flag}
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
                flag={flag}
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
