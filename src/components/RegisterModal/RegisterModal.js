import React from "react";
import RegistrationForm2 from "../RegistrationForm2/RegistrationForm2";
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
          <RegistrationForm2 />
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
