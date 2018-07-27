import {allResourceTreeApi, allResourceApi, updateResourceApi, addResourceApi} from '../../api/modules/resourceApi';

export default {
  state: {
    resourceList: [],
    allResources: []
  },
  mutations: {
    setResourceList: (state, data) => {
      state.resourceList = data;
    },
    setAllResources: (state, data) => {
      state.allResources = data;
    }
  },
  actions: {
    getResourceList ({commit}, params) {
      return allResourceApi(params).then((res) => {
        commit('setResourceList', res.data)
      })
    },
    listAllResource ({commit}, params) {
      return allResourceTreeApi(params).then((res) => {
        commit('setAllResources', res.data)
      })
    },
    updateResource ({commit}, params) {
      return updateResourceApi(params);
    },
    addResource ({commit}, params) {
      return addResourceApi(params);
    }
  }
}
