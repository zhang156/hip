import Vue from 'vue'
import axios from "@/api/http";

export default {
  state: {
    modelData: {},
    oneModelData: {},
    logData: {}
  },
  mutations: {
    setModelData(state, data) {
      state.modelData = data;
    },
    setOneModelData(state, data) {
      state.oneModelData = data;
    },
    setLogData(state, data) {
      state.logData = data;
    }
  },
  actions: {
    getModelData({ commit }, data) {
      /*  const { pageNo, pageSize, searchText, mdStatusCode } = data;  */
      return axios.get('/DataModel', { params: data }).then((res) => {
        commit('setModelData', res.data)
      })
    },
    getOneModel({ commit }, id) {
      return axios.get('/DataModel/' + id)
    },
    getOneModelDataNoPage({ commit }, id) {
      return axios.get('/ModelContent/' + id)
    },
    removeModel({ commit }, data) {
      return axios.delete('/DataModel/' + data)
    },
    addModel({ commit }, data) {
      return axios.post('/DataModel', data)
    },
    modifyModel({ commit }, data) {
      return axios.put('/DataModel/' + data.id, data)
    },
    removeModelField({ commit }, data) {
      return axios.delete('/DataModel/' + data.modelId + '/Field/' + data.fieldId)
    },
    listOneModelData({ commit }, data) {
      return axios.get('/ModelContent', { params: data }).then((res) => {
        commit('setOneModelData', res.data)
      })
    },
    addOneModelData({ commit }, data) {
      const { modelId, contentData } = data;
      return axios.post('/ModelContent/' + modelId, contentData)
    },
    modifyOneModelData({ commit }, data) {
      const { modelId, pk, contentData } = data;
      return axios.put('/ModelContent/' + modelId + '/' + pk, contentData)
    },
    removeOneData({ commit }, data) {
      const { modelId, dataId } = data;
      return axios.delete('/ModelContent/' + modelId + '/' + dataId)
    },
    listDataLog({ commit }, data) {
      return axios.get('/DataOperationLog', { params: data }).then((res) => {
        commit('setLogData', res.data)
      })
    }
  }
}
