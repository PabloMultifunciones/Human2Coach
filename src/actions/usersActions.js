import toastr from 'toastr';
import * as usersTypes from '../types/usersTypes';
import UserService from '../Services/UserService';

import 'toastr/build/toastr.min.css';

const {
  USERS_LIST_CHARGING,
  USERS_LIST_REQUEST,
  USERS_LIST_FILTER_REQUEST,
  USERS_LIST_FILTERED_CHARGING,
  USERS_LIST_SAVE,
  USERS_LIST_UPDATE,
  USERS_LIST_DELETE,
  USERS_LIST_DELETE_FILTERED,
  USERS_LIST_ERROR,
  USERS_LIST_SAVED
} = usersTypes;

export const getUsersRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pages } = getState().usersReducer;

    if (!pages.includes(payload.number)) {
      dispatch({
        type: USERS_LIST_CHARGING
      });
      const responseLogin = await UserService.getUsers(payload.number);
      dispatch({
        type: USERS_LIST_REQUEST,
        payload: { ...responseLogin.data }
      });
    } else {
      dispatch({
        type: USERS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getUsersFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesFiltered, filter } = getState().usersReducer;
    if (!pagesFiltered.includes(payload.number) || filter !== payload.filterName) {
      dispatch({
        type: filter !== payload.filterName ? USERS_LIST_FILTERED_CHARGING : USERS_LIST_CHARGING
      });

      const responseLogin = await UserService.filterUsers(payload.number, payload.filterName);
      dispatch({
        type: USERS_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterName: payload.filterName }
      });
    } else {
      dispatch({
        type: USERS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const saveUserRequest = () => async (dispatch) => {
  dispatch({
    type: USERS_LIST_CHARGING
  });

  try {
    const responseLogin = await UserService.saveUser();

    dispatch({
      type: USERS_LIST_SAVE,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const updateUserRequest = () => async (dispatch) => {
  dispatch({
    type: USERS_LIST_CHARGING
  });

  try {
    const responseLogin = await UserService.updateUser();

    dispatch({
      type: USERS_LIST_UPDATE,
      payload: responseLogin.data
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const deleteUserRequest = (payload) => async (dispatch) => {
  dispatch({
    type: USERS_LIST_CHARGING
  });

  try {
    await UserService.deleteUser(payload.id);

    dispatch({
      type: payload.filterName === '' ? USERS_LIST_DELETE : USERS_LIST_DELETE_FILTERED,
      payload: payload.id
    });

    toastr.error('The user is deleted');
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};
