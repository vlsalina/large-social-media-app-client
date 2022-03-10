import React from "react";
import "./ButtonD.css";

const ButtonD = ({ crumb, action, flag }) => {
  return (
    <button
      className={`buttonD ${crumb === flag ? "buttonD--active" : ""}`}
      type="button"
      onClick={action}
    >
      {crumb}
    </button>
  );
};

export default ButtonD;
