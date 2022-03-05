import axios from "axios";
import { authHeader } from "../_helpers/auth-header";

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
  return handleResponse(response);
};

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
};
