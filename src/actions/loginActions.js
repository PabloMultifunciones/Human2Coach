import axios from 'axios';

import * as loginTypes from '../types/loginTypes';
import environment from '../libs/environment';

const { LOGIN_CHARGING, ERROR, LOGIN, LOGOUT } = loginTypes;
const TOKEN_LIFE = 2 * 60 * 60 * 1000; // Two hours

export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN_CHARGING
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
      payload: error.response ? error.response.data : error
    });
  }
};

export const loginTalkDeskRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN_CHARGING
  });

  try {
    const responseLogin = await axios.get(
      `${environment.motivarnosBackend}/v1/integration/authurl/${payload.type}?companyName=${payload.company}`
    );

    if (responseLogin.data.redirecturl == null || !responseLogin.data.redirecturl) {
      dispatch({
        type: ERROR,
        payload: 'No se puede loguear por TALKDESK'
      });
    } else {
      window.location.href = responseLogin.data.redirecturl;
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const registerRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN_CHARGING
  });

  try {
    const responseLogin = await axios.post(`${environment.motivarnosBackend}/company/signup`, {
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
      payload: error.response ? error.response.data : error
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
