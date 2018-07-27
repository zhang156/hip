<template>
  <div class="user">
    <data-grid resource="User" ref="user" :columns="columns" :table-data="list" @on-search="search" @on-add="add"
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
  name: 'user',
  components: {DataGrid},
  data () {
    return {
      loading: false,
      editData: {},
      pageSize: 10,
      pageNo: 0,
      deptData: [],
      loadDictDataDown: false
    }
  },
  computed: {
    list () {
      return this.$store.state.user.userList;
    },
    depts () {
      return this.$store.state.dept.depts || [];
    },
    zdSex () {
      return [{code: '1', name: '男性'}, {code: '2', name: '女性'}]
    },
    roles () {
      return this.$store.state.role.allRoles.map((m) => {
        return {code: m.id, name: m.roleName}
      })
    },
    columns () {
      return [
        {
          title: '用户名',
          key: 'username',
          editable: true,
          type: 'input',
          required: true,
          rules: []
        },
        {
          title: '姓名',
          key: 'nickName',
          editable: true,
          type: 'input',
          required: true
        },
        {
          title: '机构',
          key: 'orgName',
          render: (h, params) => {
            return h('span', params.row.depts.map(d => d.orgName).join('；'))
          }
        },
        {
          title: '科室',
          key: 'deptName',
          render: (h, params) => {
            return h('span', params.row.depts.map(d => d.deptName).join('；'))
          }
        },
        {
          title: '科室',
          key: 'deptDatas',
          hidden: true,
          editable: true,
          type: 'tree',
          required: true,
          scoped: true,
          searchTree: true
        },
        {
          title: '邮箱',
          key: 'email',
          editable: true,
          type: 'input'
        },
        {
          title: '电话',
          key: 'phone',
          editable: true,
          type: 'input'
        },
        {
          title: '性别',
          key: 'genderName',
          editable: true,
          type: 'select',
          required: true,
          selectOptions: this.zdSex,
          selectCodeKey: 'genderCode',
          selectLabelKey: 'genderName'
        },
        {
          title: '备注',
          key: 'description',
          editable: true,
          type: 'textarea'
        },
        {
          title: '角色',
          key: 'roleIds',
          editable: true,
          type: 'select',
          selectOptions: this.roles,
          multiple: true,
          multipleKey: 'id',
          selectCodeKey: 'roleIds',
          selectLabelKey: 'roles',
          render: (h, params) => {
            return h('div', {}, params.row.roles.map(r => r.roleName).join('，'))
          }
        },
        {
          title: '状态',
          key: 'status',
          editable: true,
          type: 'switch',
          required: true,
          trueValue: '1',
          falseValue: '0',
          openLabel: '有效',
          closeLabel: '锁定',
          render: (h, params) => {
            if (params.row.status === '1') {
              return h('Tag', {
                props: {
                  // type: 'dot',
                  color: 'green'
                }
              }, '有效')
            } else {
              return h('Tag', {
                props: {
                  // type: 'dot',
                  color: 'yellow'
                }
              }, '锁定')
            }
          }
        }
      ]
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    traverseAllDept (resource, ids) {
      if (resource) {
        resource.map(r => {
          this.$set(r, 'title', r.deptName || r.orgName);
          if (ids.indexOf(r.id) > -1) {
            this.$set(r, 'checked', true);
          } else {
            this.$set(r, 'checked', false);
          }
          if (r.children) {
            this.$set(r, 'expanded', false);
            this.traverseAllDept(r.children, ids);
          }
        })
      }
      return resource
    },
    fetchData () {
      let params = {pageSize: this.pageSize, pageNo: this.pageNo, searchText: this.searchText};
      this.loading = true;
      this.$store.dispatch('getUserList', params).then(() => {
        this.loading = false;
      })
    },
    loadDictData () {
      if (!this.loadDictDataDown) {
        this.$store.dispatch('getAllRoles');
        this.$store.dispatch('getDepts', {}).then(() => {
          this.traverseAllDept(JSON.parse(JSON.stringify(this.depts)), []).map((item, i) => {
            this.deptData[i] = item
          });
          console.log(this.deptData);
        });

        this.loadDictDataDown = true;
      }
    },
    search (searchText) {

    },
    add () {
      this.loadDictData();
      this.editData = {status: '1', roles: []};
      this.$set(this.editData, 'deptDatas', this.deptData);
    },
    create (data) {
      data.depts = data.checkedNodes;

      delete data.deptDatas;
      this.$store.dispatch('addUser', data).then(() => {
        this.$Message.success('新增用户成功');
        this.fetchData();
        this.$refs.user.openDialog = false;
      });
    },
    update (data) {
      data.depts = data.checkedNodes;
      delete data.deptDatas;
      this.$store.dispatch('updateUser', data).then(() => {
        this.$Message.success('更新用户成功');
        this.fetchData();
        this.$refs.user.openDialog = false;
      });
    },
    edit (row) {
      this.loadDictData();
      this.editData = JSON.parse(JSON.stringify(row));
      this.$set(this.editData, 'deptDatas', this.traverseAllDept(JSON.parse(JSON.stringify(this.depts)),
        this.editData.depts.map(d => d.id)));
      this.editData.roleIds = row.roles.map(r => {
        return r.id
      })
    },
    remove (row) {
      if (row.username === this.$store.state.auth.user.username) {
        this.$Message.warning('不允许删除当前账户');
        return;
      }
      this.$store.dispatch('removeUser', row.id).then(() => {
        this.$Message.success(`删除用户${row.username}成功`);
        this.fetchData();
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
