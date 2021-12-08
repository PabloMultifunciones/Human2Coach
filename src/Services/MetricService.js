import axios from 'axios';
import environment from '../libs/environment';

export default {
  getMetrics: (number = 1, size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/metricconf?_number=${number}&_size=${size}`
    }),

  getMetricsCollaborator: (number = 1, size = 7, id) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/metricconf/userreport?user.id=${id}&_number=${number}&_size=${size}`
    }),

  getMetricsNotFilter: (number = 1, size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/metricconf/nofilter?_number=${
        number - 1
      }&_size=${size}`
    }),

  filterMetrics: (number = 1, filter = '', size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/metricconf?_number=${number}&_size=${size}&name_like=%25${filter}%25`
    }),

  saveMetric: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/metricconf`,
      data
    }),

  updateMetric: (data) =>
    axios({
      method: 'PUT',
      url: `${environment.motivarnosBackend}/metricconf`,
      data
    }),

  deleteMetric: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.motivarnosBackend}/metricconf/${id}`
    }),

  setImportMetric: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/importmetricdata/loadfile`,
      data,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }),

  getImportMetrics: (number = 1, size = 5) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/importmetricdata?_number=${number - 1}&_size=${size}`
    }),

  savePreImportMetric: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/importmetricdata/importfile`,
      data
    }),

  saveImportMetric: (data) =>
    axios({
      method: 'POST',
      url: `${environment.motivarnosBackend}/importmetricdata/importdata`,
      data
    }),

  deleteImportMetric: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.motivarnosBackend}/importmetricdata/${id}`
    })
};
