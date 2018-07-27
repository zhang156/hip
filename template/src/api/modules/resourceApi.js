import ajax from '../http';

export const resourceListApi = (params) => {
  return ajax.get(`Resource`, params)
};

export const allResourceApi = (params) => {
  return ajax.get(`Resource/_all`, {params})
};

export const allResourceTreeApi = (params) => {
  return ajax.get(`Resource/_tree`, params)
};

export const updateResourceApi = (params) => {
  return ajax.put(`Resource/${params.id}`, params)
};

export const addResourceApi = (params) => {
  return ajax.post(`Resource`, params)
};
