import {deptApi, updateDeptApi, addDeptApi, delDeptApi, updateOrgApi} from '../../api/modules/deptApi';

export default {
  state: {
    depts: []
  },
  mutations: {
    setDepts: (state, data) => {
      state.depts = data;
    }
  },
  actions: {
    getDepts ({commit}, params) {
      return deptApi(params).then((res) => {
        commit('setDepts', res.data)
      })
    },
    updateDept ({commit}, params) {
      return updateDeptApi(params)
    },
    updateOrg ({commit}, params) {
      return updateOrgApi(params)
    },
    addDept ({commit}, params) {
      return addDeptApi(params)
    },
    delDept ({commit}, params) {
      return delDeptApi(params)
    }
  }
}
