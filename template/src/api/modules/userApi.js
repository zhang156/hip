import ajax from '../http';

export const userListApi = (params) => {
  return ajax.get(`User`, {params})
};
export const deleteUserApi = (params) => {
  return ajax.delete(`User/${params}`)
};
export const addUserApi = (params) => {
  return ajax.post(`User/Role`, params);
};
export const updateUserApi = (params) => {
  return ajax.put(`User/${params.id}/Role`, params);
};
