import React, { useState } from "react";
import "./RegistrationForm2.css";
import { reverse } from "../../utils";
import ButtonA from "../buttons/ButtonB/ButtonB";

// log in user
const RegistrationForm2 = () => {
  return (
    <form className="form">
      <div>
        <h2>Sign Up</h2>
      </div>
      <div className="form--spacer">
        <label htmlFor="firstname">First Name</label>
        <br />
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="form-input"
          placeholder="Type your first name..."
        />
      </div>
      <div className="form--spacer">
        <label htmlFor="lastname">Last Name</label>
        <br />
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="form-input"
          placeholder="Type your last name..."
        />
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
      <div className="form--spacer">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <br />
        <input
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          className="form-input"
          placeholder="Confirm password..."
        />
      </div>
      <div>
        <ButtonA text={"Sign Up"} action={reverse} />
      </div>
    </form>
  );
};

export default RegistrationForm2;
