import ajax from '../http';

export const dictListApi = (params) => {
  return ajax.get(`SysDict`, {params});
};
export const dictAllApi = (params) => {
  return ajax.get(`SysDict/_all`, {params});
};
export const addDictApi = (params) => {
  return ajax.post(`SysDict`, params);
};
export const updateDictApi = (params) => {
  return ajax.put(`SysDict/${params.id}`, params);
};

export const deleteDictApi = (params) => {
  return ajax.post(`SysDict/${params}`);
};
