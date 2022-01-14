import axios from "axios";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from "../actionTypes/actionTypes";

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
