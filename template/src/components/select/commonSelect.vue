<template>
  <Select v-model="model" :placeholder="placeholder" style="width: 250px" :label-in-value="labelInValue" :multiple="multiple"
          :disabled="disabled" clearable filterable
          @on-change="changeValue">
    <Option v-for="item in dataOptions" :value="item.code" :key="item.code">{{ item.name }}</Option>
  </Select>
</template>

<script>
export default {
  name: 'common-select',
  props: {
    placeholder: String,
    disabled: Boolean,
    value: [String, Array],
    labelInValue: Boolean,
    multiple: Boolean,
    code: [String, Number, Array],
    name: [String, Number, Array],
    dataOptions: Array
  },
  data () {
    return {
      model: this.value
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    changeValue (val) {
      if (this.labelInValue) {
        this.$emit('input', val.code);
        this.$emit('update:code', val.value);
        this.$emit('update:name', val.label);
      } else {
        this.$emit('input', val);
      }

      this.$emit('on-change', val);
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
