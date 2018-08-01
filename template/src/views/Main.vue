<template>
  <base-layout id="main">
    <!-- 布局左 -->
    <div slot="layout-left" class="layout-left" :style="{width: isExpand?'230px':'50px'}">
      <header class="logo-wrap">
        <img class="logo" v-if="isExpand" src="../assets/images/logo-white.png" alt="logo">
        <img class="logo logo-sm" v-else src="../assets/images/logo-white-shrink.png" alt="logo">
      </header>
      
      <section class="user-sp">
        <img src="../assets/images/user-160x160.jpg" :style="{'margin-right': isExpand?'10px':'0'}" alt="avatar">
        <div class="sp-info" v-if="isExpand">
          <p>欢迎，{{ user.username }}</p>
          <p>{{ user.org }}</p>
        </div>
      </section>
      
      <!-- 导航菜单 -->
      <section class="nav-menu">
        <base-nav class="baseNav" :isExpand="isExpand" :activeName="activeName" :menuData="menuData" @menuClick="menuClick"></base-nav>
      </section>

      <!-- footer -->
      <footer class="footer">
        <p class="toggleBtn"><img src="../assets/images/拉伸.svg" :class="{'shrink-img': !isExpand}" alt="shrink" @click="toggleMenu"></p>

        <section class="bottom" v-if="isExpand">
          <p>服务热线：400-665-9488</p>
          <p>@senyint 2010-2018</p>
        </section>
      </footer>
    </div>

    <!-- 布局右 -->
    <div slot="layout-right" class="layout-right">
      <header class="header">
        <section>
          <span>{{ appName }}</span>
          <iMark :value="appVersion"></iMark>
        </section>

        <section class="user-info">
          <Dropdown>
            <a class="dropdown-content" href="javascript:void(0)">
              <img src="../assets/images/user-160x160.jpg" alt="avatar">
              <span>{{ user.username }}</span>
              <!-- <Icon class="icon" type="arrow-down-b"></Icon> -->
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="item in dropMenu" :key="item.id">
                {{ item.name }}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </section>
      </header>

      <section class="nav-second">
        <!-- 面包屑 -->
        <div class="breadcrumb-wrap">
          <Breadcrumb>
            <BreadcrumbItem v-for="(item, index) in breadcrumb" 
                            :key="item.path" 
                            :to="getTarget(item, index)">{{ item.meta?item.meta.title:item.resourceName }}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        
        <!-- 路由页面显示 -->
        <section class="router-view">
          <router-view></router-view>
        </section>
      </section>
    </div>
  </base-layout>
</template>

<script>
import baseLayout from '@/components/base/baseLayout';
import iMark from '@/components/common/mark';
import baseNav from '@/components/base/baseNav';
import { mapState } from "vuex";

export default {
  name: "mains",
  components: { baseLayout, iMark, baseNav},
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    appName () {
      return this.$store.state.base.appName
    },
    appVersion () {
      return this.$store.state.base.appVersion
    },
    dropMenu () {
      return this.$store.state.auth.dropMenu
    },
    menuData () {
      return this.$store.state.auth.menu
    },
    activeName () {
      return this.$route.name
    }
  },
  data() {
    return {
      isExpand: true,
      breadcrumb: []
    }
  },
  watch: {
    '$route' () {
      this.breadcrumb_init()
    }
  },
  created() {
    this.breadcrumb_init()
  },
  methods: {
    getTarget(item, index) {
      if (index === this.breadcrumb.length - 1) {
        return ''
      }else if (item.path) {
        return item.path
      } else if (item.children.length) {
        return ''
      }
    },
    breadcrumb_init() {
      this.breadcrumb = [].concat({
        path: '/',
        meta: {title: '主页'}
      })

      if (this.$route.meta.title !== '主页') {
        this.breadcrumb.push(...this.getParentMenu(this.$route))
      }
    },
    getParentMenu(route) {
      let arr = []
      this.menuData.some(item => {
        if (item.children.some(i => i.resourceName === route.name)) {
          arr.push(item)
          return true
        }
      })
      return arr.concat(route)
    },
    toggleMenu() {
      this.isExpand = !this.isExpand
    },
    menuClick(item) {
      if (item.resourceUrl) {
        this.$router.push({path: item.resourceUrl})
      } else {
        console.log('菜单数据错误')
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../theme/color.less';
@transition-time: .25s;

#main {
  .layout-left, .layout-right {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .layout-left {
    overflow-y: auto;
  }

  .layout-right {
    overflow-y: hidden;
  }

  .logo-wrap, .user-sp, .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .layout-left {
    transition: width @transition-time;
    .logo-wrap {
      height: @header-height;
      background-color: @nav-bg-color;

      .logo {
        height: 40px;
      }

      .logo-sm {
        height: 34px;
      }
    }

    .user-sp {
      height: @nav-second-height;
      background-color: #0a0a28;
      color: #fff;

      img {
        display: inline-block;
        height: 32px;
        border-radius: 50%;
      }

      .sp-info {
        display: inline-block;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
      }
    }

    .nav-menu {
      background-color: @nav-bg-color;
      .baseNav {
        width: 100%;
        white-space: nowrap;
      }
    }

    .footer {
      padding-top: 50px;
      position: relative;
      background-color: @nav-bg-color;
      min-height: 100px;
      flex: 1;

      p.toggleBtn {
        position: relative;
        text-align: center;
        color: #fff;

        &::before {
          content: '';
          position: absolute;
          top: 14px;
          left: 0;
          z-index: 0;
          width: calc(50% - 15px);
          height: 1px;
          background-color: @open-nav-bg-color;
        }

        &::after {
          content: '';
          position: absolute;
          top: 14px;
          right: 0;
          z-index: 0;
          width: calc(50% - 15px);
          height: 1px;
          background-color: @open-nav-bg-color;
        }

        img {
          transition: all @transition-time;
          &:hover {
            cursor: pointer;
          }
        }

        .shrink-img {
          transform: rotate(180deg);
        }
      }

      .bottom {
        position: absolute;
        bottom: 30px;
        width: 100%;
        font-size: 12px;
        color: @menu-font-color;
        text-align: center;
        white-space: nowrap;

        p {
          white-space: nowrap;
          transform: scale(.9);
        }
      }
    }
  }

  .layout-right {
    .header {
      height: @header-height;
      justify-content:space-between;
      background-color: #fff;
      padding: 0 15px;

      &:first-child {
        font-size: 18px;
        font-weight: 400;
      }
    }

    .user-info {
      .dropdown-content {
        display: inline-block;
        padding: 0 10px;
        height: @header-height;
        line-height: @header-height;
        transition: all .5s;

        &:hover {
          background-color: rgba(0,0,0,.1); 
        }

        span, img, .icon {
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          font-weight: 500;
        }
        .icon {
          position: relative;
          top: 2px;
          color: #fff;
          font-size: 14px;
        }
        img {
          width: 24px;
          border-radius: 50%;
          margin-right: 6px;
        }
      }
    }
    
    .nav-second {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      background-color: #f2f5f8; //#e1e2e5

      .breadcrumb-wrap {
        display: flex;
        align-items: center;
        height: @nav-second-height;
        background-color: @breadcrumb-bg-color;
        padding: 0 20px;
        font-size: 14px;
        border-top: 2px solid #f2f5f8;
        background-color: #fff;
      }

      .router-view {
        flex: 1;
        width: 100%;
        overflow-y: auto;
        padding: 10px;
      }
    }
  }
}
</style>

<style lang="scss">
#main {
  .ivu-select-dropdown {
    margin-top: 0;
  }
}
</style>