import * as generalTypes from '../types/generalTypes';

const {
  TEAMS_REQUEST,
  COLLABORATOR_LIST_REQUEST,
  TEAMS_CHARGING,
  TEAMS_ERROR,
  USERS_REQUEST,
  TEAMS_SECONDARY_CHARGING,
  TEAMS_SECONDARY_ERROR,
  TEAMS_SECONDARY_REQUEST,
  USERS_CHARGING,
  USERS_ERROR,
  RESET_STATE,
  RESET_STORE
} = generalTypes;

const INITIAL_STATE = {
  teams: false,
  collaborators: false,
  error_teams: false,
  teams_charging: false,
  secondaryTeams: false,
  error_secondaryTeams: false,
  secondaryTeams_charging: false,
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
        error_teams: false
      };

    case TEAMS_CHARGING:
      return { ...state, teams_charging: true, error_teams: false };

    case TEAMS_ERROR:
      return { ...state, error_teams: action.payload, teams_charging: false };

    case TEAMS_SECONDARY_REQUEST:
      return {
        ...state,
        secondaryTeams_charging: false,
        secondaryTeams: action.payload,
        error_secondaryTeams: false
      };

    case TEAMS_SECONDARY_CHARGING:
      return { ...state, secondaryTeams_charging: true, error_secondaryTeams: false };

    case TEAMS_SECONDARY_ERROR:
      return { ...state, error_secondaryTeams: action.payload, secondaryTeams_charging: false };

    case USERS_REQUEST:
      return {
        ...state,
        users_charging: false,
        users: action.payload,
        error_users: false
      };

    case USERS_CHARGING:
      return { ...state, users_charging: true, error_users: false };

    case USERS_ERROR:
      return { ...state, error_users: action.payload, users_charging: false };

    case COLLABORATOR_LIST_REQUEST:
      return {
        ...state,
        users_charging: false,
        collaborators: action.payload,
        error_users: false
      };

    case RESET_STATE:
      return {
        ...state,
        teams: false,
        collaborators: false,
        error_teams: false,
        teams_charging: false,
        secondaryTeams: false,
        error_secondaryTeams: false,
        secondaryTeams_charging: false,
        users: false,
        error_users: false,
        users_charging: false
      };

    case RESET_STORE:
      return {
        ...state,
        teams: false,
        collaborators: false,
        error_teams: false,
        teams_charging: false,
        secondaryTeams: false,
        error_secondaryTeams: false,
        secondaryTeams_charging: false,
        users: false,
        error_users: false,
        users_charging: false
      };

    default:
      return state;
  }
};
