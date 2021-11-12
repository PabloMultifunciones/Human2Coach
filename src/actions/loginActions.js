import axios from 'axios';

import * as loginTypes from '../types/loginTypes';
import environment from '../libs/environment';

const { CHARGING, ERROR, LOGIN, LOGOUT } = loginTypes;
const TOKEN_LIFE = 2 * 60 * 60 * 1000; // Two hours

export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: CHARGING
  });

  try {
    const responseLogin = await axios.post(`${environment.motivarnosBackend}/login`, {
      ...payload
    });

    localStorage.setItem(
      'sesion',
      JSON.stringify({
        ...responseLogin.data,
        expiresAt: new Date().getTime() + TOKEN_LIFE
      })
    );

    dispatch({
      type: LOGIN,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
  }
};

export const logoutRequest = (payload) => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
    payload
  });
};
