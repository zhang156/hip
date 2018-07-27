<template>
  <div class="menu-shrink-tree">
    <div v-for="m in menuData" :key="'menu_'+m.id">
      <Dropdown v-if="m.children && m.children.length>0" placement="right-start">
        <DropdownItem :selected="activeName===m.name" :name="m.name" >
          <Icon :type="m.icon"></Icon>
          <span style="padding-left:10px;">{{ m.resourceName }}</span>
          <Icon type="ios-arrow-right"></Icon>
        </DropdownItem>
        <menu-shrink-tree :menu-data="m.children" slot="list"></menu-shrink-tree>
      </Dropdown>
      <DropdownMenu v-else>
        <DropdownItem :selected="activeName===m.name" :name="m.name">
          <Icon :type="m.icon"></Icon>
          <span style="padding-left:5px;">{{ m.resourceName }}</span>
        </DropdownItem>
      </DropdownMenu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-shrink-tree',
  props: {
    menuData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    activeName () {
      return this.$store.state.base.activeName;
    }
  }
}
</script>

<style scoped>

</style>
