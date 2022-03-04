import React from "react";
import "./ButtonC.css";

const ButtonC = ({ text, action }) => {
  return (
    <button type="button" className="buttonC" onClick={action}>
      {text}
    </button>
  );
};

export default ButtonC;
