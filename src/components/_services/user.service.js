import axios from "axios";
import { authHeader } from "../_helpers/auth-header";

// for user login
const login = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/auth/login`,
    requestOptions
  );
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

// for user logout
const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
};

const getById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/users/${id}`,
    requestOptions
  );
  const user = await handleResponse(response);

  return user;
};

// for new user registration
const register = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/users/register`,
    requestOptions
  );
  return handleResponse(response);
};

// for user follow request
const follow = async (userId) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
/* prettier-ignore */      "authorization": `Bearer ${
        JSON.parse(localStorage.getItem("user")).accessToken
      }`,
    },
    body: JSON.stringify({ userId }),
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/users/follow`,
    requestOptions
  );

  const update = await handleResponse(response);

  return update;
};

// for user unfollow request
const unfollow = async (userId) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
/* prettier-ignore */      "authorization": `Bearer ${
        JSON.parse(localStorage.getItem("user")).accessToken
      }`,
    },
    body: JSON.stringify({ userId }),
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/users/unfollow`,
    requestOptions
  );

  const update = await handleResponse(response);

  return update;
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const userService = {
  login,
  logout,
  register,
  getById,
  follow,
  unfollow,
};
