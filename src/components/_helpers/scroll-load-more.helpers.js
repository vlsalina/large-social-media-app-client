window.addEventListener("scroll", () => {
  let aside = document.getElementsByClassName("home--box-8")[0];
  if (aside) {
    if (window.scrollY > 400) {
      aside.classList.add("home--fixed");
    } else {
      aside.classList.remove("home--fixed");
    }
  }
});

window.addEventListener("click", (e) => {
  let backdrop = document.getElementsByClassName("actionmenu")[0];
  let drawer = document.getElementsByClassName("actionmenu")[0];
  if (e.target === backdrop) {
    drawer.classList.remove("actionmenu--open");
    drawer.classList.add("actionmenu--close");
    backdrop.classList.remove("actionmenu--open");
    backdrop.classList.add("actionmenu--close");
  }
});
