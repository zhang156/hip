import Main from '@/views/Main.vue';

const APP = process.env.APP

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    isAnonymous: true
  },
  component: resolve => require(['@/views/Login.vue'], resolve)
};

export const homePage = {
  path: '/',
  component: Main,
  redirect: '/home',
  children: [
    {
      path: 'home',
      name: 'home',
      component: resolve => require(['@/views/home/home.vue'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: 'profile',
      name: 'profile',
      component: resolve => require(['@/views/profile/index.vue'], resolve),
      meta: {
        title: '个人中心'
      }
    }
  ]
};

export const page404 = {
  path: '/404',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => require(['@/views/error-page/404.vue'], resolve)
};

export const page403 = {
  path: '/403',
  name: 'error-403',
  component: resolve => require(['@/views/error-page/403.vue'], resolve),
  meta: {
    title: '403-权限不足'
  }
};

export const page500 = {
  path: '/500',
  name: 'error-500',
  component: resolve => require(['@/views/error-page/500.vue'], resolve),
  meta: {
    title: '500-服务端错误'
  }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// export const otherRouter = {}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
/* export const appRouter = [
  {
    path: '/system',
    name: 'system',
    component: Main,
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: resolve => require(['@/views/system/user/index.vue'], resolve),
        meta: {
          title: '用户管理'
        }
      }
    ]
  }
]; */

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  homePage,
  /* otherRouter, */
  /* ...appRouter, */
  page500,
  page403,
  page404,
  ...require(`../modules/${APP}/router/${APP}-router.js`)
];
