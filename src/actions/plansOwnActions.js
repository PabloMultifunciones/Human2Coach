import * as plansOwnTypes from '../types/plansOwnTypes';
import * as generalTypes from '../types/generalTypes';

import PlanService from '../Services/PlanService';

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
  PLANS_OWN_LIST_SAVED
} = plansOwnTypes;

const { COLLABORATOR_LIST_REQUEST } = generalTypes;

export const setMetricsSelected = (payload) => async (dispatch, getState) => {
  const { metricsSelected } = getState().plansOwnReducer;
  const metricsUpdated = [...metricsSelected, payload];

  dispatch({
    type: SET_PLANS_OWN_METRICS_TABLE,
    payload: metricsUpdated
  });
};
export const deleteMetricsSelected = (payload) => async (dispatch, getState) => {
  const { metricsSelected } = getState().plansOwnReducer;
  const metricsFiltered = [...metricsSelected].filter((metric) => metric.id !== payload.id);
  dispatch({
    type: SET_PLANS_OWN_METRICS_TABLE,
    payload: metricsFiltered
  });
};

export const getPlansRequest = (payload) => async (dispatch, getState) => {
  const { userLogged } = getState().loginReducer;

  try {
    const { pages } = getState().plansOwnReducer;
    if (!pages.includes(payload.number)) {
      dispatch({
        type: PLANS_OWN_LIST_CHARGING
      });
      const responseLogin = await PlanService.getPlansOwn(
        payload.number,
        userLogged.user.position === 3 ? 10 : 7,
        payload.position
      );
      dispatch({
        type: PLANS_OWN_LIST_REQUEST,
        payload: { ...responseLogin.data }
      });
    } else {
      dispatch({
        type: PLANS_OWN_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getPlanRequest = (payload) => async (dispatch, getState) => {
  try {
    const { plans } = getState().plansOwnReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === parseInt(payload, 10);
    const index = plansUpdated.findIndex(findById);

    if (index === -1) {
      dispatch({
        type: PLANS_OWN_LIST_CHARGING
      });
      const responsePlan = await PlanService.getPlan(payload);

      dispatch({
        type: PLAN_OWN_SELECTED,
        payload: { ...responsePlan.data }
      });

      return { ...responsePlan.data };
    }

    dispatch({
      type: PLAN_OWN_SELECTED,
      payload: plansUpdated[index]
    });

    return plansUpdated[index];
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return false;
  }
};

export const getPlansFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesFiltered, filter, userId } = getState().plansOwnReducer;
    if (
      !pagesFiltered.includes(payload.number) ||
      filter !== payload.filterName ||
      userId !== payload.userId
    ) {
      dispatch({
        type:
          filter !== payload.filterName && userId !== payload.userId
            ? PLANS_OWN_LIST_FILTERED_CHARGING
            : PLANS_OWN_LIST_CHARGING
      });

      const responseLogin = await PlanService.filterPlansOwn(
        payload.number,
        payload.filterName,
        7,
        payload.userId
      );

      dispatch({
        type: PLANS_OWN_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterName: payload.filterName }
      });
    } else {
      dispatch({
        type: PLANS_OWN_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const savePlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_OWN_SAVE_CHARGING
  });

  try {
    const responsePlan = await PlanService.savePlan(payload);
    const { plans } = getState().plansOwnReducer;
    const { collaborators } = getState().generalReducer;

    const plansUpdated = [{ ...responsePlan.data, metricConfs: payload.metricConfs }, ...plans];

    await dispatch({
      type: RESET_STATE
    });

    await dispatch({
      type: COLLABORATOR_LIST_REQUEST,
      payload: collaborators
    });

    dispatch({
      type: PLANS_OWN_LIST_SAVE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const saveSendedPlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_OWN_SAVE_CHARGING
  });

  try {
    const responsePlan = await PlanService.updateSendedPlan(payload);
    const { plans } = getState().plansOwnReducer;
    const { collaborators } = getState().generalReducer;

    const plansUpdated = [{ ...responsePlan.data, metricConfs: payload.metricConfs }, ...plans];

    await dispatch({
      type: RESET_STATE
    });

    await dispatch({
      type: COLLABORATOR_LIST_REQUEST,
      payload: collaborators
    });

    dispatch({
      type: PLANS_OWN_LIST_SAVE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updatePlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_OWN_SAVE_CHARGING
  });

  try {
    PlanService.updatePlan(payload);
    const { plans } = getState().plansOwnReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === payload.id;
    const index = plansUpdated.findIndex(findById);
    plansUpdated[index] = {
      ...plansUpdated[index],
      ...payload
    };

    dispatch({
      type: PLANS_OWN_LIST_UPDATE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updateStatePlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_OWN_SAVE_CHARGING
  });

  try {
    let responsePlan;
    if (payload.status === 'SENDED') {
      responsePlan = await PlanService.updateSendedPlan(payload);
    } else if (payload.status === 'UPDATE') {
      responsePlan = await PlanService.updatePlan({ ...payload, status: 'DRAFT' });
    } else {
      responsePlan = await PlanService.updateAckowlegePlan(payload);
    }
    const { plans } = getState().plansOwnReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === payload.id;
    const index = plansUpdated.findIndex(findById);
    plansUpdated[index] = {
      ...plansUpdated[index],
      ...responsePlan.data
    };

    dispatch({
      type: PLANS_OWN_LIST_UPDATE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updateStateCheckboxPlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_OWN_SAVE_CHARGING
  });

  try {
    await PlanService.updateOnlyReceivePlan(payload);
    const { plans } = getState().plansOwnReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === payload.id;
    const index = plansUpdated.findIndex(findById);
    plansUpdated[index] = {
      ...plansUpdated[index],
      ...payload
    };

    dispatch({
      type: PLANS_OWN_LIST_UPDATE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const deletePlanRequest = (payload) => async (dispatch) => {
  dispatch({
    type: PLANS_OWN_LIST_CHARGING
  });

  try {
    await PlanService.deletePlan(payload.id);

    dispatch({
      type: payload.filterName === '' ? PLANS_OWN_LIST_DELETE : PLANS_OWN_LIST_DELETE_FILTERED,
      payload: payload.id
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_OWN_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return { error: error.response };
  }
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE
  });
};
