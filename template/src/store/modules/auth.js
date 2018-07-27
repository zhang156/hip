import {
  userProfileApi,
  loginApi,
  logoutApi,
  userMenuApi,
  userPermissionApi,
  userSettingApi,
  userRoleApi,
  updatePwdApi,
  updateUserProfileApi
} from '../../api/modules/authApi';
import Cookie from 'js-cookie';

export default {
  state: {
    user: null,
    menu: [],
    roles: [],
    permissions: [],
    userSetting: {}
  },
  mutations: {
    setUserProfile: (state, data) => {
      state.user = data;
    },
    setUserRole: (state, data) => {
      state.roles = data
    },
    initMenu: (state, data) => {
      state.menu = data;
    },
    setUserPermission: (state, data) => {
      state.permissions = data;
    },
    setUserSetting: (state, data) => {
      state.userSetting = data;
    }
  },
  actions: {
    login: ({commit}, params) => {
      return loginApi(params).then((res) => {
        Cookie.set('user_session', res.data.token);
        commit('setUserRole', []);
        commit('initMenu', []);
        commit('setUserPermission', []);
      })
    },
    logout: ({commit}, params) => {
      return logoutApi(params).then((res) => {
        Cookie.remove('user_session');
        commit('setUserProfile', null);
        commit('setUserRole', []);
        commit('initMenu', []);
        commit('setUserPermission', []);
      }).catch(() => {
        Cookie.remove('user_session');
        commit('setUserProfile', null);
        commit('setUserRole', []);
        commit('initMenu', []);
        commit('setUserPermission', []);
      })
    },
    getUserProfile: ({commit}, parmas) => {
      return userProfileApi(parmas).then((res) => {
        commit('setUserProfile', res.data.user);
        commit('setUserRole', res.data.role);
        commit('setUserPermission', res.data.permission);
      })
    },
    updatePasswd ({commit}, params) {
      return updatePwdApi(params);
    },
    updateUserProfile ({commit}, params) {
      return updateUserProfileApi(params);
    },
    getUserRole: ({commit}, params) => {
      return userRoleApi(params).then((res) => {
        commit('setUserRole', res.data);
      })
    },
    getMenu: ({commit}, params) => {
      return userMenuApi(params).then((res) => {
        commit('initMenu', res.data || []);
      })
    },
    getUserPermission: ({commit}, params) => {
      return userPermissionApi(params).then((res) => {
        commit('setUserPermission', res.data);
      })
    },
    getUserSettings: ({commit}, params) => {
      return userSettingApi(params).then((res) => {
        commit('setUserSetting', res.data)
      })
    }
  }
}
