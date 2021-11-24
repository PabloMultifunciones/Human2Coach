import * as plansTypes from '../types/plansTypes';

const { RESET_STATE, SET_PLANS_METRICS_TABLE } = plansTypes;

export const setMetricsSelected = (payload) => async (dispatch, getState) => {
  const { metricsSelected } = getState().plansReducer;
  const metricsUpdated = [payload, ...metricsSelected];

  dispatch({
    type: SET_PLANS_METRICS_TABLE,
    payload: metricsUpdated
  });
};

export const deleteMetricsSelected = (payload) => async (dispatch, getState) => {
  const { metricsSelected } = getState().plansReducer;
  const metricsFiltered = [...metricsSelected].filter((metric) => metric.id !== payload.id);

  dispatch({
    type: SET_PLANS_METRICS_TABLE,
    payload: metricsFiltered
  });
};

export const resetState = () => async (dispatch) => {
  dispatch({
    type: RESET_STATE
  });
};
