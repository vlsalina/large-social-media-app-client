import React, { useState } from "react";
import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { signin } from "../actions/actions";
import { useNavigate } from "react-router-dom";
import MiniLoader from "../MiniLoader/MiniLoader";

// log in user
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    dispatch(signin(email, password))
      .then((result) => {
        if (result) {
          setLoading(false);
          setError("");
          setEmail("");
          setPassword("");
          navigate("/");
        } else {
          setLoading(false);
          setError("Incorrect email or password. Please try again.");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginForm">
      <div className="loginForm-backdrop" />
      <form className="loginForm-form">
        <div className="loginForm-formdata">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="loginForm-formdata">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="loginForm-submit-button">
          <button type="button" onClick={loginHandler}>
            {loading ? <MiniLoader /> : "Submit"}
          </button>
        </div>
        <div>{error ? <div className="info-error">{error}</div> : <div />}</div>
      </form>
    </div>
  );
};

export default LoginForm;
