import axios from 'axios';
import environment from '../libs/environment';

export default {
  getMetrics: (number = 1, size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/metricconf?_number=${number}&_size=${size}`
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
      url: `${environment.motivarnosBackend}/metricconf?_number=${number}&_size=${size}&name_like=${filter}`
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
    })
};
