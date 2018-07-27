import {configListApi, configAllApi, addConfigApi, updateConfigApi, deleteConfigApi} from '../../api/modules/configApi';

export default {
  state: {
    configList: {},
    configCond: []
  },
  mutations: {
    setConfigList: (state, data) => {
      state.configList = data;
    },
    setConfigCond: (state, data) => {
      state.configCond = data;
    }
  },
  actions: {
    getConfigList ({commit}, params) {
      return configListApi(params).then((res) => {
        commit('setConfigList', res.data)
      })
    },
    getConfig ({commit}, params) {
      return configAllApi(params).then((res) => {
        commit('setConfigCond', res.data)
      })
    },
    addConfig ({commit}, params) {
      return addConfigApi(params);
    },
    updateConfig ({commit}, params) {
      return updateConfigApi(params);
    },
    delConfig ({commit}, params) {
      return deleteConfigApi(params);
    }
  }
}
