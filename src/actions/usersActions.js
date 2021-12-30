import * as usersTypes from '../types/usersTypes';
import UserService from '../Services/UserService';

const {
  RESET_STATE,
  USERS_LIST_CHARGING,
  USERS_SAVE_CHARGING,
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

export const saveUserRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: USERS_SAVE_CHARGING
  });

  try {
    const responseLogin = await UserService.saveUser(payload);

    const { users } = getState().usersReducer;
    const { teams } = getState().generalReducer;

    const teamsFiltered = [...teams.content].filter((team) =>
      team.id === responseLogin.data.team ? responseLogin.data.team.id : null
    );

    const usersUpdated = [
      { ...responseLogin.data, team: teamsFiltered.length > 0 ? teamsFiltered[0] : '' },
      ...users
    ];
    dispatch({
      type: USERS_LIST_SAVE,
      payload: usersUpdated
    });

    return { status: 'SUCCESS', responseLogin };
  } catch (error) {
    console.log(error);
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const updateUserRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: USERS_SAVE_CHARGING
  });

  try {
    const responseLogin = await UserService.updateUser(payload);

    const { users } = getState().usersReducer;
    const { teams } = getState().generalReducer;

    const teamsFiltered = [...teams.content].filter(
      (team) => team.id === responseLogin.data.team.id
    );
    const usersUpdated = [...users];
    const findById = (user) => user.id === payload.id;
    const index = usersUpdated.findIndex(findById);
    usersUpdated[index] = {
      ...usersUpdated[index],
      ...payload,
      team: teamsFiltered.length > 0 ? teamsFiltered[0] : ''
    };

    dispatch({
      type: USERS_LIST_UPDATE,
      payload: usersUpdated
    });
    return { status: 'SUCCESS', responseLogin };
  } catch (error) {
    console.log(error);
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
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
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const disableUserRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: USERS_LIST_CHARGING
  });

  try {
    await UserService.deleteUser(payload.id);
    const { users } = getState().usersReducer;
    const usersUpdated = [...users];
    const findById = (user) => user.id === payload.id;
    const index = usersUpdated.findIndex(findById);
    usersUpdated[index] = {
      ...usersUpdated[index],
      isActive: false
    };

    dispatch({
      type: USERS_LIST_UPDATE,
      payload: usersUpdated
    });

    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const setImportUserRequest = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_LIST_CHARGING
    });
    await UserService.setImportUser(payload);
    await UserService.saveImportUser();

    dispatch({
      type: RESET_STATE
    });
    return { status: 'SUCCESS' };
  } catch (error) {
    dispatch({
      type: USERS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const resetState = () => async (dispatch) => {
  dispatch({
    type: RESET_STATE
  });
};
