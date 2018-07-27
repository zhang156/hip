<template>
  <div class="data-log">
    <Timeline>
      <TimelineItem v-for="(item,index) in logData" :key="index">
        <Icon :size="22" :color="getColor(item.operateCode)"
              :type="item.operateCode=='A'?'ios-plus-outline':(item.operateCode=='U'?'ios-loop-strong':'ios-trash-outline')"
              slot="dot"></Icon>
        <p class="time">{{item.operateTime}}</p>
        <div class="content">
          <div class="operate-type" :style="{color:getColor(item.operateCode)}">{{item.operateName}}</div>
          <div class="divider"></div>
          <div class="detail">{{item.operateDetail}}</div>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
  export default {
    name: "data-log",
    props: {
      modelId: [Number, String],
      dataId: [Number, String]
    },
    computed: {
      logData() {
        return this.$store.state.model.logData;
      }
    },
    mounted() {
      /*this.fetchData();*/
    },
    methods: {
      getColor(t) {
        switch (t) {
          case 'A':
            return '#003d99';
            break;
          case 'U':
            return '#007456';
            break;
          case 'D':
            return '#ed3f14';
        }
      },
      fetchData() {
        if (this.modelId)
          this.$store.dispatch('listDataLog', { modelId: this.modelId, dataId: this.dataId })
      }
    },
    watch: {
      modelId(nv) {
        this.fetchData();
      },
      dataId(nv) {
        this.fetchData();
      }
    }
  }
</script>

<style scoped lang="scss">
  .data-log {
    padding: 15px 15px 10px 100px;

    .time {
      position: absolute;
      left: -80px;
      max-width: 65px;
      text-align: center;
    }

    .content {
      .operate-type {
        font-weight: bold;
        /*font-size: 18px;*/
      }
      .divider {
        /* background-color: #e9eaec;
         height: 1px;
         margin: 5px;*/
      }
      .detail {
        padding: 10px;
        max-width: 80%;
        word-wrap: break-word
      }
    }
  }
</style>
