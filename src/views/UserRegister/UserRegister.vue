<template>
  <div class="register">
    <div class="register-logo">
      <img class="register-logo-img" src="../../bannerAndIcon/login-logo2.png" />
    </div>
    <div class="register-content">
      <div class="register-content-title">手机号注册</div>
      <div class="register-content-tip1">
        <span>已有账号？</span>&nbsp;&nbsp;
        <span style="color:rgba(255,106,7,1);cursor:pointer;" @click="goLogin">登录</span>
      </div>
      <div class="register-content-phone">
        <a-select defaultValue="lucy" class="register-content-phone-part1">
          <a-select-option value="jack">+86</a-select-option>
          <a-select-option value="lucy">+99</a-select-option>
        </a-select>
        <a-input placeholder="请输入机号" class="register-content-phone-part2" v-model="phoneNumber"></a-input>
      </div>
      <div class="register-content-vcode">
        <a-input
          placeholder="请输入验证码"
          style="width:40%;"
          class="register-content-vcode-part1"
          v-model="verificationCode"
        ></a-input>
        <a-button
          style="width:55%;"
          class="register-content-vcode-part2"
          @click="sendVerificationCode"
        >
          <span v-show="isShow">发送验证码</span>
          <span v-show="!isShow">{{count}}s</span>
        </a-button>
      </div>
      <!-- <div class='register-content-password'>
        <a-input style='width：100%;' placeholder='设置密码'></a-input>
        <a-icon type="eye" class="register-content-password-icon" />
      </div>-->
      <div class="register-content-to">
        <a-button class="register-content-to-button" @click="ImmediateRegistration()">立即注册</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {SendSmsCode} from '../../api/api'
// import axios from 'axios'
// import qs from 'qs'
const TIME_COUNT = 60; //更改倒计时时间
import { setStorage } from "../../mixin/storage";
export default {
  name: "TrademarkRegister",
  data() {
    return {
      phoneNumber: "", //手机号码
      verificationCode: "", //验证码
      isShow: true, //验证码倒计时
      timer: null, //倒计时
      count: "" //初始化次数
    };
  },
  methods: {
    goLogin() {
      //去登录
      this.$router.push({ path: "/login" });
    },
    sendVerificationCode() {
      //发送验证码
      const phoneNumber = this.phoneNumber;
      const url = "/api/trademark/sms/sendSmsCode";
      let params = {
        phone: phoneNumber,
        type: 1
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
    },
    ImmediateRegistration() {
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
              that.$message.info("注册成功");
              that.$store.commit("updataAssessToken", res.data.data.token);
              that.$store.commit("updataUserName", res.data.data.userName);
              that.$store.commit("updataUserId", res.data.data.userId);
              setStorage("AssessToken", res.data.data.token);
              setStorage("UserName", res.data.data.userName);
              setStorage("UserId", res.data.data.userId);
              setTimeout(() => {
                that.$router.push({ path: "/login" });
              }, 1500);
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
.register {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../../bannerAndIcon/register-bg.png") no-repeat center;
  background-size: cover;
}
.register-logo {
  width: 440px;
  height: 87px;
  margin: 120px auto 0px;
}
.register-logo-img {
  width: 100%;
  height: 100%;
}
.register-content {
  padding-top: 1px;
  width: 30%;
  border-radius: 10px;
  /* margin:30px,7.5%,0px,48.5%; */
  margin-top: 80px;
  margin-left: 48.5%;
  min-width: 650px;
  height: 350px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.register-content-title {
  margin-top: 45px;
  margin-left: 7%;
  height: 5%;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 22px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.register-content-tip1 {
  margin-top: 15px;
  margin-left: 7%;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 22px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.register-content-phone,
.register-content-vcode {
  margin-top: 15px;
  margin-left: 7%;
  margin-right: 8%;
  height: 50px;
  display: flex;
  justify-content: space-between;
}
.register-content-phone-part1 {
  width: 35%;
}
.register-content-phone-part2 {
  width: 60%;
}
.register-content-vcode-part2 {
  border: 2px solid rgba(51, 51, 51, 1);
}
.register-content-password {
  margin-top: 15px;
  margin-left: 7%;
  margin-right: 8%;
  height: 50px;
  line-height: 50px;
  position: relative;
}
.register-content-password-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
  top: 16px;
}
.register-content-to {
  margin-top: 15px;
  margin-left: 7%;
  margin-right: 8%;
  height: 50px;
  line-height: 50px;
}
.register-content-to-button {
  width: 100%;
  background: rgba(255, 90, 96, 1);
  opacity: 1;
  color: #ffffff;
}
</style>