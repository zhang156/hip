<template>
  <edit-page :title="editTitle">
    <Form :model="oneData" :label-width="80" ref="dataForm" :rules="validRules">
      <FormItem v-for="(e,index) in editCols" :label="e.title" :key="index" :prop="e.key">
        <Input v-model="oneData[e.key]"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit('dataForm')">确定</Button>
        <Button type="error" @click="cancelEdit">取消</Button>
      </FormItem>
    </Form>
  </edit-page>
</template>


<script>
  import EditPage from "../appComponents/editPage.vue";

  export default {
    components: { EditPage },
    name: 'one-data-edit',
    props: {
      oneData: Object,
      modelId: Number,
      modelName: String,
      editCols: Array,
      validRules: Object,
      pk: [Number, String]
    },
    data() {
      return {}
    },
    computed: {
      isUpdate() {
        return !this.oneData.isNew;
      },
      editTitle() {
        return (this.isUpdate ? '编辑-' : '新增-') + this.modelName + '-数据'
      },
    },
    methods: {
      onSubmit(form) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            delete this.oneData._index;
            delete this.oneData._rowKey;
            if (!this.isUpdate) {
              delete this.oneData.isNew;
              let params = { modelId: this.modelId, contentData: this.oneData };
              this.$store.dispatch('addOneModelData', params).then(() => {
                this.$Message.success('新增数据成功');
                this.$emit('on-close', true);
              })
            } else {
              let params = { modelId: this.modelId, pk: this.pk, contentData: this.oneData };
              this.$store.dispatch('modifyOneModelData', params).then(() => {
                this.$Message.success('更新数据成功');
                this.$emit('on-close', true);
              })
            }
          }
        })
      },
      cancelEdit() {
        this.$emit('on-close', false);
      }
    }
    ,
    mounted() {
    },
    watch: {
      oneData(val) {
        this.editCols.map(e => {
          this.$set(e, 'value', this.oneData[e.key])
        })
      }
    }
  }
</script>


<style scoped>

</style>
