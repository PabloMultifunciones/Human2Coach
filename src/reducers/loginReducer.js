import { LOGIN_CHARGING, ERROR, LOGIN, LOGOUT } from '../types/loginTypes';

const INITIAL_STATE = {
  user_logged: localStorage.getItem('sesion') ? JSON.parse(localStorage.getItem('sesion')) : null,
  login_charging: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login_charging: false,
        user_logged: action.payload,
        error: false
      };

    case LOGOUT:
      return { ...INITIAL_STATE, user_logged: null };

    case LOGIN_CHARGING:
      return { ...state, login_charging: true, error: false };

    case ERROR:
      return { ...state, error: action.payload, login_charging: false };

    default:
      return state;
  }
};
