import ajax from '../http';

export const configListApi = (params) => {
  return ajax.get(`SysConfig`, {params});
};
export const configAllApi = (params) => {
  return ajax.get(`SysConfig/_all`, {params});
};
export const addConfigApi = (params) => {
  return ajax.post(`SysConfig`, params);
};
export const updateConfigApi = (params) => {
  return ajax.put(`SysConfig/${params.id}`, params);
};

export const deleteConfigApi = (params) => {
  return ajax.post(`SysConfig/${params}`);
};
