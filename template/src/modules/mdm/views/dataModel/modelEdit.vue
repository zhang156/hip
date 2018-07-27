<template>
  <edit-page :title="editTitle">
    <!--<Tooltip content="SQL模式" transfer style="float: right;margin-right: 20px" slot="title-more">
      <Icon type="clipboard"></Icon>
    </Tooltip>-->

    <div class="mm-model">
      <Form ref="mmModel" :model="mmModel" :rules="ruleValidate" :label-width="90" inline>
        <FormItem label="术语服务ID" prop="serviceId">
          <Input v-model="mmModel.serviceId" placeholder="术语服务ID" style="min-width: 300px"></Input>
        </FormItem>
        <FormItem label="模型编码" prop="modelCode">
          <Input v-model="mmModel.modelCode" placeholder="模型编码" style="min-width: 300px"></Input>
        </FormItem>
        <FormItem label="模型名称" prop="modelName">
          <Input v-model="mmModel.modelName" placeholder="模型名称" style="min-width: 300px"
                 @on-blur="changeModelName"></Input>
        </FormItem>
        <FormItem label="英文名称（表名）" prop="modelEnName">
          <Input v-model="mmModel.modelEnName" placeholder="模型英文名称（表名）" style="min-width: 300px"></Input>
        </FormItem>
        <FormItem label="描述" prop="modelDesc">
          <Input v-model="mmModel.modelDesc" type="textarea" placeholder="描述" style="min-width: 300px"></Input>
        </FormItem>
        <br>
        <FormItem label="术语类别" prop="mdCategoryCode">
          <md-category-select v-model="mmModel.mdCategoryCode" :code.sync="mmModel.mdCategoryCode"
                              :name.sync="mmModel.mdCategoryName"
                              label-in-value></md-category-select>
        </FormItem>
        <FormItem label="标准类型" prop="mdStandardCode">
          <md-standard-select v-model="mmModel.mdStandardCode" :code.sync="mmModel.mdStandardCode"
                              :name.sync="mmModel.mdStandardName" label-in-value></md-standard-select>
        </FormItem>
        <FormItem label="标准代码" prop="standardCode">
          <Input v-model="mmModel.standardCode" placeholder="标准代码" style="min-width: 300px"></Input>
        </FormItem>
        <br>
        <FormItem label="术语源系统" prop="sourceSysCode">
          <sys-app-select v-model="mmModel.sourceSysCode" :code.sync="mmModel.sourceSysCode"
                          :name.sync="mmModel.sourceSysName"
                          label-in-value></sys-app-select>
        </FormItem>
        <FormItem label="内容可编辑" prop="isEdit">
          <i-Switch size="large" v-model="mmModel.isEdit" true-value="1" false-value="0">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-Switch>
        </FormItem>
      </Form>
    </div>
    <div class="model-field">
      <Row style="padding: 5px">
        <h4 class="inline">属性信息</h4>
        <div class="opreation">
          <Button type="success" @click="addField('mmModel')">
            <Icon type="plus-round"></Icon>
            新增
          </Button>
          <Button type="primary" @click="save('mmModel')">
            <Icon type="checkmark-round"></Icon>
            保存
          </Button>
        </div>
      </Row>
      <div class="field-table">
        <Table :columns="columns" :data="mmModel.fields" size="small"></Table>
      </div>
    </div>

    <dp-dialog :open.sync="dialogShow" :mask-closable="false">
      <field-edit :field-data="editField" :model="mmModel" @cancel="cancleEdit" @on-ok="completeAdd"></field-edit>
    </dp-dialog>
    <slot></slot>
  </edit-page>
</template>


<script>
  import EditPage from "../appComponents/editPage.vue";
  import DataTypeSelect from "../appComponents/select/dataTypeSelect.vue";
  import MdCategorySelect from "../appComponents/select/mdCategorySelect";
  import MdStandardSelect from "../appComponents/select/mdStandardSelect";
  import SysAppSelect from "../appComponents/select/sysAppSelect";
  import DpDialog from "@/components/dialog/dialog";
  import FieldEdit from "./fieldEdit";

  export default {
    components: {
      FieldEdit,
      DpDialog,
      SysAppSelect,
      MdStandardSelect,
      MdCategorySelect,
      DataTypeSelect,
      EditPage
    },
    name: 'model-edit',
    props: {
      modelData: {
        type: Object,
        default: function () { return { fields: [] } }
      },
    },
    data() {
      return {
        ruleValidate: {
          serviceId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modelCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modelName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modelEnName: [
            {
              required: true,
              message: '不能为空且符合数据库表名命名规则',
              trigger: 'blur',
              pattern: '(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)'
            }
          ],
          modelDesc: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          mdCategoryCode: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          mdStandardCode: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '属性名(中文名)',
            key: 'fieldName',
            align: 'center'
          },
          {
            title: '属性编码(列名)',
            key: 'fieldCode',
            align: 'center'
          },
          {
            title: '注释',
            key: 'fieldComment',
            align: 'center'
          },
          {
            title: '类型',
            key: 'fieldDataType',
            width: 120,
            align: 'center',
          },
          {
            title: '长度',
            key: 'fieldLength',
            align: 'center'
          },
          {
            title: '精度',
            key: 'fieldPrecision',
          },
          {
            title: '缺省值',
            key: 'fieldDefaultValue',
            align: 'center'
          },
          {
            title: '非空',
            key: 'isNullable',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('Icon', {
                props: {
                  type: params.row.isNullable === '0' ? 'ios-checkmark-empty' : '',
                  size: 20,
                  color: '#003d99'
                }
              })
            }
          },
          {
            title: '唯一标识',
            key: 'isPrimary',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('Icon', {
                props: {
                  type: params.row.isPrimary === '1' ? 'ios-checkmark-empty' : '',
                  size: 20,
                  color: '#003d99'
                }
              })
            }
          },
          {
            title: '检索条件',
            key: 'isFilter',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('Icon', {
                props: {
                  type: params.row.isFilter === '1' ? 'ios-checkmark-empty' : '',
                  size: 20,
                  color: '#003d99'
                }
              })
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
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
                  on: {
                    click: () => {
                      this.fieldIndex = params.index;
                      this.fEditField(params.row)
                    }
                  }
                }, '编辑'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确认删除这条内容吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.removeField(params.row, params.index);
                    },
                    'on-cancel': () => {
                      console.log('cancel');
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
        ],
        mmModel: { fields: [] },
        editField: {},
        dialogShow: false,
        fieldIndex: '',
        needSave: false
      }
    },
    watch: {
      modelData(nv) {
        this.mmModel = nv || { fields: [] }
      }
    },
    computed: {
      isUpdate() {
        return !this.modelData.isNew
      },
      editTitle() {
        return this.isUpdate ? '编辑数据模型' : '新建数据模型'
      }
    },
    methods: {
      changeModelName() {
        this.$set(this.mmModel, 'modelDesc', this.mmModel.modelName);
      },
      init() {
      },
      addField(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogShow = true;
            //this.mmModel.fields = this.mmModel.fields || [];
            if (!this.mmModel.fields) {
              this.$set(this.mmModel, 'fields', [])
            }
            this.editField = { isNew: true, fieldDataType: 'VARCHAR2', isPrimary: '0', isNullable: '1', isFilter: '0' }
            /* this.mmModel.fields.push(this.editField)*/
          } else {
            this.$Message.error('请先填写完整模型主要信息！')
          }
        })
      },
      completeAdd(f, isNew) {
        this.dialogShow = false;
        //this.mmModel.fields[this.fieldIndex] = f;
        console.log(isNew);
        if (isNew) {
          this.mmModel.fields.push(f)
        } else {
          this.$set(this.mmModel.fields, this.fieldIndex, f);
        }
      },
      cancleEdit(remove) {
        if (remove) {
          this.mmModel.fields.splice(this.mmModel.fields.length - 1, 1)
        } else {

        }

        this.dialogShow = false
      },
      fEditField(row) {
        this.editField = JSON.parse(JSON.stringify(row));
        this.dialogShow = true;
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let hasLogicPk = false;
            this.mmModel.fields.map(f =>{
                if(f.isPrimary === '1'){
                  hasLogicPk = true;
                }
            });

            if(!hasLogicPk){
              this.$Message.warning('缺少唯一标识字段！');
              return;
            }
            if (this.mmModel.fields && this.mmModel.fields.length > 0) {
              if (this.isUpdate) {//编辑更新
                delete this.mmModel.isNew;
                this.$store.dispatch('modifyModel', this.mmModel).then(() => {
                  this.$Message.success('更新模型成功')
                })
              } else {//新增
                delete this.mmModel.isNew;
                this.$store.dispatch('addModel', this.mmModel).then(() => {
                  this.$Message.success('新增模型成功')
                })
              }
            } else {
              this.$Message.error('请增加属性信息再保存！');
            }
          }
        })
      },
      removeField(row, index) {
        if (row.id) {
          this.$store.dispatch('removeModelField', { modelId: this.mmModel.id, fieldId: row.id })
            .then(() => {
              this.mmModel.fields.splice(index, 1)
            })
        } else {
          this.mmModel.fields.splice(index, 1)
        }

      }
    },
  }
</script>


<style scoped lang="scss">
  .model-edit {
    width: 100%;
  }

  .edit-title {
    color: #2d8cf0;
  }

  .edit-body {
    padding: 10px 20px;

    .model-field {
      .opreation {
        /*float: right;*/
        display: inline-block;
        margin-left: 20px;
      }
    }
  }

</style>
