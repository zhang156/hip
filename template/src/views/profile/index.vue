<template>
  <div class="profile">
    <Card :bordered="false" dis-hover>
      <p slot="title">
        <Icon type="ios-person" size="20"></Icon>
        <span class="title-text">个人信息</span>
      </p>
      <div class="card-body">
        <Form ref="userForm" :model="userProfile" :rules="dataRules" :label-width="100">
          <FormItem label="用户名：" prop="username">
            <span>{{userProfile.username}}</span>
          </FormItem>
          <FormItem label="用户姓名：" prop="nickName">
            <Input v-model="userProfile.nickName"/>
          </FormItem>
          <FormItem label="性别：" prop="genderCode">
            <common-select v-model="userProfile.genderCode" :code.sync="userProfile.genderCode"
                           :name.sync="userProfile.genderName" :data-options="zdSex" label-in-value="">
            </common-select>
          </FormItem>
          <FormItem label="电话：" prop="phone">
            <Input v-model="userProfile.phone"/>
          </FormItem>
          <FormItem label="邮箱：" prop="email">
            <Input v-model="userProfile.email" type="email"/>
          </FormItem>
          <FormItem label="密码：" prop="password">
            <Button size="small" type="dashed" @click="showEditPassword">修改密码</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" style="width: 100px" @click="saveEdit">保存</Button>
            <Button type="error" style="width: 100px" @click="cancel">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Modal v-model="editPasswordModal" :width="500">
      <h3 slot="header" class="model-header">修改密码</h3>
      <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
            :rules="passwordValidate">
        <FormItem label="原密码" prop="oldPass">
          <Input v-model="editPasswordForm.oldPass" type="password" placeholder="请输入旧密码"/>
        </FormItem>
        <FormItem label="新密码" prop="newPass">
          <Input v-model="editPasswordForm.newPass" type="password" placeholder="请输入新密码，至少6位字符"/>
        </FormItem>
        <FormItem label="确认新密码" prop="rePass">
          <Input v-model="editPasswordForm.rePass" type="password" placeholder="请再次输入新密码"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelEditPass">取消</Button>
        <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import CommonSelect from '../../components/select/commonSelect';

export default {
  components: {CommonSelect},
  name: 'profile',
  data () {
    const validePhone = (rule, value, callback) => {
      var re = /^1[0-9]{10}$/;
      if (!re.test(value)) {
        callback(new Error('请输入正确格式的手机号'));
      } else {
        callback();
      }
    };
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      zdSex: [{code: '1', name: '男性'}, {code: '2', name: '女性'}],
      dataRules: {
        nickName: [
          {required: true, trigger: 'blur', message: '请输入姓名'}
        ],
        phone: [
          {validator: validePhone}
        ]
      },
      editPasswordModal: false, // 修改密码模态框显示
      editPasswordForm: {
        oldPass: '',
        newPass: '',
        rePass: ''
      },
      savePassLoading: false,
      passwordValidate: {
        oldPass: [
          {required: true, message: '请输入原密码', trigger: 'blur'}
        ],
        newPass: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 6, message: '请至少输入6个字符', trigger: 'blur'},
          {max: 32, message: '最多输入32个字符', trigger: 'blur'}
        ],
        rePass: [
          {required: true, message: '请再次输入新密码', trigger: 'blur'},
          {validator: valideRePassword, trigger: 'blur'}
        ]
      },
      userProfile: Object.assign({}, this.$store.state.auth.user)
    }
  },
  methods: {
    cancel () {
      this.$store.commit('deleteTabs', '个人中心');
      this.$router.go(-1);
    },
    showEditPassword () {
      this.editPasswordModal = true;
      this.editPasswordForm = {
        oldPass: '',
        newPass: '',
        rePass: ''
      };
    },
    cancelEditPass () {
      this.editPasswordModal = false;
    },
    // 修改密码
    saveEditPass () {
      this.$refs['editPasswordForm'].validate((valid) => {
        if (valid) {
          this.savePassLoading = true;
          this.$store.dispatch('updatePasswd', this.editPasswordForm).then(() => {
            this.savePassLoading = false;
            this.$Message.success('密码修改成功,请退出重新登录！');

            setTimeout(() => {
              this.$store.dispatch('logout').then(() => {
                this.$router.push({name: 'login'});
                location.reload();
              })
            }, 1500)
          }).catch((err) => {
            this.$Message.error(err);
            this.savePassLoading = false;
          })
        }
      });
    },
    saveEdit () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('updateUserProfile', this.userProfile).then(() => {
            this.$Message.success('用户信息修改成功！');
            this.editPasswordModal = false;
          }).catch(err => {
            this.$Message.error(err);
          })
        }
      })
    }

  }
}
</script>

<style scoped lang="less">
  .profile {
    .title-text {
      vertical-align: text-bottom;
    }
    .card-body {
      max-width: 400px;
    }
  }
</style>
