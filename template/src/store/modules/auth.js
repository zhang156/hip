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
    user: {},
    token: null,
    dropMenu: [
      {
        id: '1',
        name: '个人中心'
      },
      {
        id: '2',
        name: '修改密码'
      },
      {
        id: '3',
        name: '锁屏'
      },
      {
        id: '4',
        name: '退出'
      }
    ],
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
        Cookie.set('user_session', res.data.access_token, { expires: new Date(Date.now() + res.data.expires_in * 1000) });
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
        if (res.data) {
          commit('setUserProfile', res.data.user);
          commit('setUserRole', res.data.role);
          commit('setUserPermission', res.data.permission);
        } else {
          console.log('刚获取的用户信息为空')
        }
      })
    },
    updatePasswd ({commit}, params) {
      return updatePwdApi(params);
    },
    updateUserProfile ({commit}, params) {
      return updateUserProfileApi(params);
    },
    // getUserRole: ({commit}, params) => {
    //   return userRoleApi(params).then((res) => {
    //     commit('setUserRole', res.data);
    //   })
    // },
    getMenu: ({commit}, params) => {
      return userMenuApi(params).then((res) => {
        commit('initMenu', res.data || []);
      })
    },
    // getUserPermission: ({commit}, params) => {
    //   return userPermissionApi(params).then((res) => {
    //     commit('setUserPermission', res.data);
    //   })
    // },
    getUserSettings: ({commit}, params) => {
      return userSettingApi(params).then((res) => {
        commit('setUserSetting', res.data)
      })
    }
  }
}
