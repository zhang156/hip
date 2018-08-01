'use strict'

module.exports = [{
  path: '/',
  name: 'helloworld',
  meta: {
    title: 'helloworld',
    isAnonymous: true
  },
  component: resolve => require(['../views/appComponents/helloworld.vue'], resolve)
}]
