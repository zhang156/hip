<template>
  <page-layout card-title="术语同步管理">
    <baseTable-layout :columns="columns"
                      :data="tableData"
                      showAdd @on-refresh="refresh"
                      @addNew="addNew" @page-change="changePage" @page-size-change="pageSizeChange"
                      @handleSearch="handleSearch"></baseTable-layout>

    <!-- dialog -->
    <np-dialog :open.sync="dialogShow" width="60%">
      <md-sync-edit :task-data="task" @close="closeEdit"></md-sync-edit>
    </np-dialog>
  </page-layout>
</template>


<script>
  import BaseTableLayout from "@/components/layout/baseTableLayout.vue";
  import PageLayout from "../appComponents/pageLayout.vue";
  import npDialog from '@/components/dialog/dialog.vue';
  import MdSyncEdit from "./mdSyncEdit";

  export default {
    name: 'md-sync',
    components: {
      MdSyncEdit,
      PageLayout,
      BaseTableLayout,
      npDialog
    },
    data() {
      return {
        dialogShow: false,
        task: {},
        columns: [
          /*          {
           type: 'selection',
           width: 60,
           align: 'center'
           },*/
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '术语编码',
            key: 'modelCode',
            sortable: true,
            align: 'center'
          },
          {
            title: '模型中文名称',
            key: 'modelName',
            align: 'center'
          },
          {
            title: '术语表名',
            key: 'modelEnName',
            align: 'center'
          },
          {
            title: '任务间隔(min)',
            key: 'syncInterval',
            align: 'center'
          },
          {
            title: '任务状态',
            key: 'taskStatus',
            align: 'center',
            render: (h, params) => {
              return params.row.taskStatus == '1' ? '启用' : '停用';
            }
          },
          {
            title: '数据源',
            key: 'dsName',
            align: 'center'
          },
          {
            title: '数据源系统',
            key: 'sourceSysName',
            align: 'center'
          },
          {
            title: '同步状态',
            key: 'syncResultStatus',
            align: 'center'
          },
          {
            title: '同步结果',
            key: 'syncResultLog',
            align: 'center'
          },
          {
            type: 'action',
            title: '操作',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
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
                    title: '您确定要停用当前任务吗?',
                    transfer: true,

                  },
                  on: {
                    'on-ok': () => {
                      this.stopOrStart(params.row)
                    }
                  }
                }, [
                  h('Button', {
                    style: {
                      margin: '0 5px'
                    },
                    props: {
                      type: params.row.taskStatus == '1' ? 'warning' : 'success',
                      placement: 'top',
                      size: 'small'
                    }
                  }, params.row.taskStatus == '1' ? '停用' : '启用')
                ]),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除当前数据吗?',
                    transfer: true,

                  },
                  on: {
                    'on-ok': () => {
                      this.delete(params.row)
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      placement: 'top',
                      size: 'small'
                    }
                  }, '删除')
                ])
              ])
            }
          },
        ],
        pageSize: 10,
        pageNo: 1,
        searchText: ''
      }
    },
    computed: {
      tableData() {
        return this.$store.state.interact.mdSync
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      fetchData() {
        this.$store.dispatch('getMdSync', {
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
      },
      closeEdit(isRefresh) {
        this.dialogShow = false;
        if (this.isRefresh = true) {
          this.fetchData();
        }
      },
      addNew() {
        this.task = {
          isNew: true,
          taskStatus: '0',
          sourceSql: '',
          targetSql: '',
          sourcePrimaryKeys: '',
          targetPrimaryKeys: ''
        };
        this.dialogShow = true
      },
      edit(row) {
        this.task = JSON.parse(JSON.stringify(row));
        this.dialogShow = true;
      },
      delete(row) {
        this.$store.dispatch('removeMdSync', row.id).then(() => {
          this.$Message.success('删除成功');
          this.fetchData();
        })
      },
      stopOrStart(row) {
        row.taskStatus = row.taskStatus == '1' ? '0' : '1';
        this.$store.dispatch('modifyMdSync', row).then(() => {
          this.fetchData();
        })

      },

    }
  }
</script>


<style scoped>

</style>
