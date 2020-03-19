<template>
  <div>
    <a-modal title="订单详情" :visible="visible" width="500px" :footer="null" @cancel="handleCancel">
      <div class="detail">
        <span style="font-size:16px;font-weight:bold;display:block;">1.用户信息:</span>
        <div class="detail1">
          <div class="detail1-part">用户名：{{currentRecord.realName}}</div>
          <div class="detail1-part">微信号：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">QQ号：{{currentRecord.qqAccount}}</div>
          <div class="detail1-part">登陆手机号：{{currentRecord.phone}}</div>
        </div>
        <span style="font-size:16px;font-weight:bold;margin-top:5px;display:block;">2.商标信息</span>
        <div class="detail2">
          <div class="detail1-part">注册商标名称：{{currentRecord.trademarkName}}</div>
          <div class="detail1-part">商标说明：{{currentRecord.trademarkExplain}}</div>
          <div class="detail1-part">商标图片：{{currentRecord.trademarkImage}}</div>
          <div class="detail1-part">商标类型：{{tradeMarkStatus11()}}</div>
          <div class="detail1-part">订单号：{{currentRecord.orderNo}}</div>
        </div>
        <span style="font-size:16px;font-weight:bold;margin-top:5px;display:block;">3.具体购买商品</span>
        <div class="goods-detail">
          <div
            class="goods-detail-item"
            v-for="(item,index) in currentRecord.orderGoodsList"
            :key="index"
          >
            <div class="goods-item1">{{item.classifyNum}}--{{item.classifyName}}--{{item.groupsNum}}</div>
            <div class="goods-item2">
              <span v-for="(item2,index2) in item.goods" :key="index2">{{item2}};</span>
            </div>
          </div>
        </div>
        <template v-if="JSON.stringify(currentRecord.configCompanyApply) !== '{}'">
          <span style="font-size:16px;font-weight:bold;margin-top:5px;display:block;">4.企业申请人信息</span>
          <div class="detail3">
            <div class="detail1-part">申请类型：{{ applyType()}}</div>
            <div class="detail1-part">企业名称：{{ currentRecord.configCompanyApply.companyName}}</div>
            <a-popover title="图片详情" placement="right">
              <template slot="content">
                <img
                  style="width:500px;height:600px;"
                  :src="currentRecord.configCompanyApply.companyProveImage"
                />
              </template>
              <div class="detail1-part-img">
                主体资格证明文件：
                <img
                  class="detail-img"
                  :src="currentRecord.configCompanyApply.companyProveImage"
                />
              </div>
            </a-popover>
              <a-popover title="图片详情" placement="right">
              <template slot="content">
                <img
                  style="width:500px;height:600px;"
                  :src="currentRecord.powerOfAttorney"
                />
              </template>
              <div class="detail1-part-img">
                委托书证明文件：
                <img
                  class="detail-img"
                  :src="currentRecord.powerOfAttorney"
                />
              </div>
            </a-popover>
            <div
              class="detail1-part"
            >省市区：{{currentRecord.configCompanyApply.province}}--{{currentRecord.configCompanyApply.city}}--{{currentRecord.configCompanyApply.district}}</div>
            <div
              class="detail1-part"
            >营业执照地址：{{currentRecord.configCompanyApply.businessLicenseAddress}}</div>
            <div class="detail1-part">联系人：{{currentRecord.configCompanyApply.contacts}}</div>
            <div class="detail1-part">联系人电话：{{currentRecord.configCompanyApply.contactsPhone}}</div>
            <div class="detail1-part">传真：{{ currentRecord.configCompanyApply.contactFax}}</div>
            <div class="detail1-part">联系人邮箱：{{currentRecord.configCompanyApply.contactEmail}}</div>
          </div>
        </template>
        <template v-if="JSON.stringify(currentRecord.configUserApply) !== '{}'">
          <span style="font-size:16px;font-weight:bold;margin-top:5px;display:block;">4.用户申请人信息</span>
          <div class="detail3">
            <div class="detail1-part">申请用户名称：{{currentRecord.configUserApply.applyUserName}}</div>
            <div class="detail1-part">身份证：{{currentRecord.configUserApply.idCard}}</div>
            <div class="detail1-part-img">
              <a-popover title="图片详情" placement="right">
                <template slot="content">
                  <img
                    style="width:600px;height:450px;"
                    :src="currentRecord.configUserApply.idCardFront"
                  />
                </template>
                <div class="detail1-part-img">
                  身份证正面：
                  <img class="detail-img" :src="currentRecord.configUserApply.idCardFront" />
                </div>
              </a-popover>
            </div>
            <div class="detail1-part-img">
              <a-popover title="图片详情" placement="right">
                <template slot="content">
                  <img
                    style="width:600px;height:450px;"
                    :src="currentRecord.configUserApply.idCardReverse"
                  />
                </template>
                <div class="detail1-part-img">
                  身份证反面：
                  <img class="detail-img" :src="currentRecord.configUserApply.idCardReverse" />
                </div>
              </a-popover>
            </div>
            <div class="detail1-part-img">
              <a-popover title="图片详情" placement="right">
                <template slot="content">
                  <img
                    style="width:500px;height:600px;"
                    :src="currentRecord.configUserApply.companyProveImage"
                  />
                </template>
                <div class="detail1-part-img">
                  主体资格证明文件：
                  <img
                    class="detail-img"
                    :src="currentRecord.configUserApply.companyProveImage"
                  />
                </div>
              </a-popover>
            </div>
             <div class="detail1-part-img">
              <a-popover title="图片详情" placement="right">
                <template slot="content">
                  <img
                    style="width:500px;height:600px;"
                    :src="currentRecord.powerOfAttorney"
                  />
                </template>
                <div class="detail1-part-img">
                  委托书证明文件：
                  <img
                    class="detail-img"
                    :src="currentRecord.powerOfAttorney"
                  />
                </div>
              </a-popover>
            </div>
            <div
              class="detail1-part"
            >省市区：{{currentRecord.configUserApply.province}}--{{currentRecord.configUserApply.city}}--{{currentRecord.configUserApply.district}}</div>
            <div class="detail1-part">身份证地址：{{currentRecord.configUserApply.idCardAddress}}</div>
            <div class="detail1-part">联系人：{{currentRecord.configUserApply.contacts}}</div>
            <div class="detail1-part">联系人手机号：{{currentRecord.configUserApply.contactsPhone}}</div>
            <div class="detail1-part">联系人邮箱：{{currentRecord.configUserApply.contactsEmail}}</div>
          </div>
        </template>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data() {
    return {
      visible: false,
      confirmLoading: false
    };
  },
  props: {
    currentRecord: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    tradeMarkStatus11() {
      const status = this.currentRecord.trademarkStatus;
      console.log(status);
      // return status
      if (status == 1) {
        return "文字商标";
      }
      if (status == 2) {
        return "图形商标";
      }
      if (status == 3) {
        return "文字图形商标";
      }
    },
    applyType() {
      const applyType = this.currentRecord.configCompanyApply.applyType;
      if (applyType == 1) {
        return "中国大陆";
      } else {
        return applyType;
      }
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  }
};
</script>

<style scoped>
.detail1,
.detail2,
.detail3 {
  width: 450px;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
  text-indent: 20px;
  border-radius: 5px;
}
.goods-detail{
   width: 450px;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
  text-indent: 20px;
  border-radius: 5px;
}
.goods-detail-item{
  width:100%;
  display: flex;
  justify-content: space-between;
}
.goods-item1{
  width:50%;
  height:40px;
  line-height: 40px;
  border-right:1px solid black;
  border-bottom:1px solid black;
}
.goods-item2{
  width:50%;
  height: 40px;
  line-height: 20px;
  border-bottom:1px solid black;
  overflow: auto;
}

.detail1-part {
  width: 100%;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid black;
}
.detail1-part-img {
  width: 100%;
  height: 80px;
  /* line-height: 80px; */
  border-bottom: 1px solid black;
}
.detail-img {
  margin-top: 5px;
  width: 70px;
  height: 70px;
  cursor: pointer;
}
</style>