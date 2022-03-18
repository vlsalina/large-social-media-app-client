import React from "react";
import "./ContentLoader.css";
import { useSelector } from "react-redux";
import { limit } from "../_constants/articles.constants";

const ContentLoader = ({ target }) => {
  const data = useSelector((state) => state.data);
  const { loading, total, articles } = data;

  return (
    <div className="content-loader" ref={target}>
      {loading ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="content-loader--box-1">
          {total - articles.length === 0
            ? `0 articles left`
            : `Load next ${limit} articles`}
        </div>
      )}
    </div>
  );
};

export default ContentLoader;
