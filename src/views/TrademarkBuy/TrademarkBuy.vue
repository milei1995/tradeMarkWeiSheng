<template>
  <div class="buy">
    <div class="buy-steps">
      <div
        class="buy-steps-item"
        v-for="(item,index) in stepsArray"
        :key="index"
        :class="item.path===$route.path ? 'active':'unactive'"
        @click="chooseSteps(item.path)"
      >
        <div class="triangle1"></div>
        <div class="triangle2"></div>
        <div class="triangle3"></div>
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="buy-steps-tips">
      <span class="tip1">自助商标申请存在较高的失败风险</span>，
      <span class="tip2">建议无商标申请经验的用户使用</span>
      <span class="tip3">&nbsp;&nbsp;"专家辅助申请"&nbsp;&nbsp;</span>
      <span class="tip4">提高商标通过率</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TrademarkBuy",
  data() {
    return {
      stepsArray: [
        { title: "填写商标信息",path:"/trademarkBuy/writeTrademarkInfo"},
        { title: "选择新申请人",path:"/trademarkBuy/chooseApplicant"},
        { title: "订单支付",path:"/trademarkBuy/payOrder"},
        { title: "提交商标局",path:"/trademarkBuy/commitTrademark" }
      ],
      stepIndex: 0
    };
  },
  computed: {},
  methods: {
    chooseSteps(path) {
       this.$router.push({path:path})
    }
  }
};
</script>

<style lang="scss" scoped>
.buy {
  width: 100%;
  min-width: 1400px;
  padding: 15px 20% 15px 20%;
  .buy-steps {
    width: 100%;
    min-width: 840px;
    height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    opacity: 1;
    .buy-steps-item {
      width: 25%;
      height: 100%;
      cursor: pointer;
      position: relative;
      text-align: center;
      .triangle1 {
        width: 0;
        height: 0;
        border-top: 16px solid transparent;
        border-left: 16px solid #ffffff;
        border-bottom: 16px solid transparent;
        position: absolute;
        left: 0px;
      }
      .triangle2 {
        width: 0;
        height: 0;
        border-top: 16px solid #ffffff;
        border-left: 16px solid transparent;
        position: absolute;
        top: 0px;
        right: 0px;
      }
      .triangle3 {
        width: 0;
        height: 0;
        border-bottom: 16px solid #ffffff;
        border-left: 16px solid transparent;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
    }
    .active {
      background: rgba(41, 158, 249, 1);
      color: rgba(255, 255, 255, 1);
    }
    .unactive {
      background: rgba(235, 236, 236, 1);
      color: rgba(102, 102, 102, 1);
    }
  }
  .buy-steps-tips {
    width: 100%;
    height: 32px;
    padding-top: 6px;
    background: rgba(41, 158, 249, 0.2);
    // opacity: 0.2;
    margin-top: 10px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 20px;

    // text-align: center;
    .tip1,
    .tip2,
    .tip3,
    .tip4 {
      opacity: 1;
    }
    .tip1 {
      color: #fc6a23;
    }
    .tip3 {
      color: #299ef9;
    }
    .tip2,
    .tip4 {
      color: #999999;
    }
  }
}
</style>
