import * as loginTypes from '../types/loginTypes';

const { LOGIN_CHARGING, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT_REQUEST } = loginTypes;

const INITIAL_STATE = {
  userLogged: localStorage.getItem('sesion') ? JSON.parse(localStorage.getItem('sesion')) : null,
  login_charging: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login_charging: false,
        userLogged: action.payload,
        error: false
      };

    case LOGOUT_REQUEST:
      return { ...INITIAL_STATE, userLogged: null };

    case LOGIN_CHARGING:
      return { ...state, login_charging: true, error: false };

    case LOGIN_ERROR:
      return { ...state, error: action.payload, login_charging: false };

    default:
      return state;
  }
};
