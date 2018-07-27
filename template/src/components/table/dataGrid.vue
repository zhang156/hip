<template>
  <div class="data-grid">
    <slot name="operation">
      <div class="operation">
        <Row>
          <slot name="search-condition">
            <Input v-model="searchText" @on-change="handleSearch" :placeholder="placeholder"
                   style="width:200px;"/>
          </slot>
          <Button type="primary" icon="ios-search-strong" @click.native="handleSearch">搜索</Button>
          <Button type="info" icon="ios-refresh-empty" @click="refresh" v-if="showRefresh">刷新</Button>
          <Button type="success" icon="plus-round" @click.native="add" v-if="showAdd"
                  v-hasPermission="resource+':create'">新增
          </Button>
          <slot name="more-operation"></slot>
        </Row>
      </div>
    </slot>
    <Row class="margin-top-10 clear">
      <Table border size="small" :columns="tableColumns" :data="tableData.list" @on-selection-change="selectionChange"
             :loading="loading"></Table>
      <Page size="small" v-if="page" class="page" show-total show-elevator show-sizer
            :total="tableData.list?tableData.total:tableData.length"
            @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
    </Row>
    <slot name="dialog">
      <dp-dialog :open.sync="openDialog" width="50%">
        <slot name="edit-page">
          <edit-page :is-update="isUpdate" :edit-data="editData"
                     @on-create="createData" @on-update="updateData" @on-close="close"
                     :edit-cols="editCols" :valid-rules="validRules" >
            <slot name="edit-body">
            </slot>
          </edit-page>
        </slot>
      </dp-dialog>
    </slot>
  </div>
</template>

<script>
/**
 * 自动生成编辑列
 * autoEdit: 是否自动生成编辑页面
 * columns 属性说明
 * title: 名称,
 * key: 属性名,
 * hidden: table中不显示,
 * editable: 是否可编辑,
 * type: 类型  input|textarea|select,
 * required: 是否必填,
 * readonly: 编辑时是否不能更改
 * rules: [] 校验规则，required为true时自动有一个不为空规则,
 * selectOptions: [] select下拉列表时数据
 * selectLabelKey: 下拉列表时显示值对应属性
 * selectCodeKey: 下拉列表时实际值对应属性
 */
import DpDialog from '../dialog/dialog';
import EditPage from '../page/editPage';
export default {
  name: 'dataGrid',
  components: {EditPage, DpDialog},
  props: {
    resource: String,
    autoEdit: {
      type: Boolean,
      default: true
    },
    commonAction: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showRefresh: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableData: {
      type: [Array, Object],
      default: function () {
        return {list: []}
      }
    },
    editData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    page: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      searchText: '',
      openDialog: false,
      isUpdate: false,
      actionCol: {
        title: '操作',
        key: 'action',
        width: 140,
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
              directives: [{
                name: 'hasPermission',
                value: this.resource + ':update'
              }],
              on: {
                click: () => {
                  if (this.autoEdit) {
                    this.isUpdate = true;
                    this.openDialog = true;
                  }
                  this.$emit('edit-row', params.row)
                }
              }
            }, '编辑'),
            h('Poptip', {
              props: {
                confirm: true,
                title: '您确认删除这条内容吗？'
              },
              directives: [{
                name: 'hasPermission',
                value: this.resource + ':delete'
              }],
              on: {
                'on-ok': () => {
                  this.$emit('remove-row', params.row)
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
    }
  },
  computed: {
    tableColumns () {
      let tableColumns = this.columns.filter(c => !c.hidden);
      return this.commonAction ? tableColumns.concat(this.actionCol) : tableColumns;
    },
    editCols () {
      let col = [];
      this.columns.map((c) => {
        let r = JSON.parse(JSON.stringify(c));
        if (r.editable) {
          if (r.type === 'select' && !r.multiple) {
            r.key = r.selectCodeKey;
          } else if (r.type === 'select' && r.multiple) {
          }
          col.push(r);
        }
      });
      return col;
    },
    validRules () {
      let rule = {};
      this.columns.map((c) => {
        if (c.editable) {
          if (c.required) {
            if (c.type === 'input' || c.type === 'textarea' || typeof (c.type) === 'undefined') {
              rule[c.key] = [{ required: true, trigger: 'blur', message: c.title + '不能为空' }].concat(c.rules || []);
            } else if (c.type === 'select' || c.type === 'witch') {
              rule[c.selectCodeKey] = [{ required: true, trigger: 'change', message: c.title + '不能为空' }].concat(c.rules || []);
            }
          }
        }
      });
      return rule;
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('on-page-change', page);
    },
    pageSizeChange (size) {
      this.$emit('on-page-size-change', size);
    },
    handleSearch () {
      this.$emit('on-search', this.searchText);
    },
    add () {
      this.isUpdate = false;
      this.$emit('on-add');
      // this.$emit('update:openDialog', true);
      this.openDialog = true;
    },
    refresh () {
      this.$emit('on-refresh');
    },
    selectionChange (selection) {
      this.$emit('on-selection-change', selection);
    },
    createData (data) {
      this.$emit('on-data-create', data);
    },
    updateData (data) {
      this.$emit('on-data-update', data);
    },
    close (flag) {
      this.openDialog = false;
    }
  }
}
</script>

<style scoped>
  .page {
    margin-top: 5px;
  }
</style>
