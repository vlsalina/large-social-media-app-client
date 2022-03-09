import { format } from "date-fns";
import { colors } from "./data/data";
import gsap from "gsap";

/* gsap timeline */
let stagger = 0.05;
let duration = 0.1;
let duration2 = 0.2;
let loginTL;
let registerTL;
let login;
let register;
let lefties;
let righties;
let ease = "power1.out";

window.onload = () => {
  lefties = document.querySelectorAll(".login-modal__left");
  righties = document.querySelectorAll(".register-modal__right");
  login = document.querySelector(".login-modal--box-1");
  register = document.querySelector(".register-modal--box-2");

  loginTL = gsap.timeline().to(lefties, {
    width: window.innerWidth > 375 ? "375px" : "100vw",
    stagger: stagger,
    duration: duration,
    ease: ease,
  });

  registerTL = gsap.timeline().to(righties, {
    width: window.innerWidth > 375 ? "375px" : "100vw",
    stagger: stagger,
    duration: duration,
    ease: ease,
  });

  loginTL.pause();
  registerTL.pause();
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 375) {
    if (loginTL && registerTL) {
      loginTL.kill();
      registerTL.kill();
    }

    loginTL = gsap.timeline().to(lefties, {
      width: "375px",
      stagger: stagger,
      duration: duration,
      ease: ease,
    });

    registerTL = gsap.timeline().to(righties, {
      width: "375px",
      stagger: stagger,
      duration: duration,
      ease: ease,
    });

    loginTL.pause();
    registerTL.pause();
  } else {
    if (loginTL && registerTL) {
      loginTL.kill();
      registerTL.kill();
    }

    loginTL = gsap.timeline().to(lefties, {
      width: "100vw",
      stagger: stagger,
      duration: duration,
      ease: ease,
    });

    registerTL = gsap.timeline().to(righties, {
      width: "100vw",
      stagger: stagger,
      duration: duration,
      ease: ease,
    });

    loginTL.pause();
    registerTL.pause();
  }
});

/* end gsap timeline */

const formatDate = (date) => {
  let createdAt = date.slice(0, 10).split("-");
  let [year, month, day] = createdAt;

  let formattedDate = format(new Date(year, month, day), "PP");

  return formattedDate;
};

const getColor = () => {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const redirect = () => {
  window.location.href = "/register";
};

const userIsLogged = (action) => {
  if (localStorage.getItem("user")) {
    action();
  } else {
    loginTL.play();
  }
};

const loggedIn = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

const loginPlay = () => {
  loginTL.play();
};

const loginReverse = () => {
  loginTL.reverse();
};

const registerPlay = () => {
  registerTL.play();
};

const registerReverse = () => {
  registerTL.reverse();
};

const play = () => {
  loginPlay();
  registerPlay();
};

const reverse = () => {
  loginTL.reverse();
  registerTL.reverse();
};

export {
  formatDate,
  getColor,
  redirect,
  userIsLogged,
  loggedIn,
  play,
  reverse,
  loginPlay,
  registerPlay,
  loginReverse,
  registerReverse,
};
