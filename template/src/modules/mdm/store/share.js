import Vue from 'vue'
import axios from "@/api/http";

export default {
  state: {
    cvData: {},
    cvGroup: {},
    elementData: {},
    setData: {}
  },
  mutations: {
    updateCvData(state, data) {
      state.cvData = data
    },
    updateCvGroup(state, data) {
      state.cvGroup = data
    },
    updateElementData(state, data) {
      state.elementData = data
    },
    updateSetData(state, data) {
      state.setData = data
    }
  },
  actions: {
    listCvData({ commit }, data) {
      return axios.get('/Share/CVCode', { params: data }).then((res) => {
        commit('updateCvData', res.data)
      }).catch(() => {
        commit('updateCvData', {})
      })
    },
    listCVGroup({ commit }) {
      return axios.get('/Share/CVCode/Group').then((res) => {
        commit('updateCvGroup', res.data)
      }).catch(() => {
        commit('updateCvGroup', {})
      })
    },
    listOneCVData({ commit }, data) {
      return axios.get('/Share/CVCode/Group', { params: { identifier: data } })
    },
    listElementData({ commit }, data) {
      return axios.get('/Share/Element', { params: data }).then((res) => {
        commit('updateElementData', res.data)
      }).catch(() => {
        commit('updateElementData', {})
      })
    },
    listSetData({ commit }, data) {
      return axios.get('/Share/Set', { params: data }).then((res) => {
        commit('updateSetData', res.data)
      }).catch(() => {
        commit('updateSetData', {})
      })
    },
  }
}
