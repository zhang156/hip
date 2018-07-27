'use strict'

module.exports = [{
  path: '/mdm-resource',
  name: 'mdm-resource',
  meta: {
    title: '主数据-资源',
    isAnonymous: true
  },
  component: resolve => require(['../views/resource.vue'], resolve)
}]
