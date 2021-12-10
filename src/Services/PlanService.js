import axios from 'axios';
import environment from '../libs/environment';

export default {
  getPlans: (number = 1, size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan?_number=${number}&_size=${size}`
    }),

  getPlan: (id) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan/${id}`
    }),

  filterPlans: (number = 1, filter = '', size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan?_number=${number}&_size=${size}&user.textSearch=%25${filter}%25`
    }),

  savePlan: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/plan`,
      data
    }),

  updatePlan: (data) =>
    axios({
      method: 'PUT',
      url: `${environment.motivarnosBackend}/plan`,
      data
    }),

  updateSendedPlan: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/plan/send`,
      data
    }),

  updateAckowlegePlan: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/plan/ackowlege`,
      data
    }),

  deletePlan: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.motivarnosBackend}/plan/${id}`
    })
};
