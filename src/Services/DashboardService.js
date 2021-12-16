import axios from 'axios';
import environment from '../libs/environment';

export default {
  getDashboardMetrics: (isOneOnOne = false, isPDS = false, isPIP = false, number = 0, size = 7) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan/dashboard?isOneOnOne=${isOneOnOne}&isPDS=${isPDS}&isPIP=${isPIP}&_page=${number}&_size=${size}`
    }),

  getDashboardMetricsFiltered: (
    id,
    isOneOnOne = false,
    isPDS = false,
    isPIP = false,
    number = 0,
    size = 7
  ) =>
    axios({
      method: 'GET',
      url: `${environment.motivarnosBackend}/plan/dashboard?user.id=${id}&isOneOnOne=${isOneOnOne}&isPDS=${isPDS}&isPIP=${isPIP}&_page=${number}&_size=${size}`
    })
};
