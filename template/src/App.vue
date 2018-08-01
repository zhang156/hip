<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import "theme/index.less";
  
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .margin-top-10 {
    margin-top: 10px;
  }

  .inline {
    display: inline-block;
  }

  table {
    width: 100%;
  }
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .success-bg{
    background-color: @success-color;
    color: #fff;
  }
  .success-text{
    color: @success-color;
  }
  .primary-bg{
    background-color: @primary-color;
    color: #fff;
  }
  .primary-text{
    color: @primary-color;
  }
  .info-bg{
    background-color: @info-color;
    color: #fff;
  }
  .info-text{
    color: @info-color;
  }
  .warning-bg{
    background-color: @warning-color;
    color: #fff;
  }
  .warning-text{
    color: @warning-color;
  }

  .model-header{
    color: @primary-color;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-corner, ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(100, 100, 100, 0.4);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.8);
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
</style>
