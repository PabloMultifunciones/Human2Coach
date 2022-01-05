import * as plansTypes from '../types/plansTypes';
import * as generalTypes from '../types/generalTypes';

import PlanService from '../Services/PlanService';

const {
  RESET_STATE,
  PLAN_SELECTED,
  SET_PLANS_METRICS_TABLE,
  PLANS_LIST_REQUEST,
  PLANS_LIST_FILTER_REQUEST,
  PLANS_LIST_SAVE,
  PLANS_LIST_UPDATE,
  PLANS_LIST_DELETE,
  PLANS_LIST_DELETE_FILTERED,
  PLANS_LIST_CHARGING,
  PLANS_SAVE_CHARGING,
  PLANS_LIST_FILTERED_CHARGING,
  PLANS_LIST_ERROR,
  PLANS_LIST_SAVED
} = plansTypes;

const { COLLABORATOR_LIST_REQUEST } = generalTypes;

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

export const getPlansRequest = (payload) => async (dispatch, getState) => {
  const { userLogged } = getState().loginReducer;

  try {
    const { pages } = getState().plansReducer;
    if (!pages.includes(payload.number)) {
      dispatch({
        type: PLANS_LIST_CHARGING
      });
      const responseLogin = await PlanService.getPlans(
        payload.number,
        userLogged.user.position === 3 ? 10 : 7,
        payload.position
      );
      dispatch({
        type: PLANS_LIST_REQUEST,
        payload: { ...responseLogin.data }
      });
    } else {
      dispatch({
        type: PLANS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const getPlanRequest = (payload) => async (dispatch, getState) => {
  try {
    const { plans } = getState().plansReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === parseInt(payload, 10);
    const index = plansUpdated.findIndex(findById);

    if (index === -1) {
      dispatch({
        type: PLANS_LIST_CHARGING
      });
      const responsePlan = await PlanService.getPlan(payload);

      dispatch({
        type: PLAN_SELECTED,
        payload: { ...responsePlan.data }
      });

      return { ...responsePlan.data };
    }

    dispatch({
      type: PLAN_SELECTED,
      payload: plansUpdated[index]
    });

    return plansUpdated[index];
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return false;
  }
};

export const getPlansFilterRequest = (payload) => async (dispatch, getState) => {
  try {
    const { pagesFiltered, filter, userId } = getState().plansReducer;
    if (
      !pagesFiltered.includes(payload.number) ||
      filter !== payload.filterName ||
      userId !== payload.userId
    ) {
      dispatch({
        type:
          filter !== payload.filterName && userId !== payload.userId
            ? PLANS_LIST_FILTERED_CHARGING
            : PLANS_LIST_CHARGING
      });

      const responseLogin = await PlanService.filterPlans(
        payload.number,
        payload.filterName,
        7,
        payload.userId
      );

      dispatch({
        type: PLANS_LIST_FILTER_REQUEST,
        payload: { ...responseLogin.data, filterName: payload.filterName }
      });
    } else {
      dispatch({
        type: PLANS_LIST_SAVED
      });
    }
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
  }
};

export const savePlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_SAVE_CHARGING
  });

  try {
    const responsePlan = await PlanService.savePlan(payload);
    const { plans } = getState().plansReducer;
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
      type: PLANS_LIST_SAVE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const saveSendedPlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_SAVE_CHARGING
  });

  try {
    const responsePlan = await PlanService.updateSendedPlan(payload);
    const { plans } = getState().plansReducer;
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
      type: PLANS_LIST_SAVE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updatePlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_SAVE_CHARGING
  });

  try {
    await PlanService.updatePlan(payload);
    const { plans } = getState().plansReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === payload.id;
    const index = plansUpdated.findIndex(findById);
    plansUpdated[index] = {
      ...plansUpdated[index],
      ...payload
    };

    dispatch({
      type: PLANS_LIST_UPDATE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updateStatePlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_SAVE_CHARGING
  });

  try {
    if (payload.status === 'SENDED') {
      await PlanService.updateSendedPlan(payload);
    } else {
      await PlanService.updateAckowlegePlan(payload);
    }
    const { plans } = getState().plansReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === payload.id;
    const index = plansUpdated.findIndex(findById);
    plansUpdated[index] = {
      ...plansUpdated[index],
      ...payload
    };

    dispatch({
      type: PLANS_LIST_UPDATE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const updateStateCheckboxPlanRequest = (payload) => async (dispatch, getState) => {
  dispatch({
    type: PLANS_SAVE_CHARGING
  });

  try {
    await PlanService.updateOnlyReceivePlan(payload);
    const { plans } = getState().plansReducer;

    const plansUpdated = [...plans];
    const findById = (plan) => plan.id === payload.id;
    const index = plansUpdated.findIndex(findById);
    plansUpdated[index] = {
      ...plansUpdated[index],
      ...payload
    };

    dispatch({
      type: PLANS_LIST_UPDATE,
      payload: plansUpdated
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
      payload: error.response ? error.response.data : error
    });
    return 'ERROR';
  }
};

export const deletePlanRequest = (payload) => async (dispatch) => {
  dispatch({
    type: PLANS_LIST_CHARGING
  });

  try {
    await PlanService.deletePlan(payload.id);

    dispatch({
      type: payload.filterName === '' ? PLANS_LIST_DELETE : PLANS_LIST_DELETE_FILTERED,
      payload: payload.id
    });
    return 'SUCCESS';
  } catch (error) {
    dispatch({
      type: PLANS_LIST_ERROR,
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
