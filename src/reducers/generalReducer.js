import * as generalTypes from '../types/generalTypes';

const { TEAMS_REQUEST, TEAMS_CHARGING, TEAMS_ERROR, USERS_REQUEST, USERS_CHARGING, USERS_ERROR } =
  generalTypes;

const INITIAL_STATE = {
  teams: false,
  error_teams: false,
  teams_charging: false,
  users: false,
  error_users: false,
  users_charging: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAMS_REQUEST:
      return {
        ...state,
        teams_charging: false,
        teams: action.payload,
        error: false
      };

    case TEAMS_CHARGING:
      return { ...state, teams_charging: true, error: false };

    case TEAMS_ERROR:
      return { ...state, error_teams: action.payload, teams_charging: false };

    case USERS_REQUEST:
      return {
        ...state,
        users_charging: false,
        users: action.payload,
        error: false
      };

    case USERS_CHARGING:
      return { ...state, users_charging: true, error: false };

    case USERS_ERROR:
      return { ...state, error: action.payload, users_charging: false };

    default:
      return state;
  }
};
