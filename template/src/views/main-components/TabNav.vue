<template>
  <div class="tab-nav">
    <!--<Tag type="dot" color="blue">{{activeName}}</Tag>-->
    <span v-for="(item,index) in openOptions" :key="index">
      <Tag type="dot" :name="item.name" :closable="item.name!='home'" :color="activeName===item.name?'blue':''"
           @on-close="colsePage" @click.native="chooseTag(item)">{{getResourceName(item.name)}}</Tag>
    </span>
  </div>
</template>

<script>
export default {
  name: 'tab-nav',
  props: {},
  computed: {
    activeName () {
      return this.$store.state.base.activeName;
    },
    openOptions () {
      return this.$store.state.base.openOptions;
    },
    menuData () {
      let menu = Object.assign([], this.$store.state.auth.menu);
      menu.unshift({id: 0, name: 'home', resourceName: '首页', resourceUrl: '/home', icon: 'ios-home-outline'})
      return menu;
    }
  },
  methods: {
    getResourceName(name) {
      let resName = ''
      this.menuData.some(item => {
        if (item.name === name) {
          resName = item.resourceName
          return true
        } else if (item.children && item.children.length) {
          return item.children.some(i => {
            if (i.name === name) {
              resName = i.resourceName
              return true
            }
          })
        }
      })

      return resName
    },
    colsePage ($event, name) {
      // 首页不可删除
      if (name === 'home') {
        return;
      }
      this.$store.commit('deleteTabs', name);

      if (this.activeName === name) {
        // 设置当前激活的路由
        if (this.openOptions && this.openOptions.length >= 1) {
          this.$store.commit('setActiveMenu', this.openOptions[this.openOptions.length - 1]);
          this.$router.push({name: this.activeName});
        } else {
          this.$router.push({name: 'home'});
        }
      }
    },
    chooseTag (item) {
      this.$router.push({name: item.name});
      this.$store.commit('setActiveMenu', item);
    }
  }
}
</script>
<style scoped lang="less">
  .tab-nav {
    padding: 3px 5px;
    border-bottom: 3px solid #e2e2e2;
  }
</style>
