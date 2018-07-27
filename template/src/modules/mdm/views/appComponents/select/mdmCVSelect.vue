<template>
  <Select v-model="model" placeholder="标准值域代码选择" :style="{'width': width}"
          @on-change="changeValue" :size="size" filterable>
    <Option v-for="item in dataList" :value="item.identifier" :key="item.identifier">{{ item.identifier +' - '+item.name
      }}
    </Option>
  </Select>
</template>


<script>
  export default {
    name: 'mdmCVSelect',
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
      name: [String, Number],
    },
    data() {
      return {
        model: this.value,
      }
    },
    computed: {
      dataList() {
        return this.$store.state.share.cvGroup
      }
    },
    mounted() {
      this.$store.dispatch('listCVGroup')
    },
    methods: {
      changeValue(val) {
        this.$emit('input', val);
        for (var i = 0; i < this.dataList.length; i++) {
          if (val == this.dataList[i].identifier) {
            this.$emit('update:name', this.dataList[i].name);
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
