<template>
  <div class="base-table-layout">
    <Row>
      <Input v-model="searchText" @on-change="handleSearch" :placeholder="placeholder"
             style="width:200px;"/>
      <Button type="primary" icon="ios-search-strong" @click.native="handleSearch">搜索</Button>
      <Button type="info" icon="ios-refresh-empty" @click="refresh" v-if="showRefresh">刷新</Button>
      <Button type="success" icon="plus-round" @click.native="add" v-if="showAdd">新增</Button>
      <slot name="more-opreation"></slot>
    </Row>

    <Row class="margin-top-10 clear">
      <Table :columns="columns" :data="data.list" @on-selection-change="selectionChange"></Table>
      <Page class="page" show-total show-elevator show-sizer :total="data.list?data.total:data.length"
            @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'base-table-layout',
    props: {
      showAdd: {
        type: Boolean,
        default: true
      },
      showRefresh: {
        type: Boolean,
        default: true
      },
      columns: {
        type: Array,
        default: function () {return []}
      },
      data: {
        type: [Array, Object],
        default: function () {return { list: [] }}
      },
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      }
    },
    data() {
      return {
        searchText: '',
        dialogOpen: false
      }
    },
    methods: {
      pageChange(page) {
        this.$emit('page-change', page)
      },
      pageSizeChange(size) {
        this.$emit('page-size-change', size)
      },
      handleSearch() {
        this.$emit('handleSearch', this.searchText)
      },
      add() {
        this.$emit('addNew')
      },
      refresh() {
        this.$emit('on-refresh')
      },
      selectionChange(selection) {
        this.$emit('on-selection-change', selection)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-table-layout {
    .page {
      margin-top: 15px;
      float: right;
    }
  }
</style>
