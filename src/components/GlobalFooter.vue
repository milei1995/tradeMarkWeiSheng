<template>
  <div v-if="isShow" class="globalFooter">
    <div class="globalFooter-part1">
      <img src="../bannerAndIcon/global-logo.png" class="globalFooter-part1-img" />
    </div>
    <div class="globalFooter-part2">
      <div class="globalFooter-part2-info" v-for="(item,index) in footerInfo" :key="index">
        <a-icon :type="item.type" />
        <span>{{item.title}}:</span>
        <span>{{item.value}}</span>
      </div>
       <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33048302000453" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin-top:5px;">
         <img src="../bannerAndIcon/guohui.png" style="float:left;"/>
       <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#FFFFFF;">浙公网安备 33048302000453号</p >
      </a>
    </div>
   
    <div class="globalFooter-part3">
      <div class="globalFooter-part3-tip">添加微信</div>
      <div class="globalFooter-part3-wx">
        <img src="http://wssbw-images.oss-cn-hangzhou.aliyuncs.com/trademark/web/3bd70d2c-e714-43f3-a88c-86ff0f552115.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalFooter",
  data() {
    return {
      footerInfo: [
        { title: "联系电话", value: "18957355193", icon: "mobile" },
        { title: "邮箱地址", value: "jxws518@163.com", icon: "mail" },
        {
          title: "公司地址",
          value: "浙江省海宁市马桥经编园区8路11号",
          icon: "address"
        },
        { title: "技术支持", value: "嘉兴微胜科技有限公司", icon: "desktop" }
      ],
      isShow: true
    };
  },
  watch: {
    $route(to, from) {
      console.log(from);
      if (
        to.name === "login" ||
        to.name === "userRegister" ||
        to.name === "writeTrademarkInfo" ||
        to.name === "chooseApplicant" ||
        to.name === "payOrder" ||
        to.name === "commitTrademark" 
        // to.name === "personalSetting" ||
        // to.name === "myOrder"
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },
  mounted(){
    // const currentRoute=this.$router.path
    //  console.log(currentRoute)
    //  if(currentRoute==undefined){
    //    this.isShow=false
    //  }
  }
};
</script>
 
<style scoped>
.globalFooter {
  padding: 1px;
  width: 100%;
  min-width: 1400px;
  height: 183px;
  background-color: rgba(58, 58, 58, 1);
  opacity: 1;
  display: flex;
}
.globalFooter-part1 {
  width: 237px;
  height: 59px;
  margin-left: 22%;
  margin-top: 38px;
}
.globalFooter-part1-img {
  width: 100%;
  height: 1005；;
}
.globalFooter-part2 {
  width: 20%;
  height: 133px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  padding-top: 25px;
  margin-left: 13%;
}
.globalFooter-part2-info {
  margin-top: 5px;
}
.globalFooter-part3 {
  width: 100px;
  height: 130px;
  margin-top: 20px;
  margin-left: 12%;
}
.globalFooter-part3-tip {
  width: 100px;
  height: 20px;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.globalFooter-part3-wx {
  margin-top: 8px;
  width: 100px;
  height: 100px;
}
.globalFooter-part3-wx img {
  width: 100%;
  height: 100%;
}
</style>