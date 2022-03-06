import { articlesConstants } from "../_constants/articles.constants";
import { articlesService } from "../_services/articles.service";
import { alertActions } from "./alert.actions";

const getAllArticles = () => {
  const request = () => {
    return { type: articlesConstants.ARTICLES_REQUEST };
  };

  const success = (articles) => {
    return { type: articlesConstants.ARTICLES_SUCCESS, articles };
  };

  const failure = (error) => {
    return { type: articlesConstants.ARTICLES_FAIL, error };
  };

  return (dispatch) => {
    dispatch(request());

    articlesService.getAllArticles().then(
      (articles) => {
        dispatch(success(articles.reverse()));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
};

export const articlesActions = {
  getAllArticles,
};
