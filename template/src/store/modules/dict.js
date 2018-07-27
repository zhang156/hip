import {dictListApi, dictAllApi, addDictApi, updateDictApi, deleteDictApi} from '../../api/modules/dictApi';

export default {
  state: {
    dictList: {},
    dictCond: []
  },
  mutations: {
    setDictList: (state, data) => {
      state.dictList = data;
    },
    setDictCond: (state, data) => {
      state.dictCond = data;
    }
  },
  actions: {
    getDictList ({commit}, params) {
      return dictListApi(params).then((res) => {
        commit('setDictList', res.data)
      })
    },
    getDict ({commit}, params) {
      return dictAllApi(params).then((res) => {
        commit('setDictCond', res.data)
      })
    },
    addDict ({commit}, params) {
      return addDictApi(params);
    },
    updateDict ({commit}, params) {
      return updateDictApi(params);
    },
    delDict ({commit}, params) {
      return deleteDictApi(params);
    }
  }
}
