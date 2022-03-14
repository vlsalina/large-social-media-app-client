import { articlesConstants, limit } from "../_constants/articles.constants";

let articles = JSON.parse(localStorage.getItem("articles"));
const initialState = articles
  ? { loading: false, start: 0, articles: articles }
  : { loading: false, start: 0, articles: [] };

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
      return { loading: false, start: state.start, articles: state.articles };
    case articlesConstants.LOAD_SUCCESS:
      return {
        loading: false,
        start: state.start + limit,
        articles: state.articles.concat(action.payload),
      };
    case articlesConstants.LOAD_FAIL:
      return { loading: false, start: state.start, error: action.payload };

    default:
      return state;
  }
};

export { articlesReducer };
