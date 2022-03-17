import { articlesConstants, limit } from "../_constants/articles.constants";

let data = JSON.parse(localStorage.getItem("data"));
const initialState = data
  ? data
  : { loading: false, start: 0, articles: [], hasMore: true };

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    //    case articlesConstants.ARTICLES_REQUEST:
    //      return { loading: true, start: state.start, articles: state.articles };
    //    case articlesConstants.ARTICLES_SUCCESS:
    //      return { loading: false, start: state.start, articles: action.payload };
    //    case articlesConstants.ARTICLES_FAIL:
    //      return { loading: false, start: state.start, error: action.payload };

    case articlesConstants.ARTICLES_UPDATE_REQUEST:
      return {
        loading: false,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
      };
    case articlesConstants.ARTICLES_UPDATE_SUCCESS:
      return {
        loading: false,
        start: state.start,
        articles: action.payload,
        hasMore: state.hasMore,
      };
    case articlesConstants.ARTICLES_UPDATE_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        hasMore: state.hasMore,
      };

    case articlesConstants.CREATE_REQUEST:
      return {
        loading: true,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
      };
    case articlesConstants.CREATE_SUCCESS:
      return {
        loading: false,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
      };
    case articlesConstants.CREATE_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        hasMore: state.hasMore,
      };

    case articlesConstants.LOAD_REQUEST:
      return {
        loading: true,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
      };
    case articlesConstants.LOAD_SUCCESS:
      return {
        loading: false,
        start: state.start + limit - (limit - action.payload.length),
        articles: [...new Set(state.articles.concat(action.payload))],
        hasMore: action.payload.length !== 0 ? true : false,
      };
    case articlesConstants.LOAD_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        hasMore: state.hasMore,
      };

    case articlesConstants.CLEAR_REQUEST:
      return {
        loading: false,
        start: 0,
        articles: [],
        hasMore: state.hasMore,
      };

    default:
      return state;
  }
};

export { articlesReducer };
