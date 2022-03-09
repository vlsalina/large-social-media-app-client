import gsap from "gsap";

// gsap variables
let loginTL;
let registerTL;
let login;
let register;
let lefties;
let righties;
let ease = "power1.out";

let staggers = {
  panels: 0.05,
};

let durations = {
  panels: 0.1,
  form: 0.2,
};

/* gsap timeline */

window.onload = () => {
  lefties = document.querySelectorAll(".login-modal__left");
  righties = document.querySelectorAll(".register-modal__right");
  login = document.getElementsByClassName("login-modal--box-1");
  register = document.getElementsByClassName("register-modal--box-2");

  loginTL = gsap
    .timeline()
    .to(lefties, {
      width: window.innerWidth > 375 ? "375px" : "100vw",
      stagger: staggers.panels,
      duration: durations.panels,
      ease: ease,
    })
    .to(login, { opacity: 1, duration: durations.form });

  registerTL = gsap
    .timeline()
    .to(righties, {
      width: window.innerWidth > 375 ? "375px" : "100vw",
      stagger: staggers.panels,
      duration: durations.panels,
      ease: ease,
    })
    .to(register, { opacity: 1, duration: durations.form });

  loginTL.pause();
  registerTL.pause();
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 375) {
    if (loginTL && registerTL) {
      loginTL.kill();
      registerTL.kill();
    }

    loginTL = gsap
      .timeline()
      .to(lefties, {
        width: "375px",
        stagger: staggers.panels,
        duration: durations.panels,
        ease: ease,
      })
      .to(login, { opacity: 1, duration: durations.form });

    registerTL = gsap
      .timeline()
      .to(righties, {
        width: "375px",
        stagger: staggers.panels,
        duration: durations.panels,
        ease: ease,
      })
      .to(register, { opacity: 1, duration: durations.form });

    loginTL.pause();
    registerTL.pause();
  } else {
    if (loginTL && registerTL) {
      loginTL.kill();
      registerTL.kill();
    }

    loginTL = gsap
      .timeline()
      .to(lefties, {
        width: "100vw",
        stagger: staggers.panels,
        duration: durations.panels,
        ease: ease,
      })
      .to(login, { opacity: 1, duration: durations.form });

    registerTL = gsap
      .timeline()
      .to(righties, {
        width: "100vw",
        stagger: staggers.panels,
        duration: durations.panels,
        ease: ease,
      })
      .to(register, { opacity: 1, duration: durations.form });

    loginTL.pause();
    registerTL.pause();
  }
});

/* end gsap timeline */

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

export const drawerAnimations = {
  loginPlay,
  loginReverse,
  registerPlay,
  registerReverse,
};
