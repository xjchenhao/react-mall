import request from 'utils/request';
import { stringify } from "qs";

// 用户信息
export function info(params) {
  return request({
    url: `/api/user/info?${stringify(params)}`,
    type: "get"
  });
}
