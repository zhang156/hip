<template>
  <div class="edit-page">
    <h3 class="edit-title">
      <Icon type="ios-compose-outline" style="margin-right: 5px"></Icon>
      {{editTitle}}
      <slot name="title-more"></slot>
    </h3>
    <hr>
    <div class="edit-body">
      <slot>
        <Form :model="editData" :label-width="100" ref="dataForm" :rules="validRules">
          <FormItem v-for="(e,index) in editCols" :label="e.title" :key="index" :prop="e.key">
            <template v-if="e.type==='textarea'">
              <Input v-model="editData[e.key]" type="textarea" :rows="4" :placeholder="'请输入'+e.title"
                     :disabled="e.readonly"/>
            </template>
            <template v-else-if="e.type==='select'">
              <common-select v-model="editData[e.key]" :code.sync="editData[e.key]" :key="'select_'+index"
                             :name.sync="editData[e.selectLabelKey]" :data-options="e.selectOptions"
                             :label-in-value="!e.multiple" :multiple="e.multiple"
                             :placeholder="e.placeholder?e.placeholder:('请选择'+e.title)" :disabled="e.readonly"/>
            </template>
            <template v-else-if="e.type==='switch'">
              <i-switch v-model="editData[e.key]" :true-value="e.trueValue" :false-value="e.falseValue">
                <span slot="open">{{e.openLabel}}</span>
                <span slot="close">{{e.closeLabel}}</span>
              </i-switch>
            </template>
            <template v-else-if="e.type === 'tree'">
              <!--<tree :data="editData[e.key]" showCheckbox></tree>-->
              <div style="max-height: 550px;overflow: auto">
                <Input v-model="filterText" placeholder="输入关键字进行过滤" style="width: 200px"
                       size="small" v-if="e.searchTree"/>
                <tree-plus :data="editData[e.key]" halfcheck multiple :parentIsBorther="e.parentIsBorther"
                           ref="treePlus" :scoped="e.scoped"></tree-plus>
              </div>
            </template>
            <template v-else>
              <Input v-model="editData[e.key]" :placeholder="'请输入'+e.title" :disabled="e.readonly"/>
            </template>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="onSubmit('dataForm')">确定</Button>
            <Button type="error" @click="cancelEdit">取消</Button>
          </FormItem>
        </Form>
      </slot>
    </div>
  </div>
</template>

<script>
import CommonSelect from '../select/commonSelect';
import Tree from '../tree/tree';
import TreePlus from '../tree/treePlus';
export default {
  name: 'editPage',
  components: {
    TreePlus,
    Tree,
    CommonSelect},
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    editCols: Array,
    validRules: Object
  },
  computed: {
    editTitle () {
      return this.isUpdate ? `编辑${this.title}信息` : `新增${this.title}信息`;
    }
  },
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    onSubmit (form) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.$refs.treePlus) {
            this.editData.checkedNodes = this.$refs.treePlus[0].getCheckedNodes();
          }
          if (this.isUpdate) {
            this.$emit('on-update', this.editData);
          } else {
            this.$emit('on-create', this.editData);
          }
        }
      });
    },
    cancelEdit () {
      this.$emit('on-close', false);
    }
  },
  watch: {
    filterText (val) {
      let predicate = node => node.title.indexOf(val) > -1
      this.$refs.treePlus[0].searchNodes(predicate);
    }
  }
}
</script>

<style scoped lang="less">
  .edit-page {
    width: 100%;
    padding: 10px;

    .edit-title {
      color: #1c2438;
    }

    .edit-body {
      padding: 10px 20px;

    }

    .edit-footer {
      padding: 10px;
     /* text-align: right; */
    }
  }
</style>
