import axios from 'axios';
import environment from '../libs/environment';

export default {
  uploadFile: (data, folder, name) => {
    let paramstr = '';
    const param = {};
    if (folder) {
      param.folder = folder;
    }

    if (name) {
      param.name = name;
    }

    if (folder || name) {
      paramstr = Object.entries(param)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
      if (paramstr) {
        paramstr = `?${paramstr}`;
      }
    }
    return axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/file/upload${paramstr}`,
      data,
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },
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
      url: `${
        environment.motivarnosBackend
      }/user/compact?_size=${999}&isActive=true&_sort=name_desc`
    }),

  getUsersManagers: () =>
    axios({
      method: 'GET',
      url: `${
        environment.motivarnosBackend
      }/user/all?_size=${999}&isActive=true&position=1&_sort=name_desc`
    }),

  getUsersLeaders: () =>
    axios({
      method: 'GET',
      url: `${
        environment.motivarnosBackend
      }/user/all?_size=${999}&isActive=true&position=2&_sort=name_desc`
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

  getCollaborators: (
    number = 0,
    size = 7,
    order = 'desc' // To Team leader
  ) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?position=3&_number=${number}&_size=${size}&_sort=created_${order}`
    }),

  getLeaders: (
    number = 0,
    size = 7,
    order = 'desc' // To Team manager
  ) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?position=2&_number=${number}&_size=${size}&_sort=created_${order}`
    }),

  getLeadersCollaborators: (
    number = 0,
    size = 7,
    order = 'desc' // To Team manager
  ) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?position_in=3,2&_number=${number}&_size=${size}&_sort=created_${order}`
    }),

  getCollaboratorsByLeaders: (
    number = 0,
    size = 7,
    order = 'desc', // To Team manager
    userId
  ) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?position_in=3&teamLeader.id=${userId}&_number=${number}&_size=${size}&_sort=created_${order}`
    })
};
