<template>
  <div class="edit-page">
    <h2 class="edit-title">
      <Icon type="ios-compose-outline" style="margin-right: 5px"></Icon>
      {{title}}
      <slot name="title-more"></slot>
    </h2>
    <!--<hr>-->
    <div class="edit-body">
      <slot></slot>
    </div>
    <!--<div class="edit-footer">
      <Button type="primary" icon="checkmark-round" @click="ok">确定</Button>
      <Button type="error" @click="cancel">取消</Button>
    </div>-->
  </div>
</template>


<script>
  export default {
    name: 'edit-page',
    props: {
      title: String,
    },
    data() {
      return {}
    },
    methods: {
      ok(){
        this.$emit('on-ok')
      },
      cancel(){
        this.$emit('on-cancel')
      }
    }
  }
</script>


<style scoped lang="scss">
  .edit-page {
    width: 100%;
    padding: 10px;

    .edit-title {
      color: #1c2438;
    }

    .edit-body {
      padding: 10px 20px;

    }

    .edit-footer {
      padding: 10px;
      text-align: right;
    }
  }


</style>
