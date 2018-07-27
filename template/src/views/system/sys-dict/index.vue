<template>
  <div class="user">
    <data-grid resource="SysDict" ref="dict" :columns="columns" :table-data="list" @on-search="search" @on-add="add"
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
  name: 'sys-dict',
  components: {DataGrid},
  data () {
    return {
      loading: false,
      editData: {},
      pageSize: 10,
      pageNo: 0,
      dictTypeData: [],
      dictData: [],
      loadDictDataDown: false
    }
  },
  computed: {
    list () {
      return this.$store.state.dict.dictList;
    },
    columns () {
      return [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          key: 'dictTypeCode',
          title: '选择类型',
          sortable: true,
          editable: true,
          hidden: true,
          type: 'select',
          placeholder: '新增加类型在下面填写，此处可不选择',
          selectOptions: this.dictTypeData,
          selectCodeKey: 'dictTypeCode',
          selectLabelKey: 'dictTypeName'
        },
        {
          key: 'dictTypeCode',
          title: '类型编码',
          sortable: true,
          editable: true,
          type: 'input',
          required: true
        },
        {
          key: 'dictTypeName',
          title: '类型名称',
          editable: true,
          required: true
        },
        {
          key: 'dictCode',
          title: '编码',
          sortable: true,
          editable: true,
          required: true
        },
        {
          key: 'dictValue',
          title: '值',
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
      if (!this.loadDictDataDown) {
        this.$store.dispatch('getDict', {dictTypeCode: '00'}).then(() => {
          this.dictTypeData = this.$store.state.dict.dictCond.map(d => {
            return {code: d.dictCode, name: d.dictValue}
          })
        });

        /* this.$store.dispatch('getDict').then(() => {
          this.dictData = this.$store.state.dict.dictCond.map(d => {
            return {code: d.id, name: d.dictValue}
          })
        }); */

        this.loadDictDataDown = true;
      }
    },
    fetchData () {
      let params = {pageSize: this.pageSize, pageNo: this.pageNo, searchText: this.searchText, sortBy: 'dict_type_code,dict_code'};
      this.loading = true;
      this.$store.dispatch('getDictList', params).then(() => {
        this.loading = false;
      })
    },
    search (searchText) {
    },
    add () {
      this.loadDictData();
      this.editData = {};
    },
    create (data) {
      this.$store.dispatch('addDict', data).then(() => {
        this.$Message.success('新增字典数据成功');
        this.$refs.dict.openDialog = false;
        this.fetchData();
        this.loadDictDataDown = false;
      })
    },
    update (data) {
      this.$store.dispatch('updateDict', data).then(() => {
        this.$Message.success('更新字典数据成功');
        this.$refs.dict.openDialog = false;
        this.fetchData();
        this.loadDictDataDown = false;
      })
    },
    edit (row) {
      this.loadDictData();
      this.editData = JSON.parse(JSON.stringify(row));
    },
    remove (row) {
      this.$store.dispatch('delDict', row.id).then(() => {
        this.$Message.success('删除字典数据成功');
        this.$refs.dict.openDialog = false;
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
