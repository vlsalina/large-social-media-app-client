import React from "react";
import "./ContentLoader.css";

const ContentLoader = () => {
  return (
    <div className="content-loader">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ContentLoader;
