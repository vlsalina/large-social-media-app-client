import { articlesConstants, limit } from "../_constants/articles.constants";

let data = JSON.parse(localStorage.getItem("data"));
const initialState = data
  ? data
  : { loading: false, start: 0, articles: [], hasMore: true, total: 0 };

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case articlesConstants.ARTICLES_UPDATE_REQUEST:
      return {
        loading: false,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
        total: state.total,
      };
    case articlesConstants.ARTICLES_UPDATE_SUCCESS:
      return {
        loading: false,
        start: state.start,
        articles: action.payload,
        hasMore: state.hasMore,
        total: state.total,
      };
    case articlesConstants.ARTICLES_UPDATE_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        hasMore: state.hasMore,
        total: state.total,
      };

    case articlesConstants.CREATE_REQUEST:
      return {
        loading: true,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
        total: state.total,
      };
    case articlesConstants.CREATE_SUCCESS:
      return {
        loading: false,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
        total: state.total,
      };
    case articlesConstants.CREATE_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        hasMore: state.hasMore,
        total: state.total,
      };

    case articlesConstants.LOAD_REQUEST:
      return {
        loading: true,
        start: state.start,
        articles: state.articles,
        hasMore: state.hasMore,
        total: state.total,
      };
    case articlesConstants.LOAD_SUCCESS:
      return {
        loading: false,
        start: state.start + limit - (limit - action.payload.articles.length),
        articles: [...new Set(state.articles.concat(action.payload.articles))],
        hasMore: action.payload.articles.length !== 0 ? true : false,
        total: action.payload.total,
      };
    case articlesConstants.LOAD_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        hasMore: state.hasMore,
        total: state.total,
      };

    case articlesConstants.CLEAR_REQUEST:
      return {
        loading: false,
        start: 0,
        articles: [],
        hasMore: state.hasMore,
        total: state.total,
      };

    default:
      return state;
  }
};

export { articlesReducer };
