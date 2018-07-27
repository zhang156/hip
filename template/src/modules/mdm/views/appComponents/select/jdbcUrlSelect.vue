<template>
  <Select v-model="model" placeholder="数据库类型" style="width: 200px"
          @on-change="changeValue">
    <Option v-for="item in dataList" :value="item.code" :key="item.code">{{ item.code }}</Option>
  </Select>
</template>


<script>
  export default {
    name: 'jdbcUrlSelect',
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
        return this.$store.state.dict.ZD06
      }
    },
    mounted() {
      this.$store.dispatch('fetchDict', '06')
    },
    methods: {
      changeValue(val) {
        this.$emit('input', val);
        let label = '';
        for (var i = 0; i < this.dataList.length; i++) {
          if (val == this.dataList[i].code) {
            label = this.dataList[i].value;
            break;
          }
        }
        this.$emit('set-real-label', label);
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
