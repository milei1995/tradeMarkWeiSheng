<template>
  <div class="login">
    <div class="login-logo">
      <img class="login-logo-img" src="../../bannerAndIcon/login-logo2.png" />
    </div>
    <div class="login-content">
      <div class="login-content-title">账号登录</div>
      <a-input class="login-content-user" v-model="phoneNumber" placeholder="请输入手机号"></a-input>
      <a-icon type="user" class="login-content-user-icon" />
      <a-input class="login-content-possword" placeholder="请输入验证码" v-model="verificationCode"></a-input>
      <!-- <div><a-button>发送验证码</a-button></div> -->
      <a-icon type="lock" class="login-content-possword-icon" />
      <div class="login-content-tip">
        <a-button @click="sendVerificationCode">
          <span v-show="isShow">发送验证码</span>
          <span v-show="!isShow">{{count}}s</span>
        </a-button>
      </div>
      <a-button class="login-button" @click="toHome">登录</a-button>
      <div class="toregister" @click="toUserRegister">立即免费注册>>></div>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 60; //更改倒计时时间
import { setStorage } from "../../mixin/storage";
export default {
  name: "login",
  data() {
    return {
      phoneNumber: "", //手机号
      verificationCode: "", //验证码
      isShow: true, //验证码倒计时
      timer: null, //倒计时
      count: "" //初始化次数
    };
  },
  methods: {
    toUserRegister() {
      this.$router.push({ path: "/userRegister" });
    },
    toHome() {
      const that = this;
      const phoneNumber = this.phoneNumber;
      const verificationCode = this.verificationCode;
      const url = "/api/trademark/user/login";
      let params = {
        phone: phoneNumber,
        smsCode: verificationCode
      };
      let JsonParams = JSON.stringify(params);
      if (phoneNumber) {
        this.$axios({
          method: "post",
          url: url,
          data: JsonParams
        })
          .then(res => {
            console.log(res);
            if (res.data.success) {
              that.$message.info("登录成功");
              that.$store.commit("updataAccessToken", res.data.token);
              that.$store.commit("updataUserName", res.data.userName);
              that.$store.commit("updataUserId", res.data.userId);
              setStorage("AccessToken", res.data.data.token);
              setStorage("UserName", res.data.data.userName);
              setStorage("UserId", res.data.data.userId);
              setTimeout(() => {
                that.$router.push({ path: "/home" });
              }, 1500);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    sendVerificationCode() {
      //发送验证码
      const phoneNumber = this.phoneNumber;
      const url = "/api/trademark/sms/sendSmsCode";
      let params = {
        phone: phoneNumber,
        type: 2
      };
      let JsonParams = JSON.stringify(params);
      console.log(JsonParams);
      if (phoneNumber) {
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
      }
    }
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../../bannerAndIcon/login-bg.png") no-repeat center;
  background-size: cover;
}
.login-logo {
  width: 440px;
  height: 87px;
  margin: 120px auto 0px;
}
.login-logo-img {
  width: 100%;
  height: 100%;
}
.login-content {
  padding-top: 1px;
  width: 44%;
  min-width: 650px;
  height: 450px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 10px;
  margin: 30px auto 0px;
  position: relative;
}
.login-content-title {
  margin-top: 45px;
  margin-left: 18%;
  width: 15%;
  height: 5%;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 22px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.login-content-user {
  width: 64%;
  height: 65px;
  line-height: 65px;
  margin-top: 30px;
  margin-left: 18%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(153, 153, 153, 1);
  opacity: 1;
  text-align: center;
  font-size: 30px;
}
.login-content-user-icon {
  font-size: 30px;
  position: absolute;
  left: 20%;
  top: 115px;
}
.login-content-possword {
  width: 64%;
  height: 65px;
  line-height: 65px;
  margin-top: 30px;
  margin-left: 18%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(153, 153, 153, 1);
  opacity: 1;
  text-align: center;
  font-size: 30px;
}
.login-content-possword-icon {
  font-size: 30px;
  position: absolute;
  left: 20%;
  top: 211px;
}
.login-content-tip {
  margin-left: 18%;
  margin-top: 20px;
  width: 13%;
  height: 30px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 22px;
  color: rgba(153, 153, 153, 1);
  opacity: 1;
}
.login-button {
  width: 64%;
  height: 45px;
  line-height: 45px;
  background: rgba(255, 90, 96, 1);
  opacity: 1;
  margin-left: 18%;
  margin-top: 20px;
  color: #ffffff;
  font-size: 22px;
}
.toregister {
  width: 20%;
  height: 14px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 145, 72, 1);
  opacity: 1;
  margin: 20px auto 0px;
}
</style>