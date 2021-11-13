import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import generalReducer from './generalReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  loginReducer,
  generalReducer,
  usersReducer
});
