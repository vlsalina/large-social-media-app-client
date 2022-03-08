import { articlesConstants } from "../_constants/articles.constants";
import { general } from "../_constants/general.constants";

const update = (articleId, getState, type) => {
  const { articles } = getState().articles;
  const user = getState().user;

  // get index of liked article
  let index = articles.findIndex((x) => x._id === articleId);

  if (type === general.LIKE) {
    // check if user has already liked article
    let exists = articles[index].likes.find((x) => x.userId === user._id);
    if (exists) {
      return;
    }

    // add user to likes array of article
    articles[index].likes.push({ userId: user._id });

    // save new articles array to local storage
    localStorage.setItem("articles", JSON.stringify(articles));

    return articles;
  }

  if (type === general.UNLIKE) {
    // remove user from article's likes array
    let update = articles[index].likes.filter((x) => x.userId !== user._id);
    articles[index].likes = update;

    // save new articles array to local storage
    localStorage.setItem("articles", JSON.stringify(articles));

    return articles;
  }
};

export const articlesHelpers = {
  update,
};
