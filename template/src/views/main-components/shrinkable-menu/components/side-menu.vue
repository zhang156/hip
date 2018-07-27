<template>
  <div class="side-menu">
    <Menu :active-name="activeName" class="menu" width="auto" :open-names="openNames" @on-select="changeMenu">
     <menu-tree :menu-data="menuData"></menu-tree>
    </Menu>
  </div>
</template>

<script>
import MenuTree from './menu-tree';
export default {
  name: 'side-menu',
  components: {MenuTree},
  props: {
    menuData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    activeName () {
      return this.$store.state.base.activeName;
    },
    openNames () {
      if (this.activeName) {
        for (let i = 0, len = this.menuData.length; i < len; i++) {
          if (this.menuData[i].name === this.activeName) {
            return []
          } else if (this.menuData[i].children && this.menuData[i].children.length) {
            for (let j = 0, l = this.menuData[i].children.length; j < l; j++) {
              if (this.menuData[i].children[j].name === this.activeName) {
                return [this.menuData[i].name]
              }
            }
          }
        }
        return []
      } else {
        return []
      }
    }
  },
  methods: {
    changeMenu (name) {
      this.$emit('on-change', name)
    }
  }
}
</script>

<style scoped lang="less">
  .menu{
    background: #f0f0f0;
  }
</style>
