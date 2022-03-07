import { userConstants } from "../_constants/user.constants";
import { userService } from "../_services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers/history";
import { loginReverse, registerReverse } from "../../utils";

// login action
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

// logout action
const logout = () => (dispatch) => {
  const request = () => {
    return { type: userConstants.LOGOUT };
  };

  userService.logout();
  dispatch(alertActions.clear());
  dispatch(request());
};

// register action
const register = ({
  userData,
  setFirstname,
  setLastname,
  setEmail,
  setPassword,
  setConfirmPassword,
}) => {
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
};

// follow action
const follow = (userId) => {
  function request() {
    return { type: userConstants.FOLLOWING_REQUEST };
  }
  function success(user) {
    return { type: userConstants.FOLLOWING_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: userConstants.FOLLOWING_FAIL, payload: error };
  }

  return (dispatch) => {
    dispatch(request());

    userService.follow(userId).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("Follow request successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

// unfollow action
const unfollow = (userId) => {
  function request() {
    return { type: userConstants.UNFOLLOWING_REQUEST };
  }
  function success(user) {
    return { type: userConstants.UNFOLLOWING_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: userConstants.UNFOLLOWING_FAIL, payload: error };
  }

  return (dispatch) => {
    dispatch(request());

    userService.unfollow(userId).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("Unfollowing request successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

export const userActions = {
  login,
  logout,
  register,
  follow,
  unfollow,
};
