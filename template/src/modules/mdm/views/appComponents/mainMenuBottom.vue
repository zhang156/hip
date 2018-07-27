<template>
  <div class="main-menu-bottom">
    <Menu :active-name="activeMenu" class="menu" width="180px" :open-names="openMenus">
      <Submenu v-for="(m,index) in menuData" :key="m.id" :name="m.name">
        <template slot="title">
          <Icon :type="m.icon"></Icon>
          {{m.desc}}
        </template>
        <MenuItem v-for="(s,sindex) in m.subMenu" :key="s.id" :name="s.name" @click.native="changeMenu(index,sindex)">
          {{s.desc}}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>


<script>
  import bus from '@/lib/bus'

  export default {
    name: 'main-menu-bottom',
    props: {
      theme: String
    },
    data() {
      return {
        fullHeight: document.documentElement.clientHeight,
        activeMenu: '',
        menuData: [
          {
            id: '2',
            name: 'dataModel',
            desc: '数据模型',
            icon: 'social-buffer-outline',
            subMenu: [
              {
                id: '2-1',
                name: 'modeling',
                desc: '数据建模',
                icon: '',
                path: ''
              }
            ]
          }, {
            id: '3',
            name: 'masterData',
            desc: '术语维护',
            icon: 'ios-bookmarks-outline',
            subMenu: [
              {
                id: '3-1',
                name: 'mdMaintain',
                desc: '主数据维护',
                icon: '',
                path: ''
              }
            ]
          }, {
            id: '5',
            name: 'versioning',
            desc: '审批发布',
            icon: 'android-checkbox-outline',
            subMenu: [
              {
                id: '5-1',
                name: 'mdApproval',
                desc: '术语审批',
                icon: '',
                path: ''
              },
              {
                id: '5-2',
                name: 'mdRelease',
                desc: '术语发布',
                icon: '',
                path: ''
              }
            ]
          },
          {
            id: '1',
            name: 'dataSource',
            desc: '数据源管理',
            icon: 'link',
            subMenu: [
              {
                id: '1-1',
                name: 'dsGroup',
                desc: '数据源组',
                icon: '',
                path: '/dsGroup'
              },
              {
                id: '1-2',
                name: 'ds',
                desc: '数据源',
                icon: '',
              }
            ]
          }, {
            id: '6',
            name: 'interact',
            desc: '术语交互',
            icon: 'android-sync',
            subMenu: [
              {
                id: '6-1',
                name: 'mdSync',
                desc: '术语同步管理',
                icon: '',
                path: ''
              },
              {
                id: '6-2',
                name: 'mdCompare',
                desc: '术语对照管理',
                icon: '',
                path: ''
              }
            ]
          }
        ]
      }
    },
    methods: {
      changeMenu(index, sindex) {
        let parentMenu = this.menuData[index].subMenu;
        let currentMenu = parentMenu[sindex];
        if (this.$route.name != currentMenu.name) {
          this.$store.dispatch('addOpenMenu', currentMenu);

          this.$router.push({
            name: currentMenu.name
          });

          this.activeMenu = currentMenu.name;

          bus.$emit('open-menu', currentMenu)
        }
      }
    },
    computed: {
      openMenus() {
        let oMenus = [];
        this.menuData.forEach(m => {
          oMenus.push(m.name)
        })
        return oMenus;
      }
    },
    mounted() {
      this.activeMenu = this.$route.name;
    }
  }
</script>


<style lang="scss">
  .main-menu-bottom {
    overflow-y: auto;
    height: 380px;
    .menu {
      background-color: transparent !important;
      color: #fff !important;
      .ivu-menu-item:hover, .ivu-menu-submenu-title:hover {
        background-color: rgba(255, 255, 255, .1) !important;
      }
      .ivu-menu-item:not(.ivu-menu-item-active) {
        color: #fff !important;
      }
      &:after {
        background: none !important;
      }
      .ivu-menu-submenu-title, .ivu-menu-item {
        text-align: left;
      }
    }
  }
</style>
