import * as avatarTypes from '../types/avatarsTypes';
import * as loginTypes from '../types/loginTypes';

import AvatarService from '../Services/AvatarService';

const { RESET_STATE, SET_AVATAR_REQUEST, AVATAR_CHARGING, AVATAR_ERROR } = avatarTypes;
const { LOGIN_REQUEST } = loginTypes;

export const getAvatarRequest = () => async (dispatch) => {
  dispatch({
    type: AVATAR_CHARGING
  });

  try {
    const responseLogin = await AvatarService.getParts();

    dispatch({
      type: SET_AVATAR_REQUEST,
      payload: responseLogin.data.content
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: AVATAR_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const saveAvatarRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: AVATAR_CHARGING
  });

  try {
    const responseLogin = await AvatarService.updateUser(payload);

    const { userLogged } = getState().loginReducer;
    const { avatar } = getState().avatarsReducer;

    const userLoggedUpdated = { ...userLogged, user: responseLogin.data };

    localStorage.setItem(
      'sesion',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('sesion')),
        user: {
          ...responseLogin.data
        }
      })
    );

    dispatch({
      type: LOGIN_REQUEST,
      payload: userLoggedUpdated
    });
    dispatch({
      type: SET_AVATAR_REQUEST,
      payload: avatar
    });

    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: AVATAR_ERROR,
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
