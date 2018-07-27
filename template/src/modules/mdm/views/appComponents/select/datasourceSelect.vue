<template>
  <Select v-model="model" placeholder="数据源选择" style="width: 400px"
          @on-change="changeValue">
    <Option v-for="item in dataList" :value="item.id" :key="item.id">{{item.dsName}}</Option>
  </Select>
</template>


<script>
  export default {
    name: 'datasourceSelect',
    props: {
      value: [String,Number],
    },
    data() {
      return {
        model: this.value,
      }
    },
    computed: {
      dataList() {
        return this.$store.state.dict.dsData
      }
    },
    mounted() {
      this.$store.dispatch('getDatasourceDict')
    },
    methods: {
      changeValue(val) {
        this.$emit('input', val);
      }
    }
    ,
    watch: {
      value(nv) {
        this.model = nv
      }
    }
    ,
  }
</script>


<style scoped>

</style>
