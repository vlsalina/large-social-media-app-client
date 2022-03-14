import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { articlesActions } from "../_actions/articles.actions";
import { useSelector } from "react-redux";
import ContentLoader from "../ContentLoader/ContentLoader";

const LoadMore = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const { loading } = articles;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.scrollY ===
        document.getElementsByClassName("App")[0].scrollHeight -
          window.innerHeight
      ) {
        console.log("Hello World!");
        dispatch(articlesActions.load());
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
