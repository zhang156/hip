<template>
  <div class="main-menu" :style="{maxHeight:(fullHeight-80)+'px'}">
    <Menu :active-name="activeMenu" class="menu" width="180px" :open-names="openMenus" @on-select="changeMenu">
      <Submenu v-for="m in menuData" :key="m.id" :name="m.name">
        <template slot="title">
          <Icon :type="m.icon"></Icon>
          {{m.desc}}
        </template>
        <MenuItem v-for="s in m.subMenu" :key="s.id" :name="s.name">{{s.desc}}</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>


<script>
  export default {
    name: 'main-menu',
    data() {
      return {
        fullHeight: document.documentElement.clientHeight,
        activeMenu: '',
        menuData: [
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
          },
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
            desc: '主数据管理',
            icon: 'ios-bookmarks-outline',
            subMenu: [
              {
                id: '3-1',
                name: 'medicalTerm',
                desc: '医学术语',
                icon: '',
                path: ''
              },
              {
                id: '3-2',
                name: 'cvDomain',
                desc: '值域代码',
                icon: '',
                path: ''
              },
              {
                id: '3-3',
                name: 'baseDict',
                desc: '基础字典',
                icon: '',
                path: ''
              }
            ]
          }, {
            id: '4',
            name: 'interconnection',
            desc: '互联互通',
            icon: 'ios-infinite',
            subMenu: [
              {
                id: '4-1',
                name: 'DE',
                desc: '数据元管理',
                icon: '',
                path: ''
              },
              {
                id: '4-2',
                name: 'OID',
                desc: 'OID管理',
                icon: '',
                path: ''
              }
            ]
          }, {
            id: '5',
            name: 'approval',
            desc: '审批发布',
            icon: 'android-checkbox-outline',
            subMenu: [
              {
                id: '5-2',
                name: 'mdApproval',
                desc: '术语发布',
                icon: '',
                path: ''
              }
            ]
          }, {
            id: '6',
            name: 'dm',
            desc: '术语同步',
            icon: 'android-sync',
            subMenu: [
              {
                id: '6-1',
                name: 'dmSync',
                desc: '术语同步管理',
                icon: '',
                path: ''
              },
              {
                id: '6-2',
                name: 'dmCompare',
                desc: '术语对照管理',
                icon: '',
                path: ''
              }
            ]
          }, {
            id: '7',
            name: 'system',
            desc: '系统管理',
            icon: 'android-sync',
            subMenu: [
              {
                id: '7-1',
                name: 'user',
                desc: '用户管理',
                icon: '',
                path: ''
              },
              {
                id: '7-2',
                name: 'auth',
                desc: '权限管理',
                icon: '',
                path: ''
              }
            ]
          }
        ]
      }
    },
    methods: {
      changeMenu(name) {
        if (this.$route.name == name) {

        } else {
          this.$router.push({
            name: name
          });
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


<style scoped>
  .main-menu{
    overflow-y: auto;
  }
</style>
