import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const useGetProfileData = () => {
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

  // get breadcrumb
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

  return {
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
  };
};

export default useGetProfileData;
