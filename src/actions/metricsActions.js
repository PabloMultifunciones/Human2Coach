import * as metricsTypes from '../types/metricsTypes';
import * as generalTypes from '../types/generalTypes';

import MetricService from '../Services/MetricService';

const {
  RESET_STATE,
  METRICS_COLLABORATOR_LIST_REQUEST,
  METRICS_COLLABORATORS_LIST_UPDATE,
  METRICS_LIST_CHARGING,
  METRICS_SAVE_CHARGING,
  METRICS_LIST_REQUEST,
  METRICS_LIST_FILTER_REQUEST,
  METRICS_LIST_FILTERED_CHARGING,
  METRICS_LIST_SAVE,
  METRICS_LIST_UPDATE,
  METRICS_LIST_DELETE,
  METRICS_LIST_DELETE_FILTERED,
  METRICS_LIST_ERROR,
  METRICS_LIST_SAVED,
  METRICS_IMPORT_CHARGING,
  METRICS_IMPORT_ERROR
} = metricsTypes;

const { USERS_REQUEST } = generalTypes;

export const getMetricsCollaboratorRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesCollaborators } = getState().metricsReducer;
    if (!pagesCollaborators.includes(payload.number)) {
      dispatch({
        type: METRICS_LIST_CHARGING
      });
      const responseLogin = await MetricService.getMetricsCollaborator(
        payload.number,
        7,
        payload.id
      );
      dispatch({
        type: METRICS_COLLABORATOR_LIST_REQUEST,
        payload: { ...responseLogin.data }
      });
    } else {
      dispatch({
        type: METRICS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pages } = getState().metricsReducer;
    if (!pages.includes(payload.number)) {
      dispatch({
        type: METRICS_LIST_CHARGING
      });
      const responseLogin = await MetricService.getMetrics(payload.number);
      dispatch({
        type: METRICS_LIST_REQUEST,
        payload: { ...responseLogin.data }
      });
    } else {
      dispatch({
        type: METRICS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getMetricsFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesFiltered, filter } = getState().metricsReducer;
    if (!pagesFiltered.includes(payload.number) || filter !== payload.filterName) {
      dispatch({
        type: filter !== payload.filterName ? METRICS_LIST_FILTERED_CHARGING : METRICS_LIST_CHARGING
      });

      const responseLogin = await MetricService.filterMetrics(payload.number, payload.filterName);
      dispatch({
        type: METRICS_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterName: payload.filterName }
      });
    } else {
      dispatch({
        type: METRICS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const saveMetricRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: METRICS_SAVE_CHARGING
  });

  try {
    const responseLogin = await MetricService.saveMetric(payload);
    const { metrics } = getState().metricsReducer;
    const metricsUpdated = [responseLogin.data, ...metrics];

    dispatch({
      type: METRICS_LIST_SAVE,
      payload: metricsUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updateMetricRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: METRICS_SAVE_CHARGING
  });

  try {
    await MetricService.updateMetric(payload);
    const { metrics } = getState().metricsReducer;

    const metricsUpdated = [...metrics];
    const findById = (metric) => metric.id === payload.id;
    const index = metricsUpdated.findIndex(findById);
    metricsUpdated[index] = {
      ...metricsUpdated[index],
      ...payload
    };

    dispatch({
      type: METRICS_LIST_UPDATE,
      payload: metricsUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updateMetricData = (payload) => async (dispatch, getState) => {
  dispatch({
    type: METRICS_SAVE_CHARGING
  });

  try {
    const metricsData = getState().metricsReducer;

    const metricsUpdated = [...metricsData.metrics_collaborators];

    metricsUpdated[payload.index] = {
      ...metricsUpdated[payload.index],
      dataTwo: payload.data
    };

    dispatch({
      type: METRICS_COLLABORATORS_LIST_UPDATE,
      payload: metricsUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const deleteMetricRequest = (payload) => async (dispatch) => {
  dispatch({
    type: METRICS_LIST_CHARGING
  });

  try {
    await MetricService.deleteMetric(payload.id);

    dispatch({
      type: payload.filterName === '' ? METRICS_LIST_DELETE : METRICS_LIST_DELETE_FILTERED,
      payload: payload.id
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};
export const setImportMetricRequest = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: METRICS_LIST_CHARGING
    });
    const responseLogin = await MetricService.setImportMetric(payload);

    dispatch({
      type: RESET_STATE
    });
    return { status: 'SUCCESS', responseLogin };
  } catch (error) {
    dispatch({
      type: METRICS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const savePreImportMetricRequest = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: METRICS_IMPORT_CHARGING
    });
    await MetricService.savePreImportMetric(payload);
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: METRICS_IMPORT_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const resetState = () => async (dispatch, getState) => {
  // const stateMetrics = getState().metricsReducer;
  const { users } = getState().generalReducer;

  await dispatch({
    type: RESET_STATE
  });

  await dispatch({
    type: USERS_REQUEST,
    payload: users
  });
};
