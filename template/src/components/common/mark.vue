<template>
  <div class="mark">{{ value }}</div>
</template>

<script>
export default {
  name: 'iMark',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.mark {
  display: inline-block;
  border-radius: 10px;
  padding: 0 8px; 
  background: red;
  color: #fff;
  font-size: 10px;
  transform: scale(.75) translateY(-2px);
  margin-left: -2px;
}
</style>


