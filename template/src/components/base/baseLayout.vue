<template>
  <div class="base-layout">
    <div class="layout-left-wrap">
      <slot name="layout-left"></slot>
    </div>

    <div class="layout-right-wrap">
      <slot name="layout-right"></slot>
    </div>
  </div>
</template>


<script>
  export default {
    /*纵向基本页面布局，left right*/
    name: 'BaseLayout',
    props: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>


<style scoped lang="scss">
  .base-layout {
    height: 100%;
    min-width: 1000px;
    display: flex;
  }

  .layout-left-wrap {
    height: 100%;
  }

  .layout-right-wrap {
    flex: 1;
    height: 100%;
  }
</style>
