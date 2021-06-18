import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  ADMIN_LOGIN_SUCCESS
} from '../actions/authAction';

const initState = {
  user: '',
  isAuthenticated: null,
  error: null,
  errorMessage: '',
  isAdmin: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        error: false,
        errorMessage: '',
        isAdmin: false
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        error: false,
        errorMessage: '',
        isAdmin: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: '',
        error: true,
        isAuthenticated: false,
        errorMessage: action.error,
        isAdmin: null
      };
    case LOGOUT:
      return {
        user: ''
      };
    default:
      return state;
  }
};

export default authReducer;
