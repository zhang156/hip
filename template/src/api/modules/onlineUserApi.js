import ajax from '../http';

export const onlineUserApi = (params) => {
  return ajax.get(`OnlineUser`, params)
};

export const offlineApi = (params) => {
  return ajax.get(`OnlineUser/Offline`, {params})
};
