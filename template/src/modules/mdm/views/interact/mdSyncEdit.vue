<template>
  <edit-page :title="editTitle">
    <div class="task">
      <Form ref="taskForm" :model="task" :rules="ruleValidate" :label-width="100">
        <FormItem label="数据源" prop="datasourceId">
          <datasource-select v-model="task.datasourceId"></datasource-select>
        </FormItem>
        <FormItem label="数据模型" prop="modelId">
          <mdm-model-select v-model="task.modelId" :code.sync="task.modelCode"
                            :name.sync="task.modelName" :en-name.sync="task.modelEnName"
                            :flag="flag"></mdm-model-select>
        </FormItem>
        <FormItem label="术语表名" prop="modelEnName">
          <Input v-model="task.modelEnName" disabled></Input>
        </FormItem>
        <FormItem label="间隔时间(min)" prop="syncInterval">
          <Input v-model.number="task.syncInterval" placeholder="间隔时间"></Input>
        </FormItem>
        <FormItem label="是否启用" prop="taskStatus">
          <i-Switch size="large" v-model="task.taskStatus" true-value="1" false-value="0">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-Switch>
        </FormItem>
        <FormItem label="源数据SQL" prop="sourceSql">
          <codemirror v-model="task.sourceSql" :options="cmOptions" style="height: 200px"></codemirror>
          <!--<Input v-model="task.sourceSql" type="textarea" :rows="5"></Input>-->
        </FormItem>
        <FormItem label="目标数据SQL" prop="targetSql">
          <codemirror v-model="task.targetSql" :options="cmOptions" style="height: 200px"></codemirror>
          <!--<Input v-model="task.targetSql" type="textarea" :rows="5"></Input>-->
        </FormItem>
        <FormItem label="源数据主键" prop="sourcePrimaryKeys">
          <Input v-model="task.sourcePrimaryKeys" placeholder="源数据主键(多字段以英文分号';'分隔)"></Input>
        </FormItem>
        <FormItem label="目标数据主键" prop="targetPrimaryKeys">
          <Input v-model="task.targetPrimaryKeys" placeholder="目标数据主键(多字段以英文分号';'分隔)"></Input>
        </FormItem>
        <FormItem>
          <Button type="success" @click="test('taskForm')">选择主键对照字段</Button>
          <Button type="primary" @click="onSubmit('taskForm')">确定</Button>
          <Button type="error" @click="cancelEdit">取消</Button>
        </FormItem>
      </Form>
    </div>

    <Modal v-model="primaryKeysModel" width="700" title="关联字段选择" :styles="{float:'right'}" @on-ok="selectKeys">
      <i style="color:#aaa;font-size: 12px">多字段请按对照关系顺序选择</i>
      <div class="margin-top-10">源数据可选字段</div>
      <CheckboxGroup v-model="sourceKeys">
        <Checkbox v-for="(item,index) in sourceMeta" :label="item" :key="index"></Checkbox>
      </CheckboxGroup>
      <div class="margin-top-10">目标数据可选字段</div>
      <CheckboxGroup v-model="targetKeys">
        <Checkbox v-for="(item,index) in targetMeta" :label="item" :key="index"></Checkbox>
      </CheckboxGroup>
      <div class="margin-top-10">已选择：</div>
      <div>源数据字段：{{sourceKeys}}</div>
      <div>目标数据字段：{{targetKeys}}</div>
    </Modal>
  </edit-page>
</template>

<script>
  import EditPage from "../appComponents/editPage.vue";
  import DatasourceSelect from "../appComponents/select/datasourceSelect";
  import MdmModelSelect from "../appComponents/select/mdmModelSelect";
  import 'codemirror/mode/sql/sql.js';

  export default {
    components: {
      MdmModelSelect,
      DatasourceSelect,
      EditPage
    },
    name: 'mdSyncEdit',
    props: {
      taskData: [Object, String]
    },
    data() {
      return {
        cmOptions: {
          tabSize: 4,
          height: '100%',
          mode: 'text/x-sql',
          lineNumbers: true,
          line: true,
          lineWrapping: true,
        },
        task: {},
        primaryKeysModel: false,
        sourceKeys: [],
        sourceMeta: [],
        targetKeys: [],
        targetMeta: [],
        ruleValidate: {
          datasourceId: [
            { required: true, type: 'number', message: '请选择', trigger: 'change' }
          ],
          modelId: [
            { required: true, type: 'number', message: '请选择', trigger: 'blur' }
          ],
          syncInterval: [
            { required: true, type: 'number', message: '不能为空且为数字', trigger: 'blur' }
          ],
          sourceSql: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          sourcePrimaryKeys: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          targetSql: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          targetPrimaryKeys: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    watch: {
      taskData(nv) {
        this.task = nv || {}
      }
    },
    computed: {
      isUpdate() {
        return !this.taskData.isNew
      },
      editTitle() {
        return this.isUpdate ? '编辑术语同步任务' : '新建术语同步任务'
      },
      flag() {
        return this.isUpdate ? '0' : '1';
      }
    },
    methods: {
      cancelEdit() {
        this.$emit('close', false);
      },
      test(formName) {
        this.ruleValidate.sourcePrimaryKeys = [];
        this.ruleValidate.targetPrimaryKeys = [];
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              sourceSql: this.task.sourceSql,
              targetSql: this.task.targetSql,
              datasourceId: this.task.datasourceId
            }

            this.$store.dispatch('validateSql', params).then((res) => {
              if (res.data.sourceMeta == null) {
                this.$Notice.error({ desc: '源sql错误' })
              }
              if (res.data.targetMeta == null) {
                this.$Notice.error({ desc: '目标sql错误' })
              }
              if (res.data.sourceMeta && res.data.targetMeta) {
                this.sourceMeta = res.data.sourceMeta;
                this.targetMeta = res.data.targetMeta;
                if (this.task.sourcePrimaryKeys) {
                  this.sourceKeys = this.task.sourcePrimaryKeys.toUpperCase().split(';')
                }
                if (this.task.targetPrimaryKeys) {
                  this.targetKeys = this.task.targetPrimaryKeys.toUpperCase().split(';')
                }
                this.primaryKeysModel = true;
              }

            })
          }
        })
      },
      selectKeys() {
        this.task.sourcePrimaryKeys = this.sourceKeys.join(';');
        this.task.targetPrimaryKeys = this.targetKeys.join(';');
      },
      onSubmit(formName) {
        this.ruleValidate.sourcePrimaryKeys = [{ required: true, message: '不能为空', trigger: 'blur' }];
        this.ruleValidate.targetPrimaryKeys = [{ required: true, message: '不能为空', trigger: 'blur' }];
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isUpdate) {
              this.$store.dispatch('modifyMdSync', this.task).then((response) => {
                this.$Message.success('更新成功');
                this.$emit('close', true);
              })
            } else {
              delete this.task.isNew;
              this.$store.dispatch('addMdSync', this.task).then((response) => {
                this.$Message.success('新增成功');
                this.$emit('close', true);
              })
            }
          }
        })
      }
    }
  }
</script>


<style scoped>

</style>
<style>
  .CodeMirror {
    height: 100% !important;
  }
</style>
