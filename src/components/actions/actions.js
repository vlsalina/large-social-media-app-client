import axios from "axios";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from "../actionTypes/actionTypes";
import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
} from "../actionTypes/actionTypes";

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
