<template>
  <Select v-model="model" @on-change="changeValue">
    <Option v-for="item in dataTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
  </Select>
</template>


<script>
  export default {
    name: 'data-type-select',
    props: {
      value: { type: String, default: 'VARCHAR2' }
    },
    data() {
      return {
        model: this.value,
      }
    },
    computed: {
      dataTypeList() {
        return this.$store.state.dict.ZD03
      }
    },
    mounted() {
      this.$store.dispatch('fetchDict', '03')
    },
    methods: {
      changeValue(val) {
        this.$emit('input', val);
        this.$emit('change-value', val)
      }
    },
    watch: {
      value(nv) {
        this.model = nv
      }
    },
  }
</script>


<style scoped>

</style>
