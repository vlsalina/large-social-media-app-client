import { userConstants } from "../_constants/user.constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? user : {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // for user login
    case userConstants.LOGIN_REQUEST:
      return state;
    case userConstants.LOGIN_SUCCESS:
      return action.payload;
    case userConstants.LOGIN_FAILURE:
      return { error: action.payload };

    // for user logout
    case userConstants.LOGOUT:
      return {};

    // for adding an author to user's following list
    case userConstants.FOLLOWING_REQUEST:
      return state;
    case userConstants.FOLLOWING_SUCCESS:
      return action.payload;
    case userConstants.FOLLOWING_FAIL:
      return action.payload;

    // for removing an author from user's following list
    case userConstants.UNFOLLOWING_REQUEST:
      return state;
    case userConstants.UNFOLLOWING_SUCCESS:
      return action.payload;
    case userConstants.UNFOLLOWING_FAIL:
      return action.payload;

    // for adding an article to user's favorites list
    case userConstants.FAVORITE_REQUEST:
      return state;
    case userConstants.FAVORITE_SUCCESS:
      return action.payload;
    case userConstants.FAVORITE_FAIL:
      return action.payload;

    // for removing an article from user's favorites list
    case userConstants.UNFAVORITE_REQUEST:
      return state;
    case userConstants.UNFAVORITE_SUCCESS:
      return action.payload;
    case userConstants.UNFAVORITE_FAIL:
      return action.payload;

    default:
      return state;
  }
};

export { userReducer };
