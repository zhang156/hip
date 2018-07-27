<template>
  <Select v-model="model" style="width:250px;max-height: 500px" clearable filterable @on-change="changeValue">
    <Option v-for="item in iconData" :value="item.name" :key="item.name">
      <Icon :type="item.name" :size="16"/>
      <span style="margin-left: 10px">{{item.name}}</span>
    </Option>
  </Select>
</template>

<script>
import {icons} from '../../assets/iconData';

export default {
  name: 'icon-select',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      iconData: icons,
      model: this.value
    }
  },
  methods: {
    changeValue (val) {
      this.$emit('input', val);
    }
  },
  watch: {
    value (nv) {
      this.model = nv;
    }
  }
}

</script>

<style scoped>

</style>
