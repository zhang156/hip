<template>
  <login-component 
    :appName="appName" 
    :loginImg="loginImg"
    :logo="logo"
    :backgroundImage="backgroundImage"></login-component>
</template>

<script>
import appConf from '@/lib/app.js'
import loginComponent from '@/components/login'

export default {
  name: 'login',
  components: {loginComponent},
  data() {
    return {
      loginImg: '/static/images/login-img_2.png',
      logo: '/static/images/logo.png',
      backgroundImage: '/static/images/login-bg.png',
      appName: 'EMPI' + appConf.appName,
    }
  }
}
</script>

