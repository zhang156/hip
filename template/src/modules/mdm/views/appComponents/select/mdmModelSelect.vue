<template>
  <Select v-model="model" placeholder="数据模型选择" :style="{'width': width}"
          @on-change="changeValue" :size="size" filterable>
    <Option v-for="item in dataList" :value="item.id" :key="item.id">{{ item.serviceId +' - '+item.modelName }}</Option>
  </Select>
</template>


<script>
  export default {
    name: 'mdmModelSelect',
    props: {
      value: [String, Number],
      width: {
        type: String,
        default: '400px'
      },
      size: String,
      flag: {
        type: String,
        default: '1'
      },
      code: [String, Number],
      name: [String, Number],
      enName: [String, Number],
    },
    data() {
      return {
        model: this.value,
      }
    },
    computed: {
      dataList() {
        return this.$store.state.dict.modelData
      }
    },
    mounted() {
      this.$store.dispatch('getModelDict', this.flag)
    },
    methods: {
      changeValue(val) {
        this.$emit('input', val);
        for (var i = 0; i < this.dataList.length; i++) {
          if (val == this.dataList[i].id) {
            this.$emit('update:code', this.dataList[i].modelCode);
            this.$emit('update:name', this.dataList[i].modelName);
            this.$emit('update:enName', this.dataList[i].modelEnName);
            break;
          }
        }

        this.$emit('on-changeValue',val)
      }
    }
    ,
    watch: {
      value(nv) {
        this.model = nv
      },
      flag(nv) {
        this.$store.dispatch('getModelDict', nv)
      }
    }
    ,
  }
</script>


<style scoped>

</style>
