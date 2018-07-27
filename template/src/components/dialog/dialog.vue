<template>
  <div>
    <transition name="dialog-fade" @after-enter="show()" @after-leave="hide()">
      <div class="dialog-wrap" v-show="open" @click.self="closeDialog">
        <div class="dialog" :style="{'width': width}">
          <slot></slot>

          <div class="dialog-footer" v-if="showConfirm">
            <div class="btn-wrap">
              <Button type="primary" @click.native="confirm">确认</Button>
              <Button type="default" @click.native="closeDialog">取消</Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- mask -->
    <div class="mask" v-show="open"></div>
  </div>
</template>

<script>
export default {
  name: 'dp-dialog',
  props: {
    width: {
      type: String,
      default: '40%'
    },
    open: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right'
    },
    maskClosable: {
      type: true,
      default: true
    }
  },
  data () {
    return {
    }
  },
  created () {},
  computed: {},
  methods: {
    show () {

    },
    hide () {

    },
    confirm () {
      this.$emit('confirm')
    },
    closeDialog () {
      if (this.maskClosable) {
        this.$emit('update:open', false)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .dialog-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    /*text-align: right;*/

    .dialog {
      position: relative;
      overflow: auto;
      height: calc(100vh - 0px);
      background: #fff;
      z-index: 1003;
      transition: all .2s;
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      float: right;

      .dialog-footer {
        // height: 40px;
        padding: 10px;
        border-top: 1px solid #ddd;
        text-align: right;

        .btn-wrap {
          display: inline-block;
        }
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: .6;
    z-index: 998;
  }

  .dialog-fade-enter-active {
    animation: dialog-fade-in .4s;
  }

  .dialog-fade-leave-active {
    animation: dialog-fade-out .4s;
  }

  @keyframes dialog-fade-in {
    0% {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes dialog-fade-out {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    100% {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
  }
</style>
