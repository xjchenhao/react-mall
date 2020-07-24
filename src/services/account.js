import request from 'utils/request';

// 登录
export function login(params) {
  return request({
    url: '/api/login',
    type: 'post',
    data: params,
  });
}

// 登出
export function logout(params) {
  return request({
    url: '/api/logout',
    type: 'post',
    data: params,
  });
}
