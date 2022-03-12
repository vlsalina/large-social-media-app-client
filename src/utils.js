import { format } from "date-fns";
import { colors } from "./data/data";
import { drawerAnimations } from "./components/_animations/drawer.animations";

const formatDate = (date) => {
  let createdAt = date.slice(0, 10).split("-");
  let [year, month, day] = createdAt;

  let formattedDate = format(new Date(year, month - 1, day), "PP");

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
    drawerAnimations.loginPlay();
  }
};

const loggedIn = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

//export { formatDate, getColor, redirect, userIsLogged, loggedIn };
