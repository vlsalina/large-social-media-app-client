import React, { useState } from "react";
import "./LoginForm2.css";
import ButtonB from "../buttons/ButtonB/ButtonB";
import { userActions } from "../_actions/user.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MessageBox from "../MessageBox/MessageBox";
import { closeDrawer } from "../_helpers/general.helpers";
import ButtonC from "../buttons/ButtonC/ButtonC";
import { toRegister } from "../_helpers/general.helpers";

// log in user
const LoginForm2 = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <ButtonB
          text={"Login"}
          action={() =>
            dispatch(userActions.login(email, password, setEmail, setPassword))
          }
        />
      </div>
      <div className="form--box-2">
        <p>
          Don't have an account?{" "}
          <ButtonC text={"Create One"} action={toRegister} />
        </p>
      </div>
    </form>
  );
};

export default LoginForm2;
