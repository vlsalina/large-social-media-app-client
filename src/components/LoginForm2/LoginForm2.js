import React, { useState } from "react";
import "./LoginForm2.css";
import { reverse } from "../../utils";

// log in user
const LoginForm2 = () => {
  return (
    <form className="form">
      <div>
        <h2>Login</h2>
      </div>
      <div className="form--spacer">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="Type your email..."
        />
      </div>
      <div className="form--spacer">
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          placeholder="Type your password..."
        />
      </div>
      <div>
        <button type="button" onClick={reverse}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm2;
