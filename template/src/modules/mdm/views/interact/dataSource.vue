<template>
  <page-layout card-title="数据源">
    <baseTable-layout :columns="columns"
                      :data="dsData" @on-refresh="refresh"
                      @addNew="addNew" @page-change="changePage" @page-size-change="pageSizeChange"
                      @handleSearch="handleSearch"></baseTable-layout>

    <!-- dialog -->
    <np-dialog :open.sync="dialogShow">
      <ds-edit :dsData="ds" v-if="dialogShow" @close="closeEdit"></ds-edit>
    </np-dialog>
  </page-layout>
</template>


<script>
  import PageLayout from "../appComponents/pageLayout.vue";
  import baseTableLayout from "@/components/layout/baseTableLayout.vue"
  import npDialog from '@/components/dialog/dialog.vue'
  import dsEdit from './dsEdit.vue'

  export default {
    components: { PageLayout, baseTableLayout, npDialog, dsEdit },
    name: 'data-source',
    data() {
      return {
        searchGroupName: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '数据源名称',
            key: 'dsName',
          },
          {
            title: '数据源组',
            key: 'dsGroupName'
          },
          {
            title: '数据源类型',
            key: 'dsType'
          },
          {
            title: '数据源地址',
            key: 'dsUrl'
          },
          {
            title: '数据源用户名',
            key: 'dsUser'
          },
          {
            title: '数据源系统',
            key: 'sourceSysName'
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
                      this.edit(params.row)
                    }
                  }
                }, '编辑'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确认删除这条内容吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.delete(params.row)
                    },
                    'on-cancel': () => {
                      console.log('cancel')
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '删除')
                ])
              ]);
            }
          }
        ],
        dialogShow: false,
        pageSize: 10,
        pageNo: 1,
        ds: {}
      }
    },
    mounted() {
      this.fetchData();
    },
    computed: {
      dsData() {
        return this.$store.state.dataSource.datasourceList;
      }
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      changePage(page) {
        this.pageNo = page;
        this.fetchData();
      },
      pageSizeChange(size) {
        this.pageSize = size;
        this.fetchData();
      },
      fetchData() {
        let params = { pageNo: this.pageNo, pageSize: this.pageSize };
        this.$store.dispatch('getDsList', params)
      },
      handleSearch(searchKey) {

      },
      closeEdit(isRefresh) {
        this.dialogShow = false;
        if (this.isRefresh = true) {
          this.fetchData();
        }
      },
      addNew() {
        this.ds = { isNew: true };
        this.dialogShow = true
      },
      edit(row) {
        this.ds = JSON.parse(JSON.stringify(row));
        this.dialogShow = true;
      },
      delete(row) {
        this.$store.dispatch('removeDatasource', row.id).then(() => {
          this.$Message.success('删除成功');
          this.fetchData();
        })
      },
    }
  }
</script>


<style scoped>

</style>
