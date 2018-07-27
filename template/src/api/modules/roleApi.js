import ajax from '../http';

export const roleListApi = (params) => {
  return ajax.get(`Role`, {params});
};

export const allRolesApi = (params) => {
  return ajax.get(`Role/_all`, params);
};
export const addRoleApi = (params) => {
  return ajax.post(`Role/Resource`, params)
};
export const updateRoleApi = (params) => {
  console.log(params)
  return ajax.put(`Role/${params.id}/Resource`, params);
};
export const delRoleApi = (params) => {
  return ajax.delete(`Role/${params}`);
}
