<template>
  <div class="main">
    <Layout class="main-layout">
      <Sider ref="mainSide" hide-trigger collapsible :collapsed-width="50" v-model="isCollapsed" class="main-sider" breakpoint="md">
        <!-- <div slot="trigger" class="side-trigger" @click="collapsedSider">
           <Icon type="arrow-left-b" :class="!isCollapsed?'menu-icon':'rotate-icon'"></Icon>
         </div>-->
        <shrinkable-menu :is-collapsed="isCollapsed" :user="user">
          <div slot="top" class="main-logo">
            <!-- <div class="expand-logo" v-show="!isCollapsed"> -->
              <img v-show="!isCollapsed" src="../assets/images/logo-primary.png" key="max-logo"/>
              <!-- <span>{{ appName }}</span> -->
            <!-- </div> -->
            <img v-show="isCollapsed" src="../assets/images/logo-primary-min.png" key="min-logo"/>
          </div>
        </shrinkable-menu>
      </Sider>
      <Layout>
        <Header class="main-header">
          <div class="inline">
            <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round"
                  size="20"></Icon>
            <!--<div class="header-name inline">后台管理系统</div>-->
          </div>
          <div class="header-avator-con inline">
            <div class="user-dropdown-menu-con">
              <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                <Dropdown transfer trigger="click">
                  <span>
                    <span class="main-user-name">{{ user.nickName }}</span>
                    <Icon type="arrow-down-b"></Icon>
                  </span>
                  <DropdownMenu slot="list">
                    <DropdownItem name="ownSpace" @click.native="profile">个人中心</DropdownItem>
                    <DropdownItem name="loginout" divided @click.native="logout">退出登录</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Row>
            </div>
          </div>
        </Header>
        <Content>
          <div class="header-middle-con">
            <div class="main-breadcrumb">
              <tab-nav/>
            </div>
          </div>
          <keep-alive>
            <router-view style="margin: 10px"></router-view>
          </keep-alive>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import shrinkableMenu from '@/views/main-components/shrinkable-menu/shrinkable-menu';
import TabNav from '@/views/main-components/TabNav';
import App from '@/lib/app'

export default {
  name: 'Main',
  components: {TabNav, shrinkableMenu},
  data () {
    return {
      isCollapsed: false,
      appName: App.appName
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user || {};
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    openOptions () {
      return this.$store.state.base.openOptions; // 当前面包屑数组
    }
  },
  created () {
    /* let active = {name: this.$route.name};
    this.$store.commit('setActiveMenu', active); */
  },
  methods: {
    collapsedSider () {
      this.isCollapsed = !this.isCollapsed;
    },
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({name: 'login'});
        location.reload();
      })
    },
    profile () {
      this.$store.commit('setActiveMenu', {name: 'profile', path: '/profile'});
      this.$router.push({path: '/profile'});
    }
  },
  watch: {
    '$route': {
      handler () {
        let active = {name: this.$route.name};
        this.$store.commit('setActiveMenu', active);
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
  @import "../theme/index";

  .main-layout {
    min-height: 100vh;

    .main-sider {
      background-color: #f0f0f0;

      .side-trigger {
        position: absolute;
        top: 54px;
        right: -19px;
        text-align: center;
        width: 20px;
        height: 42px;
        line-height: 42px;
        background: rgba(73, 80, 96, 0.2);
        color: #fff;
        font-size: 18px;
        border-radius: 0 6px 6px 0;
        cursor: pointer;
        transition: background .3s ease;
      }
    }
    .main-logo {
      background-color: @primary-color;
      height: 52px;
      padding: 8px;
      text-align: center;
      img {
        height: 36px;
        width: auto;
      }

      .expand-logo {
        height: 100%;
        display: flex;
        align-items: center;
        
        img {
          height: 30px;
          width: 90px;
        }
        
        span {
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
      }
    }

    .main-header {
      background-color: @primary-color;
      height: 52px;
      line-height: 52px;
      padding: 0 5px;
      color: #fff;
      .header-name {
        font-size: 20px;
        font-weight: 700;
      }
    }

    .header-avator-con{
      float: right;
      margin: 0 10px;
      color: #fff;
      cursor: pointer;
    }
  }

  .menu-icon {
    transition: all .3s;
    cursor: pointer;
    color: #fff;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }
</style>
<style lang="less">
  .main-layout {
    .ivu-layout-sider-trigger {
      background: rgba(73, 80, 96, 0.1) !important;
    }
    .ivu-menu-vertical:after {
      width: 0 !important;
    }
  }
</style>
