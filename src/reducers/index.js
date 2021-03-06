import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import generalReducer from './generalReducer';
import usersReducer from './usersReducer';
import metricsReducer from './metricsReducer';
import plansReducer from './plansReducer';
import plansOwnReducer from './plansOwnReducer';
import permissionsReducer from './permissionsReducer';

import avatarsReducer from './avatarsReducer';
import preferencesReducer from './preferencesReducer';
import dashboardReducer from './dashboardReducer';

export default combineReducers({
  loginReducer,
  generalReducer,
  usersReducer,
  metricsReducer,
  plansReducer,
  plansOwnReducer,
  permissionsReducer,
  avatarsReducer,
  preferencesReducer,
  dashboardReducer
});
