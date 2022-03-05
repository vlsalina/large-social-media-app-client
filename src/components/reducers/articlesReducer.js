import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
  ARTICLES_LIKE_REQUEST,
  ARTICLES_LIKE_SUCCESS,
  ARTICLES_LIKE_FAIL,
  ARTICLES_DISLIKE_REQUEST,
  ARTICLES_DISLIKE_SUCCESS,
  ARTICLES_DISLIKE_FAIL,
} from "../actionTypes/actionTypes";

let articles = JSON.parse(localStorage.getItem("articles"));
const initialState = articles ? articles : [];

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_REQUEST:
      return [];
    case ARTICLES_SUCCESS:
      return action.payload.reverse();
    case ARTICLES_FAIL:
      return { error: action.payload };
    case ARTICLES_LIKE_REQUEST:
      return state;
    case ARTICLES_LIKE_SUCCESS:
      return action.payload;
    case ARTICLES_LIKE_FAIL:
      return { error: action.payload };
    case ARTICLES_DISLIKE_REQUEST:
      return state;
    case ARTICLES_DISLIKE_SUCCESS:
      return action.payload;
    case ARTICLES_DISLIKE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export { articlesReducer };
