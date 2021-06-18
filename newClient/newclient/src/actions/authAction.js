import authService from '../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};
export const adminloginSuccess = user => {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    user
  };
};

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    error
  };
};

export const login = (username, password) => {
  return dispatch => {
    authService
      .login(username, password)
      .then(data => {
        data.message
          ? dispatch(loginError(data.message))
          : dispatch(loginSuccess(data));
      })
      .catch(err => dispatch(loginError(err)));
  };
};
export const adminlogin = (username, password) => {
  return dispatch => {
    authService
      .adminlogin(username, password)
      .then(data => {
        data.message
          ? dispatch(loginError(data.message))
          : dispatch(adminloginSuccess(data));
      })
      .catch(err => dispatch(loginError(err)));
  };
};

export const logout = () => {
  authService.logout();
  return {
    type: LOGOUT
  };
};
