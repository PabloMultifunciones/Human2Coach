import * as plansOwnTypes from '../types/plansOwnTypes';

const {
  RESET_STATE,
  PLAN_OWN_SELECTED,
  SET_PLANS_OWN_METRICS_TABLE,
  PLANS_OWN_LIST_REQUEST,
  PLANS_OWN_LIST_FILTER_REQUEST,
  PLANS_OWN_LIST_SAVE,
  PLANS_OWN_LIST_UPDATE,
  PLANS_OWN_LIST_DELETE,
  PLANS_OWN_LIST_DELETE_FILTERED,
  PLANS_OWN_LIST_CHARGING,
  PLANS_OWN_SAVE_CHARGING,
  PLANS_OWN_LIST_FILTERED_CHARGING,
  PLANS_OWN_LIST_ERROR,
  PLANS_OWN_LIST_SAVED,
  RESET_STORE
} = plansOwnTypes;

const INITIAL_STATE = {
  metricsSelected: [],
  plansSelected: false,
  plans: [],
  plans_filtered: [],
  error_plans: false,
  error_import_plans: false,
  plans_import_charging: false,
  plans_charging: false,
  plans_save_charging: false,
  totalElements: 0,
  totalElements_collaborators: 0,
  totalElements_filtered: 0,
  filter: '',
  userId: '',
  pages: [],
  pagesCollaborators: [],
  pagesFiltered: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PLANS_OWN_METRICS_TABLE:
      return {
        ...state,
        metricsSelected: action.payload
      };

    case PLAN_OWN_SELECTED:
      return {
        ...state,
        plansSelected: action.payload,
        plans_charging: false
      };

    case PLANS_OWN_LIST_REQUEST:
      return {
        ...state,
        plans_charging: false,
        plans: [...state.pages].includes(action.payload.number)
          ? [...state.plans]
          : [...state.plans, ...action.payload.content],
        totalElements: action.payload.totalElements,
        pages: [...state.pages].includes(action.payload.number)
          ? [...state.pages]
          : [...state.pages, action.payload.number],
        error_plans: false
      };

    case PLANS_OWN_LIST_FILTER_REQUEST:
      return {
        ...state,
        plans_charging: false,
        plans_filtered:
          [...state.pagesFiltered].includes(action.payload.number) &&
          state.filter === action.payload.filterName &&
          state.userId === action.payload.userId
            ? [...state.plans_filtered]
            : [...state.plans_filtered, ...action.payload.content],
        totalElements_filtered: action.payload.totalElements,
        pagesFiltered:
          [...state.pagesFiltered].includes(action.payload.number) &&
          state.filter === action.payload.filterName
            ? [...state.pagesFiltered]
            : [...state.pagesFiltered, action.payload.number],
        filter: action.payload.filterName,
        userId: action.payload.userId,
        error_plans: false
      };

    case PLANS_OWN_LIST_SAVE:
      return {
        ...state,
        plans: action.payload,
        error_plans: false,
        plans_save_charging: false
      };
    case PLANS_OWN_LIST_UPDATE:
      return {
        ...state,
        plans: action.payload,
        error_plans: false,
        plans_save_charging: false
      };
    case PLANS_OWN_LIST_DELETE:
      return {
        ...state,
        plans: [...state.plans].filter((plan) => plan.id !== action.payload),
        plans_charging: false,
        totalElements: state.totalElements - 1,
        error_plans: false
      };
    case PLANS_OWN_LIST_DELETE_FILTERED:
      return {
        ...state,
        plans: [...state.plans_filtered].filter((plan) => plan.id !== action.payload),
        totalElements_filtered: state.totalElements_filtered - 1,
        plans_charging: false,
        error_plans: false
      };

    case PLANS_OWN_LIST_CHARGING:
      return { ...state, plans_charging: true, error_plans: false };

    case PLANS_OWN_SAVE_CHARGING:
      return { ...state, plans_save_charging: true, error_plans: false };

    case PLANS_OWN_LIST_FILTERED_CHARGING:
      return {
        ...state,
        plans_filtered: [],
        plans_charging: true,
        error_plans: false
      };

    case PLANS_OWN_LIST_ERROR:
      return {
        ...state,
        error_plans: action.payload,
        plans_charging: false,
        plans_save_charging: false
      };

    case PLANS_OWN_LIST_SAVED:
      return { ...state, plans_charging: false, error_plans: false };

    case RESET_STATE:
      return { ...state, metricsSelected: [] };

    case RESET_STORE:
      return {
        ...state,
        metricsSelected: [],
        plansSelected: false,
        plans: [],
        plans_filtered: [],
        error_plans: false,
        error_import_plans: false,
        plans_import_charging: false,
        plans_charging: false,
        plans_save_charging: false,
        totalElements: 0,
        totalElements_collaborators: 0,
        totalElements_filtered: 0,
        filter: '',
        userId: '',
        pages: [],
        pagesCollaborators: [],
        pagesFiltered: []
      };

    default:
      return state;
  }
};
