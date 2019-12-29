import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('burgerToken');
  localStorage.removeItem('burgerExpirationDate');
  localStorage.removeItem('burgerLocalID');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbkq7i24xMJ7uO7RlURyfI_I51QSYYXVw';
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbkq7i24xMJ7uO7RlURyfI_I51QSYYXVw';
    }
    axios
      .post(url, authData)
      .then(response => {
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        localStorage.setItem('burgerToken', data.idToken);
        localStorage.setItem('burgerExpirationDate', expirationDate);
        localStorage.setItem('burgerToken', data.idToken);
        localStorage.setItem('burgerLocalID', data.localId);
        dispatch(authSuccess(data.idToken, data.localId));
        dispatch(checkAuthTimeout(data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('burgerToken');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('burgerExpirationDate'));
      if (expirationDate > new Date()) {
        const localID = localStorage.getItem('burgerLocalID');
        dispatch(authSuccess(token, localID));
        const timeout = (expirationDate.getTime() - new Date().getTime()) / 1000
        dispatch(checkAuthTimeout(timeout))
      } else {
        dispatch(logout());
      }
    }
  };
};
