import { general } from "../_constants/general.constants";
import { drawerAnimations } from "../_animations/drawer.animations";
import { alertActions } from "../_actions/alert.actions";

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

export const closeDrawer = (dispatch) => {
  dispatch(alertActions.clear());
  drawerAnimations.loginReverse();
  drawerAnimations.registerReverse();
};
