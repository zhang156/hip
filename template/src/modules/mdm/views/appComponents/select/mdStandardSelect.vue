<template>
  <Select v-model="model" placeholder="术语标准" style="width: 200px" :label-in-value="labelInValue"
          @on-change="changeValue">
    <Option v-for="item in dataList" :value="item.code" :key="item.code">{{ item.value }}</Option>
  </Select>
</template>


<script>
  export default {
    name: 'mdStandardSelect',
    props: {
      value: String,
      labelInValue: Boolean,
      code: [String, Number],
      name: [String, Number]
    },
    data() {
      return {
        model: this.value,
      }
    },
    computed: {
      dataList() {
        return this.$store.state.dict.ZD02
      }
    },
    mounted() {
      this.$store.dispatch('fetchDict', '02')
    },
    methods: {
      changeValue(val) {
        if (this.labelInValue) {
          this.$emit('input', val.value);
          this.$emit('update:code', val.value)
          this.$emit('update:name', val.label)
          /*this.code = val.value;
           this.name = val.label;*/
        }else {
          this.$emit('input', val);
        }
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
