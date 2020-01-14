<template>
  <div class="register">
    <div class="register-logo">
      <img class="register-logo-img" src="../../bannerAndIcon/login-logo2.png" />
    </div>
    <div class="register-content">
      <div class="register-content-title" >手机号注册</div>
      <div class="register-content-tip1">
        <span>已有账号？</span>&nbsp;&nbsp;
        <span style="color:rgba(255,106,7,1);cursor:pointer;" @click='goLogin'>登录</span>
      </div>
      <div class="register-content-phone">
        <a-select defaultValue="lucy" class='register-content-phone-part1'>
          <a-select-option value="jack">+86</a-select-option>
          <a-select-option value="lucy">+99</a-select-option>
        </a-select>
        <a-input placeholder="请输入机号" class='register-content-phone-part2' v-model='phoneNumber'></a-input>
      </div>
      <div class='register-content-vcode'>
        <a-input placeholder="请输入验证码" style='width:40%;' class='register-content-vcode-part1'></a-input>
        <a-button  style='width:55%;' class='register-content-vcode-part2' @click="sendVerificationCode" >发送验证码</a-button>
      </div>
      <div class='register-content-password'>
        <a-input style='width：100%;' placeholder='设置密码'></a-input>
        <a-icon type="eye" class="register-content-password-icon" />
      </div>
      <div class='register-content-to'>
        <a-button class='register-content-to-button'>立即注册</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {SendSmsCode} from '../../api/api'
// import axios from 'axios'
export default {
  name: "TrademarkRegister",
  data(){
    return{
       phoneNumber:''
    }
  },
  methods:{
    goLogin(){//去登录
      this.$router.push({path:"/login"})
    },
    sendVerificationCode(){//发送验证码
      const phoneNumber=this.phoneNumber
      const url= "api/trademark/sms/sendSmsCode"
      let params={
          phone:phoneNumber,
          type:2
      }
      let JsonParams=JSON.stringify(params)
      console.log(JsonParams)
      if(phoneNumber){
         this.$axios({
           methods:'post',
           url:url,
           data:JsonParams
         }).then(res=>{
           console.log(res)
         }).catch(error=>{
           console.log(error)
         })
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
  width: 44%;
  border-radius: 10px;
  /* margin:30px,7.5%,0px,48.5%; */
  margin-top: 30px;
  margin-left: 48.5%;
  min-width: 650px;
  height: 510px;
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
.register-content-phone,.register-content-vcode{
  margin-top: 15px;
  margin-left: 7%;
  margin-right: 8%;
  height: 50px;
  display: flex;
  justify-content: space-between;
}
.register-content-phone-part1{
  width:35%;
}
.register-content-phone-part2{
 width:60%;
}
.register-content-vcode-part2{
  border:2px solid rgba(51,51,51,1);
}
.register-content-password{
   margin-top: 15px;
  margin-left: 7%;
  margin-right: 8%;
  height: 50px;
  line-height:50px;
  position:relative;
}
.register-content-password-icon{
  position: absolute;
  right:20px;
  font-size:20px;
  top:16px;
}
.register-content-to{
  margin-top: 15px;
  margin-left: 7%;
  margin-right: 8%;
  height: 50px;
  line-height:50px;
}
.register-content-to-button{
  width:100%;
 background:rgba(255,90,96,1);
 opacity:1;
 color:#ffffff;
}
</style>