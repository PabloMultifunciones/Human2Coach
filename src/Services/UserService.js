import axios from 'axios';
import environment from '../libs/environment';

export default {
  getUsers: (number = 0, size = 7, order = 'desc') =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?_number=${number}&_size=${size}&_sort=name_${order}`
    }),

  filterUsers: (number = 1, filter = '', size = 7, order = 'desc') =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/user?_number=${number}&_size=${size}&username_like=%25${filter}%25&_sort=name_${order}`
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
    })
};
