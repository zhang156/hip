<template>
  <div class="shrinkable-menu">
    <slot name="top"></slot>
    <side-menu :menu-data="menuData" v-show="!isCollapsed" @on-change="changeMenu"></side-menu>
    <side-menu-shrink :menu-data="menuData" v-show="isCollapsed" @on-change="changeMenu"></side-menu-shrink>
  </div>
</template>

<script>
import TreeMenu from './components/menu-tree';
import SideMenu from './components/side-menu';
import SideMenuShrink from './components/side-menu-shrink';

export default {
  name: 'shrinkable-menu',
  components: {SideMenuShrink, SideMenu, TreeMenu},
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    user: Object
  },
  data () {
    return {}
  },
  computed: {
    menuData () {
      let menu = Object.assign([], this.$store.state.auth.menu);
      menu.unshift({id: 0, name: 'home', resourceName: '首页', resourceUrl: '/home', icon: 'ios-home-outline'})
      return menu;
    }
  },
  methods: {
    changeMenu (menu) {
      let active = {name: menu};
      this.$store.commit('setActiveMenu', active);
      this.$router.push(active)
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">

</style>
