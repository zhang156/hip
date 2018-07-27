<template>
  <div class="base-layout" :class="[primary?'primary-bg':'',original?'original-bg':'']">
    <div class="layout-header">
      <slot name="header"></slot>
    </div>
    <div class="layout-container">
      <slot></slot>
    </div>
    <div class="layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>


<script>
  export default {
    /*纵向基本页面布局，head content footer*/
    name: 'BaseLayout',
    props: {
      primary: Boolean,
      original: Boolean
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>


<style scoped lang="scss">
  .base-layout {
    height: 100%;
    // background-color: #f8f8f9;
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;
    min-width: 1200px;
  }

  .layout-header {
    height: 60px;
    color: #000;

  }

  .layout-container{
    flex: 1;
  }

  .layout-footer{
      text-align: center;
      bottom: 0;
      margin-bottom: 0;
      border-width: 1px 0 0;
      border-radius: 0;
      position: fixed;
      right: 0;
      left: 0;
      z-index: 1030;
  }
  /**
  original
  */
  .original-bg {
    .layout-header {
      background: #f8f8f9;
      box-shadow:none;

    }
  }

  /**
  primary
   */
  .primary-bg {
    .layout-header {
      background: #2d8cf0;
      color: #fff;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }
  }
</style>
