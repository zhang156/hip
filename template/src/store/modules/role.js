import {roleListApi, allRolesApi, addRoleApi, updateRoleApi, delRoleApi} from '../../api/modules/roleApi';

export default {
  state: {
    roleList: [],
    allRoles: []
  },
  mutations: {
    setRoleList: (state, data) => {
      state.roleList = data;
    },
    setAllRoles: (state, data) => {
      state.allRoles = data;
    }
  },
  actions: {
    getRoleList ({commit}, params) {
      return roleListApi(params).then((res) => {
        commit('setRoleList', res.data)
      })
    },
    getAllRoles ({commit}, params) {
      return allRolesApi(params).then((res) => {
        commit('setAllRoles', res.data)
      })
    },
    addRole ({commit}, params) {
      return addRoleApi(params);
    },
    updateRole ({commit}, params) {
      return updateRoleApi(params);
    },
    delRole ({commit}, params) {
      return delRoleApi(params);
    }
  }
}
