<template>
  <div class="expert">
    <div class="expert-part1">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="需要服务" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <a-input v-decorator="[ 'needs', validatorRules.needs]"></a-input>
        </a-form-item>
        <a-form-item label="联系方式" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <div class="contentType">
            <a-input v-decorator="[ 'phoneNumber', validatorRules.phoneNumber]"></a-input>
            <a-button @click="getVerificationCode">
              <span v-show="isShow">发送验证码</span>
              <span v-show="!isShow">{{count}}s</span>
            </a-button>
          </div>
        </a-form-item>
        <a-form-item label="验证码" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <a-input v-decorator="[ 'verificationCode', validatorRules.verificationCode]"></a-input>
          <div class="tips">在您提交商标申请咨询单后，工作日期间专业顾问会在1小时内与您联系，非工作日时间会在下一个工作日与您取得联系。</div>
          <div class="tips">万尚会保护您的商标及个人信息，仅有指定的服务商能看到您的商标及联系方式，请您放心提供。</div>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
          <a-button html-type="submit" class="modal-btn">确定</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="expert-part2">
      <div class="title">常见问题</div>
      <div class="title-des">聚集常见问答，为您解决商标困难</div>
      <div class="question-content">
        <div class="question1">
          <div class="question-title">1.什么是商标？什么是注册商标？</div>
          <div>
            商标是指任何能够将自然人、法人或者其他组织的商品/服务与他人的商品/服务区别开的标志，包括文字、图形、字母、数字、三维标志、颜色组合和声音等，以及上述要素的组合。
            注册商标是指经过商标主管机关依照法定程序及标准进行审查并通过，经《初步审定公告》无人提出异议的商标。
          </div>
        </div>
        <div class="question2">
          <div class="question-title">2.商标注册有风险吗？</div>
          <div>商标注册存在被商标局驳回导致申请失败的风险。申请驳回失败原因可能有：受可用文字、标识资源限制，新的商标申请容易与在先申请的商标产生近似；法律法规的相关限制等。据 不完全的统计，2017年我国商标申请的驳回率约50%，2018年我国商标申请的驳回率约40%。为提高商标注册成功率，申请人可在申请时提前做好应对准备。</div>
          <div>建议：</div>
          <div>(1) 若申请人不具有一定的专业能力，尽量选择有专业顾问指导的“专家辅助申请”和“担保注册申请”。</div>
          <div>(2)申请时将中文、英文、图形等分开申请，通过后可以组合使用,以避免因某一部分近似而被商标局整体驳回的情况，且分开申请可以根据场景灵活组合使用。</div>
          <div>(3) 准备备用方案，申请时可以在主要商标申请方案的基础上，增加一到两件备用商标，以便在主商标无法通过或全部通过的情况下，有其他可以使用的商标。</div>
        </div>
        <div class="question3">
          <div class="question-title">3.商标申请费用的标准？</div>
          <div>商标局规费收取标准为： 300元/类·件，即：1件商标在1个类别中申请10个（含10个）以内的商品。超过10个商品，每超过1个商品，每个商品加收30元。 即：在一个类别中指定15项商品，规费为：300+（15-10）×30=450元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage } from "../../mixin/storage";
const TIME_COUNT = 60; //更改倒计时时间
export default {
  name: "ExpertApplication",
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      isToken:false,
      validatorRules: {
        phoneNumber: {
          rules: [{ required: true, message: "请输入手机号!" }]
        },
        verificationCode: {
          rules: [{ required: true, message: "请输入验证码!" }]
        },
        needs: {
          rules: [{ required: true, message: "请填写您需要的服务" }]
        }
      },
      isShow: true, //验证码倒计时
      timer: null, //倒计时
      count: "" //初始化次数
    };
  },
  computed: {
  },
  mounted(){
    this.isOverdue()
  },
  methods: {
     isOverdue() {
      //token是否过期
      const accessToken = getStorage("AccessToken");
      const params = {
        accessToken: accessToken
      }
      this.$axios({
        method: "get",
        url: "/api/trademark/user/checkToken",
        params: params
      }).then(res => {
        console.log(res)
        if (res.data.success) {
           this.isToken= res.data.data.tokenType
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const accessToken = getStorage("AccessToken");
          if (accessToken) {
            if (this.isToken) {
              const url = "/api/trademark/applyNeeds/addApplyNeeds";
              const headers = {
                accessToken: accessToken
              };
              const params = {
                applyType: "1",
                phone: values.phoneNumber,
                remark: values.needs,
                smsCode: values.verificationCode
              };
              this.$axios({
                method: "post",
                url: url,
                headers: headers,
                data: params
              })
                .then(res => {
                  console.log(res);
                  if (res.data.success) {
                    this.$message.info("提交成功");
                  } else {
                    this.$message.error(res.data.msg);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }else{
                this.$message.error("当前用户已过期，请重新登录");
                      setTimeout(() => {
                        this.$router.push({ path: "/login" });
                      }, 2000);
            }
          } else {
            this.$message.error("请先登录");
          }
        }
      });
    },
    getVerificationCode() {
      const phoneNumber = this.form.getFieldValue(["phoneNumber"]).oneNumber;
      console.log(phoneNumber);
      var re = /^1\d{10}$/; //验证手机号
      const url = "/api/trademark/sms/sendSmsCode";
      let params = {
        phone: phoneNumber,
        type: 1
      };
      let JsonParams = JSON.stringify(params);
      console.log(JsonParams);
      if (re.test(phoneNumber)) {
        this.$axios({
          method: "post",
          url: url,
          data: JsonParams
        })
          .then(res => {
            console.log(res);
            if (!this.timer && res.data.success) {
              this.count = TIME_COUNT;
              this.isShow = false;
              this.$message.warning("若验证码有误，请60秒后重新获取");
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.isShow = true;
                  clearInterval(this.timer); //清除定时器
                  this.timer = null;
                }
              }, 1000);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message.warning("手机号不正确");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.expert {
  width: 100%;
  min-width: 1400px;
  padding: 20px 19% 20px 19%;
  background: rgba(243, 243, 243, 1);
  opacity: 1;
  .expert-part1 {
    width: 100%;
    min-width: 1000px;
    height: 455px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(235, 235, 235, 1);
    opacity: 1;
    .ant-form {
      margin-top: 50px;
      .ant-form-item {
        .contentType {
          display: flex;
          .ant-btn {
            background: rgba(235, 236, 236, 1);
            border: 1px solid rgba(232, 232, 232, 1);
            opacity: 1;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
        .tips {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(102, 102, 102, 1);
          opacity: 1;
        }
        .modal-btn {
          width: 61px;
          height: 30px;
          background: rgba(253, 114, 55, 1);
          opacity: 1;
          border-radius: 5px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .expert-part2 {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    min-width: 1000px;
    height: 455px;
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      margin-top: 20px;
      font-size: 28px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 48px;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
    }
    .title-des {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .question-content {
      width: 100%;
      height: 450px;
      padding: 10px 20px 10px 20px;
      text-align: left;
      .question1 {
        .question-title {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bolder;
          line-height: 27px;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
      }
      .question2,
      .question3 {
        margin-top: 10px;
        .question-title {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bolder;
          line-height: 27px;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
      }
    }
  }
}
</style>