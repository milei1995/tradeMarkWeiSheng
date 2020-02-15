<template>
  <div class="payorder">
    <div class="payorder-part1">
      <div class="payorder-part1-item">
        <span class="item-label">订单：</span>
        <span class="item-text">{{orderNo}}</span>
      </div>
      <div class="payorder-part1-item">
        <span class="item-label">费用：</span>
        <span class="item-text">{{totalPrice}}元</span>
      </div>
      <div class="payorder-part1-item">
        <span class="item-label">申请状态：</span>
        <span class="item-text">待支付</span>
      </div>
    </div>
    <div class="payorder-part2">
      <div class="payorder-part2-1">其他方式支付</div>
      <a-radio-group :options="plainOptions" @change="handlePayTypeChange" />
      <div class="pay-img">
        <img v-if="isPayTypeChange" src="../bannerAndIcon/alipay.png" />
        <img v-else src="../bannerAndIcon/wechatpay.png" />
      </div>
      <div class="pay-code" v-if="isShowCode">
        <a-tooltip placement="rightTop">
          <template slot="title">
            <span>请扫描二维码支付哦</span>
          </template>
          <img :src="codeImgUrl" />
        </a-tooltip>
      </div>
    </div>
    <div class="topay">
      <span class="topay1">应付金额</span>
      <span class="topay2">￥&nbsp;{{totalPrice}}</span>
      <a-button @click="toNext">下一步</a-button>
    </div>
  </div>
</template>

<script>
import { getStorage } from "../mixin/storage";
export default {
  name: "PayOrder",
  data() {
    return {
      isPayTypeChange: true,
      plainOptions: ["支付宝", "微信"],
      orderNo: "", //订单编号
      totalPrice: "", //总价
      isShowCode: false, //展示二维码
      codeImgUrl: "", //二维码图片URL
      orderType: null //从哪里传来 1.从注册商标(选择新申请人传来) 2.从我的订单传来
    };
  },
  mounted() {
    const params = this.$router.history.current.query;
    this.orderType = params.orderType;
    if (this.orderType === "1") {
      this.getMountedData(params.params);
    }
    if (this.orderType === "2") {
      const paramsdata={
        orderNo:params.orderNo,
        payType:params.payType
      }
      this.getMountedDataByOrderNo(paramsdata)
    }
  },
  methods: {
    handlePayTypeChange(e) {
      console.log(e);
      if (e.target.value === "支付宝") {
        this.isShowCode = false;
        this.$message.warning("抱歉,尚未开通支付保支付功能");
        this.isPayTypeChange = true;
      }
      if (e.target.value === "微信") {
        this.isShowCode = true;
        this.isPayTypeChange = false;
      }
    },
    toNext() {
      const url = "/api/trademark/trademarkOrder/selectOrderByOrderNo";
      const accessToken = getStorage("AccessToken");
      const headers = {
        accessToken: accessToken
      };
      const params = {
        orderNo: this.orderNo
      };
      this.$axios({
        method: "get",
        url: url,
        headers: headers,
        params: params
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$message.success("支付成功");
            this.$router.push({ path: "/trademarkBuy/commitTrademark" });
          } else {
            this.$message.error("支付失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMountedData(paramsData) {
      const url = "/api/trademark/trademarkOrder/registerPay";
      const accessToken = getStorage("AccessToken");
      const headers = {
        accessToken: accessToken
      };
      const params = paramsData;
      this.$axios({
        method: "post",
        url: url,
        headers: headers,
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            (this.orderNo = res.data.data.orderNo),
              (this.totalPrice = res.data.data.totalPrice);
            this.codeImgUrl =
              "data:image/jpg;base64," + res.data.data.payCodeQR;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMountedDataByOrderNo(paramsData) {
      const url = "/api/trademark/trademarkOrder/registerPayByOrderNo";
      const accessToken = getStorage("AccessToken");
      const headers = {
        accessToken: accessToken
      };
      const params = paramsData;
      this.$axios({
        method: "post",
        url: url,
        headers: headers,
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            (this.orderNo = res.data.data.orderNo),
              (this.totalPrice = res.data.data.totalPrice);
            this.codeImgUrl =
              "data:image/jpg;base64," + res.data.data.payCodeQR;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.payorder {
  margin-top: 10px;
  width: 100%;
  min-width: 900px;
  .payorder-part1 {
    width: 100%;
    height: 117px;
    border: 1px solid rgba(232, 232, 232, 1);
    opacity: 1;
    padding: 0px 9% 0px 9%;
    .payorder-part1-item {
      display: flex;
      margin-top: 9px;
      .item-label {
        width: 100px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 27px;
        color: rgba(51, 51, 51, 1);
        opacity: 1;
      }
      .item-text {
        margin-left: 100px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 24px;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
      }
    }
  }
  /deep/.payorder-part2 {
    width: 100%;
    padding-left: 9%;
    margin-top: 10px;
    .payorder-part2-1 {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 27px;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .ant-radio-group {
      margin-top: 10px;
    }
    .pay-img {
      margin-top: 10px;
      width: 111px;
      height: 36px;
      border: 1px solid rgba(232, 232, 232, 1);
      opacity: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pay-code {
      width: 140px;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /deep/.topay {
    padding-left: 50px;
    padding-right: 50px;
    width: 100%;
    margin-top: 10px;
    line-height: 70px;
    height: 70px;
    align-items: center;
    background: rgba(245, 246, 250, 1);
    opacity: 1;
    display: flex;
    .topay1 {
      display: table-cell;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .topay2 {
      display: table-cell;
      margin-left: 50px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 41px;
      color: rgba(253, 114, 55, 1);
      opacity: 1;
    }
    .ant-btn {
      display: table-cell;
      width: 98px;
      height: 29px;
      line-height: 29px;
      background: rgba(253, 114, 55, 1);
      opacity: 1;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 60%;
    }
  }
}
</style>