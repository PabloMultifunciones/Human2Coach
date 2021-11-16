import * as usersTypes from '../types/usersTypes';

const {
  RESET_STATE,
  USERS_LIST_REQUEST,
  USERS_LIST_FILTER_REQUEST,
  USERS_LIST_SAVE,
  USERS_LIST_UPDATE,
  USERS_LIST_DELETE,
  USERS_LIST_DELETE_FILTERED,
  USERS_LIST_CHARGING,
  USERS_SAVE_CHARGING,
  USERS_LIST_FILTERED_CHARGING,
  USERS_LIST_ERROR,
  USERS_LIST_SAVED
} = usersTypes;

const INITIAL_STATE = {
  users: [],
  users_filtered: [],
  error_users: false,
  users_charging: false,
  users_save_charging: false,
  totalElements: 0,
  totalElements_filtered: 0,
  filter: '',
  pages: [],
  pagesFiltered: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return {
        ...state,
        users_charging: false,
        users: [...state.pages].includes(action.payload.number)
          ? [...state.users]
          : [...state.users, ...action.payload.content],
        totalElements: action.payload.totalElements,
        pages: [...state.pages].includes(action.payload.number)
          ? [...state.pages]
          : [...state.pages, action.payload.number],
        error_users: false
      };
    case USERS_LIST_FILTER_REQUEST:
      return {
        ...state,
        users_charging: false,
        users_filtered:
          [...state.pages].includes(action.payload.number) &&
          state.filter === action.payload.filterName
            ? [...state.users_filtered]
            : [...state.users_filtered, ...action.payload.content],
        totalElements_filtered: action.payload.totalElements,
        pagesFiltered:
          [...state.pagesFiltered].includes(action.payload.number) &&
          state.filter === action.payload.filterName
            ? [...state.pagesFiltered]
            : [...state.pagesFiltered, action.payload.number],
        filter: action.payload.filterName,
        error_users: false
      };

    case USERS_LIST_SAVE:
      return {
        ...state,
        users: action.payload,
        users_charging: false,
        error_users: false,
        users_save_charging: false
      };
    case USERS_LIST_UPDATE:
      return {
        ...state,
        users: action.payload,
        users_charging: false,
        error_users: false,
        users_save_charging: false
      };
    case USERS_LIST_DELETE:
      return {
        ...state,
        users: [...state.users].filter((user) => user.id !== action.payload),
        users_charging: false,
        totalElements: state.totalElements - 1,
        error_users: false
      };
    case USERS_LIST_DELETE_FILTERED:
      return {
        ...state,
        users: [...state.users_filtered].filter((user) => user.id !== action.payload),
        totalElements_filtered: state.totalElements_filtered - 1,
        users_charging: false,
        error_users: false
      };

    case USERS_LIST_CHARGING:
      return { ...state, users_charging: true, error_users: false };

    case USERS_SAVE_CHARGING:
      return { ...state, users_save_charging: true, error_users: false };

    case USERS_LIST_FILTERED_CHARGING:
      return {
        ...state,
        users_filtered: [],
        users_charging: true,
        error_users: false
      };

    case USERS_LIST_ERROR:
      return {
        ...state,
        error_users: action.payload,
        users_charging: false,
        users_save_charging: false
      };

    case USERS_LIST_SAVED:
      return { ...state, users_charging: false, error_users: false };

    case RESET_STATE:
      return {
        ...state,
        error_users: false,
        users_charging: false,
        users_save_charging: false
      };

    default:
      return state;
  }
};
