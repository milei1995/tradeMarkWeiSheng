<template>
  <div class="expert">
    <div class="expert-part1">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="需要服务" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="联系方式" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <div class="contentType">
            <a-input></a-input>
            <a-button>获取验证码</a-button>
          </div>
        </a-form-item>
        <a-form-item label="验证码" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <a-input></a-input>
          <div class="tips">在您提交商标申请咨询单后，工作日期间专业顾问会在1小时内与您联系，非工作日时间会在下一个工作日与您取得联系。</div>
          <div class="tips">万尚会保护您的商标及个人信息，仅有指定的服务商能看到您的商标及联系方式，请您放心提供。</div>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
          <a-button html-type="submit" class="modal-btn">确定</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="expert-part2">
      <img src="../../assets/common-problem-bg.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpertApplication",
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
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
    min-width: 868px;
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
    min-width: 868px;
    height: 455px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>