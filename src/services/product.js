import request from 'utils/request';
import { stringify } from "qs";

// 产品列表
export function getList(params) {
  return request({
    url: `/api/product/list?${stringify(params)}`,
    type: "get"
  });
}

// 产品详情
export function getDetail(params) {
  return request({
    url: '/api/detail',
    type: 'get',
    data: params,
  });
}
