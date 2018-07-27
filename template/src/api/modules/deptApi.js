import ajax from '../http';

export const deptApi = (params) => {
  return ajax.get(`Dept/_all`, {params});
};
export const updateDeptApi = (params) => {
  return ajax.put(`Dept/${params.id}`, params);
};
export const addDeptApi = (params) => {
  return ajax.post(`Dept`, params);
};
export const delDeptApi = (params) => {
  return ajax.get(`Dept/${params}`);
};
export const updateOrgApi = (params) => {
  return ajax.put(`Dept/Org`, params);
};
