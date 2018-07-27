<template>
  <div class="online-user">
    <data-grid resource="OnlineUser" :columns="columns" :table-data="list"
               @on-refresh="refresh" @on-page-change="changePage"
               @on-page-size-change="pageSizeChange" :common-action="false" :showAdd="false">
    </data-grid>
  </div>
</template>

<script>
import DataGrid from '../../../components/table/dataGrid';

export default {
  components: {DataGrid},
  name: 'online-user',
  data () {
    return {
      loading: false,
      pageSize: 10,
      pageNo: 0,
      columns: [
        {
          key: 'username',
          title: '用户名'
        }, {
          key: 'startTimestamp',
          title: '登录时间'
        }, {
          key: 'lastAccessTime',
          title: '最后访问时间'
        }, {
          key: 'host',
          title: 'IP地址'
        },
        {
          key: 'status',
          title: '状态',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.status === '1' ? 'green' : 'blue'
              }
            }, params.row.status === '1' ? '在线' : '离线')
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            if (params.row.status === '1') {
              return h('a', {
                directives: [{
                  name: 'hasPermission',
                  value: 'OnlineUser:kick'
                }],
                on: {
                  click: () => {
                    this.offline(params.row.sessionId, params.row.username)
                  }
                }
              }, '下线')
            }
          }
        }
      ],
      searchCond: {},
      list: {}
    }
  },
  computed: {},
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData () {
      let params = {pageSize: this.pageSize, pageNo: this.pageNo, searchText: this.searchText};
      this.loading = true;
      this.$store.dispatch('getOnlineUsers', params).then(() => {
        this.frontPage();
        this.loading = false;
      })
    },
    search (searchText) {

    },
    refresh () {
      this.pageNo = 0;
      this.pageSize = 10;
      this.fetchData();
    },
    changePage (pageNo) {
      this.pageNo = pageNo;
      this.frontPage();
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.frontPage();
    },
    frontPage () {
      let data = JSON.parse(JSON.stringify(this.$store.state.onlineUser.onlineUsers));
      data.list = data.list.slice(this.pageNo * this.pageSize, (this.pageNo + 1) * this.pageSize);
      this.list = data;
    },
    offline (id, username) {
      if (username === this.$store.state.auth.user.username) {
        this.$store.dispatch('logout');
        this.$router.push({name: 'login'});
        location.reload();
      }
      this.$store.dispatch('offline', {'sessionId': id}).then(() => {
        this.$Message.success(`${username}强制下线！`);
        this.refresh();
      })
    }
  }
}
</script>

<style lang="less">
  .search-condition {
    vertical-align: bottom;
  }

  .cond-form {
    .ivu-form-item {
      margin-bottom: 0 !important;
    }

  }
</style>
