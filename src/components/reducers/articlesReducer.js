import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
} from "../actionTypes/actionTypes";

const articlesReducer = (state = [], action) => {
  switch (action.type) {
    case ARTICLES_REQUEST:
      return { loading: true };
    case ARTICLES_SUCCESS:
      return { loading: false, articles: action.payload };
    case ARTICLES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { articlesReducer };
