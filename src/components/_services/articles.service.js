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
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("articles", JSON.stringify(articles));

  return articles;
};

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
