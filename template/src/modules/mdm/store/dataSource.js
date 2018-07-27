import Vue from 'vue'
import axios from "@/api/http";

export default {
  state: {
    datasourceList: {},
  },
  mutations: {
    setDatasource(state, data) {
      state.datasourceList = data
    },
  },
  actions: {
    getDsList({ commit }, data) {
      return axios.get('/Datasource', data).then((res) => {
        commit('setDatasource', res.data)
      })
    },
    testDatasource({ commit }, data) {
      return axios.post('/Datasource/Test', data)
    },
    modifyDatasource({ commit }, data) {
      return axios.put('/Datasource/' + data.id, data)
    },
    addDatasource({ commit }, data) {
      return axios.post('/Datasource', data)
    },
    removeDatasource({ commit }, data) {
      return axios.delete('/Datasource/' + data)
    }

  }
}
