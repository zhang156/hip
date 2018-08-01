<template>
  <div ref="login" id="login" tabindex="10" :style="{'background-image': 'url('+backgroundImage+')'}" @keydown="handleEnter">
    <div class="login-container">
      <section class="login-header">
        <img class="logo" :src="logo" alt="logo">
      </section>

      <section class="login-body">
        <div class="login-img">
          <img :src="loginImg" alt="图片">
        </div>
        <div class="form-wrap">
          <div>
            <p class="appName">{{ appName }}</p>
            <p>用户登录</p>
            <Form class="login-form" ref="loginForm" :model="loginData" :rules="rules">
              <FormItem prop="username">
                <i-input v-model="loginData.username" placeholder="请输入手机号（账号）" icon="ios-person-outline"></i-input>
              </FormItem>
              <FormItem prop="password">
                <i-input type="password" v-model="loginData.password" placeholder="请输入密码" icon="ios-locked-outline"></i-input>
              </FormItem>
              <FormItem>
                <Button class="btn" type="primary" @click="submitForm">登录</Button>
                <div class="forget-passwd-wrap">
                  <span class="forget-passwd">
                    <i class="iconfont icon-help-copy"></i>
                    <span>忘记密码</span>
                  </span>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
      </section>

      <!-- footer -->
      <footer class="footer"><p>心医国际数字医疗系统（大连）有限公司 SENYINT Copyright Reserved</p></footer>
    </div>
  </div>
</template>


<script>
let Base64 = require("js-base64").Base64;
import axios from 'axios'

export default {
  name: "login-component",
  props: {
    logo: {
      type: String,
      default: "/static/images/logo.png"
    },
    loginImg: {
      type: String,
      default: "/static/images/login-img*2.png"
    },
    backgroundImage: {
      type: String,
      default: "/static/images/login-bg.png"
    },
    appName: {
      type: String,
      default: "xxx-管理系统"
    },
    loginUrl: String
  },
  data() {
    return {
      loginData: {
        grant_type: 'password',
        username: null,
        password: null
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    handleEnter(e) {
      if (e.which === 13) {
        this.submitForm()
      } else {
        return
      }
    },
    submitForm() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          if (this.loginUrl) {
            axios.post(this.loginUrl, this.loginData).then((res) => {
              this.$emit('loginSuccss', res)
            }).catch((err) => {
              this.$emit('loginFail', err)
              console.log(err)
            })
          } else {
            this.$store.dispatch('login', this.loginData).then((res) => {
              let redirect = decodeURIComponent(this.$route.query.redirect);
              if (redirect === 'undefined' || redirect === '/') {
                redirect = '/home';
              }
              this.$router.push({
                path: redirect
              });
            }).catch((err) => {
              this.$emit('loginFail', err)
              console.log(err)
            })
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../theme/color.less";
@paddingHeight: 121px;

#login {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: @paddingHeight 9%;
  background-position: center, center;
  background-repeat: no-repeat;
  background-size: cover;

  .login-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 440px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 44px;
    padding: 46px 0;
    margin: 0 auto;

    .login-header {
      padding: 0 7%;
      // position: relative;
      // top: -45px;
      .logo {
        display: inline-block;
        height: 50px;
      }
    }

    .login-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      // padding: 20px 30px 50px 50px;
      padding: 0 12%;

      .login-img {
        // flex: 3;
        margin-right: 25px;
        max-width: 350px;
        position: relative;
        top: -10px;

        img {
          width: 100%;
        }
      }

      .form-wrap {
        // display: flex;
        // align-items: center;
        // flex: 2;
        padding: 10px 0px;
        float: right;

        > div {
          height: auto;
        }

        p {
          color: #323232;
        }

        p.appName {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        .login-form {
          width: 220px;
          margin-top: 20px;

          .btn {
            width: 100%;
          }

          .forget-passwd-wrap {
            padding: 5px 0;
            text-align: right;
            line-height: 1;

            .forget-passwd {
              &:hover {
                cursor: pointer;
              }

              i,
              span {
                vertical-align: middle;
                line-height: 1;
              }

              i.iconfont {
                color: @primary-color;
              }
            }
          }
        }
      }
    }

    .footer {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
      padding: 0 20px;

      > p {
        font-size: 13px;
        white-space: normal;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  #login .login-container {
    border-radius: 24px;
  }

  #login .login-container .login-body {
    justify-content: center;
    text-align: center;
  }

  .login-body > .login-img {
    display: none;
  }

  .login-header {
    text-align: center;
  }

  #login .login-container .footer {
    bottom: 20px;
  }
}
</style>

<style lang="less">
#login {
  .ivu-input-wrapper {
    .ivu-input-icon {
      left: 0;
    }
  }
  .ivu-input {
    padding-left: 32px;
    padding-right: 7px;
  }
}
</style>