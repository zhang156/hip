const app = require('@/lib/app');

export default {
  state: {
    appId: app.appId,
    appName: app.appName,
    appVersion: app.appVersion,
    activeName: '',
    openOptions: [{name: 'home', resourceName: '首页', path: '/home'}],
    currentPath: []    
  },
  mutations: {
    setActiveMenu: (state, data) => {
      state.activeName = data.name;
      
      let ex = false;
      for (let option of state.openOptions) {
        if (option.name === data.name) {
          ex = true;
          break;
        }
      }
      if (!ex) {
        state.openOptions.push(data);
      }
    },
    // 删除tabs
    deleteTabs: (state, name) => {
      let index = 0;
      for (let option of state.openOptions) {
        if (option.name === name) {
          break;
        }
        index++;
      }
      state.openOptions.splice(index, 1);
    }
  },
  actions: {}
}
