import React from "react";
import LoginForm2 from "../LoginForm2/LoginForm2";
import "./RegisterModal.css";

const RegisterModal = () => {
  return (
    <div className="register-modal">
      <div className="right-side">
        <div className="register-modal__right" />
        <div className="register-modal__right" />
        <div className="register-modal__right" />
        <div className="register-modal__right" />
        <div className="register-modal--box-2">
          <LoginForm2 />
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
