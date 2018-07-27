import Vue from 'vue'
import axios from "@/api/http";
import qs from 'qs';

export default {
  state: {
    mdSync: {},
    mdCompare: {}
  },
  mutations: {
    setMdSync(state, data) {
      state.mdSync = data
    },
    setMdCompare(state, data) {
      state.mdCompare = data
    }
  },
  actions: {
    getMdSync({ commit }, data) {
      return axios.get('/SyncTask', { params: data }).then((res) => {
        commit('setMdSync', res.data)
      })
    },
    addMdSync({ commit }, data) {
      return axios.post('/SyncTask', data)
    },
    modifyMdSync({ commit }, data) {
      return axios.put('/SyncTask/' + data.id, data)
    },
    removeMdSync({ commit }, data) {
      return axios.delete('/SyncTask/' + data)
    },
    validateSql({ commit }, data) {
      return axios.post('/SyncTask/SQL/Validate', qs.stringify(data))
    },

    getMdCompare({ commit }, data) {
      return axios.get('/getMdCompare').then((res) => {
        console.log(res)
        commit('setMdCompare', res.data.result)
      })
    }
  }
}
