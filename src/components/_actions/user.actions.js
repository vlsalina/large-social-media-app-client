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

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        setEmail("");
        setPassword("");
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

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

export const userActions = {
  login,
  logout,
};
