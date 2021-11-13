import * as loginTypes from '../types/loginTypes';
import LoginService from '../Services/LoginService';

const { LOGIN_CHARGING, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT_REQUEST } = loginTypes;
const TOKEN_LIFE = 2 * 60 * 60 * 1000; // Two hours

export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN_CHARGING
  });

  try {
    const responseLogin = await LoginService.login(payload);

    localStorage.setItem(
      'sesion',
      JSON.stringify({
        ...responseLogin.data,
        expiresAt: new Date().getTime() + TOKEN_LIFE
      })
    );

    dispatch({
      type: LOGIN_REQUEST,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const loginTalkDeskRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN_CHARGING
  });

  try {
    const responseLogin = await LoginService.loginTalkDesk(payload);

    if (responseLogin.data.redirecturl == null || !responseLogin.data.redirecturl) {
      dispatch({
        type: LOGIN_ERROR,
        payload: 'No se puede loguear por TALKDESK'
      });
    } else {
      window.location.href = responseLogin.data.redirecturl;
    }
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const registerRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN_CHARGING
  });

  try {
    const responseLogin = await LoginService.register(payload);

    localStorage.setItem(
      'sesion',
      JSON.stringify({
        ...responseLogin.data,
        expiresAt: new Date().getTime() + TOKEN_LIFE
      })
    );

    dispatch({
      type: LOGIN_REQUEST,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const logoutRequest = (payload) => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT_REQUEST,
    payload
  });
};
