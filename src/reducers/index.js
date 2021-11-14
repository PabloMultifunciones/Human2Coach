import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import generalReducer from './generalReducer';
import usersReducer from './usersReducer';
import metricsReducer from './metricsReducer';

export default combineReducers({
  loginReducer,
  generalReducer,
  usersReducer,
  metricsReducer
});
