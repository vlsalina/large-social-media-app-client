import React from "react";
import "./ButtonB.css";

const ButtonB = ({ text, action }) => {
  return (
    <button type="button" className="buttonB" onClick={action}>
      {text}
    </button>
  );
};

export default ButtonB;
