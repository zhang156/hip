import Vue from 'vue';
import store from '../store'

Vue.prototype.$hasPermission = (permission) => {
  return store.state.auth.roles.indexOf('ROLE_ADMIN') > -1 || (store.state.auth.permissions && store.state.auth.permissions.indexOf(permission) > -1);
};

Vue.directive('hasPermission', {
  bind: (el, binding) => {
    if (!Vue.prototype.$hasPermission(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});
