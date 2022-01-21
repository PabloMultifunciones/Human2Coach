import axios from 'axios';
import environment from '../libs/environment';

export default {
  getPlans: (number = 1, size = 7, position) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan?_number=${number}&_size=${size}${
        position && position !== 3 ? '&isLast=true' : ''
      }${position && position === 1 ? '&user.position=2' : ''}`
    }),

  getPlan: (id) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan/${id}`
    }),

  filterPlans: (number = 1, filter = '', size = 7, userId = '') =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan?_number=${number}&_size=${size}${
        filter && filter !== '' ? `&user.textSearch_like=%25${filter}%25` : ''
      }${userId && userId !== '' && userId !== 'ALL' ? `&user.id=${userId}` : ''}`
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

  updateOnlyReceivePlan: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/plan/onlyrecive`,
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
