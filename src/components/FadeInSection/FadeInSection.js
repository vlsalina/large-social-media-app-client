import React, { useRef, useState, useEffect } from "react";
import "./FadeInSection.css";

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  };

  const domRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: "1.0",
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(domRef.current);

    return () => observer.unobserve(domRef.current);
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? "isVisible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
