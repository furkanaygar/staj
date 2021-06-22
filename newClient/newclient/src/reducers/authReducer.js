import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  ADMIN_LOGIN_SUCCESS
} from '../actions/authAction';

const initState = {
  user: '',
  isAuthenticated: false,
  error: null,
  errorMessage: '',
  isAdmin: null,
  control: ''
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
        isAdmin: false,
        control: ''
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        error: false,
        errorMessage: '',
        isAdmin: true,
        control: ''
      };

    case LOGIN_ERROR:
      return {
        ...state,
        user: '',
        error: true,
        isAuthenticated: false,
        errorMessage: action.error,
        isAdmin: null,
        control: ''
      };
    case LOGOUT:
      return {
        user: '',
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
