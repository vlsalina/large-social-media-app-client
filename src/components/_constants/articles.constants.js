/* for article actions */
export const articlesConstants = {
  ARTICLES_REQUEST: "ARTICLES_REQUEST",
  ARTICLES_SUCCESS: "ARTICLES_SUCCESS",
  ARTICLES_FAIL: "ARTICLES_FAIL",

  // for articles update
  ARTICLES_UPDATE_REQUEST: "ARTICLES_UPDATE_REQUEST",
  ARTICLES_UPDATE_SUCCESS: "ARTICLES_UPDATE_SUCCESS",
  ARTICLES_UPDATE_FAIL: "ARTICLES_UPDATE_FAIL",

  // for like article action
  LIKE_REQUEST: "LIKE_REQUEST",
  LIKE_SUCCESS: "LIKE_SUCCESS",
  LIKE_FAIL: "LIKE_FAIL",

  // for dislike article action
  UNLIKE_REQUEST: "UNLIKE_REQUEST",
  UNLIKE_SUCCESS: "UNLIKE_SUCCESS",
  UNLIKE_FAIL: "UNLIKE_FAIL",

  // for creating new article
  CREATE_REQUEST: "CREATE_REQUEST",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_FAIL: "CREATE_FAIL",

  // for loading articles
  LOAD_REQUEST: "LOAD_REQUEST",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_FAIL: "LOAD_FAIL",

  // for clearing articles state
  CLEAR_REQUEST: "CLEAR_REQUEST",
};

export const limit = 3;
