<template>
  <div class="mark-menu">
    <div class="mark-item" v-for="m,index in markMenuData" :key="index" @click="openMenu(m)">
      <Icon :type="m.icon" size="36"></Icon>
      <div>{{m.desc}}</div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'mark-menu',
    data() {
      return {
        markMenuData: [
          {
            id: '2-1',
            name: 'modeling',
            desc: '数据建模',
            icon: 'social-buffer-outline',
            path: ''
          },
          {
            id: '3-1',
            name: 'mdMaintain',
            desc: '主数据维护',
            icon: 'ios-bookmarks-outline',
            path: ''
          },
          {
            id: '5-1',
            name: 'mdApproval',
            desc: '术语审批',
            icon: 'android-checkbox-outline',
            path: ''
          },
          {
            id: '5-2',
            name: 'mdRelease',
            desc: '术语发布',
            icon: 'android-archive',
            path: ''
          }
        ]
      }
    },
    methods: {
      openMenu(m) {
        this.$emit('on-open-menu',m)
      }
    }
  }
</script>


<style scoped lang="scss">
  .mark-menu {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .mark-item {
    margin-right: 10px;
    margin-top: 10px;
    width: 80px;
    height: 80px;
    padding: 10px;
    background-color: #2d8cf0;

    &:hover {
      box-shadow: 1px 0px 0px 1px #fff;
    }
  }
</style>
