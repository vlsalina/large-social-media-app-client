import { userConstants } from "../_constants/user.constants";
import { userService } from "../_services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers/history";
import { drawerAnimations } from "../_animations/drawer.animations";
import { usersHelpers } from "../_helpers/users.helper";

// login action
const login = (email, password, setEmail, setPassword) => {
  const request = () => {
    return { type: userConstants.LOGIN_REQUEST };
  };
  const success = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, payload: user };
  };
  const failure = (error) => {
    return { type: userConstants.LOGIN_FAILURE, payload: error };
  };

  return (dispatch) => {
    // valdiate user input
    if (usersHelpers.validateLoginData({ email, password }, dispatch)) {
      return;
    }

    dispatch(request());

    userService.login({ email, password }).then(
      (user) => {
        dispatch(success(user));
        setEmail("");
        setPassword("");
        dispatch(alertActions.success("Login successful"));
        drawerAnimations.loginReverse();
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
    // validate user input
    if (usersHelpers.validateRegisterData(userData, dispatch)) {
      return;
    }

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
        drawerAnimations.registerReverse();
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

// favorite action
const favorite = (articleId) => {
  const request = () => {
    return { type: userConstants.FAVORITE_REQUEST };
  };
  const success = (user) => {
    return { type: userConstants.FAVORITE_SUCCESS, payload: user };
  };
  const failure = (error) => {
    return { type: userConstants.FAVORITE_FAIL, payload: error };
  };

  return (dispatch, getState) => {
    dispatch(request());

    userService.favorite(articleId).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("Favorite request successful."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

// unfavorite action
const unfavorite = (articleId) => {
  const request = () => {
    return { type: userConstants.UNFAVORITE_REQUEST };
  };
  const success = (user) => {
    return { type: userConstants.UNFAVORITE_SUCCESS, payload: user };
  };
  const failure = (error) => {
    return { type: userConstants.UNFAVORITE_FAIL, payload: error };
  };

  return (dispatch, getState) => {
    dispatch(request());

    userService.unfavorite(articleId).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("Unfavorite request successful."));
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
  favorite,
  unfavorite,
};
