import { authHeader } from "./auth-header";

const getAllReplies = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/replies/getAllReplies?articleId=${id}`,
    requestOptions
  );

  const replies = await handleResponse(response);

  return replies;
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

export const repliesHelpers = {
  getAllReplies,
};
