import Vue from 'vue'
import axios from "@/api/http";
import qs from 'qs';

export default {
  state: {
    approvalList: {},
    approveData: {},
    releaseList: {},
    releaseData: {},
  },
  mutations: {
    setApproval(state, data) {
      state.approvalList = data
    },
    setRelease(state, data) {
      state.releaseList = data
    },
    setApproveData(state, data) {
      state.approveData = data
    },
    setReleaseData(state, data) {
      state.releaseData = data
    },
  },
  actions: {
    getApprovalList({ commit }, data) {
      return axios.get('/DataModel', {
        params: data/*,
         paramsSerializer: function (params) {
         return qs.stringify(params, { arrayFormat: 'repeat' })
         },*/
      }).then((res) => {
        commit('setApproval', res.data)
      })
    },
    listApproveData({ commit }, data) {
      return axios.get('/ModelContent', { params: data }).then((res) => {
        commit('setApproveData', res.data)
      })
    },
    getReleaseList({ commit }, data) {
      return axios.get('/DataModel', { params: data }).then((res) => {
        commit('setRelease', res.data)
      })
    },
    listReleaseData({ commit }, data) {
      return axios.get('/ModelContent', { params: data }).then((res) => {
        commit('setReleaseData', res.data)
      })
    },
    updateDataStatus({ commit }, data) {
      return axios.put('/ModelContentStatus/' + data.modelId, qs.stringify(data, { arrayFormat: 'brackets' }), {
        /* headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
         }*/
      })
    }
  }
}
