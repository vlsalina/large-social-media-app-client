import React, { useState, useContext } from "react";
import "./LoginForm.css";
import { Context } from "../../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../actions/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// log in user
const LoginForm = () => {
  const { domain } = useContext(Context);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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

    let promise = dispatch(signin(domain, email, password));

    promise
      .then((result) => {
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => console.log(error));
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
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="loginForm-submit-button">
          <button type="button" onClick={loginHandler}>
            Submit
          </button>
        </div>
        <div>{error ? <div className="info-error">{error}</div> : <div />}</div>
      </form>
    </div>
  );
};

export default LoginForm;
