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
    })
};
