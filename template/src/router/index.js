import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './router';
import iView from 'iview';
import store from '../store';
import App from '../lib/app'
import Cookie from 'js-cookie';

Vue.use(VueRouter)

const APP = process.env.APP

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  let userSession = Cookie.get('user_session');
  pageLoading();
    
  // 白名单
  if (to.matched.some(r => r.meta.isAnonymous)) {
    next();
  } else {
    // 登录
    if (userSession) {
      if (!store.state.auth.user) {
        // 获取用户信息，用户角色，用户菜单数据
        store.dispatch('getUserProfile', userSession).then(() => {
          /* // 获取用户角色
          store.dispatch('getUserRole', userSession).then(() => {
            // 获取用户权限
            store.dispatch('getUserPermission', userSession).then(() => {
              // 获取用户菜单数据
              store.dispatch('getMenu', userSession).then(() => {
                fetchRoutesFromMenu(store.state.auth.menu);
                next({...to, replace: true})
              })
            })
          }) */
          // 获取用户菜单数据
          store.dispatch('getMenu', userSession).then(() => {
            fetchRoutesFromMenu(store.state.auth.menu);
            next({...to, replace: true})
          })
        })
      } else {
        // 404
        if (!to.name) {
          next({path: '/404'});
        } else {
          next();
        }
      }
    } else {
      // 未登录
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
})

router.afterEach((to) => {
  let title = (to.meta.title ? to.meta.title + ' - ' : '') + App.appName;
  document.title = title;
  // iView.LoadingBar.finish();
  iView.Spin.hide();
  window.scrollTo(0, 0);
});

const pageLoading = () => {
  iView.Spin.show({
    render: (h) => {
      return h('div', [
        h('Icon', {
          'class': 'spin-icon-load',
          props: {
            type: 'load-c',
            size: 18
          }
        }),
        h('div', '页面加载中……')
      ])
    }
  });
};

// 从菜单中获取路由表
const fetchRoutesFromMenu = (menuData) => {
  if (menuData.length > 0) {

    // 动态生成路由
    let userRoutes = [];
    let isPublic = null
    menuData.map(m => {
      isPublic = m.resourceName == '系统管理'
      let newRoute = {
        path: m.resourceUrl,
        name: m.name,
        meta: {title: m.resourceName}
      };

      if (m.children) {
        newRoute.component = () => import('@/views/Main.vue');
        newRoute.children = [];
        m.children.map(child => {
          newRoute.children.push({
            path: child.resourceUrl.replace(m.resourceUrl + '/', ''),
            name: child.name,
            meta: {title: child.resourceName},
            component: isPublic ? resolve => require([`@/views${child.resourceUrl}/index.vue`], resolve) : resolve => require([`@/modules/${APP}/views${child.resourceUrl}.vue`], resolve)
          })
        })
      } else {
        newRoute.component = isPublic ? resolve => require([`@/views${m.resourceUrl}/index.vue`], resolve) : resolve => require([`@/modules/${APP}/views${m.resourceUrl}.vue`], resolve)
      }
      userRoutes.push(newRoute)
    });
    // router.options.routes.push(...userRoutes);
    router.addRoutes(userRoutes);
  }
}
