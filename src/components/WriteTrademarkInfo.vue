<template>
  <div class="info">
    <reminder></reminder>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标类型">
        <a-radio-group
          :options="plainOptions"
          v-decorator="['type',validatorRules.type]"
          @change="tradeMarkTypeChange"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标名称">
        <a-input placeholder="请输入商标名称" v-decorator="[ 'name', validatorRules.name]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标说明">
        <a-textarea placeholder="请输入商标说明" v-decorator="[ 'explain', validatorRules.explain]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标图样">
        <a-radio-group
          :options="picOptions"
          @change="picTypeChange"
          :disabled="isDisablePic"
          v-decorator="[ 'pic', validatorRules.pic]"
        />
        <!-- 自动生成 -->
        <div v-if="isAutoPic" class="creatpicture">
          <div class="pic-area">
            <span ref="autoTradeName" >
              <p v-if="autoImg===''">自动生成图片内容</p>
              <img  v-else :src='autoImg' style='width:100%;height:100%;' />
            </span>
          </div>
          <a-button @click="autoCreatePic" v-if="validatorRules.type.initialValue=='文字商标'" style='margin-left:5px;'>生成图片</a-button>
        </div>
        <!-- 手动生成 -->
        <div v-else class="pic-area-manual">
          <upload-pic :type="'手动上传商标图样'" @getImageUrl="getUploadImageUrl" />
        </div>
        <div class="tips">
          <p class="tips-1">
            <a-icon type="info-circle" />商标含有文字不应过多，文字过多易造成商标显著性不强而被驳回。
          </p>
          <p class="tips-2">申请商标应符合法律规定，请勿模仿或复制他人已经注册的商标，以免因犯他人的合法权益。</p>
        </div>
      </a-form-item>
    </a-form>
    <div class="info-table">
      <trade-mark-category @selectGoods="selectGoods" @reduceGoods="reduceGoods" />
    </div>
    <div class="footer">
      <div class="footer-part1">应付金额</div>
      <div class="footer-part2">￥{{totalPrice}}</div>
      <a-button class="footer-part3" @click="toNext">下一步</a-button>
    </div>
  </div>
</template>

<script>
import { getStorage } from "../mixin/storage";
import UploadPic from "./UploadPic";
import TradeMarkCategory from "./tradeMarkCategory/index";
import Reminder from "./Reminder";
import { strLength } from "../untils/strLength";
// import TrademarkTree from "./TrademarkTree";
// import { filterUnderfind } from "../untils/filterUnderfind";
// import closeWriteTradeMarkInfo from "./closeWriteTradeMarkInfo"
export default {
  inject: ["reload"],
  name: "info",
  components: {
    UploadPic,
    TradeMarkCategory,
    Reminder
    // TrademarkTree,
    // closeWriteTradeMarkInfo
  },
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      validatorRules: {
        type: {
          rules: [{ required: true, message: "请选择类型!" }],
          initialValue: ""
        },
        name: { rules: [{ required: true, message: "请输入商标名称!" }] },
        explain: {},
        pic: { rules: [{ required: true, message: "请上传商标图样!" }] }
      },
      plainOptions: ["文字商标", "图形商标", "文字图形组合商标"],
      picOptions: ["自动生成", "手动上传"],
      isDisablePic: false, //是否禁用商标图案选择框
      isAutoPic: true, //自动生成图片or手动生成图片
      autoImg: "", //自动生成内容
      ManualImgUrl: "", //手动上传图片url
      choosed: [], //已经选中的
      paramsPart1: {
        orderType: "1"
      }, //请求时的参数
      isToken: false,
      autoFontStyle:{
        fontSize:'10px'
      }
    };
  },
  created() {},
  mounted() {
    // this.getClassifyGoods()
    this.isOverdue();
  },
  computed: {
    totalPrice() {
      const choosed = this.choosed;
      let total = 0;
      choosed.forEach(item => {
        total += Number(item.totalPriceItem);
      });
      return total.toFixed(2);
    }
    // eslint-disable-next-line vue/return-in-computed-property
  },
  watch: {
    CheckedItem(newChecked, oldChecked) {
      console.log(newChecked, oldChecked);
    },
    autoImg(newImg,oldImg){
      console.log(newImg,oldImg)
      // this.autoTradeFontSize()
    }
  },
  methods: {
    isOverdue() {
      //token是否过期
      const accessToken = getStorage("AccessToken");
      const params = {
        accessToken: accessToken
      };
      this.$axios({
        method: "get",
        url: "/api/trademark/user/checkToken",
        params: params
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.isToken = res.data.data.tokenType;
        }
      });
    },
    tradeMarkTypeChange(e) {
      console.log(e.target.value);
      this.validatorRules.type.initialValue = e.target.value;
      if (e.target.value === "文字商标") {
        this.isDisablePic = false;
        this.isAutoPic = true;
      }
      if (
        e.target.value === "图形商标" ||
        e.target.value === "文字图形组合商标"
      ) {
        this.isDisablePic = true;
        this.isAutoPic = false;
      }
    },
    getUploadImageUrl(imgUrl) {
      //获取手动上传的图片Url
      this.ManualImgUrl = imgUrl;
      this.paramsPart1.trademarkImage = imgUrl;
    },
    toNext() {
      const accessToken = getStorage("AccessToken");
      if (accessToken) {
        if (this.isToken) {
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log("Received values of form: ", values);
              this.paramsPart1.trademarkExplain = values.explain;
              this.paramsPart1.trademarkName = values.name;
              this.paramsPart1.orderGoods = this.choosed;
              switch (values.type) {
                case "文字商标":
                  this.paramsPart1.trademarkStatus = "1";
                  break;
                case "图形商标":
                  this.paramsPart1.trademarkStatus = "2";
                  break;
                case "文字图形整合商标":
                  this.paramsPart1.trademarkStatus = "3";
                  break;
              }
              console.log(this.paramsPart1);
              if (this.choosed.length > 0) {
                this.$router.push({
                  path: "/trademarkBuy/chooseApplicant",
                  query: {
                    paramsPart1: this.paramsPart1,
                    totalPrice: this.totalPrice
                  }
                });
              } else {
                this.$message.warning("请先选择商品");
              }
            }
          });
        } else {
          this.$message.error("当前用户已过期，请重新登录");
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 2000);
        }
      } else {
        this.$message.error("请先登录");
      }
    },
    picTypeChange(e) {
      console.log(e);
      if (e.target.value === "自动生成") {
        this.isAutoPic = true;
      }
      if (e.target.value === "手动上传") {
        this.isAutoPic = false;
      }
    },
    autoCreatePic() {
      const tradeMarkname = this.form.getFieldValue(["name"]).me;
      console.log(tradeMarkname);
      if (tradeMarkname !== undefined) {
        this.$axios({
          method:'get',
          url:'/api/trademark/image/createImage',
          params:{
            name:tradeMarkname
          }
        }).then(res=>{
          console.log(res)
          if(res.data.success){
            this.autoImg=res.data.data.imagePath
            this.paramsPart1.trademarkImage = res.data.data.imagePath;
          }
        })
      } else {
        this.$message.warning("请输入要填写的商标名称");
      }
    }, //
    autoTradeFontSize() {
      //根据字符串长度来改变字体大小
      var len=0;
      this.$nextTick(() => {
        var dom = this.$refs.autoTradeName.innerHTML;
       len = strLength(dom);
        // console.log(len)
        if (dom !== undefined) {
          if (len > 0 && len <= 5) {
             this.autoFontStyle={
               fontSize:'30px',
               fontWeight:'bold'
             }
          }
          if (len > 5 && len <= 10) {
             this.autoFontStyle={
               fontSize:'20px',
               fontWeight:'500'
             }
          }
          if(len > 10 && len <=20){
            this.autoFontStyle={
              fontSize:'15px',
            }
          }
          if(len>20){
             this.autoFontStyle={
              fontSize:'10px',
            }
          }
        } else {
          return false;
        }
      });
    },
    selectGoods(data) {
      this.choosed = data;
      console.log(data);
    },
    reduceGoods(data) {
      console.log(data);
      this.choosed = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  min-width: 1400px;
  padding: 15px 15px 15px 15px;
  /deep/ .ant-form-item {
    .ant-form-item-label {
      margin-right: 20px;
    }
    .creatpicture {
      display: flex;
      .ant-btn {
        margin-top: 70px;
        background: rgba(41, 158, 249, 1);
        color: #ffffff;
      }
    }
    .pic-area {
      width: 200px;
      height: 150px;
      border: 1px dashed #d9d9d9;
      span {
        display: block;
        width: 100%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        // font-size: 20px;
        // font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        // word-wrap: break-word;
        // word-break: break-all;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        overflow: hidden;
      }
    }
    .tips {
      margin-top: 2px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 15px;
      color: rgba(153, 153, 153, 1);
      opacity: 1;
      .tips-2 {
        padding-left: 8px;
      }
    }
  }
  .info-table {
    padding: 15px 10px 15px 10px;
    width: 65%;
    height: 752px;
    border: 1px solid rgba(245, 245, 245, 1);
    opacity: 1;
    // /deep/.info-table-part1 {
    //   height: 36px;
    //   line-height: 36px;
    //   display: flex;
    //   .info-table-part1-1 {
    //     font-size: 16px;
    //     font-family: Source Han Sans CN;
    //     font-weight: 400;
    //     color: rgba(51, 51, 51, 1);
    //     opacity: 1;
    //   }
    //   .ant-select {
    //     width: 280px;
    //     height: 36px;
    //     margin-left: 20px;
    //   }
    //   .ant-btn {
    //     width: 137px;
    //     height: 33px;
    //     background: rgba(247, 247, 247, 1);
    //     border: 1px solid rgba(232, 232, 232, 1);
    //     opacity: 1;
    //     margin-left: 20px;
    //     color: rgba(153, 153, 153, 1);
    //   }
    // }
    .info-table-part2 {
      width: 100%;
      height: 36px;
      margin-top: 20px;
      line-height: 36px;
      display: flex;
      padding-left: 15px;
      border: 1px solid rgba(232, 232, 232, 1);
      .info-table-part2-1 {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        opacity: 1;
      }
      .info-table-part2-2 {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        opacity: 1;
        margin-left: 30px;
      }
    }
    .info-table-part3 {
      margin-top: 30px;
      width: 100%;
      height: 480px;
      border: 1px solid rgba(245, 245, 245, 1);
      .info-table-part3-1 {
        display: flex;
        height: 50px;
        line-height: 50px;
        width: 100%;
        /deep/ .info-table-part3-1-left {
          border: 1px solid rgba(245, 245, 245, 1);
          box-sizing: border-box;
          width: 30%;
          padding: 5px 10px 5px 10px;
          display: flex;
          .ant-input-affix-wrapper {
            width: 80%;
          }
          .cancel {
            margin-left: 20px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 40px;
            color: rgba(102, 102, 102, 1);
            opacity: 1;
          }
        }
        /deep/ .info-table-part3-1-right {
          width: 70%;
          height: 50px;
          box-sizing: border-box;
          padding: 8px 20px 8px 20px;
          display: flex;
          background: rgba(245, 246, 250, 1);
          border: 1px solid rgba(232, 232, 232, 1);
          opacity: 1;
          .choose {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 34px;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
          .save-btn {
            margin-left: 60%;
            background: rgba(41, 158, 249, 1);
            opacity: 1;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 20px;
            color: rgba(255, 255, 255, 1);
          }
          .clear-btn {
            margin-left: 30px;
            background: rgba(255, 255, 255, 1);
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            opacity: 1;
          }
        }
      }
      .info-table-part3-2 {
        width: 100%;
        height: 530px;
        display: flex;
        box-sizing: border-box;
        border: 1px solid rgba(232, 232, 232, 1);
        .info-table-part3-2-left {
          box-sizing: border-box;
          border: 1px solid rgba(221, 221, 221, 1);
          width: 30%;
          height: 100%;
          padding: 10px 10px 10px 10px;
          overflow-y: auto;
        }
        .info-table-part3-2-right {
          padding: 10px 10px 10px 10px;
          box-sizing: border-box;
          border: 1px solid rgba(221, 221, 221, 1);
          width: 70%;
          height: 100%;
          padding: 10px 30px 10px 30px;
          overflow-y: auto;
          .info-table-part3-2-right-item {
            .info-table-part3-2-right-item-isShow {
              margin-top: 5px;
              width: 100%;
              height: 90px;
              overflow-y: auto;
              position: relative;
              border-bottom: 1px solid rgba(221, 221, 221, 1);
              .info-table-part3-2-right-item-price {
                position: absolute;
                top: 2px;
                font-size: 16px;
                right: 2px;
                color: #ff8a00;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    width: 65%;
    height: 70px;
    background: rgba(245, 246, 250, 1);
    opacity: 1;
    display: flex;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
    .footer-part1 {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .footer-part2 {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 41px;
      color: rgba(253, 114, 55, 1);
      opacity: 1;
      margin-left: 80px;
    }
    .footer-part3 {
      width: 98px;
      height: 29px;
      background: rgba(253, 114, 55, 1);
      opacity: 1;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 20px;
      color: rgba(255, 255, 255, 1);
      margin-left: 50%;
    }
  }
}
</style>