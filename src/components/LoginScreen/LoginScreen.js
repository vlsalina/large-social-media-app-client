import React, { useState } from "react";
import "./LoginScreen.css";
import { networks } from "../../data/data";
import axios from "axios";
import LoginForm from "../LoginForm/LoginForm";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

const LoginScreen = () => {
  //const user = useSelector((state) => state.user);
  //const { loading } = user;
  const [loading, setLoading] = useState(false);

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
    <div className="loginScreen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <LoginForm setLoading={setLoading} />
          <div className="loginScreen-wrapper">
            <div className="loginScreen-wrapper-header">
              <h1>Welcome back.</h1>
            </div>
            <ul>
              {networks.slice(0, 4).map((x) => (
                <li key={x.network}>
                  <a href={x.url} target="_blank">
                    <button type="button" className="loginScreen-media-button">
                      Sign in with {x.network}
                    </button>
                  </a>
                </li>
              ))}
              <li key={networks[4].network}>
                <button
                  type="button"
                  className="loginScreen-media-button"
                  onClick={clickHandler}
                >
                  Sign in with {networks[4].network}
                </button>
              </li>
            </ul>
            <div className="loginScreen-toRegister">
              <p>
                No account?{" "}
                <Link className="toRegister-red" to="/register">
                  <b>Create One</b>
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginScreen;
