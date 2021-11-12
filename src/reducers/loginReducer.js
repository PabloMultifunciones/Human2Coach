import { CHARGING, ERROR, LOGIN, LOGOUT } from '../types/loginTypes';

const INITIAL_STATE = {
  user_logged: null,
  charging: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        charging: false,
        user_logged: action.payload,
        error: false
      };

    case LOGOUT:
      return INITIAL_STATE;

    case CHARGING:
      return { ...state, charging: true, error: false };

    case ERROR:
      return { ...state, error: action.payload, charging: false };

    default:
      return state;
  }
};
