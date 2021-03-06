import React from "react";
import "./LoginScreen.css";
import { networks } from "../../data/data";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const clickHandler = () => {
    let loginForm = document.getElementsByClassName("loginForm")[0];
    loginForm.style.display = "flex";
  };

  window.addEventListener("click", (e) => {
    let backdrop = document.getElementsByClassName("loginForm-backdrop")[0];
    let loginForm = document.getElementsByClassName("loginForm")[0];
    if (e.target === backdrop) {
      loginForm.style.display = "none";
    }
  });

  return (
    <div className="login">
      <LoginForm />
      <div className="login--box-1">
        <div className="login--box-2">
          <h1>Welcome back.</h1>
        </div>
        <ul>
          {networks.slice(0, 4).map((x) => (
            <li key={x.network}>
              <a
                href={x.url}
                target="_blank"
                rel="noreferrer"
                className="disabled"
              >
                <button type="button" className="login__button">
                  Sign in with {x.network}
                </button>
              </a>
            </li>
          ))}
          <li key={networks[4].network}>
            <button
              type="button"
              className="login__button"
              onClick={clickHandler}
            >
              Sign in with {networks[4].network}
            </button>
          </li>
        </ul>
        <div className="login--box-3">
          <p>
            No account?{" "}
            <Link className="create" to="/register">
              <b>Create One</b>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
