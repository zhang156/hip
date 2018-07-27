<template>
  <page-layout>
    <h3 class="title">{{editTitle}}</h3>
    <Row type="flex" justify="space-between">
      <Col span="10">
      <div class="card-title">
        <h3 class="inline label-important">目标源</h3>
        <div class="inline">
          <RadioGroup v-model="targetType" @on-change="changeTargetType">
            <Radio label="1">内部术语</Radio>
            <Radio label="9">自定义</Radio>
          </RadioGroup>
          <mdm-model-select width="200px" flag="0" size="small"
                            v-model="map.targetModelId" :code.sync="map.targetModelCode"
                            :name.sync="map.targetModelName" :en-name.sync="map.targetModelEnName"
                            v-if="targetType=='1'"
                            @on-changeValue="changeTarget"></mdm-model-select>
        </div>
      </div>
      <div class="table-data margin-top-10">
        <Table height="300" :columns="targetColumn" :data="targetDatas" size="small" border highlight-row disabled-hover
               no-data-text="选择目标源数据" @on-current-change="selectLeftRow" @on-row-click="clickRow"></Table>
      </div>
      </Col>
      <Col span="2">
      <div class="mapping-opreation">
        <Button type="success" icon="ios-shuffle-strong" size="large" @click="autoMapping">自动匹配</Button>
        <Button type="primary" icon="arrow-swap" size="large" @click="addMappingSelect">确定对照</Button>
      </div>
      </Col>
      <Col span="10">
      <div class="card-title">
        <h3 class="inline label-important">标准源</h3>
        <div class="inline">
          <RadioGroup v-model="standardType" @on-change="changeStandardType">
            <Radio label="1">内部术语</Radio>
            <Radio label="2">标准值域</Radio>
            <Radio label="9">自定义</Radio>
          </RadioGroup>
          <mdm-model-select width="200px" flag="0" size="small" v-if="standardType=='1'"
                            v-model="map.standardModelId" :code.sync="map.standardModelCode"
                            :name.sync="map.standardModelName" :en-name.sync="map.standardModelEnName"
                            @on-changeValue="changeStandardModel"></mdm-model-select>
          <mdm-c-v-select width="300px" size="small" v-if="standardType=='2'"
                          v-model="map.standardModelCode" :name="map.standardModelName"
                          @on-changeValue="changeStandardCv"></mdm-c-v-select>
        </div>
      </div>
      <div class="table-data margin-top-10">
        <Table height="300" :columns="standardColumn" :data="standardDatas" size="small" border highlight-row
               disabled-hover no-data-text="选择标准源数据" @on-current-change="selectRightRow" :row-class-name="rowClassName"
               @on-row-click="clickRightRow"></Table>
      </div>
      </Col>
    </Row>
    <div class="margin-top-10 content-divider"></div>
    <div class="mapping-result">
      <div class="result-operation">
        <Input v-model="resultSearchText" placeholder="关键字查询" style="width: 200px"></Input>
        <Button type="primary" icon="ios-search-strong">查询</Button>
        <Button type="success" icon="document-text" @click="saveMapping">保存</Button>
        <Button type="warning" icon="ios-cloud-download-outline">导出</Button>
      </div>
      <Table height="300" :columns="resultColumn" :data="resultData" size="small" border highlight-row
             disabled-hover></Table>
    </div>

    <Modal v-model="mappingKeysModel" width="700" title="自动匹配字段选择" @on-ok="selectKeys">
      <div class="margin-top-10" style="font-weight: bold">目标源数据可选字段</div>
      <RadioGroup v-model="targetKeys">
        <Radio v-for="(item,index) in targetMeta" :label="item.key" :key="index">{{item.title+'('+item.key+')'}}</Radio>
      </RadioGroup>
      <div class="margin-top-10" style="font-weight: bold">标准源数据可选字段</div>
      <RadioGroup v-model="standardKeys">
        <Radio v-for="(item,index) in standardMeta" :label="item.key" :key="index">{{item.title+'('+item.key+')'}}
        </Radio>
      </RadioGroup>
    </Modal>
  </page-layout>
</template>

<script>
  import PageLayout from "../appComponents/pageLayout";
  import MdmModelSelect from "../appComponents/select/mdmModelSelect";
  import MdmCVSelect from "../appComponents/select/mdmCVSelect";

  export default {
    components: {
      MdmCVSelect,
      MdmModelSelect,
      PageLayout
    },
    props: {
      mappingData: {
        type: Object,
        default: function () { return {} }
      },
    },
    name: "mapping-edit",
    data() {
      return {
        map: {},
        targetType: '1',
        standardType: '1',
        targetColumn: [],
        targetDatas: [],
        allTargetData: [],
        standardColumn: [],
        standardDatas: [],
        allStandardData: [],
        leftRow: '',
        _leftIndex: '',
        rightRow: '',
        _rightIndex: '',
        resultColumn: [],
        resultData: [],
        resultSearchText: '',
        targetMeta: [],
        standardMeta: [],
        targetKeys: '',
        standardKeys: '',
        mappingKeysModel: false,
        mappingDetail: []
      }
    },
    computed: {
      isUpdate() {
        return !this.mappingData.isNew
      },
      editTitle() {
        return this.isUpdate ? '编辑数据映射' : '新建数据映射'
      }
    },
    watch: {
      mappingData(nv) {
        this.map = nv || {}
      },
      targetColumn() {
        this.initResultTable();
      },
      standardColumn() {
        this.initResultTable();
      }
    },
    methods: {
      selectKeys() {

      },
      rowClassName(row, index) {
        if (row.mapped) {
          return 'mapped-row'
        }
        return '';
      },
      //目标源和标准源选定之后，渲染对照结果table表头信息
      initResultTable() {
        if (this.targetColumn.length > 0 && this.standardColumn.length > 0) {
          this.resultColumn = [];
          this.resultData = [];
          this.mappingDetail = [];
          this._leftIndex = '';
          this._rightIndex = '';
          this.targetColumn.forEach((t) => {
            if (!t.type)
              this.resultColumn.push({ title: '目标-' + t.title, key: 'TARGET_' + t.key })
          })
          this.standardColumn.forEach((t) => {
            if (!t.type)
              this.resultColumn.push({ title: '标准-' + t.title, key: 'ST_' + t.key })
          })
          this.resultColumn.push({
            title: '操作',
            key: 'action',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    transfer: true,
                    title: '您确认删除吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteMapping(params.row, params.index)
                    },
                    'on-cancel': () => {
                    }
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'android-remove-circle',
                      color: '#ed3f14',
                      size: '20'
                    },
                    style: {
                      cursor: 'pointer'
                    }
                  })
                ])
              ]);
            }
          })
        }
      },
      clickRow(row, index) {
        this._leftIndex = index
      },
      selectLeftRow(row) {
        this.leftRow = row;

      },
      clickRightRow(row, index) {
        this._rightIndex = index
      },
      selectRightRow(row) {
        this.rightRow = row;
      },
      changeTargetType() {
        this.map.targetModelId = '';
        this.targetColumn = [];
        this.targetDatas = [];

        this.standardDatas = this.allStandardData;

      },
      //更改标准源类型时，标准源已选择的字典清空，目标源数据还原
      changeStandardType() {
        this.map.standardModelId = '';
        this.map.standardModelCode = '';
        this.standardColumn = [];
        this.standardDatas = [];

        this.targetDatas = this.allTargetData;
      },
      //选择目标源内部术语类型时，获取术语结构和数据
      changeTarget(modelId) {
        this.targetColumn = [];
        this.targetMeta = [];
        this.$store.dispatch('getOneModel', modelId).then((res) => {
          this.targetColumn.push({ type: 'index', width: 60 })
          res.data.fields.forEach(f => {
            this.targetColumn.push({ title: f.fieldName, key: f.fieldCode })
            this.targetMeta.push({ title: f.fieldName, key: f.fieldCode })
          })
        })

        this.$store.dispatch('getOneModelDataNoPage', modelId).then((res) => {
          this.targetDatas = res.data;

          this.allTargetData = JSON.parse(JSON.stringify(this.targetDatas))
        })

      },
      //选择标准源内部术语类型时，获取术语结构和数据
      changeStandardModel(modelId) {
        this.standardColumn = [];
        this.standardMeta = [];
        this.$store.dispatch('getOneModel', modelId).then((res) => {
          this.standardColumn.push({ type: 'index', width: 60 })
          res.data.fields.forEach(f => {
            this.standardColumn.push({ title: f.fieldName, key: f.fieldCode })
            this.standardMeta.push({ title: f.fieldName, key: f.fieldCode })
          })
        })

        this.$store.dispatch('getOneModelDataNoPage', modelId).then((res) => {
          this.standardDatas = res.data;

          this.allStandardDatas = JSON.parse(JSON.stringify(this.standardDatas))
        })
      },
      //选择标准源标准值域时，获取数据，结构固定为编码和值
      changeStandardCv(identifier) {
        this.standardColumn = [];
        this.standardMeta = [];
        this.standardColumn.push({ title: "编码", key: "code" });
        this.standardColumn.push({ title: "值", key: "value" });

        this.standardMeta.push({ title: "编码", key: "code" });
        this.standardMeta.push({ title: "值", key: "value" });

        this.$store.dispatch('listOneCVData', identifier).then((res) => {
          this.standardDatas = res.data;
          this.allStandardDatas = JSON.parse(JSON.stringify(this.standardDatas))
        })
      },
      autoMapping() {
        if (this.targetColumn.length > 0 && this.standardColumn.length > 0) {
          this.mappingKeysModel = true;
        }
      },
      //确定对照时，目标源中去除当前数据，标准源中当前数据置已对照标识(背景色区分)
      //最终对照结果中增加两侧数据的主键
      addMappingSelect() {
        if (this.leftRow != '' && this.rightRow != '') {
          let rObj = { _rightIndex: this._rightIndex };
          let mapping = {};
          if (this.targetType == '1') {
            mapping.targetDataPk = this.leftRow['PK_' + this.map.standardModelEnName];
          }
          if (this.standardType == '1') {
            mapping.standardDataPk = this.rightRow['PK_' + this.map.standardModelEnName];
          } else if (this.standardType == '2') {
            mapping.standardDataPk = this.rightRow['id'];
          }
          Object.keys(this.leftRow).forEach((k) => {
            rObj['TARGET_' + k] = this.leftRow[k]
          })
          Object.keys(this.rightRow).forEach((k) => {

            rObj['ST_' + k] = this.rightRow[k]
          })
          this.resultData.push(rObj);
          this.mappingDetail.push(mapping);
          this.targetDatas.splice(this._leftIndex, 1);

          this.$set(this.standardDatas[this._rightIndex], 'mapped', true)
        }
      },
      //删除一条对照结果，目标源table中增加当前数据，标准源当前数据已对照标识还原为false,
      //删除对照结果数据主键中当前记录
      deleteMapping(row, _index) {
        let left = {}
        Object.keys(row).forEach((k) => {
          if (k.startsWith('TARGET_')) {
            left[k.substring(7)] = row[k];
          }
        })
        this.targetDatas.push(left);
        this.$set(this.standardDatas[row._rightIndex], 'mapped', false);
        this._leftIndex = '';
        this._rightIndex = '';
        this.resultData.splice(_index, 1);
        this.mappingDetail.splice(_index, 1);
      },
      saveMapping() {
        if (this.mappingDetail.length > 0) {
          this.map.mappingDetails = this.mappingDetail;

          this.$store.dispatch('addDataMapping', this.map).then((res) => {
              this.$Message.success('保存成功');
          })
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .card-title {
    display: inline-block;
  }

  .label-important {
    margin-right: 10px;
  }

  .table-data {
    max-height: 300px;
    overflow: auto;

  }

  .mapping-opreation {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .ivu-btn {
      margin-top: 20px;
    }
  }

  .content-divider {
    height: 8px;
    background-color: #ececec;
    border-radius: 8px;
  }

  .result-operation {
    padding: 5px 0px;
  }
</style>
<style>
  .ivu-table .mapped-row td {
    color: #bbbec4;
    background-color: #f7f7f7;
  }

  .ivu-table .ivu-table-row-highlight td {
    background-color: #ebf7ff;
  }
</style>
