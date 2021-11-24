import * as preferencesTypes from '../types/preferencesTypes';

const { RESET_STATE, RESET_STORE, SET_PREFERENCE_REQUEST, PREFERENCE_CHARGING, PREFERENCE_ERROR } =
  preferencesTypes;

const INITIAL_STATE = {
  preferences: false,
  preferences_charging: false,
  preferences_error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PREFERENCE_REQUEST:
      return {
        ...state,
        preferences_charging: false,
        preferences: action.payload,
        error: false
      };

    case PREFERENCE_CHARGING:
      return { ...state, preferences_charging: true };

    case PREFERENCE_ERROR:
      return {
        ...state,
        preferences_error: action.payload
      };

    case RESET_STATE:
      return {
        ...state,
        preferences: false,
        preferences_charging: false,
        preferences_error: false
      };

    case RESET_STORE:
      return {
        ...state,
        preferences: false,
        preferences_charging: false,
        preferences_error: false
      };

    default:
      return state;
  }
};
