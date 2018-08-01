<template>
  <div class="base-nav">
    <Menu mode="vertical" 
        :theme="theme" 
        :active-name="activeName" 
        class="menu"
        accordion
        :open-names="openNames"
        ref="menu"
        v-if="isExpand"
        @on-open-change="handleOpenChange">

      <template v-for="m in menuData">
        <MenuItem v-if="!m.children||!m.children.length" :key="'menuItem'+m.resourceName" :name="m.resourceName" class="single-menu-item" :class="activeName===m.resourceName?'single-menu-item-active':''" @click.native="menuClick(m)">
          <i class="iconfont menu-icon" :class="m.icon" :key="'menuIcon'+m.resourceName"></i>
          <span :key="'title'+m.resourceName">{{ m.resourceName }}</span>
        </MenuItem>

        <Submenu v-if="m.children&&m.children.length" :key="m.resourceName" :name="m.resourceName">
          <template slot="title">
            <i class="iconfont menu-icon" :class="m.icon"></i>
            <span>{{ m.resourceName }}</span>
          </template>
          <MenuItem v-for="s in m.children" :key="s.id" :name="s.resourceName" @click.native="menuClick(s)">
            {{s.resourceName}}
          </MenuItem>
        </Submenu>
      </template>
    </Menu>

    <Menu mode="vertical" 
        :theme="theme" 
        :active-name="activeName" 
        class="menu shrink-menu"
        accordion
        ref="shrinkMenu"
        :open-names="openNames"
        v-else>

      <template v-for="m in menuData">
        <MenuItem v-if="!m.children||!m.children.length" :key="'menuItem'+m.resourceName" :name="m.resourceName" class="single-shrinkmenu-item" :class="activeName===m.resourceName?'single-shrinkmenu-item-active':''" @click.native="menuClick(m)">
          <i class="iconfont menu-icon" :class="m.icon" :key="'menuIcon'+m.resourceName"></i>
        </MenuItem>

        <Submenu v-if="m.children&&m.children.length" :key="m.resourceName" :name="m.resourceName">
          <template slot="title">
            <Dropdown transfer placement="right-start">
              <i class="iconfont menu-icon" :class="m.icon"></i>

              <DropdownMenu slot="list" v-if="m.children&&m.children.length">
                <DropdownItem v-for="sub in m.children" :key="sub.id" :name="sub.resourceName" @click.native="menuClick(sub)">{{ sub.resourceName }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Submenu>
      </template>
      
    </Menu>
  </div>
</template>

<script>
export default {
  name: "baseNav",
  props: {
    menuData: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      default: ""
    },
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      theme: "dark",
      openNames: []
    };
  },
  watch: {
    isExpand(nv) {
      this.$nextTick(() => {
        if (nv) {
          this.$refs.menu.updateActiveName();
          this.getOpenNames('menu');
        } else {
          this.$refs.shrinkMenu.updateActiveName();
          this.getOpenNames('shrinkMenu');
        }
      })
    }
  },
  created() {
    console.log(this.menuData)
  },
  mounted() {
    this.getOpenNames('menu');
  },
  methods: {
    handleIconClick(itemData) {
      if (!itemData.children.length) {
        this.menuClick(itemData)
      }
    },
    handleOpenChange(subMenu) {},
    menuClick(s) {
      this.$emit("menuClick", s);
    },
    getOpenNames(menu) {
      for (let i = 0, len = this.menuData.length; i < len; i++) {
        if (!this.menuData[i].children) {
          continue
        }
        let subMenu = this.menuData[i].children;
        for (var j = 0, len2 = subMenu.length; j < len2; j++) {
          if (subMenu[j].resourceName === this.activeName) {
            break;
          }
        }
        if (j !== len2) {
          this.openNames = [].concat(this.menuData[i].resourceName);
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs[menu].updateOpened();
            }, 200);
          });
          return;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../theme/color.less";

.menu {
  width: 100% !important;
}

.ivu-menu-dark {
  background-color: @nav-bg-color;
}

// .menu-icon {
//   color: rgba(255, 255, 255, 0.9);
// }

.menu-icon-lg {
  font-size: 18px;
}

// shrink-menu
// .shrink-menu-item:not(:first-child) {
//   border-top: 1px solid @open-nav-bg-color;
// }
</style>

<style lang="less">
@import "../../theme/color.less";

.base-nav {
  .menu {
    // .ivu-menu-submenu:not(:first-child) {
    //   border-top: 1px solid $submenu-bg;
    // }

    // .ivu-menu-submenu.ivu-menu-opened {
    //   border-top: none;
    // }

    // 菜单字体颜色
    &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item,
    &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
      // color: $left-font-color;
      position: relative;
    }

    // 菜单高度
    &.ivu-menu-vertical .ivu-menu-item,
    &.ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 10px 24px;
    }

    // 子菜单背景颜色
    .ivu-menu-submenu.ivu-menu-opened .ivu-menu {
      background-color: @open-nav-bg-color;
    }

    &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title,
    &.ivu-menu-dark.ivu-menu-vertical .single-menu-item {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        transition: all 0.2s;
        background-color: transparent;
      }
    }

    // 菜单hover
    &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover,
    &.ivu-menu-dark.ivu-menu-vertical .single-menu-item:hover {
      color: #fff;
      background-color: transparent;
      &::after {
        background-color: @primary-color;
      }
    }

    // 菜单open submenu-title
    &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
      background-color: @nav-bg-color;
      color: #fff;

      &::after {
        background-color: @primary-color;
      }
    }

    // shrink菜单open shubmenu-title
    // &.shrink-menu.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    //   &::after {
    //     background-color: transparent;
    //   }
    // }

    // shrink菜单active submenu-title
    &.shrink-menu .ivu-menu-item-active .ivu-menu-submenu-title {
      background-color: @nav-bg-color;
      color: #fff;

      &::after {
        background-color: @primary-color;
      }
    }

    // 默认箭头方向
    &.ivu-menu-vertical .ivu-menu-submenu-title-icon {
      transform: rotate(-90deg);
    }

    // 菜单打开时箭头方向
    .ivu-menu-opened .ivu-menu-submenu-title-icon {
      transform: rotate(0);
    }

    // shrink-menu 去除箭头
    &.menu.shrink-menu.ivu-menu-vertical .ivu-menu-submenu-title-icon {
      display: none;
    }

    // shrink-menu 菜单高度
    &.shrink-menu.ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 0 0;
      text-align: center;
    }

    // 子菜单选中
    &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active {
      color: #fff;
      background-color: transparent !important;
    }

    &.shrink-menu {

      .single-shrinkmenu-item {
        width: 100%;
        padding: 0;
      }

      .ivu-dropdown {
        width: 100%;
      }

      .menu-icon {
        display: inline-block;
        width: 100%;
        padding: 10px 0;
        margin: 0;
        text-align: center;
      }
    }
  }
}
</style>