
<template>
  <div class="person">
    <div class="title">个人设置</div>
    <div class="person-content">
      <div class="person-content-left">
        <div class="left1">
          <span class="left1-1">个人资料</span>
          <span class="left1-2">完善信息有助于万标网进一步了解您,给您更多推荐</span>
        </div>
        <a-form :form="form" style="margin-top:15px;">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="用户名称"
          >
            <a-input
              disabled
              v-decorator="[
          'username',
          {rules: [{ required: false }]}
        ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="真实姓名"
          >
            <a-input
              v-decorator="[
          'realname',
          {rules: [{ required: false}]}
        ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="性别"
          >
            <a-radio-group v-decorator="['sex']">
              <a-radio value="1">男</a-radio>
              <a-radio value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="出生日期"
          >
            <a-input style="width:100%;" v-decorator="['birthday']" placeholder="例：2000-01-01" />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="手机号码"
          >
            <a-input
              v-decorator="[
          'mobile',
          {rules: [{ required: false }]}
        ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="联系QQ"
          >
            <a-input
              v-decorator="[
          'qqnumber',
          {rules: [{ required: false}]}
        ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="微信号码"
          >
            <a-input
              v-decorator="[
          'wechat',
          {rules: [{ required: false }]}
        ]"
            />
          </a-form-item>
        </a-form>
      </div>
      <div class="person-content-right">
        <div class="right1">
          <span class="right1-1">修改头像</span>
          <span class="right1-2">仅支持JPG,JPEG,PNG图片文件，且图片大小小于2M</span>
        </div>
        <div class="right-header">
          <div class="upload-pic" v-if="isChangeHeader">
            <upload-pic :type="'修改个人头像'" @getImageUrl5="getHeaderUrl" />
          </div>
          <img :src="headerImgUrl" v-if="!isChangeHeader" />
        </div>
        <div class="right-button">
          <div class="button1" @click="handleSave">保存</div>
          <div class="button2" @click="cancel">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 }
};
import UploadPic from "../components/UploadPic";
import { getStorage, setStorage } from "../mixin/storage";
export default {
  name: "PersonalSetting",
  components: {
    UploadPic
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout,
      isChangeHeader: true,
      headerImgUrl: "" //头像地址
    };
  },
  mounted() {
    const userName = getStorage("UserName");
    console.log(userName);
    this.form.setFieldsValue({ ["username"]: userName });
    this.getOriginData();
  },
  methods: {
    getHeaderUrl(imgUrl) {
      console.log(imgUrl);
      this.headerImgUrl = imgUrl;
      this.isChangeHeader = false;
    },
    getOriginData() {
      const accessToken = getStorage("AccessToken");
      const headers = {
        accessToken: accessToken
      };
      const url = "/api/trademark/user/queryUser";
      this.$axios({
        method: "get",
        url: url,
        headers: headers
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.form.setFieldsValue({ ["realname"]: res.data.data.realName });
          this.form.setFieldsValue({ ["sex"]: res.data.data.userSex.toString() });
          this.form.setFieldsValue({ ["qqnumber"]: res.data.data.qqAccount });
          this.form.setFieldsValue({ ["wechat"]: res.data.data.wxAccount });
          this.form.setFieldsValue({ ["mobile"]: res.data.data.phone });
          this.form.setFieldsValue({ ["birthday"]: res.data.data.birthday });
          setStorage("headerImg", res.data.data.headImage);
        }
      });
    },
    handleSave() {
      console.log(this.form.getFieldsValue());
      const values = this.form.getFieldsValue();
      const accessToken = getStorage("AccessToken");
      const url = "/api/trademark/user/updateUser";
      const headers = {
        accessToken: accessToken
      };
      const params = {
        realName: values.realname,
        userSex: values.sex,
        qqAcount: values.qqnumber,
        wxAccount: values.wechat,
        birthday: values.birthday,
        headImage: this.headerImgUrl
      };
      this.$axios({
        method: "post",
        url: url,
        data: params,
        headers: headers
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.$message.success("保存成功,请重新进入个人中心");
        }
      });
    },
    cancel() {
      this.form.resetFields([
        "realname",
        "sex",
        "qqnumber",
        "wechat",
        "birthday",
        "mobile"
      ]);
      this.isChangeHeader = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.person {
  width: 100%;
  .title {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fd7237;
    font-weight: bold;
    font-family: Source Han Sans CN;
    background-color: #fffeff;
  }
  .person-content {
    width: 100%;
    padding: 15px 15px 15px 15px;
    display: flex;
    background-color: #fffeff;
    justify-content: space-around;
    .person-content-left {
      width: 50%;
      height: 500px;
      // border: 1px solid black;
      .left1 {
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        .left1-1 {
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
        .left1-2 {
          margin-left: 30px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          opacity: 1;
        }
      }
    }
    .person-content-right {
      width: 50%;
      height: 500px;
      // padding-top: 1px;
      // border: 1px solid black;
      .right1 {
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        .right1-1 {
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
        .right1-2 {
          margin-left: 30px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          opacity: 1;
        }
      }
      .right-header {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin: 80px auto 0px;
        border: 1px solid black;
        .upload-pic {
          width: 135px;
          height: 95px;
          margin-top: 27px;
          margin-left: 25px;
        }
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .right-button {
        width: 240px;
        height: 40px;
        line-height: 40px;
        //  border:1px solid black;
        margin: 20px auto 0px;
        display: flex;
        justify-content: space-between;
        .button1 {
          width: 100px;
          cursor: pointer;
          height: 40px;
          color: #fffeff;
          border: 1px solid #ff5961;
          background-color: #ff5961;
          line-height: 40px;
          text-align: center;
        }
        .button2 {
          width: 100px;
          height: 40px;
          cursor: pointer;
          text-align: center;
          line-height: 40px;
          border: 1px solid rgba(153, 153, 153, 1);
          background-color: #fffeff;
        }
      }
    }
  }
}
</style>



 