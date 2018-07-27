<template>
  <edit-page :title="editTitle">
    <Form ref="fieldForm" :model="field" :label-width="100" :rules="ruleValidate">
      <FormItem label="属性编码" required prop="fieldCode" @on-blur="changeCode">
        <Input v-model="field.fieldCode"></Input>
      </FormItem>
      <FormItem label="属性名称" required prop="fieldName">
        <Input v-model="field.fieldName" @on-blur="changeName"></Input>
      </FormItem>
      <FormItem label="说明" required prop="fieldComment">
        <Input v-model="field.fieldComment"></Input>
      </FormItem>
      <FormItem label="数据类型" required prop="fieldDataType">
        <data-type-select v-model="field.fieldDataType" @change-value="changeDatType"></data-type-select>
      </FormItem>
      <FormItem label="长度" prop="fieldLength">
        <Input v-model.number="field.fieldLength"></Input>
      </FormItem>
      <FormItem label="精度" prop="fieldPrecision">
        <Input v-model.number="field.fieldPrecision" :disabled="disablePre"></Input>
      </FormItem>
      <FormItem label="缺省值" prop="fieldDefualtValue">
        <Input v-model="field.fieldDefualtValue"></Input>
      </FormItem>
      <FormItem>
        <Checkbox v-model="field.isNullable" true-value="0" false-value="1">非空</Checkbox>
        <Checkbox v-model="field.isPrimary" true-value="1" false-value="0">唯一标识</Checkbox>
        <Checkbox v-model="field.isFilter" true-value="1" false-value="0">检索条件</Checkbox>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit('fieldForm')">确定</Button>
        <Button type="error" @click="cancelEdit">取消</Button>
      </FormItem>
    </Form>
  </edit-page>
</template>

<script>
  import DataTypeSelect from "../appComponents/select/dataTypeSelect";
  import EditPage from "../appComponents/editPage";

  export default {
    components: {
      EditPage,
      DataTypeSelect
    },
    name: "field-edit",
    props: {
      model: {
        type: Object,
        default: function () {
          return {}
        }
      },
      fieldData: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        field: { fieldDataType: 'VARCHAR2' },
        disablePre: true,
        ruleValidate: {
          fieldCode: [{
            required: true,
            trigger: 'blur',
            message: '编码不能为空且符合数据库字段命名规则',
            pattern: '(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)'
          }],
          fieldName: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
          fieldComment: [{ required: true, trigger: 'blur', message: '说明不能为空' }],
          fieldDataType: [{ required: true, trigger: 'blur', message: '数据类型不能为空' }],
          fieldPrecision: [{ type: 'number', trigger: 'blur', message: '精度为数字' }],
          fieldLength: [{
            required: true,
            type: 'number',
            range: { max: 1000, min: 1 },
            trigger: 'blur',
            message: '长度不能为空且只能是数字'
          }]
        }
      }
    },
    watch: {
      fieldData(nv) {
        this.field = nv || { fieldDataType: 'VARCHAR2' }
      }
    },
    computed: {
      isUpdate() {
        return !this.fieldData.isNew;
      },
      editTitle() {
        return this.isUpdate ? '术语结构编辑属性' : '术语结构新增属性';
      }
    },
    methods: {
      changeCode() {

      },
      changeName() {
        this.$set(this.field, 'fieldComment', this.field.fieldName);
      },
      changeDatType(val) {
        if (val !== 'VARCHAR2') {
          this.ruleValidate.fieldLength = [{ required: false, type: 'number', trigger: 'blur', message: '长度为数字' }];
        } else {
          this.ruleValidate.fieldLength = [{
            required: true,
            type: 'number',
            range: { max: 1000, min: 1 },
            trigger: 'blur',
            message: '长度不能为空且只能是数字'
          }]
        }

        if (val !== 'INTEGER') {
          this.disablePre = true
        } else {
          this.disablePre = false
        }
      },
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$Notice.success({
              desc: '新增属性【' + this.field.fieldCode + '】，请注意保存完整模型信息',
              /*duration: 0*/
            });
            let isNew = this.field.isNew;
            delete this.field.isNew;
            this.$emit('on-ok', this.field, isNew);
          }
        })
      },
      cancelEdit() {
        this.$emit('cancel', !this.isUpdate)
      }
    }
  }
</script>

<style scoped>

</style>
