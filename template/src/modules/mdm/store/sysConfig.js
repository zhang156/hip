import Vue from 'vue'
import axios from "@/api/http";

export default {
  state: {
    dictData: {},
    configData: {}
  },
  mutations: {
    updateDictData(state, data) {
      state.dictData = data
    },
    updateConfigData(state, data) {
      state.configData = data
    }
  },
  actions: {
    listDictData({ commit }, data) {
      const { pageNo, pageSize, typeCode, code } = data;
      return axios.get('/SystemDict?pageNo=' + (pageNo || 1) + '&pageSize=' + (pageSize || 10)
        + '&typeCode=' + (typeCode || '') + '&code=' + (code || '')).then((res) => {
        commit('updateDictData', res.data)
      })
    },
    searchDictByTypeAndCode({ commit }, data) {
      const { dictTypeCode, dictCode } = data;
      return axios.get('/SystemDict?typeCode=' + (dictTypeCode || '') + '&code=' + (dictCode || ''))
    },
    addDict({ commit }, data) {
      const { dict } = data;
      return axios.post('/SystemDict', dict)
    },
    modifyDict({ commit }, data) {
      const { dictTypeCode, dictCode, dict } = data;
      return axios.put('/SystemDict/' + dictTypeCode + '?code=' + dictCode, dict)
    },
    removeDict({ commit }, data) {
      const { dictTypeCode, dictCode } = data;
      return axios.delete('/SystemDict/' + dictTypeCode + "?code=" + dictCode)
    }
  }
}
