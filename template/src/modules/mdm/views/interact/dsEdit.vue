<template>
  <edit-page :title="editTitle">
    <div class="ds">
      <Form ref="dsForm" :model="ds" :rules="ruleValidate" :label-width="100">
        <FormItem label="数据源名称" prop="dsName">
          <Input v-model="ds.dsName" placeholder="数据源名称"></Input>
        </FormItem>
        <FormItem label="数据源组名称" prop="dsGroupName">
          <Input v-model="ds.dsGroupName" placeholder="数据源名称"></Input>
        </FormItem>
        <FormItem label="数据库类型" prop="dsType">
          <jdbc-url-select v-model="ds.dsType" @set-real-label="initUrl"></jdbc-url-select>
        </FormItem>
        <FormItem label="数据源地址" prop="dsUrl">
          <Input v-model="ds.dsUrl" placeholder="数据源地址"></Input>
        </FormItem>
        <FormItem label="用户名" prop="dsUser">
          <Input v-model="ds.dsUser" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="dsPassword">
          <Input type="password" v-model="ds.dsPassword" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="术语源系统" prop="sourceSysCode">
          <sys-app-select v-model="ds.sourceSysCode" :code.sync="ds.sourceSysCode"
                          :name.sync="ds.sourceSysName"
                          label-in-value></sys-app-select>
        </FormItem>
        <FormItem>
          <Button type="success" @click="test('dsForm')">测试连接</Button>
          <Button type="primary" @click="onSubmit('dsForm')">确定</Button>
          <Button type="error" @click="cancelEdit">取消</Button>
        </FormItem>
      </Form>
    </div>
  </edit-page>
</template>

<script>
  import EditPage from "../appComponents/editPage.vue";
  import SysAppSelect from "../appComponents/select/sysAppSelect";
  import JdbcUrlSelect from "../appComponents/select/jdbcUrlSelect";

  export default {
    components: {
      JdbcUrlSelect,
      SysAppSelect,
      EditPage
    },
    name: 'ds',
    props: {
      dsData: [Object, String]
    },
    data() {
      return {
        ds: this.dsData,
        ruleValidate: {
          dsName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dsType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          dsUrl: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dsUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dsPassword: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    watch: {
      dsData(nv) {
        this.ds = nv || {}
      }
    },
    computed: {
      isUpdate() {
        return !this.dsData.isNew
      },
      editTitle() {
        return this.isUpdate ? '编辑系统数据源' : '新建数据源'
      }
    },
    methods: {
      initUrl(url) {
        this.ds.dsUrl = url;
      },
      cancelEdit() {
        this.$emit('close', false);
      },
      test(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('testDatasource', this.ds).then((res) => {
              if (res.data == '1') {
                this.$Message.success('连接成功')
              } else {
                this.$Message.error('连接失败')
              }
            })
          }
        })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isUpdate) {
              this.$store.dispatch('modifyDatasource', this.ds).then((response) => {
                this.$Message.success('更新成功');
                this.$emit('close', true);
              })
            } else {
              delete this.ds.isNew;
              this.$store.dispatch('addDatasource', this.ds).then((response) => {
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
