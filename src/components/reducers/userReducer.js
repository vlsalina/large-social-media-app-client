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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {};
    case USER_SIGNIN_SUCCESS:
      return action.payload;
    case USER_SIGNIN_FAIL:
      return { error: action.payload };
    case USER_FOLLOWING_REQUEST:
      return state;
    case USER_FOLLOWING_SUCCESS:
      return action.payload;
    case USER_FOLLOWING_FAIL:
      return { error: action.payload };
    case USER_UNFOLLOWING_REQUEST:
      return state;
    case USER_UNFOLLOWING_SUCCESS:
      return action.payload;
    case USER_UNFOLLOWING_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export { userReducer };
