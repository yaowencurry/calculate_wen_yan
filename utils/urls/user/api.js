const BASE_URL = 'http://localhost:6300';

import http from '../../request';

export default {
  WEIXINLOGIN: (data) => http.get(BASE_URL + '/user/weixin', data),
  LOGIN: (data) => http.post(BASE_URL + '/user/login', data)
}