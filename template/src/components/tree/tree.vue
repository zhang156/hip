<template>
  <div class="tree">
    <node :data="data"
          :showCheckbox="showCheckbox" @node-click="selectNode"></node>
  </div>
</template>

<script>
import Node from './node';
export default {
  name: 'tree',
  components: {Node},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => null
    },
    showCheckbox: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectNode (node) {
      this.clearSelected(this.data, node);
      this.$emit('on-node-select', node);
    },
    clearSelected (node, currentNode) {
      node.map((n) => {
        if (n.id !== currentNode.id) {
          this.$set(n, 'selected', false);
        }
        if (n.children) {
          this.clearSelected(n.children, currentNode)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
