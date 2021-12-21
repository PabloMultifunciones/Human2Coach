import * as generalTypes from '../types/generalTypes';
import GeneralService from '../Services/GeneralService';

const {
  COLLABORATOR_LIST_REQUEST,
  LEADER_COLLABORATOR_LIST_REQUEST,
  LEADER_LIST_REQUEST,
  TEAMS_REQUEST,
  TEAMS_CHARGING,
  TEAMS_ERROR,
  TEAMS_SECONDARY_CHARGING,
  TEAMS_SECONDARY_ERROR,
  TEAMS_SECONDARY_REQUEST,
  USERS_REQUEST,
  USERS_CHARGING,
  USERS_ERROR
} = generalTypes;

export const teamsRequest = () => async (dispatch) => {
  dispatch({
    type: TEAMS_CHARGING
  });

  try {
    const responseLogin = await GeneralService.getTeams();

    dispatch({
      type: TEAMS_REQUEST,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: TEAMS_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const secondaryTeamsRequest = () => async (dispatch) => {
  dispatch({
    type: TEAMS_SECONDARY_CHARGING
  });

  try {
    const responseLogin = await GeneralService.getSecondaryTeams();

    dispatch({
      type: TEAMS_SECONDARY_REQUEST,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: TEAMS_SECONDARY_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const usersRequest = () => async (dispatch) => {
  dispatch({
    type: USERS_CHARGING
  });

  try {
    const responseLogin = await GeneralService.getUsers();

    dispatch({
      type: USERS_REQUEST,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getCollaboratorsRequest = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_CHARGING
    });
    const responseLogin = await GeneralService.getCollaborators(0, payload);
    dispatch({
      type: COLLABORATOR_LIST_REQUEST,
      payload: { ...responseLogin.data }
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getCollaboratorsLeadersRequest = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_CHARGING
    });
    const responseLogin = await GeneralService.getLeaders(0, payload);
    dispatch({
      type: COLLABORATOR_LIST_REQUEST,
      payload: { ...responseLogin.data }
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getLeadersRequest = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_CHARGING
    });
    const responseLogin = await GeneralService.getLeaders();
    dispatch({
      type: LEADER_LIST_REQUEST,
      payload: { ...responseLogin.data }
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getLeadersCollaboratorsRequest = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_CHARGING
    });
    const responseLogin = await GeneralService.getLeadersCollaborators();
    dispatch({
      type: LEADER_COLLABORATOR_LIST_REQUEST,
      payload: { ...responseLogin.data }
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};
