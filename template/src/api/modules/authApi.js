import ajax from '../http';
import qs from 'qs';

const authPath = 'auth';
export const loginApi = (params) => {
  return ajax.post(`${authPath}/login`, params)
};

export const logoutApi = (params) => {
  return ajax.post(`${authPath}/logout`, params)
};

export const userProfileApi = (params) => {
  return ajax.get(`${authPath}/user/profile`, {params})
};

export const userRoleApi = (params) => {
  return ajax.get(`${authPath}/user/role`, {params})
};

export const userMenuApi = (params) => {
  return ajax.get(`${authPath}/user/sysMenu`, {params})
};

export const userPermissionApi = (params) => {
  return ajax.get(`${authPath}/user/permission`, {params})
};

export const userSettingApi = (params) => {
  return ajax.get(`${authPath}/user/setting`, {params})
};

export const updatePwdApi = (params) => {
  return ajax.put(`${authPath}/profile/passwd`, qs.stringify(params))
};

export const updateUserProfileApi = (params) => {
  return ajax.put(`${authPath}/profile`, params)
};
