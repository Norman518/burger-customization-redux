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
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
