import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from "../actionTypes/actionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {};
    case USER_SIGNIN_SUCCESS:
      return action.payload;
    case USER_SIGNIN_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export { userReducer };
