import * as plansTypes from '../types/plansTypes';

const { RESET_STATE, SET_PLANS_METRICS_TABLE, RESET_STORE } = plansTypes;

const INITIAL_STATE = {
  metricsSelected: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PLANS_METRICS_TABLE:
      return {
        ...state,
        metricsSelected: action.payload
      };

    case RESET_STATE:
      return { ...state };

    case RESET_STORE:
      return {
        ...state,
        metricsSelected: []
      };

    default:
      return state;
  }
};
