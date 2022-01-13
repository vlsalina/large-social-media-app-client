import React, { useState, useContext } from "react";
import "./LoginForm.css";
import { Context } from "../../App";
import axios from "axios";

const userId = "1f0cd2d4-eabd-467c-9da3-c66ed658c9af";

const LoginForm = () => {
  const { domain } = useContext(Context);

  const [error, setError] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      await axios
        .post(`${domain}/api/auth/login`, { email: email, password: password })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginForm">
      <div className="loginForm-backdrop" />
      <form className="loginForm-form">
        <div className="loginForm-formdata">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="loginForm-formdata">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
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
        <div className="loginForm-formdata">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="loginForm-submit-button">
          <button type="button" onClick={loginHandler}>
            Submit
          </button>
        </div>
        <div>{error ? <p>{error}</p> : <div />}</div>
      </form>
    </div>
  );
};

export default LoginForm;
