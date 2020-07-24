import request from 'utils/request';

// 注册
export function login(params) {
  return request({
    url: '/api/login',
    type: 'post',
    data: params,
  });
}
