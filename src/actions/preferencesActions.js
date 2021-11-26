import * as preferencesTypes from '../types/preferencesTypes';
import * as loginTypes from '../types/loginTypes';

import GeneralService from '../Services/GeneralService';

const { RESET_STATE, SET_PREFERENCE_REQUEST, PREFERENCE_CHARGING, PREFERENCE_ERROR } =
  preferencesTypes;
const { LOGIN_REQUEST } = loginTypes;

export const getPreferencesRequest = () => async (dispatch) => {
  dispatch({
    type: PREFERENCE_CHARGING
  });

  try {
    const responseLogin = await GeneralService.getPreferences();

    dispatch({
      type: SET_PREFERENCE_REQUEST,
      payload: responseLogin.data
    });
    return { status: 'SUCCESS', preferences: responseLogin.data };
  } catch (error) {
    dispatch({
      type: PREFERENCE_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const savePreferencesRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PREFERENCE_CHARGING
  });

  try {
    const responseLogin = await GeneralService.savePreferences(payload);

    const { userLogged } = getState().loginReducer;

    const userLoggedUpdated = { ...userLogged, user: { ...userLogged.user, lang: payload.lang } };

    localStorage.setItem(
      'sesion',
      JSON.stringify({
        ...userLoggedUpdated
      })
    );

    dispatch({
      type: LOGIN_REQUEST,
      payload: userLoggedUpdated
    });

    dispatch({
      type: SET_PREFERENCE_REQUEST,
      payload
    });

    return { status: 'SUCCESS', preferences: responseLogin.data };
  } catch (error) {
    dispatch({
      type: PREFERENCE_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const resetState = () => async (dispatch) => {
  dispatch({
    type: RESET_STATE
  });
};
