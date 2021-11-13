import * as generalTypes from '../types/generalTypes';
import GeneralService from '../Services/GeneralService';

const { TEAMS_REQUEST, TEAMS_CHARGING, TEAMS_ERROR, USERS_REQUEST, USERS_CHARGING, USERS_ERROR } =
  generalTypes;

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
