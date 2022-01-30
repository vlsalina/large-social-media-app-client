import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
} from "../actionTypes/actionTypes";

const articlesReducer = (state = [], action) => {
  switch (action.type) {
    case ARTICLES_REQUEST:
      return [];
    case ARTICLES_SUCCESS:
      return action.payload.reverse();
    case ARTICLES_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export { articlesReducer };
