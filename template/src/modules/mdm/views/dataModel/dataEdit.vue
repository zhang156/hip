<template>
  <page-layout>
    <h3 class="title">{{'编辑术语('+modelName+')'}}</h3>
    <base-table-layout class="margin-top-10"
                       :columns="columns" @page-change="changePage" @page-size-change="pageSizeChange"
                       :data="masterData" @addNew="add">
      <div slot="more-opreation" class="inline">
        <Button type="info" icon="ios-refresh-empty" @click="refresh">刷新</Button>
        <Button type="info" icon="ios-list-outline" @click="openLog">数据操作日志</Button>
        <Button type="warning" icon="ios-cloud-download-outline">导出</Button>
        <Button type="error" icon="ios-cloud-upload-outline">导入</Button>
      </div>
    </base-table-layout>

    <dp-dialog :open.sync="showModal">
      <one-data-edit :oneData="oneData" ref="oneEdit" :modelName="modelName" :editCols="editCols" :model-id="model.id"
                     :pk="dataPk"
                     :validRules="validRules"
                     @on-close="closeEditData"></one-data-edit>
    </dp-dialog>

    <dp-dialog :open.sync="showLog" width="60%">
      <data-log :model-id="model.id" ref="log"></data-log>
    </dp-dialog>
  </page-layout>
</template>


<script>
  import BaseTableLayout from "@/components/layout/baseTableLayout.vue";
  import PageLayout from "../appComponents/pageLayout.vue";
  import { selection, index, action, status } from "./dataTable"
  import OneDataEdit from "./oneDataEdit.vue";
  import DpDialog from "@/components/dialog/dialog.vue";
  import DataLog from "./dataLog";

  export default {
    name: 'data-edit',
    components: {
      DataLog,
      DpDialog,
      OneDataEdit,
      PageLayout,
      BaseTableLayout
    },
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
        showModal: false,
        showLog: false,
        oneData: {},
        columns: [],
        editCols: [],
        validRules: {},
        dataPk: '',
        pageSize: 10,
        pageNo: 1,
        searchParams: {}
      }
    },
    computed: {
      modelName() {
        return this.model.modelName
      },
      masterData() {
        return this.$store.state.model.oneModelData;
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
          this.editCols.push({ title: f.fieldName, key: f.fieldCode })
          if (f.isNullable === '0') {
            this.validRules[f.fieldCode] = [{ required: true, trigger: 'blur', message: f.fieldName + '不能为空' }]
          }
        })
        this.columns.push(...status);
        this.columns.push(action(this));
      },
      refresh() {
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
        this.searchParams.pageNo = this.pageNo;
        this.searchParams.pageSize = this.pageSize;
        this.searchParams.modelId = this.model.id;
        this.$store.dispatch('listOneModelData', this.searchParams)
      },
      add() {
        this.oneData = { isNew: true };
        this.showModal = true;
      },
      edit(row) {
        this.oneData = JSON.parse(JSON.stringify(row));
        this.dataPk = this.oneData['PK_' + this.model.modelEnName];
        this.showModal = true;
      },
      onDelete(index) {
        this.$store.dispatch('removeOneData', {
          modelId: this.model.id,
          dataId: this.masterData.list[index]['PK_' + this.model.modelEnName]
        }).then(() => {
          this.$Message.success('删除数据成功');
          this.fetchData();
        })
      },
      closeEditData(refresh) {
        this.showModal = false;
        if (refresh) {
          this.fetchData();
        }
      },
      openLog() {
        this.showLog = true
        this.$refs.log.fetchData();
      }
    },
    watch: {
      model(val) {
        this.setTableCol();
      }
    }
  }
</script>


<style scoped>

</style>
