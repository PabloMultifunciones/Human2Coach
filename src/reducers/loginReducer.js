import { combineReducers } from 'redux';

import avatarsReducer from './avatarsReducer';
import generalReducer from './generalReducer';
import metricsReducer from './metricsReducer';
import plansReducer from './plansReducer';
import usersReducer from './usersReducer';

import * as loginTypes from '../types/loginTypes';

// to combine all reducers together
const appReducer = combineReducers({
  avatarsReducer,
  generalReducer,
  metricsReducer,
  plansReducer,
  usersReducer
});

const { LOGIN_CHARGING, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT_REQUEST, RESET_STATE, RESET_STORE } =
  loginTypes;

const INITIAL_STATE = {
  userLogged: localStorage.getItem('sesion') ? JSON.parse(localStorage.getItem('sesion')) : null,
  login_charging: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login_charging: false,
        userLogged: action.payload,
        error: false
      };

    case LOGOUT_REQUEST:
      return { ...INITIAL_STATE, userLogged: null };

    case LOGIN_CHARGING:
      return { ...state, login_charging: true, error: false };

    case LOGIN_ERROR:
      return { ...state, error: action.payload, login_charging: false };

    case RESET_STATE:
      return {
        ...state,
        userLogged: localStorage.getItem('sesion')
          ? JSON.parse(localStorage.getItem('sesion'))
          : null,
        login_charging: false,
        error: false
      };

    case RESET_STORE:
      console.log('reset');
      state = undefined;
      return appReducer(state, action);

    default:
      return state;
  }
};
