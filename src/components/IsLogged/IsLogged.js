import React from "react";

const IsLogged = ({ children, text }) => {
  return <>{localStorage.getItem("user") ? children : <div>{text}</div>}</>;
};

export default IsLogged;
