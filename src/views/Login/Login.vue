<template>
  <div class="login">
    <div class="login-logo">
      <img class="login-logo-img" src="../../bannerAndIcon/login-logo2.png" />
    </div>
    <div class="login-content">
      <div class="login-content-title">账号登录</div>
      <a-input class="login-content-user" placeholder="请输入用户名或手机号"></a-input>
      <a-icon type="user" class="login-content-user-icon" />
      <a-input class="login-content-possword" placeholder="请输入密码"></a-input>
      <a-icon type="lock" class="login-content-possword-icon" />
      <div class="login-content-tip">忘记密码？</div>
      <a-button class='login-button'>登录</a-button>
      <div class='toregister'>立即免费注册>>></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
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
  height: 510px;
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
  margin-left:18%;
  margin-top:20px;
  width: 13%;
  height: 14px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 22px;
  color: rgba(153, 153, 153, 1);
  opacity: 1;
}
.login-button{
width:64%;
height:45px;
line-height:45px;
background:rgba(255,90,96,1);
opacity:1;
margin-left: 18%;
margin-top:20px;
color:#ffffff;
font-size:22px;
}
.toregister{
width:20%;
height:14px;
font-size:14px;
font-family:Source Han Sans CN;
font-weight:400;
line-height:22px;
color:rgba(255,145,72,1);
opacity:1;
margin:20px auto 0px;
}
</style>