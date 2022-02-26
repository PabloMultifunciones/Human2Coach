import * as permissionsTypes from '../types/permissionsTypes';
import * as loginTypes from '../types/loginTypes';

import GeneralService from '../Services/GeneralService';

const { RESET_STATE, SET_PERMISSIONS_REQUEST, PERMISSIONS_CHARGING, PERMISSIONS_ERROR } =
  permissionsTypes;
const { LOGIN_REQUEST } = loginTypes;

export const getPermissionsRequest = () => async (dispatch, getState) => {
  dispatch({
    type: PERMISSIONS_CHARGING
  });

  try {
    const { userLogged } = getState().loginReducer;

    dispatch({
      type: SET_PERMISSIONS_REQUEST,
      payload: { ...userLogged.permissions }
    });

    return { status: 'SUCCESS', permissions: { ...userLogged.permissions } };
  } catch (error) {
    dispatch({
      type: PERMISSIONS_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const savePermissionsRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PERMISSIONS_CHARGING
  });

  try {
    const responseLogin = await GeneralService.savePermissions(payload);
    const { userLogged } = getState().loginReducer;

    const userLoggedUpdated = {
      ...userLogged,
      permissions: { ...payload }
    };

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
      type: SET_PERMISSIONS_REQUEST,
      payload
    });

    return { status: 'SUCCESS', permissions: responseLogin.data };
  } catch (error) {
    dispatch({
      type: PERMISSIONS_ERROR,
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
