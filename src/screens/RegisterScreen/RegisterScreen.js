import React, { useState } from "react";
import "./RegisterScreen.css";
import { networks } from "../../data/data";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const RegisterScreen = () => {
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
    <div className="login">
      {loading ? (
        <Loader />
      ) : (
        <>
          <RegistrationForm setLoading={setLoading} />
          <div className="login--box-1">
            <div className="login--box-2">
              <h1>Join Large.</h1>
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
                      Register with {x.network}
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
                  Register with {networks[4].network}
                </button>
              </li>
            </ul>
            <div className="login--box-3">
              <p>
                Already have an account?{" "}
                <Link className="create" to="/login">
                  <b>Sign In</b>
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterScreen;
