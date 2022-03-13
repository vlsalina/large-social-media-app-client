import React from "react";

const LoadMore = () => {
  window.addEventListener("scroll", () => {
    if (
      window.scrollY ===
      document.getElementsByClassName("App")[0].scrollHeight -
        window.innerHeight
    ) {
      console.log("Met");
    }
  });

  return <></>;
};

export default LoadMore;
