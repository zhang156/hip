import {onlineUserApi, offlineApi} from '../../api/modules/onlineUserApi';

export default {
  state: {
    onlineUsers: {}
  },
  mutations: {
    setOnlineUsers: (state, data) => {
      state.onlineUsers = data;
    }
  },
  actions: {
    getOnlineUsers ({commit}, params) {
      return onlineUserApi(params).then((res) => {
        commit('setOnlineUsers', res.data)
      })
    },
    offline ({commit}, params) {
      return offlineApi(params)
    }
  }
}
