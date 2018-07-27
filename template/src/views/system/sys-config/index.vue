<template>
  <div class="user">
    <data-grid resource="SysConfig" ref="config" :columns="columns" :table-data="list" @on-search="search" @on-add="add"
               @on-refresh="refresh" @on-page-change="changePage"
               @on-page-size-change="pageSizeChange" @edit-row="edit" @remove-row="remove"
               :editData="editData"
               @on-data-create="create" @on-data-update="update">
    </data-grid>
  </div>
</template>

<script>
import DataGrid from '../../../components/table/dataGrid';

export default {
  name: 'sys-config',
  components: {DataGrid},
  data () {
    return {
      loading: false,
      editData: {},
      pageSize: 10,
      pageNo: 0,
      loadDictDataDown: false,
      searchCond: {}
    }
  },
  computed: {
    list () {
      return this.$store.state.config.configList;
    },
    columns () {
      return [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          key: 'configId',
          title: '配置编号',
          sortable: true,
          editable: true,
          required: true
        },
        {
          key: 'configCode',
          title: '配置编码',
          editable: true,
          required: true
        },
        {
          key: 'configValue',
          title: '配置值',
          sortable: true,
          editable: true,
          required: true
        },
        {
          key: 'configDesc',
          title: '说明',
          editable: true,
          required: true
        }
      ]
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    loadDictData () {
      this.loadDictDataDown = true;
    },
    fetchData () {
      let params = Object.assign({pageSize: this.pageSize, pageNo: this.pageNo, searchText: this.searchText, sortBy: 'config_Id'}, this.searchCond);
      this.loading = true;
      this.$store.dispatch('getConfigList', params).then(() => {
        this.loading = false;
      })
    },
    search (searchText) {
      this.searchCond.configId = searchText;
      this.refresh();
    },
    add () {
      this.loadDictData();
      this.editData = {};
    },
    create (data) {
      this.$store.dispatch('addConfig', data).then(() => {
        this.$Message.success('新增系统配置成功');
        this.$refs.dict.openDialog = false;
        this.fetchData();
        this.loadDictDataDown = false;
      })
    },
    update (data) {
      this.$store.dispatch('updateConfig', data).then(() => {
        this.$Message.success('更新系统配置成功');
        this.$refs.config.openDialog = false;
        this.fetchData();
        this.loadDictDataDown = false;
      })
    },
    edit (row) {
      this.loadDictData();
      this.editData = JSON.parse(JSON.stringify(row));
    },
    remove (row) {
      this.$store.dispatch('delConfig', row.id).then(() => {
        this.$Message.success('删除系统配置成功');
        this.$refs.config.openDialog = false;
        this.fetchData();
        this.loadDictDataDown = false;
      })
    },
    refresh () {
      this.pageNo = 0;
      this.pageSize = 10;
      this.fetchData();
    },
    changePage (pageNo) {
      this.pageNo = pageNo;
      this.fetchData();
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.fetchData();
    }
  }
}
</script>

<style scoped>

</style>
