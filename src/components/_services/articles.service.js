import { limit } from "../_constants/articles.constants";

/* GET all articles */
const getAllArticles = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/articles/getAllArticles`,
    requestOptions
  );
  const articles = await handleResponse(response);
  // store article details in local storage
  localStorage.setItem("articles", JSON.stringify(articles));

  return articles;
};

// for like request
const like = async (articleId) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      /* prettier-ignore */ "authorization": `Bearer ${
        JSON.parse(localStorage.getItem("user")).accessToken
      }`,
    },
    body: JSON.stringify({ articleId }),
  };

  await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/articles/likeArticle`,
    requestOptions
  );
};

// for unlike request
const unlike = async (articleId) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      /* prettier-ignore */ "authorization": `Bearer ${
        JSON.parse(localStorage.getItem("user")).accessToken
      }`,
    },
    body: JSON.stringify({ articleId }),
  };

  await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/articles/unlikeArticle`,
    requestOptions
  );
};

// for create article request
const create = async (newArticle) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      /* prettier-ignore */ "authorization": `Bearer ${
        JSON.parse(localStorage.getItem("user")).accessToken
      }`,
    },
    body: JSON.stringify(newArticle),
  };

  await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/articles/createArticle`,
    requestOptions
  );
};

// for loading articles request
const load = async (data) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/articles/loadArticles?start=${data.start}&category=${data.category}&limit=${limit}`,
    requestOptions
  );

  let result = await handleResponse(response);

  return result;
};

/* response handler */
const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const articlesService = {
  getAllArticles,
  like,
  unlike,
  create,
  load,
};
