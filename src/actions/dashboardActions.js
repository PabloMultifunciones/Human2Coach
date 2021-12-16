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
    console.log(payload.number);
    if (!pagesOne.includes(payload.number)) {
      console.log('METRICS_ONE_LIST_CHARGING', pagesOne);
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
        payload: { ...responseLogin.data, number: payload.number }
      });
    } else {
      console.log('METRICS_ONE_LIST_SAVED', pagesOne);

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
        payload: { ...responseLogin.data, filterOne: payload.filterOne, number: payload.number }
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

export const getMetricsPdsRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesPds } = getState().dashboardReducer;
    if (!pagesPds.includes(payload.number)) {
      dispatch({
        type: METRICS_PDS_LIST_CHARGING
      });
      const responseLogin = await DashboardService.getDashboardMetrics(
        false,
        true,
        false,
        payload.number
      );
      dispatch({
        type: METRICS_PDS_LIST_REQUEST,
        payload: { ...responseLogin.data, number: payload.number }
      });
    } else {
      dispatch({
        type: METRICS_PDS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_PDS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsPdsFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesPdsFiltered, filterPds } = getState().dashboardReducer;
    if (!pagesPdsFiltered.includes(payload.number) || filterPds !== payload.filterPds) {
      dispatch({
        type:
          filterPds !== payload.filterPds
            ? METRICS_PDS_LIST_FILTERED_CHARGING
            : METRICS_PDS_LIST_CHARGING
      });

      const responseLogin = await DashboardService.getDashboardMetricsFiltered(
        payload.filterPds,
        false,
        true,
        false,
        payload.number
      );
      dispatch({
        type: METRICS_PDS_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterPds: payload.filterPds, number: payload.number }
      });
    } else {
      dispatch({
        type: METRICS_PDS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_PDS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsPipRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesPip } = getState().dashboardReducer;
    if (!pagesPip.includes(payload.number)) {
      dispatch({
        type: METRICS_PIP_LIST_CHARGING
      });
      const responseLogin = await DashboardService.getDashboardMetrics(
        false,
        false,
        true,
        payload.number
      );
      dispatch({
        type: METRICS_PIP_LIST_REQUEST,
        payload: { ...responseLogin.data, number: payload.number }
      });
    } else {
      dispatch({
        type: METRICS_PIP_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_PIP_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsPipFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesPipFiltered, filterPip } = getState().dashboardReducer;
    if (!pagesPipFiltered.includes(payload.number) || filterPip !== payload.filterPip) {
      dispatch({
        type:
          filterPip !== payload.filterPip
            ? METRICS_PIP_LIST_FILTERED_CHARGING
            : METRICS_PIP_LIST_CHARGING
      });

      const responseLogin = await DashboardService.getDashboardMetricsFiltered(
        payload.filterPip,
        false,
        false,
        true,
        payload.number
      );
      dispatch({
        type: METRICS_PIP_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterPip: payload.filterPip, number: payload.number }
      });
    } else {
      dispatch({
        type: METRICS_PIP_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_PIP_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};
