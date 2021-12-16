import * as dashboardTypes from '../types/dashboardTypes';

import DashboardService from '../Services/DashboardService';

const {
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

export const getMetricsOneRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesOne } = getState().dashboardReducer;
    if (!pagesOne.includes(payload.number)) {
      dispatch({
        type: METRICS_ONE_LIST_CHARGING
      });
      const responseLogin = await DashboardService.getDashboardMetrics(
        true,
        false,
        false,
        payload.number
      );
      dispatch({
        type: METRICS_ONE_LIST_REQUEST,
        payload: { ...responseLogin.data }
      });
    } else {
      dispatch({
        type: METRICS_ONE_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_ONE_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsOneFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesOneFiltered, filterOne } = getState().dashboardReducer;
    if (!pagesOneFiltered.includes(payload.number) || filterOne !== payload.filterOne) {
      dispatch({
        type:
          filterOne !== payload.filterOne
            ? METRICS_ONE_LIST_FILTERED_CHARGING
            : METRICS_ONE_LIST_CHARGING
      });

      const responseLogin = await DashboardService.getDashboardMetricsFiltered(
        payload.filterOne,
        true,
        false,
        false,
        payload.number
      );
      dispatch({
        type: METRICS_ONE_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterOne: payload.filterOne }
      });
    } else {
      dispatch({
        type: METRICS_ONE_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_ONE_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};
