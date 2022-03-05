import { userConstants } from "../_constants/user.constants";
import { userService } from "../_services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers/history";
import { loginReverse, registerReverse } from "../../utils";

const login = (email, password, setEmail, setPassword) => {
  const request = () => {
    return { type: userConstants.LOGIN_REQUEST };
  };
  const success = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, user };
  };
  const failure = (error) => {
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  return (dispatch) => {
    dispatch(request());

    userService.login({ email, password }).then(
      (user) => {
        dispatch(success(user));
        setEmail("");
        setPassword("");
        dispatch(alertActions.success("Login successful"));
        loginReverse();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

const logout = () => (dispatch) => {
  const request = () => {
    return { type: userConstants.LOGOUT };
  };

  userService.logout();
  dispatch(request());
};

function register({
  userData,
  setFirstname,
  setLastname,
  setEmail,
  setPassword,
  setConfirmPassword,
}) {
  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    userService.register(userData).then(
      (user) => {
        dispatch(success());
        dispatch(alertActions.success("Registration successful"));
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        registerReverse();
      },
      (error) => {
        //dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

export const userActions = {
  login,
  logout,
  register,
};
