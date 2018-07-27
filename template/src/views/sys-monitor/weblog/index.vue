<template>
  <div class="weblog">
    <data-grid resource="Weblog" :columns="columns" :table-data="list"
               @on-refresh="refresh" @on-page-change="changePage"
               @on-page-size-change="pageSizeChange" :common-action="false" :showAdd="false">
      <div slot="search-condition" class="inline search-condition" >
        <Form ref="condForm" :model="searchCond" inline :label-width="80" class="cond-form">
          <FormItem prop="username" label="操作用户">
            <Input v-model="searchCond.username"/>
          </FormItem>
          <FormItem prop="operation" label="操作">
            <Input v-model="searchCond.operation"/>
          </FormItem>
          <FormItem prop="ip" label="IP地址">
            <Input v-model="searchCond.ip"/>
          </FormItem>
          <FormItem prop="operationTime" label="操作时间">
            <DatePicker type="datetime" v-model="searchCond.operationTime"/>
          </FormItem>
        </Form>
      </div>
    </data-grid>
  </div>
</template>

<script>
import DataGrid from '../../../components/table/dataGrid';

export default {
  components: {DataGrid},
  name: 'weblog',
  data () {
    return {
      loading: false,
      pageSize: 10,
      pageNo: 0,
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '操作用户',
          key: 'username',
          width: 100
        },
        {
          title: '操作',
          key: 'operation',
          width: 120
        },
        {
          title: '耗时（ms）',
          key: 'time',
          width: 80
        },
        {
          title: '方法',
          key: 'method'
        },
        {
          title: '参数',
          key: 'params'
        },
        {
          title: 'IP',
          key: 'ip',
          width: 120
        },
        {
          title: '操作时间',
          key: 'operationTime',
          width: 150
        }
      ],
      searchCond: {}
    }
  },
  computed: {
    list () {
      return this.$store.state.weblog.weblogList;
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData () {
      let params = Object.assign({pageSize: this.pageSize, pageNo: this.pageNo, searchText: this.searchText}, this.searchCond);
      this.loading = true;
      this.$store.dispatch('getWeblog', params).then(() => {
        this.loading = false;
      })
    },
    search (searchText) {
      this.fetchData();
    },
    refresh () {
      this.pageNo = 0;
      this.pageSize = 10;
      this.fetchData();
    },
    changePage (pageNo) {
      this.pageNo = pageNo;
      this.fetchData();
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.fetchData();
    }
  }
}
</script>

<style lang="less">
  .search-condition{
    vertical-align: bottom;
  }
  .cond-form{
    .ivu-form-item{
      margin-bottom: 0 !important;
    }

  }
</style>
