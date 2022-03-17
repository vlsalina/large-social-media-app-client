import { general } from "../_constants/general.constants";
import { drawerAnimations } from "../_animations/drawer.animations";
import { alertActions } from "../_actions/alert.actions";
import { format } from "date-fns";
import { colors } from "../../data/data";
import store from "../../store";

export const bgc = (topic) => {
  switch (topic) {
    case general.TECHNOLOGY:
      return "technology";
    case general.MONEY:
      return "money";
    case general.BUSINESS:
      return "business";
    case general.PRODUCTIVITY:
      return "productivity";
    case general.PSYCHOLOGY:
      return "psychology";
    case general.MINDFULNESS:
      return "mindfulness";
    case general.ART:
      return "art";
    default:
      return "";
  }
};

export const closeDrawer = () => {
  store.dispatch(alertActions.clear());
  drawerAnimations.loginReverse();
  drawerAnimations.registerReverse();
};

export const formatDate = (date) => {
  let createdAt = date.slice(0, 10).split("-");
  let [year, month, day] = createdAt;

  let formattedDate = format(new Date(year, month - 1, day), "PP");

  return formattedDate;
};

export const getColor = () => {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

export const userIsLogged = (action) => {
  if (localStorage.getItem("user")) {
    action();
  } else {
    store.dispatch(alertActions.clear());
    drawerAnimations.loginPlay();
  }
};

export const userIsRegistered = (action) => {
  if (localStorage.getItem("user")) {
    action();
  } else {
    store.dispatch(alertActions.clear());
    drawerAnimations.registerPlay();
  }
};

export const loggedIn = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

export const toLogin = () => {
  drawerAnimations.registerReverse();
  drawerAnimations.loginPlay();
};

export const toRegister = () => {
  drawerAnimations.loginReverse();
  drawerAnimations.registerPlay();
};
