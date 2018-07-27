import Vue from 'vue'
import axios from "@/api/http";

export default {
  state: {
    ZD00: [],
    ZD01: [],
    ZD02: [],
    ZD03: [],
    ZD04: [],
    ZD06: [],
    modelData: [],
    dsData: []
  },
  mutations: {
    setDict: (state, data) => {
      state[data.code] = data.data || []
    }
  },
  actions: {
    fetchDict({ commit }, code) {
      axios.get('/System/dict?type=' + code)
        .then((res) => {
          let data = { code: 'ZD' + code, data: res.data }
          commit('setDict', data)
        })
    },
    getModelDict({ commit }, flag) {
      axios.get('/System/ModelList', { params: { flag: flag } }).then((res) => {
        commit('setDict', { code: 'modelData', data: res.data })
      })
    },
    getDatasourceDict({ commit }) {
      axios.get('/Datasource/_list').then((res) => {
        commit('setDict', { code: 'dsData', data: res.data })
      })
    }
  }
}
