import * as avatarsTypes from '../types/avatarsTypes';

const { SET_AVATAR_REQUEST, RESET_STATE, AVATAR_CHARGING, AVATAR_ERROR, RESET_STORE } =
  avatarsTypes;

const INITIAL_STATE = {
  avatar: null,
  avatar_charging: false,
  avatar_error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AVATAR_REQUEST:
      return {
        ...state,
        avatar_charging: false,
        avatar: action.payload,
        error: false
      };

    case AVATAR_CHARGING:
      return { ...state, avatar_charging: true };

    case AVATAR_ERROR:
      return {
        ...state,
        avatar_error: action.payload
      };

    case RESET_STATE:
      return { ...state, avatar: [], avatar_charging: false, avatar_error: false };

    case RESET_STORE:
      return {
        ...state,
        avatar: null,
        avatar_charging: false,
        avatar_error: false
      };

    default:
      return state;
  }
};
