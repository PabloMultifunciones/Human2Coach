import axios from 'axios';
import environment from '../libs/environment';

export default {
  getTeams: () =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/team?_size=${999}`
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
    })
};
