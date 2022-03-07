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
};