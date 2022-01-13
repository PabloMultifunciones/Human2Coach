import * as dashboardTypes from '../types/dashboardTypes';

const {
  RESET_STATE,
  RESET_STORE,
  METRICS_RESUME_LIST_REQUEST,
  METRICS_RESUME_LIST_FILTER_REQUEST,
  METRICS_RESUME_LIST_CHARGING,
  METRICS_RESUME_LIST_FILTERED_CHARGING,
  METRICS_RESUME_LIST_ERROR,
  METRICS_RESUME_LIST_SAVED,
  METRICS_ONE_LIST_REQUEST,
  METRICS_ONE_LIST_FILTER_REQUEST,
  METRICS_ONE_LIST_CHARGING,
  METRICS_ONE_LIST_FILTERED_CHARGING,
  METRICS_ONE_LIST_ERROR,
  METRICS_ONE_LIST_SAVED,
  METRICS_PDS_LIST_REQUEST,
  METRICS_PDS_LIST_FILTER_REQUEST,
  METRICS_PDS_LIST_CHARGING,
  METRICS_PDS_LIST_FILTERED_CHARGING,
  METRICS_PDS_LIST_ERROR,
  METRICS_PDS_LIST_SAVED,
  METRICS_PIP_LIST_REQUEST,
  METRICS_PIP_LIST_FILTER_REQUEST,
  METRICS_PIP_LIST_CHARGING,
  METRICS_PIP_LIST_FILTERED_CHARGING,
  METRICS_PIP_LIST_ERROR,
  METRICS_PIP_LIST_SAVED
} = dashboardTypes;

const INITIAL_STATE = {
  metricsResume: [],
  filterResume: '',
  metricsResume_filtered: [],
  pagesResume: [],
  pagesResumeFiltered: [],
  error_metricsResume: false,
  metricsResume_charging: false,
  totalElementsResume: 0,
  totalElementsResume_filtered: 0,

  metricsOne: [],
  filterOne: '',
  metricsOne_filtered: [],
  pagesOne: [],
  pagesOneFiltered: [],
  error_metricsOne: false,
  metricsOne_charging: false,
  totalElementsOne: 0,
  totalElementsOne_filtered: 0,

  metricsPip: [],
  filterPip: '',
  metricsPip_filtered: [],
  pagesPip: [],
  pagesPipFiltered: [],
  error_metricsPip: false,
  metricsPip_charging: false,
  totalElementsPip: 0,
  totalElementsPip_filtered: 0,

  metricsPds: [],
  filterPds: '',
  metricsPds_filtered: [],
  pagesPds: [],
  pagesPdsFiltered: [],
  error_metricsPds: false,
  metricsPds_charging: false,
  totalElementsPds: 0,
  totalElementsPds_filtered: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case METRICS_RESUME_LIST_REQUEST:
      return {
        ...state,
        metricsResume_charging: false,
        metricsResume: [...state.pagesResume].includes(action.payload.number)
          ? [...state.metricsResume]
          : [...state.metricsResume, ...action.payload.content],
        totalElementsResume: action.payload.totalElements,
        pagesResume: [...state.pagesResume].includes(action.payload.number)
          ? [...state.pagesResume]
          : [...state.pagesResume, action.payload.number],
        error_metricsResume: false
      };

    case METRICS_RESUME_LIST_FILTER_REQUEST:
      return {
        ...state,
        metricsResume_charging: false,
        metricsResume_filtered:
          [...state.pagesResumeFiltered].includes(action.payload.number) &&
          state.filterResume === action.payload.filterResume
            ? [...state.metricsResume_filtered]
            : [...state.metricsResume_filtered, ...action.payload.content],
        totalElementsResume_filtered: action.payload.totalElements,
        pagesResumeFiltered:
          [...state.pagesResumeFiltered].includes(action.payload.number) &&
          state.filterResume === action.payload.filterResume
            ? [...state.pagesResumeFiltered]
            : [...state.pagesResumeFiltered, action.payload.number],
        filterResume: action.payload.filterResume,
        error_metricsResume: false
      };

    case METRICS_RESUME_LIST_CHARGING:
      return { ...state, metricsResume_charging: true, error_metricsResume: false };

    case METRICS_RESUME_LIST_ERROR:
      return {
        ...state,
        error_metricsResume: action.payload,
        metricsResume_charging: false
      };

    case METRICS_RESUME_LIST_FILTERED_CHARGING:
      return {
        ...state,
        metricsResume_filtered: [],
        metricsResume_charging: true,
        error_metricsResume: false
      };

    case METRICS_RESUME_LIST_SAVED:
      return { ...state, metricsResume_charging: false, error_metricsResume: false };

    case METRICS_ONE_LIST_REQUEST:
      return {
        ...state,
        metricsOne_charging: false,
        metricsOne: [...state.pagesOne].includes(action.payload.number)
          ? [...state.metricsOne]
          : [...state.metricsOne, ...action.payload.content],
        totalElementsOne: action.payload.totalElements,
        pagesOne: [...state.pagesOne].includes(action.payload.number)
          ? [...state.pagesOne]
          : [...state.pagesOne, action.payload.number],
        error_metricsOne: false
      };

    case METRICS_ONE_LIST_FILTER_REQUEST:
      return {
        ...state,
        metricsOne_charging: false,
        metricsOne_filtered:
          [...state.pagesOneFiltered].includes(action.payload.number) &&
          state.filterOne === action.payload.filterOne
            ? [...state.metricsOne_filtered]
            : [...state.metricsOne_filtered, ...action.payload.content],
        totalElementsOne_filtered: action.payload.totalElements,
        pagesOneFiltered:
          [...state.pagesOneFiltered].includes(action.payload.number) &&
          state.filterOne === action.payload.filterOne
            ? [...state.pagesOneFiltered]
            : [...state.pagesOneFiltered, action.payload.number],
        filterOne: action.payload.filterOne,
        error_metricsOne: false
      };

    case METRICS_ONE_LIST_CHARGING:
      return { ...state, metricsOne_charging: true, error_metricsOne: false };

    case METRICS_ONE_LIST_ERROR:
      return {
        ...state,
        error_metricsOne: action.payload,
        metricsOne_charging: false
      };

    case METRICS_ONE_LIST_FILTERED_CHARGING:
      return {
        ...state,
        metricsOne_filtered: [],
        metricsOne_charging: true,
        error_metricsOne: false
      };

    case METRICS_ONE_LIST_SAVED:
      return { ...state, metricsOne_charging: false, error_metricsOne: false };

    case METRICS_PIP_LIST_REQUEST:
      return {
        ...state,
        metricsPip_charging: false,
        metricsPip: [...state.pagesPip].includes(action.payload.number)
          ? [...state.metricsPip]
          : [...state.metricsPip, ...action.payload.content],
        totalElementsPip: action.payload.totalElements,
        pagesPip: [...state.pagesPip].includes(action.payload.number)
          ? [...state.pagesPip]
          : [...state.pagesPip, action.payload.number],
        error_metricsPip: false
      };

    case METRICS_PIP_LIST_FILTER_REQUEST:
      return {
        ...state,
        metricsPip_charging: false,
        metricsPip_filtered:
          [...state.pagesPipFiltered].includes(action.payload.number) &&
          state.filterPip === action.payload.filterPip
            ? [...state.metricsPip_filtered]
            : [...state.metricsPip_filtered, ...action.payload.content],
        totalElementsPip_filtered: action.payload.totalElements,
        pagesPipFiltered:
          [...state.pagesPipFiltered].includes(action.payload.number) &&
          state.filterPip === action.payload.filterPip
            ? [...state.pagesPipFiltered]
            : [...state.pagesPipFiltered, action.payload.number],
        filterPip: action.payload.filterPip,
        error_metricsPip: false
      };

    case METRICS_PIP_LIST_CHARGING:
      return { ...state, metricsPip_charging: true, error_metricsPip: false };

    case METRICS_PIP_LIST_ERROR:
      return {
        ...state,
        error_metricsPip: action.payload,
        metricsPip_charging: false
      };

    case METRICS_PIP_LIST_FILTERED_CHARGING:
      return {
        ...state,
        metricsPip_filtered: [],
        metricsPip_charging: true,
        error_metricsPip: false
      };

    case METRICS_PIP_LIST_SAVED:
      return { ...state, metricsPip_charging: false, error_metricsPip: false };

    case METRICS_PDS_LIST_REQUEST:
      return {
        ...state,
        metricsPds_charging: false,
        metricsPds: [...state.pagesPds].includes(action.payload.number)
          ? [...state.metricsPds]
          : [...state.metricsPds, ...action.payload.content],
        totalElementsPds: action.payload.totalElements,
        pagesPds: [...state.pagesPds].includes(action.payload.number)
          ? [...state.pagesPds]
          : [...state.pagesPds, action.payload.number],
        error_metricsPds: false
      };

    case METRICS_PDS_LIST_FILTER_REQUEST:
      return {
        ...state,
        metricsPds_charging: false,
        metricsPds_filtered:
          [...state.pagesPdsFiltered].includes(action.payload.number) &&
          state.filterPds === action.payload.filterPds
            ? [...state.metricsPds_filtered]
            : [...state.metricsPds_filtered, ...action.payload.content],
        totalElementsPds_filtered: action.payload.totalElements,
        pagesPdsFiltered:
          [...state.pagesPdsFiltered].includes(action.payload.number) &&
          state.filterPds === action.payload.filterPds
            ? [...state.pagesPdsFiltered]
            : [...state.pagesPdsFiltered, action.payload.number],
        filterPds: action.payload.filterPds,
        error_metricsPds: false
      };

    case METRICS_PDS_LIST_CHARGING:
      return { ...state, metricsPds_charging: true, error_metricsPds: false };

    case METRICS_PDS_LIST_ERROR:
      return {
        ...state,
        error_metricsPds: action.payload,
        metricsPds_charging: false
      };

    case METRICS_PDS_LIST_FILTERED_CHARGING:
      return {
        ...state,
        metricsPds_filtered: [],
        metricsPds_charging: true,
        error_metricsPds: false
      };

    case METRICS_PDS_LIST_SAVED:
      return { ...state, metricsPds_charging: false, error_metricsPds: false };

    case RESET_STATE:
      return {
        ...state,
        error_metricsOne: false,
        metricsOne_charging: false,
        error_metricsPip: false,
        metricsPip_charging: false,
        error_metricsPds: false,
        metricsPds_charging: false
      };

    case RESET_STORE:
      return {
        ...state,
        metricsOne: [],
        filterOne: '',
        metricsOne_filtered: [],
        pagesOne: [],
        pagesOneFiltered: [],
        error_metricsOne: false,
        metricsOne_charging: false,
        totalElementsOne: 0,
        totalElementsOne_filtered: 0,

        metricsPip: [],
        filterPip: '',
        metricsPip_filtered: [],
        pagesPip: [],
        pagesPipFiltered: [],
        error_metricsPip: false,
        metricsPip_charging: false,
        totalElementsPip: 0,
        totalElementsPip_filtered: 0,

        metricsPds: [],
        filterPds: '',
        metricsPds_filtered: [],
        pagesPds: [],
        pagesPdsFiltered: [],
        error_metricsPds: false,
        metricsPds_charging: false,
        totalElementsPds: 0,
        totalElementsPds_filtered: 0
      };

    default:
      return state;
  }
};
