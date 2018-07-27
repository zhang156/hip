<template>
  <div class="home">
    {{ test }}
  </div>
</template>

<script>
export default {
  name: 'resource',
  computed: {
    test() {
      return this.$store.state.test.testData
    }
  }
}
</script>

<style scoped>

</style>