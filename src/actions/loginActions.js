import axios from 'axios';

import * as loginTypes from '../types/loginTypes';
import environment from '../libs/environment';

const { CHARGING, ERROR, LOGIN, LOGOUT } = loginTypes;

export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: CHARGING
  });

  try {
    const responseLogin = await axios.post(`${environment.motivarnosBackend}/login`, {
      ...payload
    });

    dispatch({
      type: LOGIN,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};

export const logoutRequest = (payload) => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload
  });
};
