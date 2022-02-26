import * as permissionsTypes from '../types/permissionsTypes';

const {
  RESET_STATE,
  RESET_STORE,
  SET_PERMISSIONS_REQUEST,
  PERMISSIONS_CHARGING,
  PERMISSIONS_ERROR
} = permissionsTypes;

const INITIAL_STATE = {
  permissions: false,
  permissions_charging: false,
  permissions_error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PERMISSIONS_REQUEST:
      return {
        ...state,
        permissions_charging: false,
        permissions: action.payload,
        error: false
      };

    case PERMISSIONS_CHARGING:
      return { ...state, permissions_charging: true };

    case PERMISSIONS_ERROR:
      return {
        ...state,
        permissions_error: action.payload
      };

    case RESET_STATE:
      return {
        ...state,
        permissions: false,
        permissions_charging: false,
        permissions_error: false
      };

    case RESET_STORE:
      return {
        ...state,
        permissions: false,
        permissions_charging: false,
        permissions_error: false
      };

    default:
      return state;
  }
};
