import { articlesConstants, limit } from "../_constants/articles.constants";

let data = JSON.parse(localStorage.getItem("articles"));
const initialState = data
  ? { loading: false, start: 0, articles: data.articles, len: data.len }
  : { loading: false, start: 0, articles: [], len: 0 };

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case articlesConstants.ARTICLES_REQUEST:
      return { loading: true, start: state.start, articles: state.articles };
    case articlesConstants.ARTICLES_SUCCESS:
      return { loading: false, start: state.start, articles: action.payload };
    case articlesConstants.ARTICLES_FAIL:
      return { loading: false, start: state.start, error: action.payload };

    case articlesConstants.ARTICLES_UPDATE_REQUEST:
      return { loading: false, start: state.start, articles: state.articles };
    case articlesConstants.ARTICLES_UPDATE_SUCCESS:
      return { loading: false, start: state.start, articles: action.payload };
    case articlesConstants.ARTICLES_UPDATE_FAIL:
      return { loading: false, start: state.start, error: action.payload };

    case articlesConstants.CREATE_REQUEST:
      return { loading: true, start: state.start, articles: state.articles };
    case articlesConstants.CREATE_SUCCESS:
      return { loading: false, start: state.start, articles: state.articles };
    case articlesConstants.CREATE_FAIL:
      return { loading: false, start: state.start, error: action.payload };

    case articlesConstants.LOAD_REQUEST:
      return {
        loading: true,
        start: state.start,
        articles: state.articles,
        len: state.len,
      };
    case articlesConstants.LOAD_SUCCESS:
      return {
        loading: false,
        start: state.start + limit,
        articles: [...new Set(state.articles.concat(action.payload.articles))],
        len: action.payload.len,
      };
    case articlesConstants.LOAD_FAIL:
      return {
        loading: false,
        start: state.start,
        error: action.payload,
        len: state.len,
      };

    case articlesConstants.CLEAR_REQUEST:
      return {
        loading: false,
        start: 0,
        articles: [],
        len: 0,
      };

    default:
      return state;
  }
};

export { articlesReducer };
