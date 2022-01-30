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
} from "../actionTypes/actionTypes";
import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
} from "../actionTypes/actionTypes";
const domain = "http://localhost:5000";

// user sign in action
export const signin = (domain, email, password) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
      const { data } = await axios.post(`${domain}/api/auth/login`, {
        email: email,
        password: password,
      });
      result = data;
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("user", JSON.stringify(getState().user));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    return result;
  };
};

// retrieve all articles action
export const getAllArticles = (domain, accessToken) => {
  return async (dispatch, getState) => {
    let result;
    dispatch({ type: ARTICLES_REQUEST });
    try {
      const { data } = await axios.get(
        `${domain}/api/articles/getAllArticles`,
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
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
      const { data } = await axios.patch(
        `${domain}/api/users/follow`,
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
      const { data } = await axios.patch(
        `${domain}/api/users/unfollow`,
        { userId: authorId },
        { headers: { authorization: `Bearer ${getState().user.accessToken}` } }
      );

      let user = getState().user;
      let updatedUser = user.following.filter((x) => x.userId !== authorId);
      user.following = updatedUser;

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
