<template>
  <div class="menu-tree">
    <div v-for="m in menuData" :key="'menu_'+m.id">
      <Submenu v-if="m.children && m.children.length>0" :name="m.name">
        <template slot="title">
          <Icon :type="m.icon"></Icon>
          {{m.resourceName}}
        </template>
        <menu-tree :menu-data="m.children"></menu-tree>
      </Submenu>
      <menu-item :name="m.name" v-else>
        <Icon :type="m.icon"></Icon>
        {{m.resourceName}}
      </menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-tree',
  props: {
    menuData: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
