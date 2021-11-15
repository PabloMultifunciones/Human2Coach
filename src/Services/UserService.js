import axios from 'axios';
import environment from '../libs/environment';

export default {
  getUsers: (number = 0, size = 7, order = 'desc') =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?_number=${number}&_size=${size}&_sort=created_${order}`
    }),

  filterUsers: (number = 1, filter = '', size = 7, order = 'desc') =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?_number=${number}&_size=${size}&username_like=%25${filter}%25&_sort=created_${order}`
    }),

  saveUser: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/user`,
      data
    }),

  updateUser: (data) =>
    axios({
      method: 'PUT',
      url: `${environment.motivarnosBackend}/user`,
      data
    }),

  deleteUser: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.motivarnosBackend}/user/${id}`
    }),
  setImportUser: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/importuser/loadfile`,
      data,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }),

  getImportUsers: (number = 1, size = 5) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/importuser?_number=${number - 1}&_size=${size}`
    }),

  saveImportUser: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/importuser/importdata`,
      data
    }),

  updateImportUser: (data) =>
    axios({
      method: 'PUT',
      url: `${environment.motivarnosBackend}/importuser`,
      data
    }),

  deleteImportUser: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.motivarnosBackend}/importuser/${id}`
    })
};
