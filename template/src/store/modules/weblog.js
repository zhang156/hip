import {weblogListApi} from '../../api/modules/weblog';

export default {
  state: {
    weblogList: {}
  },
  mutations: {
    setWeblogList: (state, data) => {
      state.weblogList = data;
    }
  },
  actions: {
    getWeblog ({commit}, params) {
      return weblogListApi(params).then((res) => {
        commit('setWeblogList', res.data)
      })
    }
  }
}
