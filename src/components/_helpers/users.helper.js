import { alertActions } from "../_actions/alert.actions";
import { alertConstants } from "../_constants/alert.constants";

const validate = (error) => {
  return { type: alertConstants.ERROR, message: error };
};

const validateLoginData = (user, dispatch) => {
  if (!user.email) {
    dispatch(validate("Please provide a valid email."));
    return true;
  }

  if (!user.password) {
    dispatch(validate("Please provide a valid password."));
    return true;
  }
};

const validateRegisterData = (user, dispatch) => {
  if (!user.firstname) {
    dispatch(validate("Please provide first name."));
    return true;
  }

  if (!user.lastname) {
    dispatch(validate("Please provide last name."));
    return true;
  }

  if (!user.email) {
    dispatch(validate("Please provide a valid email."));
    return true;
  }

  if (!user.password) {
    dispatch(validate("Please provide a valid password."));
    return true;
  }

  if (!user.confirmPassword) {
    dispatch(validate("Please confirm password."));
    return true;
  }

  if (user.password !== user.confirmPassword) {
    dispatch(validate("Passwords do not match."));
    return true;
  }
};

export const usersHelpers = {
  validateLoginData,
  validateRegisterData,
};
