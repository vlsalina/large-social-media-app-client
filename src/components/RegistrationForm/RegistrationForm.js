import React, { useState, useContext } from "react";
import "./RegistrationForm.css";
import { Context } from "../../App";
import axios from "axios";

const RegistrationForm = () => {
  const { domain } = useContext(Context);

  const [error, setError] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registrationHandler = async () => {
    if (!firstname) {
      setError("firstname is required.");
      return;
    }

    if (!lastname) {
      setError("lastname is required.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!confirmPassword) {
      setError("Confirm Passowrd is required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userInfo = {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    };

    try {
      await axios
        .post(`${domain}/api/users/register`, userInfo)
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
          <button type="button" onClick={registrationHandler}>
            Submit
          </button>
        </div>
        <div>{error ? <div className="info-error">{error}</div> : <div />}</div>
      </form>
    </div>
  );
};

export default RegistrationForm;
