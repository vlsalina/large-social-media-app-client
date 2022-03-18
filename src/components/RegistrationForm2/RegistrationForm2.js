import React, { useState } from "react";
import "./RegistrationForm2.css";
import { useDispatch } from "react-redux";
import { userActions } from "../_actions/user.actions";
import ButtonA from "../buttons/ButtonB/ButtonB";
import { useSelector } from "react-redux";
import MessageBox from "../MessageBox/MessageBox";
import { closeDrawer } from "../_helpers/general.helpers";
import ButtonC from "../buttons/ButtonC/ButtonC";
import { toLogin } from "../_helpers/general.helpers";

// log in user
const RegistrationForm2 = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useSelector((state) => state.alert);

  return (
    <form className="form">
      <div className="form--box-1">
        <button
          type="button"
          className="form-close"
          onClick={() => closeDrawer()}
        >
          &times;
        </button>
      </div>
      {alert.message && <MessageBox message={alert.message} />}
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
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
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
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="form--spacer">
        <label htmlFor="register-email">Email</label>
        <br />
        <input
          type="email"
          id="register-email"
          name="register-email"
          className="form-input"
          placeholder="Type your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form--spacer">
        <label htmlFor="register-password">Password</label>
        <br />
        <input
          type="password"
          id="register-password"
          name="register-password"
          className="form-input"
          placeholder="Type your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form--spacer">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-input"
          placeholder="Confirm password..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <ButtonA
          text={"Sign Up"}
          action={() =>
            dispatch(
              userActions.register({
                userData: {
                  firstname,
                  lastname,
                  email,
                  password,
                  confirmPassword,
                },
                setFirstname,
                setLastname,
                setEmail,
                setPassword,
                setConfirmPassword,
              })
            )
          }
        />
      </div>
      <div className="form--box-2">
        <p>
          Already have an account? <ButtonC text={"Sign In"} action={toLogin} />
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm2;
