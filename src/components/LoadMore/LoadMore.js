import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { articlesActions } from "../_actions/articles.actions";
import { useSelector } from "react-redux";

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

  return <div>{loading ? <div>Loading...</div> : <div />}</div>;
};

export default LoadMore;
