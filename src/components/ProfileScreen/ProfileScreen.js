import React, { useEffect, useState, useContext } from "react";
import "./ProfileScreen.css";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfileArticleCard from "../ProfileArticleCard.js/ProfileArticleCard";
import Loader from "../Loader/Loader";

const AuthorProfile = ({ author }) => {
  return (
    <aside className="authorprofile">
      <div className="authorprofile__avatar">
        <img src={`/assets/large-logo.png`} />
      </div>
      <div className="authorprofile__author">
        <p>
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div className="authorprofile__story">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </aside>
  );
};

const ProfileScreen = () => {
  const { userId } = useParams();
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);
  const [author, setAuthor] = useState();
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const asyncCall = async () => {
      setLoading(true);
      await axios
        .get(`${domain}/api/users/getUser?id=${userId}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        })
        .then((result) => {
          setAuthor(result.data);
          Promise.all(
            result.data.favorites.map((x) => {
              return axios.get(
                `${domain}/api/articles/getArticle?articleId=${x}`,
                { headers: { authorization: `Bearer ${user.accessToken}` } }
              );
            })
          )
            .then((response) =>
              setArticles(response.reverse().map((x) => x.data))
            )
            .catch((error) => console.log(error));
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };
    asyncCall();
  }, []);

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
                {author.firstname} {author.lastname}'s Profile Page
              </h1>
            )}
          </div>
          <main className="profilescreen--box-1">
            {author && <AuthorProfile author={author} />}
            {articles && !(articles.length > 0) && (
              <>
                <div className="profilescreen__heading">
                  {author && (
                    <h1>
                      {author.firstname} {author.lastname}'s Profile Page
                    </h1>
                  )}
                </div>
                <div className="profilescreen--box-2">
                  <div>
                    <h2>No articles written by this author. </h2>
                  </div>
                </div>
              </>
            )}
            {articles && articles.length > 0 && (
              <>
                <div className="profilescreen__heading">
                  {author && (
                    <h1>
                      {author.firstname} {author.lastname}'s Profile Page
                    </h1>
                  )}
                </div>
                {articles &&
                  articles.map((article) => (
                    <ProfileArticleCard article={article} key={article._id} />
                  ))}
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
