import axios from 'axios';

function AxiosConf() {
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['x-gamifica-app-id'] = 'human2coach-app';

  axios.interceptors.request.use(
    (config) => {
      const sesion = JSON.parse(localStorage.getItem('sesion'));
      // Edit request config
      config.headers.get['Content-Type'] = 'application/json';
      if (sesion && sesion !== null && sesion !== 'undefined') {
        config.headers.token = sesion.token ? ` ${sesion.token}` : '';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const sesion = JSON.parse(localStorage.getItem('sesion'));
      const conditional =
        sesion && sesion !== null && sesion !== 'undefined'
          ? error.response.status === 401 || error.response.status === 403
          : error.response.status === 403;

      if (error.response && conditional) {
        if (sesion && sesion.company && sesion.company.name === 'PedidosYa') {
          localStorage.clear();
          window.location = '/modofeedback';
        } else {
          localStorage.clear();
          window.location = '/';
        }
      } else {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}
export default AxiosConf;
