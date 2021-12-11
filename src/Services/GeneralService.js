import axios from 'axios';
import environment from '../libs/environment';

export default {
  getTeams: () =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/team?_size=${999}`
    }),

  getSecondaryTeams: () =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/secondaryteam?_size=${999}`
    }),

  getUsers: () =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user/compact?_size=${999}&_sort=name_desc`
    }),

  getPreferences: () =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user/preference`
    }),

  savePreferences: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/user/preference`,
      data
    }),
  savePassword: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/user/changepassword`,
      data
    }),

  getCollaborators: (number = 0, size = 7, order = 'desc') =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?position=3&_number=${number}&_size=${size}&_sort=created_${order}`
    })
};
