<template>
  <div class="node">
    <collapse-transition>
      <ul>
        <li v-for="(item,index) in data" :key="index">
          <div class="node-el" v-if="!item.hidden">
            <span @click="expandNode(item)" class="node-arrow" :class="{'node-arrow-disable':isLeaf(item)}">
              <Icon type="arrow-right-b" :class="{'trans':item.expanded}" v-if="!isLeaf(item) && hasNoHiddenChild(item)"></Icon>
            </span>
            <span v-if='showCheckbox'>
              <Checkbox v-model="item.checked" @click.native="nodeCheck(item)"></Checkbox>
            </span>
            <span @click="handleSelect(item)" class="node-title" :class="{'node-selected':item.selected}">
              <Icon type="android-folder-open" v-if="item.expanded"></Icon>
              <Icon type="android-folder" v-else></Icon>
              <span >{{item.title}}</span>
            </span>
          </div>
          <node v-if="!isLeaf(item)"
                v-show="item.expanded"
                @node-click="nodeClick"
                @node-check="checkNode"
                :data="item.children"
                :showCheckbox="showCheckbox"
                :parent ='item'></node>
        </li>
      </ul>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from 'iview/src/components/base/collapse-transition';
export default {
  name: 'Node',
  components: {CollapseTransition},
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
  mounted () {
    this.initHandle();
  },
  methods: {
    traverseNodeHide (node, has) {
      if (node.children && node.children.length) {
        for (var c of node.children) {
          if (!c.hidden) {
            has = true;
            return has;
          }
          if (c.children) {
            this.traverseNodeHide(c.children, has)
          }
        }
      }
      return has;
    },
    hasNoHiddenChild (node) {
      let has = false;
      return this.traverseNodeHide(node, has);
    },
    isLeaf (node) {
      return !(node.children && node.children.length) && node.parent
    },
    handleSelect (node) {
      this.$emit('node-click', node);
      this.$set(node, 'selected', !node.selected);
    },
    expandNode (node) {
      if (this.isLeaf(node)) {
        return;
      }
      this.$set(node, 'expanded', !node.expanded);
      this.$emit('node-expanded', node);
    },
    nodeClick (node) {
      this.$emit('node-click', node);
    },
    nodeCheck (node) {
      this.$emit('node-check', node);
      /* if (item.checked) {
        this.checkParent(item);
      } */
    },
    checkNode (node) {
      console.log(node)
    },
    checkParent (item) {
      this.$set(item, 'checked', true);
      if (item.parent) {
        this.checkParent(item.parent);
      }
    },
    initHandle () {
      let parent = null;
      if (this.parent) {
        parent = JSON.parse(JSON.stringify(this.parent));
        delete parent.children;
      }
      for (let node of this.data) {
        this.$set(node, 'parent', parent);
      }
    }
  },
  watch: {
    data () {
      this.initHandle()
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../theme/index";
  .node{
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 12px;
      li{
        list-style: none;
        margin: 5px 0;
        padding: 0;
        white-space: nowrap;
        outline: 0;
        ul{
          margin: 0;
          padding: 0 0 0 18px;
        }
      }
    }
    .node-arrow{
      cursor: pointer;
      width: 14px;
      text-align: center;
      display: inline-block;
      &.node-arrow-disable{
        cursor: not-allowed;
      }
    }
    .node-el{
      .ivu-icon{
        padding: 0px 4px;
      }

    }
    .node-title{
      display: inline-block;
      margin: 0;
      cursor: pointer;
      vertical-align: top;
      transition: all .2s ease-in-out;
      &.node-selected{
        color: @primary-color;
        span{
          background-color: #eee;
          padding: 2px 5px;
          border-radius: 2px;
        }
      }
    }

    .ivu-icon{
      transition: all .2s ease-in-out;
      font-size: 14px;
      &.trans{
        transform: rotate(90deg);
      }
    }
  }
</style>
