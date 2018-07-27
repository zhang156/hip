import {userListApi, deleteUserApi, addUserApi, updateUserApi} from '../../api/modules/userApi';

export default {
  state: {
    userList: []
  },
  mutations: {
    setUserList: (state, data) => {
      state.userList = data;
    }
  },
  actions: {
    getUserList ({commit}, params) {
      return userListApi(params).then((res) => {
        commit('setUserList', res.data)
      })
    },
    removeUser ({commit}, params) {
      return deleteUserApi(params);
    },
    addUser ({commit}, params) {
      return addUserApi(params);
    },
    updateUser ({commit}, params) {
      return updateUserApi(params);
    }
  }
}
