<template>
  <div class="base-head clearfix clear">
    <div class="logo l">
      <slot name="logo"></slot>
    </div>

    <div class="nav">
      <slot name="nav"></slot>
    </div>

    <div class="container r">
      <slot name="operate-container"></slot>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'BaseHead',
    data() {
      return {}
    },
    methods: {}
  }
</script>


<style scoped>
  .base-head {
    padding: 0 20px;
    display: block;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .logo {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .nav {
    height: 100%;
    padding: 0 4%;
    display: inline-block;
  }

  .container {
    height: 100%;
  }
</style>

<style>
  .l {
    float: left;
  }

  .r {
    float: right;
  }

  .clear:after {
    content: ' ';
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
  }
</style>
