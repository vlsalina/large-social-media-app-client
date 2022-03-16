import React from "react";
import "./ContentLoader.css";
import { useSelector } from "react-redux";

const ContentLoader = ({ target }) => {
  const data = useSelector((state) => state.data);
  const { loading } = data;

  return (
    <div className="content-loader" ref={target}>
      {loading ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="content-loader--box-1">Load more</div>
      )}
    </div>
  );
};

export default ContentLoader;
