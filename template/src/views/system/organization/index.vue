<template>
  <div class="organization">
    <Row type="flex">
      <i-col span="6" style="height: 100%"  class="menu-card">
        <Card dis-hover :bordered="false">
          <div slot="title">
            <h4 class="title">组织机构</h4>
            <span class="operation">
              <Button type="primary" icon="plus-round" size="small" v-has-permission="'Organization:create'" @click="add"></Button>
            </span>
          </div>
          <Input v-model="filterText" placeholder="输入关键字进行过滤" style="width: 200px"/>
          <tree-plus :data="deptData" @node-click="changeNode" ref="deptTree"></tree-plus>
        </Card>
      </i-col>
      <i-col span="18">
        <Card dis-hover :bordered="false">
          <div slot="title">
            <h4 class="title">详细信息</h4>
          </div>
          <data-grid :page="false" :table-data="currentDept" :edit-data="editData" :columns="columns"
                     resource="Organization" ref="Organization"
                     @edit-row="edit" @remove-row="remove"
                     @on-data-create="create" @on-data-update="update">
            <div slot="operation"></div>
          </data-grid>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import DataGrid from '../../../components/table/dataGrid';
import TreePlus from '../../../components/tree/treePlus';
export default {
  name: 'organization',
  components: {
    TreePlus,
    DataGrid},
  data () {
    return {
      deptData: [],
      currentDept: {list: []},
      selectNode: null,
      filterText: '',
      editData: {}
    }
  },
  computed: {
    depts () {
      return this.$store.state.dept.depts || [];
    },
    columns () {
      return [
        {
          title: '机构编码',
          key: 'orgCode',
          editable: true,
          readonly: true
        },
        {
          title: '机构名称',
          key: 'orgName',
          editable: true,
          readonly: true
        },
        {
          title: '上级科室',
          key: 'parentDept',
          hidden: true,
          editable: true,
          readonly: true
        },
        {
          title: '科室(机构)编码',
          key: 'deptCode',
          editable: true,
          required: true
        },
        {
          title: '科室(机构)名称',
          key: 'deptName',
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
    traverseAllResource (resource) {
      if (resource) {
        resource.map(r => {
          this.$set(r, 'title', r.deptName || r.orgName);
          if (r.children) {
            this.$set(r, 'expanded', false);
            this.traverseAllResource(r.children);
          }
        })
      }
      return resource
    },

    fetchData () {
      this.$store.dispatch('getDepts', {}).then(() => {
        this.deptData = this.traverseAllResource(JSON.parse(JSON.stringify(this.depts)));
      });
    },
    changeNode (node) {
      this.selectNode = this.$refs.deptTree.getSelectedNodes();
      this.currentDept = {list: []};
      let n = Object.assign({}, node);
      delete n.parent;
      delete n.children;
      this.currentDept.list.push(n);
      if (node.children && node.children.length > 0) {
        node.children.forEach(m => {
          let mn = Object.assign({}, m);
          delete mn.parent;
          delete mn.children;
          this.currentDept.list.push(mn);
        })
      }
    },
    add () {
      this.editData = {};
      if (this.selectNode && this.selectNode.length) {
        this.$set(this.editData, 'parentId', this.selectNode[0].id);
        this.$set(this.editData, 'parentDept', this.selectNode[0].deptName || this.selectNode[0].orgName);
        this.$set(this.editData, 'orgCode', this.selectNode[0].orgCode);
        this.$set(this.editData, 'orgName', this.selectNode[0].orgName);
      }
      this.isUpdate = false;
      this.$refs.Organization.add()
    },
    create (row) {
      let params = row;
      // 新增机构
      if (!this.editData.orgCode) {
        params = {
          parentId: 0,
          orgCode: row.deptCode,
          orgName: row.deptName,
          deptCode: null,
          deptName: null
        }
      }
      this.$store.dispatch('addDept', params).then(() => {
        this.$Message.success('新增成功,请重新选择树节点或刷新页面');
        this.$refs.Organization.openDialog = false;
        this.fetchData();
      })
    },
    update (row) {
      let params = row;
      if (row.isOrg) {
        params = {
          id: row.id,
          parentId: 0,
          orgCode: row.deptCode,
          orgName: row.deptName,
          deptCode: row.orgCode, // 旧机构编码
          deptName: row.orgName
        }
        this.$store.dispatch('updateOrg', params).then(() => {
          this.$Message.success('更新成功,请重新选择树节点或刷新页面');
          this.$refs.Organization.openDialog = false;
          this.fetchData();
        })
      } else {
        this.$store.dispatch('updateDept', params).then(() => {
          this.$Message.success('更新成功,请重新选择树节点或刷新页面');
          this.$refs.Organization.openDialog = false;
          this.fetchData();
        })
      }
    },
    edit (row) {
      this.editData = JSON.parse(JSON.stringify(row));
      // 修改机构
      if (!this.editData.deptCode) {
        this.$set(this.editData, 'deptCode', this.selectNode[0].orgCode);
        this.$set(this.editData, 'deptName', this.selectNode[0].orgName);
        this.$set(this.editData, 'isOrg', true);
      }
    },
    remove (row) {
      this.$store.dispatch('delDept', row.id).then(() => {
        this.$Message.success(`删除成功！`);
        this.fetchData();
      })
    }
  },
  watch: {
    filterText (val) {
      let predicate = node => node.title.indexOf(val) > -1
      this.$refs.deptTree.searchNodes(predicate);
    }
  }
}
</script>

<style scoped lang="less">
  .organization {
    background: #fff;
    .menu-card{
      /*border-right: 1px solid #e2e2e2;*/
    }
    .title {
      display: inline-block;
    }
    .operation {
      float: right;
      display: inline-block;
      vertical-align: center;
    }
  }

</style>
