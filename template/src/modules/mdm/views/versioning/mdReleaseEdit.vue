<template>
  <page-layout>
    <h3 class="title">{{'术语发布('+modelName+')'}}</h3>
    <base-table-layout class="margin-top-10"
                       :columns="columns"  @on-refresh="refresh"
                       :data="masterData" :show-add="false" @on-selection-change="selectionChange">
      <div slot="more-opreation" class="inline">
        <Button type="success" icon="ios-checkmark-outline" @click="release">发布</Button>
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
    name: 'mdReleaseEdit',
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
        searchParams: { statusCode: '1' },
        approvalOpinion: ''
      }
    },
    computed: {
      modelName() {
        return this.model.modelName
      },
      masterData() {
        return this.$store.state.version.releaseData;
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
        this.$store.dispatch('listReleaseData', this.searchParams)
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
      release() {
        let parmas = { modelId: this.model.id, pks: this.selection, statusCode: '2' }
        this.$store.dispatch('updateDataStatus', parmas).then(() => {
          this.$Message.success('发布成功');
          this.fetchData();
        })
      }
    }
  }
</script>


<style scoped>

</style>
