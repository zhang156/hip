<template>
  <page-layout>
    <h3 class="titel">{{'术语审批('+modelName+')'}}</h3>
    <base-table-layout class="margin-top-10"
                       :columns="columns"  @on-refresh="refresh"
                       :data="masterData" :show-add="false" @on-selection-change="selectionChange">
      <div slot="more-opreation" class="inline">
        <Button type="success" icon="ios-checkmark-outline" @click="agree">同意</Button>
        <Button type="warning" icon="ios-close-outline" @click="disagree">驳回</Button>
      </div>
    </base-table-layout>

    <dp-dialog :open.sync="showLog">
      <data-log :model-id="model.id" :data-id="dataPk" ref="log"></data-log>
    </dp-dialog>
  </page-layout>
</template>

<script>
  import PageLayout from "../appComponents/pageLayout.vue";
  import BaseTableLayout from "@/components/layout/baseTableLayout.vue";
  import DataLog from "../dataModel/dataLog";
  import { selection, index, approvalAction, status } from "../dataModel/dataTable"
  import DpDialog from "@/components/dialog/dialog";

  export default {
    components: {
      DpDialog,
      DataLog,
      PageLayout,
      BaseTableLayout
    },
    name: 'mdApprovalEdit',
    props: {
      model: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        showLog: false,
        columns: [],
        selection: [],
        dataPk: '',
        pageSize: 10,
        pageNo: 1,
        searchParams: { statusCode: '0' },
        approvalOpinion: ''
      }
    },
    computed: {
      modelName() {
        return this.model.modelName
      },
      masterData() {
        return this.$store.state.version.approveData;
      }
    },
    created() {
      this.setTableCol();
      this.fetchData();
    },
    methods: {
      setTableCol() {
        this.columns.push(selection);
        this.columns.push(index);
        this.model.fields.forEach(f => {
          this.columns.push({ title: f.fieldName, key: f.fieldCode, align: 'center' })
        })
        this.columns.push(...status);
        this.columns.push(approvalAction(this));
      },
      fetchData() {
        this.searchParams.pageNo = this.pageNo;
        this.searchParams.pageSize = this.pageSize;
        this.searchParams.modelId = this.model.id;
        this.$store.dispatch('listApproveData', this.searchParams)
      },
      refresh() {
        this.pageNo = 1;
        this.fetchData();
      },
      detailLog(row) {
        this.dataPk = row['PK_' + this.model.modelEnName];
        this.showLog = true;
        this.$refs.log.fetchData();
      },
      selectionChange(selection) {
        this.selection = [];
        selection.map(row => {
          this.selection.push(row['PK_' + this.model.modelEnName])
        });
      },
      agree() {
        if (this.selection.length > 0) {
          this.approvalOpinion = '';
          this.$Modal.confirm({
            title: '审批同意意见',
            render: (h) => {
              return h('Input', {
                props: {
                  value: this.approvalOpinion,
                  type: "textarea",
                  rows: 5,
                  autofocus: true,
                  placeholder: '请输入审批同意意见...'
                },
                on: {
                  input: (val) => {
                    this.approvalOpinion = val;
                  }
                }
              })
            },
            onOk: () => {
              this.approval('1')
            }
          })

        }
      },
      disagree() {
        if (this.selection.length > 0) {
          this.approvalOpinion = '';
          this.$Modal.confirm({
            title: '审批驳回原因',
            render: (h) => {
              return h('Input', {
                props: {
                  value: this.approvalOpinion,
                  type: "textarea",
                  rows: 5,
                  autofocus: true,
                  placeholder: '请输入审批驳回原因...'
                },
                on: {
                  input: (val) => {
                    this.approvalOpinion = val;
                  }
                }
              })
            },
            onOk: () => {
              this.approval('4')
            }
          })
        }
      },
      approval(status) {
        let params = { modelId: this.model.id, pks: this.selection, statusCode: status }
        this.$store.dispatch('updateDataStatus', params).then(() => {
          this.$Message.success(status == '1' ? '审批成功' : '驳回成功');
          this.fetchData();
        })
      }
    }
  }
</script>


<style scoped>

</style>
