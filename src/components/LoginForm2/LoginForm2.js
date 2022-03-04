import React, { useState } from "react";
import "./LoginForm2.css";
import { loginReverse, reverse } from "../../utils";
import ButtonB from "../buttons/ButtonB/ButtonB";

// log in user
const LoginForm2 = () => {
  return (
    <form className="form">
      <div className="form--box-1">
        <button type="button" className="form-close" onClick={loginReverse}>
          &times;
        </button>
      </div>
      <div>
        <h2>Login</h2>
      </div>
      <div className="form--spacer">
        <label htmlFor="login-email">Email</label>
        <br />
        <input
          type="email"
          id="login-email"
          name="login-email"
          className="form-input"
          placeholder="Type your email..."
        />
      </div>
      <div className="form--spacer">
        <label htmlFor="login-password">Password</label>
        <br />
        <input
          type="password"
          id="login-password"
          name="login-password"
          className="form-input"
          placeholder="Type your password..."
        />
      </div>
      <div>
        <ButtonB text={"Login"} action={reverse} />
      </div>
    </form>
  );
};

export default LoginForm2;
