<template>
  <Menu mode="horizontal" :theme="theme" :active-name="activeMenu" class="menu" @on-select="changeMenu">
    <Submenu v-for="m in menuData" :key="m.id" :name="m.name">
      <template slot="title">
        {{ m.desc }}
      </template>
      <MenuItem v-for="s in m.subMenu" :key="s.id" :name="s.name">
        {{s.desc}}
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
  export default {
    name: 'baseNav',
    data() {
      return {
        theme: 'light',
      }
    },
    computed: {
      menuData() {
        return this.$store.state.base.menuData
      },
      activeMenu() {
        return this.$store.state.base.activeRoute;
      }
    },
    created() {
    },
    methods: {
      menuClick(s) {
        this.$emit('menuClick', s)
      },
      changeMenu(name) {
        if (this.$route.name == name) {
          return
        } else {
          this.$router.push({
            name: name
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
  .menu {
    height: 100%;
    line-height: 1;

    &:after {
      background: transparent !important;
    }

    .ivu-menu-submenu-title {
      height: 100%;
      display: flex;
      align-items: center;
    }

    // &.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
    //   color: #495060;
    //   border-bottom-color: transparent;

    //   &:hover {
    //     color: #2d8cf0;
    //     border-bottom-color: #2d8cf0;
    //   }

    //   .ivu-menu-item-selected {
    //     color: #fff;
    //   }
    // }

    .ivu-icon {
      display: none !important;
    }
  }
</style>



