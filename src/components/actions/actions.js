import axios from "axios";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_SUCCESS,
  USER_FOLLOWING_FAIL,
  USER_UNFOLLOWING_REQUEST,
  USER_UNFOLLOWING_SUCCESS,
  USER_UNFOLLOWING_FAIL,
  USER_FAVORITE_REQUEST,
  USER_FAVORITE_SUCCESS,
  USER_FAVORITE_FAIL,
  USER_UNFAVORITE_REQUEST,
  USER_UNFAVORITE_SUCCESS,
  USER_UNFAVORITE_FAIL,
  ARTICLES_LIKE_REQUEST,
  ARTICLES_LIKE_SUCCESS,
  ARTICLES_LIKE_FAIL,
  ARTICLES_DISLIKE_REQUEST,
  ARTICLES_DISLIKE_SUCCESS,
  ARTICLES_DISLIKE_FAIL,
} from "../actionTypes/actionTypes";
import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
} from "../actionTypes/actionTypes";

// user sign in action
export const signin = (email, password) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/api/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      result = true;
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("user", JSON.stringify(getState().user));
    } catch (error) {
      result = false;
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: error,
      });
    }
    return result;
  };
};

// retrieve all articles action
export const getAllArticles = () => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: ARTICLES_REQUEST });
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/articles/getAllArticles`
      );
      result = data;
      dispatch({ type: ARTICLES_SUCCESS, payload: data });
      localStorage.setItem("articles", JSON.stringify(getState().articles));
    } catch (error) {
      dispatch({
        type: ARTICLES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// follow author action
export const follow = (authorId) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: USER_FOLLOWING_REQUEST });
    try {
      await axios.patch(
        `${process.env.REACT_APP_DOMAIN}/api/users/follow`,
        { userId: authorId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let user = getState().user;

      // check if author is already in user's following list
      let exists = user.following.find((x) => x.userId === authorId);
      if (!exists) {
        user.following.push({ userId: authorId });
      } else {
        return;
      }

      result = user;

      dispatch({ type: USER_FOLLOWING_SUCCESS, payload: user });
      localStorage.setItem("user", JSON.stringify(getState().user));
    } catch (error) {
      dispatch({
        type: USER_FOLLOWING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// unfollow author action
export const unfollow = (authorId) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: USER_UNFOLLOWING_REQUEST });
    try {
      await axios.patch(
        `${process.env.REACT_APP_DOMAIN}/api/users/unfollow`,
        { userId: authorId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let user = getState().user;
      let updatedFollowing = user.following.filter(
        (x) => x.userId !== authorId
      );
      user.following = updatedFollowing;

      result = user;

      dispatch({ type: USER_UNFOLLOWING_SUCCESS, payload: user });
      localStorage.setItem("user", JSON.stringify(getState().user));
    } catch (error) {
      dispatch({
        type: USER_UNFOLLOWING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// favorite action
export const favorite = (articleId) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: USER_FAVORITE_REQUEST });
    try {
      await axios.patch(
        `${process.env.REACT_APP_DOMAIN}/api/users/favorite`,
        { articleId: articleId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let user = getState().user;

      // check if article is already in user's favorites
      let exists = user.favorites.find((x) => x.articleId === articleId);
      if (!exists) {
        user.favorites.push({ articleId: articleId });
      } else {
        return;
      }

      result = user;

      dispatch({ type: USER_FAVORITE_SUCCESS, payload: user });
      localStorage.setItem("user", JSON.stringify(getState().user));
    } catch (error) {
      dispatch({
        type: USER_FAVORITE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// unfavorite action
export const unfavorite = (articleId) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: USER_UNFAVORITE_REQUEST });
    try {
      await axios.patch(
        `${process.env.REACT_APP_DOMAIN}/api/users/unfavorite`,
        { articleId: articleId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let user = getState().user;

      let updatedFavorites = user.favorites.filter(
        (x) => x.articleId !== articleId
      );
      user.favorites = updatedFavorites;

      result = user;

      dispatch({ type: USER_UNFAVORITE_SUCCESS, payload: user });
      localStorage.setItem("user", JSON.stringify(getState().user));
    } catch (error) {
      dispatch({
        type: USER_UNFAVORITE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// like action
export const like = (articleId) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: ARTICLES_LIKE_REQUEST });
    try {
      await axios.patch(
        `${process.env.REACT_APP_DOMAIN}/api/articles/likeArticle`,
        { articleId: articleId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let articles = getState().articles;
      let user = getState().user;

      // get index of liked article
      let index = articles.findIndex((x) => x._id === articleId);

      // check if user has already liked article
      let exists = articles[index].likes.find((x) => x.userId === user._id);
      if (exists) {
        return;
      }

      // add user to likes array of article
      articles[index].likes.push({ userId: user._id });

      result = articles;

      dispatch({ type: ARTICLES_LIKE_SUCCESS, payload: articles });
      localStorage.setItem("articles", JSON.stringify(getState().articles));
    } catch (error) {
      dispatch({
        type: ARTICLES_LIKE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// dislike action
export const dislike = (articleId) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: ARTICLES_DISLIKE_REQUEST });
    try {
      await axios.patch(
        `${process.env.REACT_APP_DOMAIN}/api/articles/dislikeArticle`,
        { articleId: articleId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let articles = getState().articles;
      let user = getState().user;

      // get index of liked article
      let index = articles.findIndex((x) => x._id === articleId);

      // remove user from article's likes array
      let updatedLikes = articles[index].likes.filter(
        (x) => x.userId !== user._id
      );
      articles[index].likes = updatedLikes;

      result = articles;

      dispatch({ type: ARTICLES_DISLIKE_SUCCESS, payload: articles });
      localStorage.setItem("articles", JSON.stringify(getState().articles));
    } catch (error) {
      dispatch({
        type: ARTICLES_DISLIKE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};
