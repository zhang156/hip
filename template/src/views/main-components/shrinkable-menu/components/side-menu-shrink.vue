<template>
  <div class="side-menu-shrink">
    <template v-for="(item, index) in menuData">
      <div style="text-align: center;" :key="index">
        <Dropdown transfer placement="right-start" :key="index" @on-click="changeMenu">
          <Button type="text" class="menu-button">
            <Icon :size="20" :type="item.icon"></Icon>
          </Button>
          <menu-shrink-tree :menu-data="item.children" slot="list"></menu-shrink-tree>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
import MenuShrinkTree from './menu-shrink-tree';

export default {
  name: 'side-menu-shrink',
  components: {MenuShrinkTree},
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

  methods: {
    changeMenu (active) {
      this.$emit('on-change', active);
    }
  }
}
</script>

<style scoped>
  .menu-button {
    width: 50px;
    padding: 10px 0;
  }
</style>
