<template>
  <page-layout card-title="术语发布">
    <baseTable-layout :columns="columns"
                      :data="modelData"
                      :showAdd="false" @page-change="changePage" @page-size-change="pageSizeChange"
                      @on-refresh="refresh"
                      @handleSearch="handleSearch" v-show="!showEdit">
    </baseTable-layout>
    <Button type="primary" v-if="showEdit" @click="back" size="small">
      <Icon type="chevron-left"></Icon>
      返回
    </Button>
    <md-release-edit :model="model" v-if="showEdit"></md-release-edit>
  </page-layout>
</template>


<script>
  import BaseTableLayout from "@/components/layout/baseTableLayout.vue";
  import PageLayout from "../appComponents/pageLayout.vue";
  import npDialog from '@/components/dialog/dialog.vue'
  import mdReleaseEdit from './mdReleaseEdit.vue'

  export default {
    components: {
      PageLayout,
      BaseTableLayout,
      npDialog,
      mdReleaseEdit
    },
    name: 'md-release',
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '术语服务编号',
            key: 'serviceId',
            sortable: true,
          },
          {
            title: '模型编码',
            key: 'modelCode',
            sortable: true,
          },
          {
            title: '模型中文名称',
            key: 'modelName',
          },
          {
            title: '模型英文名称',
            key: 'modelEnName',
          },
          {
            title: '说明',
            key: 'modelDesc',
          },
          {
            title: '术语类别',
            key: 'mdCategoryName',
            filters: [
              {
                value: '1',
                label: '医学术语'
              },
              {
                value: '2',
                label: '值域代码'
              },
              {
                value: '3',
                label: '基础字典'
              }
            ],
            filterMethod(value, row) {
              return row.mdCategoryCode == value
            }
          },
          {
            title: '标准类型',
            key: 'mdStandardName',
            filters: [
              {
                value: '1',
                label: '国际标准'
              },
              {
                value: '2',
                label: '国家标准'
              },
              {
                value: '3',
                label: '卫生标准'
              },
              {
                value: '4',
                label: '院内标准'
              }
            ],
            filterMethod(value, row) {
              return row.mdStandardCode == value
            }
          },
          {
            title: '标准代码',
            key: 'standardCode',
          },
          {
            title: '主数据源系统',
            key: 'sourceSysName',
          },
          {
            title: '术语状态',
            key: 'mdStatusName',
          },
          {
            title: '主数据版本',
            key: 'versionNo',
            render: (h, params) => {
              return h('div', 'V' + params.row.versionNo)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.releaseDetail(params.row)
                    }
                  }
                }, '发布内容'),
              ]);
            }
          }
        ],
        showEdit: false,
        pageSize: 10,
        pageNo: 1,
        model: {}
      }
    },
    mounted() {
      this.fetchData()
    },
    computed: {
      modelData() {
        return this.$store.state.version.releaseList
      }
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      handleSearch(searchKey) {
        this.searchText = searchKey;
        this.pageNo = 1;
        this.fetchData();
      },
      changePage(page) {
        this.pageNo = page;
        this.fetchData();
      },
      pageSizeChange(size) {
        this.pageSize = size;
        this.fetchData();
      },
      fetchData() {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          searchText: this.searchText,
          mdStatusCode: ['2', '5']
        };
        this.$store.dispatch('getReleaseList', params)
      },
      back() {
        this.showEdit = false;
        this.fetchData();
      },
      releaseDetail(row) {
        this.model = row;
        this.showEdit = true;
      }
    }
  }
</script>


<style scoped lang="scss">


</style>
