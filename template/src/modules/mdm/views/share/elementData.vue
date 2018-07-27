<template>
  <page-layout>
    <baseTable-layout :columns="columns"
                      :data="elementData"  @on-refresh="refresh"
                      @page-change="changePage" @page-size-change="pageSizeChange"
                      @handleSearch="handleSearch"></baseTable-layout>
  </page-layout>
</template>


<script>
  import BaseTableLayout from "@/components/layout/baseTableLayout.vue";
  import PageLayout from "../appComponents/pageLayout.vue";

  export default {
    components: {
      PageLayout,
      BaseTableLayout,
    },
    name: 'element-data',
    data() {
      return {
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            key: 'category',
            title: '数据元分类',
            align: 'center'
          },
          {
            key: 'identifier',
            title: '数据元标识符',
            sortable: true,
            align: 'center'
          },
          {
            key: 'name',
            title: '数据元名称',
            align: 'center'
          },
          {
            key: 'define',
            title: '数据元定义',
            align: 'center'
          },
          {
            key: 'dataType',
            title: '数据类型',
            align: 'center'
          },
          {
            key: 'representFormat',
            title: '表示格式',
            align: 'center'
          },
          {
            key: 'allowableValue',
            title: '允许值',
            align: 'center'
          },
          {
            key: 'versionNo',
            title: '版本号',
            align: 'center'
          }
        ],
        pageSize: 10,
        pageNo: 1,
        searchText: ''
      }
    },
    created() {
      this.fetchData();
    },
    computed: {
      elementData() {
        return this.$store.state.share.elementData
      }
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      fetchData() {
        this.$store.dispatch('listElementData', {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          searchText: this.searchText
        })
      },
      handleSearch(searchText) {
        this.pageSize = 10;
        this.pageNo = 1;
        this.searchText = searchText;
        this.fetchData();
      },
      changePage(page) {
        this.pageNo = page;
        this.fetchData();
      },
      pageSizeChange(size) {
        this.pageSize = size;
        this.fetchData();
      }
    }
  }
</script>


<style scoped lang="scss">


</style>
