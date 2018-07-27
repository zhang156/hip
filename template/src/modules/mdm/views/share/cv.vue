<template>
  <page-layout>
    <baseTable-layout :columns="columns"
                      :data="cvData"  @on-refresh="refresh"
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
    name: 'cv',
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
            title: '值域分类',
            align: 'center'
          },
          {
            key: 'identifier',
            title: '值域代码标识符',
            sortable: true,
            align: 'center'
          },
          {
            key: 'name',
            title: '值域代码名称',
            align: 'center'
          },
          {
            key: 'code',
            title: '编码',
            sortable: true,
            align: 'center'
          },
          {
            key: 'value',
            title: '值',
            align: 'center'
          },
          {
            key: 'explain',
            title: '说明',
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
      cvData() {
        return this.$store.state.share.cvData
      }
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      fetchData() {
        this.$store.dispatch('listCvData', {
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
