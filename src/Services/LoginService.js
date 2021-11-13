import axios from 'axios';
import environment from '../libs/environment';

export default {
  login: (payload) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/login`,
      data: payload
    }),
  loginTalkDesk: (payload) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/v1/integration/authurl/${payload.type}?companyName=${payload.company}`
    }),

  register: (payload) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/company/signup`,
      data: payload
    })
};
