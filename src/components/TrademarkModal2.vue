<template>
  <div class="modal1">
    <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="确定" cancelText="取消">
      <div class="modal-content">
        <div class="modal-title">商标咨询</div>
        <div class="modal-des">填写您的联系方式，即可掌握心仪商标价格！</div>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="商标" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="tradeMarkName">
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
            <a-button html-type="submit" class="modal-btn">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getStorage } from "../mixin/storage";
export default {
  name: "TrademarkModal2",
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      isToken:false,
      form: this.$form.createForm(this)
    };
  },
  props: ["tradeMarkName", "tradeMarkRegNo","applyTypeNumber"],
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
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.handleSubmit();
    },
    handleCancel() {
      this.visible = false;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const phone = values.mobile;
          const userName = values.user;
          const applyType = this.applyTypeNumber; // 3商标咨询 4//精选商标
          const regNo = this.tradeMarkRegNo;
          const params = {
            phone: phone,
            userName: userName,
            applyType: applyType,
            regNo: regNo
          };

          const url = "/api/trademark/applyNeeds/addApplyNeeds";
          const accessToken = getStorage("AccessToken");
          const headers = {
            accessToken: accessToken
          };
          const re = /^1\d{10}$/; //验证手机号
          if (this.isToken) {
            if (re.test(phone)) {
              this.$axios({
                method: "post",
                url: url,
                data: params,
                headers: headers
              })
                .then(res => {
                  console.log(res);
                  if (res.data.success) {
                    this.$message.success("提交成功");
                    this.visible = false;
                    this.$emit("toNextModal");
                  } else {
                    if (res.data.code === "10004") {
                      this.$message.error("当前用户已过期，请重新登录");
                      setTimeout(() => {
                        this.$router.push({ path: "/login" });
                      }, 2000);
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$message.error("手机号格式错误");
            }
          }else{
            this.$message.error("当前用户已过期，请重新登录")
             setTimeout(() => {
                        this.$router.push({ path: "/login" });
                      }, 2000);
          }
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
    width: 120px;
    text-align: center;
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
      width: 200px;
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