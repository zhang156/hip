import ajax from '../http';
import axios from 'axios';
import qs from 'qs';

const authPath = 'auth';

const loginAjax = axios.create({
  baseURL: '/login-api',
  timeout: 5000,
  auth: {username: 'saas', password: '123456'},
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});

export const loginApi = (params) => {
  return loginAjax.post('oauth/token', qs.stringify(params))
};

export const logoutApi = (params) => {
  return ajax.post(`${authPath}/logout`, params)
};

export const userProfileApi = (params) => {
  return ajax.get(`${authPath}/user/profile`, { baseURL: '/admin-api' })
};

export const userMenuApi = (params) => {
  return ajax.get(`${authPath}/user/sysMenu`, { baseURL: '/admin-api', params, paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }})
};

// export const userRoleApi = (params) => {
//   return ajax.get(`${authPath}/user/role`, {params})
// };

// export const userPermissionApi = (params) => {
//   return ajax.get(`${authPath}/user/permission`, {params})
// };

export const userSettingApi = (params) => {
  return ajax.get(`${authPath}/user/setting`, {params})
};

export const updatePwdApi = (params) => {
  return ajax.put(`${authPath}/profile/passwd`, qs.stringify(params))
};

export const updateUserProfileApi = (params) => {
  return ajax.put(`${authPath}/profile`, params)
};
