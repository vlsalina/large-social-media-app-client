import React from "react";
import LoginForm2 from "../LoginForm2/LoginForm2";
import "./LoginModal.css";

const LoginModal = () => {
  return (
    <div className="login-modal">
      <div className="left-side">
        <div className="login-modal__left" />
        <div className="login-modal__left" />
        <div className="login-modal__left" />
        <div className="login-modal__left" />
        <div className="login-modal--box-1">
          <LoginForm2 />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
