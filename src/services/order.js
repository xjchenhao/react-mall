import request from 'utils/request';
import { stringify } from "qs";

// 订单列表
export function getList(params) {
  return request({
    url: `/api/order/list?${stringify(params)}`,
    type: "get"
  });
}

// 创建订单
export function create(params) {
  return request({
    url: '/api/order/create',
    type: 'post',
    data: params,
  });
}
