import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { articlesActions } from "../_actions/articles.actions";
import { useSelector } from "react-redux";
import ContentLoader from "../ContentLoader/ContentLoader";

const LoadMore = ({ category }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const { loading } = data;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.scrollY ===
        document.getElementsByClassName("App")[0].scrollHeight -
          window.innerHeight
      ) {
        dispatch(articlesActions.load(category));
      }
    });
  }, []);

  return (
    <div className="content-loader">
      {loading ? <ContentLoader /> : <div />}
    </div>
  );
};

export default LoadMore;
