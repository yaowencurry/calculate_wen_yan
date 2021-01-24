const BASE_URL = 'http://localhost:6300';

import http from '../../request';

export default {
  ADD_WEIGHT: (data) => http.post(BASE_URL + '/weight/addweight', data),
  ADD_COLUMN: (data) => http.post(BASE_URL + '/weight/addcolumn', data),
  GET_WEIGHT_LIST: (data) => http.post(BASE_URL + '/weight/getweightlist', data),
}