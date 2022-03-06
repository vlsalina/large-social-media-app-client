import { articlesConstants } from "../_constants/articles.constants";

let articles = JSON.parse(localStorage.getItem("articles"));
const initialState = articles ? articles : [];

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case articlesConstants.ARTICLES_REQUEST:
      return { loading: true };
    case articlesConstants.ARTICLES_SUCCESS:
      return { loading: false, articles: action.articles };
    case articlesConstants.ARTICLES_FAILURE:
      return {};
    default:
      return state;
  }
};

export { articlesReducer };
