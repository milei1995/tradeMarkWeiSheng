<template>
  <div class="modal1">
    <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="确定" cancelText="取消">
      <div class="modal-content">
        <div class="modal-title">商标咨询</div>
        <div class="modal-des">填写您的联系方式，即可掌握心仪商标价格！</div>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="商标" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
          'trademark',
          {rules: [{ required: false, message: '请输入您要咨询的商标!' }]}
        ]"
            >
              <a-icon slot="prefix" type="trademark" />
            </a-input>
          </a-form-item>
          <a-form-item label="手机" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请输入您的手机号"
              v-decorator="[
          'mobile',
          {rules: [{ required:true, message: '请输入您的手机号!' }]}
        ]"
            >
              <a-icon slot="prefix" type="mobile" />
            </a-input>
          </a-form-item>
          <a-form-item label="昵称" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请填写您的昵称"
              v-decorator="[
          'user',
          {rules: [{ required:true, message: '请填写您的昵称!' }]}
        ]"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
            <a-button html-type="submit" class="modal-btn">Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "TrademarkModal2",
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
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
.modal-content {
  .modal-title {
    margin-left: 40%;
    width: 72px;
    height: 18px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 31px;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  .modal-des {
    margin-top: 10px;
    width: 280px;
    margin-left: 20%;
    height: 14px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 24px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }
  .ant-form {
    margin-top: 10px;
    .modal-btn {
     width:100%;
      height: 40px;
      background: rgba(253, 114, 55, 1);
      opacity: 1;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>