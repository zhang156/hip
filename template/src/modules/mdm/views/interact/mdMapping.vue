<template>
  <page-layout card-title="术语对照管理">
    <baseTable-layout :columns="columns"
                      :data="tableData"
                      showAdd
                      @addNew="addNew" @on-refresh="refresh"
                      @handleSearch="handleSearch" v-show="!showEdit"></baseTable-layout>
    <Button type="primary" v-if="showEdit" @click="back" size="small">
      <Icon type="chevron-left"></Icon>
      返回
    </Button>
    <mapping-edit :mapping-data="mapping" v-if="showEdit"></mapping-edit>
  </page-layout>
</template>


<script>
  import BaseTableLayout from "@/components/layout/baseTableLayout.vue";
  import PageLayout from "../appComponents/pageLayout.vue";
  import npDialog from '@/components/dialog/dialog.vue';
  import MappingEdit from "./mappingEdit";

  export default {
    name: 'md-mapping',
    components: {
      MappingEdit,
      PageLayout,
      BaseTableLayout,
      npDialog
    },
    data() {
      return {
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '数据源',
            key: 'dsName',
          },
          {
            title: '数据源表',
            key: 'dsTable',
          },
          {
            title: '主数据术语编码',
            key: 'modelCode',
          },
          {
            title: '术语中文名称',
            key: 'modelName',
          },
          {
            title: '术语英文名称',
            key: 'modelEnName',
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '编辑对照'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        showEdit: true,
        pageSize: 10,
        pageNo: 1,
        searchText: '',
        mapping: {},
      }
    },
    computed: {
      tableData() {
        return this.$store.state.interact.mdCompare
      }
    },
    methods: {
      fetchData() {

      },
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      back() {
        this.showEdit = false;
        this.fetchData();
      },
      addNew() {
        this.showEdit = true
      },
      handleSearch() {

      },
      confirm() {}
    }
  }
</script>


<style scoped>

</style>
