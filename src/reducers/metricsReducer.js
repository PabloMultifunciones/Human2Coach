import * as metricsTypes from '../types/metricsTypes';

const {
  RESET_STATE,
  METRICS_LIST_REQUEST,
  METRICS_LIST_FILTER_REQUEST,
  METRICS_LIST_SAVE,
  METRICS_LIST_UPDATE,
  METRICS_LIST_DELETE,
  METRICS_LIST_DELETE_FILTERED,
  METRICS_LIST_CHARGING,
  METRICS_SAVE_CHARGING,
  METRICS_LIST_FILTERED_CHARGING,
  METRICS_LIST_ERROR,
  METRICS_LIST_SAVED
} = metricsTypes;

const INITIAL_STATE = {
  metrics: [],
  metrics_filtered: [],
  error_metrics: false,
  metrics_charging: false,
  metrics_save_charging: false,
  totalElements: 0,
  totalElements_filtered: 0,
  filter: '',
  pages: [],
  pagesFiltered: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case METRICS_LIST_REQUEST:
      return {
        ...state,
        metrics_charging: false,
        metrics: [...state.pages].includes(action.payload.number)
          ? [...state.metrics]
          : [...state.metrics, ...action.payload.content],
        totalElements: action.payload.totalElements,
        pages: [...state.pages].includes(action.payload.number)
          ? [...state.pages]
          : [...state.pages, action.payload.number],
        error_metrics: false
      };
    case METRICS_LIST_FILTER_REQUEST:
      return {
        ...state,
        metrics_charging: false,
        metrics_filtered:
          [...state.pages].includes(action.payload.number) &&
          state.filter === action.payload.filterName
            ? [...state.metrics_filtered]
            : [...state.metrics_filtered, ...action.payload.content],
        totalElements_filtered: action.payload.totalElements,
        pagesFiltered:
          [...state.pagesFiltered].includes(action.payload.number) &&
          state.filter === action.payload.filterName
            ? [...state.pagesFiltered]
            : [...state.pagesFiltered, action.payload.number],
        filter: action.payload.filterName,
        error_metrics: false
      };

    case METRICS_LIST_SAVE:
      return {
        ...state,
        metrics: action.payload,
        error_metrics: false,
        metrics_save_charging: false
      };
    case METRICS_LIST_UPDATE:
      return {
        ...state,
        metrics: action.payload,
        error_metrics: false,
        metrics_save_charging: false
      };
    case METRICS_LIST_DELETE:
      return {
        ...state,
        metrics: [...state.metrics].filter((user) => user.id !== action.payload),
        metrics_charging: false,
        totalElements: state.totalElements - 1,
        error_metrics: false
      };
    case METRICS_LIST_DELETE_FILTERED:
      return {
        ...state,
        metrics: [...state.metrics_filtered].filter((user) => user.id !== action.payload),
        totalElements_filtered: state.totalElements_filtered - 1,
        metrics_charging: false,
        error_metrics: false
      };

    case METRICS_LIST_CHARGING:
      return { ...state, metrics_charging: true, error_metrics: false };

    case METRICS_SAVE_CHARGING:
      return { ...state, metrics_save_charging: true, error_metrics: false };

    case METRICS_LIST_FILTERED_CHARGING:
      return {
        ...state,
        metrics_filtered: [],
        metrics_charging: true,
        error_metrics: false
      };

    case METRICS_LIST_ERROR:
      return {
        ...state,
        error_metrics: action.payload,
        metrics_charging: false,
        metrics_save_charging: false
      };

    case METRICS_LIST_SAVED:
      return { ...state, metrics_charging: false, error_metrics: false };

    case RESET_STATE:
      return {
        ...state,
        error_metrics: false,
        metrics_charging: false,
        metrics_save_charging: false
      };

    default:
      return state;
  }
};
