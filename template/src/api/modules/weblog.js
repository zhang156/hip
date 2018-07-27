import ajax from '../http';

export const weblogListApi = (params) => {
  return ajax.get(`WebLog`, {params})
};
