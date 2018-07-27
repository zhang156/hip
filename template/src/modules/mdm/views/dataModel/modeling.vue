<template>
  <page-layout card-title="数据建模">
    <baseTable-layout :columns="columns"
                      :data="modelData"
                      @addNew="addNew" @page-change="changePage" @page-size-change="pageSizeChange"
                      @on-refresh="refresh"
                      @handleSearch="handleSearch" v-show="!showEdit">
    </baseTable-layout>
    <Button type="primary" v-show="showEdit" @click="back" size="small">
      <Icon type="chevron-left"></Icon>
      返回
    </Button>
    <model-edit :model-data="mdModel" class="margin-top-10" v-show="showEdit" ref="EModel">
    </model-edit>

    <dp-dialog :open.sync="xmlShow" width="60%" ref="codeCopy">
      <div class="opreation-btn">
        <Tooltip content="复制代码" placement="bottom">
          <Icon type="clipboard" size="24" @click.native="clipboard"></Icon>
        </Tooltip>
      </div>
      <div class="full-h">
        <codemirror :value="xml" :options="cmOptions" style="height: 95%"></codemirror>
      </div>
    </dp-dialog>
  </page-layout>
</template>


<script>
  import PageLayout from "../appComponents/pageLayout.vue";
  import baseTableLayout from "@/components/layout/baseTableLayout.vue"
  import ModelEdit from "./modelEdit";
  import 'codemirror/mode/xml/xml.js';
  import formatXml from '@/lib/xmlUtil'
  import DpDialog from "@/components/dialog/dialog";


  export default {
    name: 'modeling',
    components: {
      DpDialog,
      ModelEdit,
      PageLayout,
      baseTableLayout
    },
    data() {
      return {
        xmlShow: false,
        xml: '',
        cmOptions: {
          tabSize: 4,
          height: '100%',
          mode: 'application/xml',
          lineNumbers: true,
          line: true,
          lineWrapping: true,
          readOnly: true
        },
        mdModel: {},
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
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showXml(params.row)
                    }
                  }
                }, 'xml预览'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确认删除这条内容吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.removeModel(params.row)
                    },
                    'on-cancel': () => {
                      console.log('cancel')
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '删除')
                ])
              ]);
            }
          }
        ],
        pageSize: 10,
        pageNo: 1,
        searchText: '',
        showEdit: false
      }
    },
    computed: {
      modelData() {
        return this.$store.state.model.modelData
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.codeCopy.$el.addEventListener('copy', this.handleClipboard);
      })

      this.fetchData()
    },
    beforeDestroy() {
      this.$refs.codeCopy.$el.removeEventListener('copy', this.handleClipboard);
    },
    methods: {
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      handleClipboard(e) {
        if (window.getSelection()) {
          e.clipboardData.setData('text/plain', this.xml)
          e.preventDefault()
        }

      },
      clipboard() {
        document.execCommand('copy')
        if (this.xml != '')
          this.$Message.success('复制成功');
      },
      handleSearch(text) {
        this.searchText = text;
        this.pageNo = 1;
        this.fetchData();
      },
      fetchData() {
        let params = { pageNo: this.pageNo, pageSize: this.pageSize, searchText: this.searchText };
        this.$store.dispatch('getModelData', params)
      },
      addNew() {
        this.mdModel = { isNew: true };
        this.showEdit = true;
      },
      edit(row) {
        this.mdModel = JSON.parse(JSON.stringify(row));
        this.showEdit = true;
      },
      back() {
        this.$Modal.confirm({
          title: '操作确认',
          content: '未保存的数据将丢失，是否确认返回？',
          onOk: () => {
            this.showEdit = false;
            this.fetchData();
          },
          onCancel: () => {
          }
        });

      },
      close() {
        this.showEdit = false;
      },
      removeModel(row) {
        this.$store.dispatch('removeModel', row.id).then(() => {
          this.$Message.success('删除成功');
          this.fetchData();
        })
      },
      changePage(page) {
        this.pageNo = page;
        this.fetchData();
      },
      pageSizeChange(size) {
        this.pageSize = size;
        this.fetchData();
      },
      showXml(row) {
        let xmlStr = '';
        xmlStr = '<?xml version="1.0" encoding="UTF-8"?>';
        xmlStr += '<CommonMessage>';
        xmlStr += '<!--Header-->';
        xmlStr += '<serviceId>' + row.serviceId + '</serviceId>';
        xmlStr += '<serviceName>' + row.modelName + '</serviceName>';
        xmlStr += '<senderId>发送系统ID</senderId>';
        xmlStr += '<senderName>发送系统名称</senderName>';
        xmlStr += '<creationTime>消息创建时间</creationTime>';
        xmlStr += '<!--body-->';
        xmlStr += '<content>';
        xmlStr += '<!--action A:新增 U:更新  D:删除-->';
        xmlStr += '<entry action="">'
        row.fields.map(f => {
          let ele = f.fieldCode.toLowerCase().replace(/_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
          });
          xmlStr += '<' + ele + '>' + f.fieldName + '</' + ele + '>';
        })
        xmlStr += '</entry>'
        xmlStr += '</content>';
        xmlStr += '</CommonMessage>';

        this.xml = formatXml(xmlStr);
        this.xmlShow = true;
      }
    }
  }
</script>


<style>
  .CodeMirror {
    height: 100% !important;
  }
</style>
