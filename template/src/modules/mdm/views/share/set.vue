<template>
  <page-layout>
    <baseTable-layout :columns="columns"
                      :data="setData"  @on-refresh="refresh"
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
    name: 'set',
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
            title: '数据集分类',
            width: 120,
            align: 'center'
          },
          {
            key: 'identifier',
            title: '数据集标识符',
            width: 120,
            sortable: true,
            align: 'center'
          },
          {
            key: 'name',
            title: '数据集名称',
            align: 'center'
          },
          {
            key: 'subDs',
            title: '子集',
            width: 60,
            align: 'center'
          },
          {
            key: 'internalIdentifier',
            title: '内部标识符',
            width: 130,
            sortable: true,
            align: 'center'
          },
          {
            key: 'deName',
            title: '数据元名称',
            align: 'center'
          },
          {
            key: 'deIdentifier',
            title: '数据元标识符',
            width: 130,
            sortable: true,
            align: 'center'
          },
          {
            key: 'deDefine',
            title: '数据元定义',
            align: 'center'
          },
          {
            key: 'dataType',
            title: '数据类型',
            width: 70,
            align: 'center'
          },
          {
            key: 'representFormat',
            title: '表示格式',
            width: 100,
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
            width: 60,
            align: 'center'
          }
        ],
        pageSize: 10,
        pageNo: 1,
        searchText: '',
      }
    },
    created() {
      this.fetchData();
    },
    computed: {
      setData() {
        return this.$store.state.share.setData
      }
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      fetchData() {
        this.$store.dispatch('listSetData', {
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
