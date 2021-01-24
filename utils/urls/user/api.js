import {
  CONSTS
} from '../consts';

import http from '../../request';

export default {
  WEIXINLOGIN: (data) => http.get(CONSTS.BASE_URL + '/user/weixin', data),
  LOGIN: (data) => http.post(CONSTS.BASE_URL + '/user/login', data)
}