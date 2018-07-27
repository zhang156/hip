<template>
  <div class="resource-edit">
    <Form :model="editData" :label-width="80" ref="dataForm" :rules="validRules">
      <FormItem label="上级菜单" prop="parentId">
        <Select v-model="editData.parentId" filterable clearable placeholder="上级菜单为空时表示根目录" @on-change="changeParent">
          <Option v-for="item in menuData" :value="item.id" :key="item.id">{{ item.resourceName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="名称" prop="resourceName" required>
        <Input v-model="editData.resourceName"/>
      </FormItem>
      <FormItem label="类型" prop="resourceType" required>
        <RadioGroup v-model="editData.resourceType">
          <Radio label="1">菜单</Radio>
          <Radio label="2">按钮</Radio>
        </RadioGroup>
      </FormItem>
      <formItem label="图标" v-show="editData.resourceType==='1'" props="icon">
        <icon-select v-model="editData.icon"></icon-select>
      </formItem>
      <FormItem label="路径" v-show="editData.resourceType==='1'" prop="resourceUrl">
        <Input v-model="editData.resourceUrl"/>
      </FormItem>
      <FormItem label="权限标识" prop="permission">
        <Input v-model="editData.permission"/>
      </FormItem>
      <FormItem>
        <i>权限标识后缀说明,查看（菜单）:view 新增：create 修改：update 删除：delete</i>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit('dataForm')">确定</Button>
        <Button type="error" @click="cancelEdit">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import IconSelect from '../../../components/icon/iconSelect';

export default {
  components: {IconSelect},
  name: 'resource-edit',
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
    }
  },
  data () {
    return {
      validRules: {}
    }
  },
  computed: {
    menuData () {
      return this.$store.state.resource.resourceList;
    }
  },
  mounted () {
    this.$store.dispatch('getResourceList', {resourceType: '1'})
  },
  methods: {
    changeParent (id) {
      if (!this.isUpdate) {
        let parent = this.menuData.filter(r => r.id === this.editData.parentId)[0] || {};
        this.$set(this.editData, 'resourceUrl', (parent.resourceUrl || '') + '/路径')
      }
    },
    onSubmit (form) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 按钮
          if (this.editData.resourceType === '2') {
            this.editData.resourceUrl = '';
          } else {
            if (this.editData.resourceUrl.indexOf('路径') > -1) {
              this.$Message.error('请检查路径是否补充完整');
              return;
            }
          }
          delete this.editData.parentResourceName;
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
  }
}
</script>
