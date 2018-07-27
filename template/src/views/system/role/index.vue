<template>
  <div class="role">
    <data-grid resource="Role" ref="role" :columns="columns" :table-data="list" @on-search="search" @on-add="add"
               @on-refresh="refresh" @on-page-change="changePage"
               @on-page-size-change="pageSizeChange" @edit-row="edit" @remove-row="remove" :editData="editData"
              @on-data-create="createRole" @on-data-update="updateRole">
    </data-grid>
  </div>
</template>

<script>
import DataGrid from '../../../components/table/dataGrid';
export default {
  name: 'role',
  components: {DataGrid},
  data () {
    return {
      loading: false,
      editData: {},
      pageSize: 10,
      pageNo: 0,
      hasResourceIds: [],
      loadDictDataDown: false
    }
  },
  computed: {
    list () {
      return this.$store.state.role.roleList;
    },
    sysResources () {
      return this.$store.state.resource.allResources || [];
    },
    columns () {
      return [
        {
          title: '角色编码',
          key: 'roleCode',
          editable: true,
          type: 'input',
          required: true
        },
        {
          title: '角色名称',
          key: 'roleName',
          editable: true,
          type: 'input',
          required: true
        },
        {
          title: '描述',
          key: 'description',
          editable: true,
          type: 'textarea'
        },
        {
          title: '权限',
          key: 'allResources',
          editable: true,
          type: 'tree',
          parentIsBorther: true,
          render: (h, params) => {
            return h('div', {}, params.row.resources.map(r => r.resourceName).join(';'))
          }
        }
      ]
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    // 递归转换所有权限数据
    traverseAllResource (resource, ids) {
      if (resource) {
        resource.map(r => {
          this.$set(r, 'title', r.resourceName);
          if (ids.indexOf(r.id) > -1) {
            this.$set(r, 'checked', true);
          } else {
            this.$set(r, 'checked', false);
          }
          if (r.children && r.children.length > 0) {
            this.$set(r, 'expanded', true);
            this.traverseAllResource(r.children, ids);
          }
        })
      }
      return resource
    },
    loadDictData () {
      if (!this.loadDictDataDown) {
        this.$store.dispatch('listAllResource', {});

        this.loadDictDataDown = true;
      }
    },
    fetchData () {
      let params = {pageSize: this.pageSize, pageNo: this.pageNo, searchText: this.searchText};
      this.loading = true;
      this.$store.dispatch('getRoleList', params).then(() => {
        this.loading = false;
      })
    },
    search (searchText) {

    },
    add () {
      this.loadDictData();
      this.editData = {allResources: this.traverseAllResource(JSON.parse(JSON.stringify(this.sysResources)), [])};
    },
    edit (row) {
      this.loadDictData();
      let hasResourceIds = row.resources.map(r => r.id);
      this.editData = JSON.parse(JSON.stringify(row));
      this.$set(this.editData, 'allResources', this.traverseAllResource(JSON.parse(JSON.stringify(this.sysResources)), hasResourceIds))
    },
    remove (row) {
      this.$store.dispatch('delRole', row.id).then(() => {
        this.$Message.success(`删除角色${row.roleCode}成功！`);
        this.fetchData();
      })
    },
    refresh () {
      this.fetchData();
    },
    changePage (pageNo) {
      this.pageNo = pageNo;
      this.fetchData();
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.fetchData();
    },
    createRole (data) {
      data.resources = data.checkedNodes;
      delete data.allResources;
      this.$store.dispatch('addRole', data).then(() => {
        this.$Message.success(`新增角色${data.roleCode}成功！`);
        this.$refs.role.openDialog = false;
        this.fetchData();
      })
    },
    updateRole (data) {
      data.resources = data.checkedNodes;
      delete data.allResources;
      console.log(data.resources)

      this.$store.dispatch('updateRole', data).then(() => {
        this.$Message.success(`更新角色${data.roleCode}成功！`);
        this.$refs.role.openDialog = false;
        this.fetchData();
      })
    }
  }
}
</script>

<style scoped>

</style>
