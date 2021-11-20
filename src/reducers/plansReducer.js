import * as plansTypes from '../types/plansTypes';

const { RESET_STATE_PLANS, SET_PLANS_METRICS_TABLE } = plansTypes;

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

    case RESET_STATE_PLANS:
      return { ...state };

    default:
      return state;
  }
};
