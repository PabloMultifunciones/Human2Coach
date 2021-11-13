import axios from 'axios';

function AxiosConf() {
  axios.defaults.headers['Content-Type'] = 'application/json';

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
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.clear();
        window.location = '/';
      } else {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}
export default AxiosConf;
