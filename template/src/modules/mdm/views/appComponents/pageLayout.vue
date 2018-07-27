<template>
  <div class="page-layout">
    <div class="page-content">
<!--  <Card>
        <p slot="title">{{ cardTitle }}</p>-->
        <slot></slot>
     <!-- </Card>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-layout',
    props: {
      cardTitle: String
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .page-path {
    background-color: #fff;
    padding: 10px 10px;
  }

  .page-content {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px 10px 30px 10px;
  }
</style>
