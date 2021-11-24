import axios from 'axios';
import environment from '../libs/environment';

export default {
  getParts: () =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/avatarpart`
    }),
  updateUser: (body) =>
    axios({
      method: 'PUT',
      url: `${environment.motivarnosBackend}/user`,
      data: body
    })
};
