import {
  CONSTS
} from '../consts';

import http from '../../request';

export default {
  ADD_WEIGHT: (data) => http.post(CONSTS.BASE_URL + '/weight/addweight', data),
  ADD_COLUMN: (data) => http.post(CONSTS.BASE_URL + '/weight/addcolumn', data),
  GET_WEIGHT_LIST: (data) => http.post(CONSTS.BASE_URL + '/weight/getweightlist', data),
}