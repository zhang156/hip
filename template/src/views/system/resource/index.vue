<template>
  <div class="resource">
    <Row type="flex">
      <i-col span="6" style="height: 100%" class="menu-card">
        <Card dis-hover :bordered="false">
          <div slot="title">
            <h4 class="title">菜单</h4>
            <span class="operation">
              <Button type="primary" icon="plus-round" size="small" v-has-permission="'Resource:create'"
                      @click="add"></Button>
            </span>
          </div>
          <Input v-model="filterText" placeholder="输入关键字进行过滤" style="width: 200px"/>
          <tree-plus :data="resourceData" @node-click="changeNode" ref="resourceTree"></tree-plus>
        </Card>
      </i-col>
      <i-col span="18">
        <Card dis-hover :bordered="false">
          <div slot="title">
            <h4 class="title">页面权限</h4>
            <!--<span class="operation">
              <Button type="primary" icon="plus-round" size="small" v-has-permission="'Resource:create'"></Button>
            </span>-->
          </div>
          <data-grid :page="false" :table-data="currentResource" :columns="columns" resource="Resource" ref="resource"
                     :edit-data="rsData" @edit-row="edit" @remove-row="remove">
            <div slot="operation"></div>
            <div slot="edit-body">
              <resource-edit :is-update="isUpdate" :edit-data="rsData" @on-update="doUpdate" @on-create="doCreate"></resource-edit>
            </div>
          </data-grid>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Tree from '../../../components/tree/tree';
import DataGrid from '../../../components/table/dataGrid';
import ResourceEdit from './resourceEdit';
import TreePlus from '../../../components/tree/treePlus';

export default {
  name: 'resource',
  components: {
    TreePlus,
    ResourceEdit,
    DataGrid,
    Tree
  },
  data () {
    return {
      resourceData: [],
      currentResource: {list: []},
      selectNode: null,
      rsData: {},
      isUpdate: false,
      filterText: ''
    }
  },
  computed: {
    sysResources () {
      return this.$store.state.resource.allResources || [];
    },
    columns () {
      return [
        {
          title: '名称',
          key: 'resourceName'
        },
        {
          title: '图标',
          key: 'icon',
          render: (h, params) => {
            return h('Icon', {
              props: {
                type: params.row.icon,
                size: '14'
              }
            })
          }
        },
        {
          title: '类型',
          key: 'resourceType',
          render: (h, params) => {
            if (params.row.resourceType === '1') {
              return h('div', [h('Icon', {
                props: {
                  color: 'green',
                  type: 'ios-book',
                  size: 16
                },
                style: {
                  marginRight: '10px'
                }
              }),
              h('span', '菜单')])
            } else {
              return h('div', [h('Icon', {
                props: {
                  color: '#F09700',
                  type: 'ios-game-controller-a',
                  size: 16
                },
                style: {
                  marginRight: '10px'
                }
              }),
              h('span', '按钮')])
            }
          }
        },
        {
          title: '路径',
          key: 'resourceUrl'
        },
        {
          title: '权限标识',
          key: 'permission'
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
          if (r.resourceType !== '1') {
            this.$set(r, 'visible', false);
          } else {
            this.$set(r, 'visible', true);
          }
          this.$set(r, 'title', r.resourceName);
          if (r.children) {
            this.$set(r, 'expanded', true);
            this.traverseAllResource(r.children);
          }
        })
      }
      return resource
    },
    fetchData () {
      this.$store.dispatch('listAllResource', {}).then(() => {
        this.resourceData = this.traverseAllResource(JSON.parse(JSON.stringify(this.sysResources)));
      });
    },
    changeNode (node) {
      this.selectNode = this.$refs.resourceTree.getSelectedNodes();
      this.currentResource = {list: []};
      let n = Object.assign({}, node);
      delete n.parent;
      delete n.children;
      this.currentResource.list.push(n);
      if (node.children && node.children.length > 0) {
        node.children.forEach(m => {
          let mn = Object.assign({}, m);
          delete mn.parent;
          delete mn.children;
          this.currentResource.list.push(mn);
        })
      }
    },
    add () {
      this.rsData = {resourceType: '1'};
      if (this.selectNode && this.selectNode.length) {
        this.$set(this.rsData, 'parentId', this.selectNode[0].id)
      }
      this.isUpdate = false;
      this.$refs.resource.add()
    },
    edit (row) {
      this.isUpdate = true;
      this.rsData = JSON.parse(JSON.stringify(row));
    },
    remove (row) {

    },
    doUpdate (data) {
      this.$store.dispatch('updateResource', data).then(() => {
        this.$Message.success('更新成功，请重新选择树节点或刷新页面');
        this.$refs.resource.openDialog = false;
        this.fetchData();
      })
    },
    doCreate (data) {
      this.$store.dispatch('addResource', data).then(() => {
        this.$Message.success('新增成功,请重新选择树节点或刷新页面');
        this.$refs.resource.openDialog = false;
        this.fetchData();
      })
    }
  },
  watch: {
    filterText (val) {
      let predicate = node => node.title.indexOf(val) > -1
      this.$refs.resourceTree.searchNodes(predicate);
    }
  }
}
</script>

<style scoped lang="less">
  .resource {
    background: #fff;
    .menu-card {
      /* border-right: 1px solid #e2e2e2;*/
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
