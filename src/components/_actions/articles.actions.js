import { articlesConstants } from "../_constants/articles.constants";
import { articlesService } from "../_services/articles.service";
import { articlesHelpers } from "../_helpers/articles.helper";
import { general } from "../_constants/general.constants";
import { alertActions } from "./alert.actions";

const getAllArticles = () => {
  const request = () => {
    return { type: articlesConstants.ARTICLES_REQUEST };
  };

  const success = (articles) => {
    return { type: articlesConstants.ARTICLES_SUCCESS, payload: articles };
  };

  const failure = (error) => {
    return { type: articlesConstants.ARTICLES_FAIL, payload: error };
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

// like action
const like = (articleId) => {
  function request() {
    return { type: articlesConstants.ARTICLES_UPDATE_REQUEST };
  }
  function success(update) {
    return { type: articlesConstants.ARTICLES_UPDATE_SUCCESS, payload: update };
  }
  function failure(error) {
    return { type: articlesConstants.ARTICLES_UPDATE_FAIL, payload: error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    articlesService.like(articleId).then(
      () => {
        let update = articlesHelpers.update(articleId, getState, general.LIKE);
        dispatch(success(update));
        dispatch(alertActions.success("Like request successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

// unlike action
const unlike = (articleId) => {
  function request() {
    return { type: articlesConstants.ARTICLES_UPDATE_REQUEST };
  }
  function success(update) {
    return { type: articlesConstants.ARTICLES_UPDATE_SUCCESS, payload: update };
  }
  function failure(error) {
    return { type: articlesConstants.ARTICLES_UPDATE_FAIL, payload: error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    articlesService.unlike(articleId).then(
      () => {
        let update = articlesHelpers.update(
          articleId,
          getState,
          general.UNLIKE
        );
        dispatch(success(update));
        dispatch(alertActions.success("Unlike request successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

export const articlesActions = {
  getAllArticles,
  like,
  unlike,
};
