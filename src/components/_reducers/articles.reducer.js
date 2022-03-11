import { articlesConstants } from "../_constants/articles.constants";

let articles = JSON.parse(localStorage.getItem("articles"));
const initialState = articles ? { loading: false, articles: articles } : {};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case articlesConstants.ARTICLES_REQUEST:
      return { loading: true, articles: state.articles };
    case articlesConstants.ARTICLES_SUCCESS:
      return { loading: false, articles: action.payload };
    case articlesConstants.ARTICLES_FAILURE:
      return { loading: false, error: action.payload };

    case articlesConstants.ARTICLES_UPDATE_REQUEST:
      return { loading: false, articles: state.articles };
    case articlesConstants.ARTICLES_UPDATE_SUCCESS:
      return { loading: false, articles: action.payload };
    case articlesConstants.ARTICLES_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case articlesConstants.CREATE_REQUEST:
      return { loading: true, articles: state.articles };
    case articlesConstants.CREATE_SUCCESS:
      return { loading: false, articles: state.articles };
    case articlesConstants.CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { articlesReducer };
