import React from "react";

const IsLogged = ({ children, text }) => {
  return <>{localStorage.getItem("user") ? children : <>{text}</>}</>;
};

export default IsLogged;
