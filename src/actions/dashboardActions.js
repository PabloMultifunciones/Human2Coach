import * as dashboardTypes from '../types/dashboardTypes';

import DashboardService from '../Services/DashboardService';

const {
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

export const getMetricsResumeRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesResume } = getState().dashboardReducer;
    if (!pagesResume.includes(payload.number)) {
      dispatch({
        type: METRICS_RESUME_LIST_CHARGING
      });
      const responseLogin = await DashboardService.getDashboardResumeMetrics(payload.number, 4);
      dispatch({
        type: METRICS_RESUME_LIST_REQUEST,
        payload: { ...responseLogin.data, number: payload.number }
      });
    } else {
      dispatch({
        type: METRICS_RESUME_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_RESUME_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsResumeFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesResumeFiltered, filterResume } = getState().dashboardReducer;
    if (!pagesResumeFiltered.includes(payload.number) || filterResume !== payload.filterResume) {
      dispatch({
        type:
          filterResume !== payload.filterResume
            ? METRICS_RESUME_LIST_FILTERED_CHARGING
            : METRICS_RESUME_LIST_CHARGING
      });

      const responseLogin = await DashboardService.getDashboardResumeMetricsFiltered(
        payload.filterResume,
        payload.number,
        4
      );
      dispatch({
        type: METRICS_RESUME_LIST_FILTER_REQUEST,
        payload: {
          ...responseLogin.data,
          filterResume: payload.filterResume,
          number: payload.number
        }
      });
    } else {
      dispatch({
        type: METRICS_RESUME_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_RESUME_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

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
        payload.number,
        4
      );
      dispatch({
        type: METRICS_ONE_LIST_REQUEST,
        payload: { ...responseLogin.data, number: payload.number }
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
        payload.number,
        4
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
        payload.number,
        4
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
        payload.number,
        4
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
        payload.number,
        4
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
        payload.number,
        4
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
