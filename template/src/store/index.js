import Vuex from 'vuex';
import Vue from 'vue';

import base from './modules/base';
import user from './modules/user';
import auth from './modules/auth';
import role from './modules/role';
import resource from './modules/resource';
import dept from './modules/dept';
import weblog from './modules/weblog';
import onlineUser from './modules/onlineUser';
import systemDict from './modules/dict';
import config from './modules/config';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const APP = process.env.APP

export default new Vuex.Store({
  strict: debug,
  modules: {
    ...require(`../modules/${APP}/store`),
    base,
    auth,
    user,
    role,
    resource,
    dept,
    weblog,
    onlineUser,
    systemDict,
    config
  }
});
