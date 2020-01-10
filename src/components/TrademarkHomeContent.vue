<template>
  <div class="content">
    <div class="content-1">
      <div class="content-1-item1" @click='toTrademarkCategory()'>
        <div class="content-1-item-1" style="font-size:20px;margin-top:40px;margin-left:50px;">商标交易</div>
        <div
          class="content-1-item-2"
          style="font-size:14px;margin-top:35px;margin-left:50px;"
        >快速购买已注商标</div>
        <div class="content-1-item-3" style="font-size:14px;margin-top:20px;margin-left:50px;">安全有保障</div>
      </div>
      <div class="content-1-item2">
        <div class="content-1-item-1" style="font-size:20px;margin-top:40px;margin-left:50px;">商标注册</div>
        <div
          class="content-1-item-2"
          style="font-size:14px;margin-top:35px;margin-left:50px;"
        >快速网上申报</div>
        <div class="content-1-item-3" style="font-size:14px;margin-top:20px;margin-left:50px;">全流程掌控</div>
      </div>
      <div class="content-1-item3">
        <div class="content-1-item-1" style="font-size:20px;margin-top:40px;margin-left:50px;">专家申请</div>
        <div
          class="content-1-item-2"
          style="font-size:14px;margin-top:35px;margin-left:50px;"
        >专家全流程服务</div>
        <div class="content-1-item-3" style="font-size:14px;margin-top:20px;margin-left:50px;">全方位保护</div>
      </div>
    </div>
    <div class="content-2">
      <div class="content-2-title">
        <div class="content-2-title1">商标转让</div>
        <div class="content-2-title2">专业商标转让网，服务优价更优</div>
      </div>
      <div class="content-2-list">
        <div class="content-2-list-item" v-for="(item,index) in contentList" :key="index">
          <div class="content-2-list-item-1">{{item.title}}</div>
          <div class="content-2-list-item-2">{{item.content}}</div>
          <div class="content-2-list-item-3">{{item.code}}</div>
          <a-button class="content-2-list-button">查看商标</a-button>
        </div>
      </div>
    </div>
    <div class="content-3">
      <div class="content-3-item" v-for="(item,index) in iconList" :key="index">
        <img class="content-3-item-icon" :src="item.src" />
        <div class="content-3-item-text">
          <div class="content-3-item-text-1">{{item.des1}}</div>
          <div class="content-3-item-text-2">{{item.des2}}</div>
          <div class="content-3-item-text-3">{{item.des3}}</div>
        </div>
      </div>
    </div>
    <div class="content-4">
       <div class='content-4-title'>商标注册流程</div>
       <div class='content-4-des'>专业商标转让网，服务优价更优</div>
       <div class='content-4-step'>
           <div class='content-4-step-item'>
               <div class='content-4-step-item-des1'>检索评估</div>
               <div class='content-4-step-item-des2'>专家一对一评估分析</div>
               <div class='content-4-step-item-des3'>制定全面保护方案</div>
           </div>
           <div class='content-4-step-item-icon'>
              <img class='content-4-step-item-icon-pic' src='../bannerAndIcon/sept-to.png'> 
           </div>
            <div class='content-4-step-item'>
               <div class='content-4-step-item-des1'>核准材料</div>
               <div class='content-4-step-item-des2'>专家审取、校对</div>
               <div class='content-4-step-item-des3'>确定申报材料</div>
           </div>
           <div class='content-4-step-item-icon'>
              <img class='content-4-step-item-icon-pic' src='../bannerAndIcon/sept-to.png'> 
           </div>
            <div class='content-4-step-item'>
               <div class='content-4-step-item-des1'>递交商标局</div>
               <div class='content-4-step-item-des2'>专家一对一评估分析</div>
               <div class='content-4-step-item-des3'>制定全面保护方案</div>
           </div>
           <div class='content-4-step-item-icon'>
              <img class='content-4-step-item-icon-pic' src='../bannerAndIcon/sept-to.png'> 
           </div>
            <div class='content-4-step-item'>
               <div class='content-4-step-item-des1'>获得证书</div>
               <div class='content-4-step-item-des2'>国家商标局核发证书</div>
               <div class='content-4-step-item-des3'>免费持续售后服务</div>
           </div>
       </div>
       
    </div>
  </div>
</template>

<script>
export default {
  name: "TrademarkHomeContent",
  data() {
    return {
      contentList: [
        { title: "服装鞋帽", content: "男装 女装 童装 内衣", code: "25" },
        { title: "日化用品", content: "儿童洗护 化妆品 洗衣液", code: "03" },
        { title: "医疗器械", content: "按摩器械 口罩 医疗器械", code: "10" },
        { title: "食品商标", content: "大米 茶叶 咖啡 面包", code: "30" },
        { title: "餐饮住宿", content: "酒店旅游 咖啡馆 快餐馆", code: "30" }
      ],
      iconList: [
        {
          src: require("../bannerAndIcon/content3-icon1.png"),
          des1: "快速响应",
          des2: "专业顾问",
          des3: "快速响应随时沟通"
        },
        {
          src: require("../bannerAndIcon/content3-icon2.png"),
          des1: "品质服务",
          des2: "服务贴心周到",
          des3: "提供一对一专属服务"
        },
        {
          src: require("../bannerAndIcon/content3-icon3.png"),
          des1: "快捷支付",
          des2: "提供线上支付",
          des3: "方便快捷更可靠"
        },
        {
          src: require("../bannerAndIcon/content3-icon4.png"),
          des1: "售后服务",
          des2: "强大售后团队",
          des3: "无后顾之忧"
        }
      ]
    };
  },
  methods: {
    toTrademarkCategory() {
      this.$router.push({ path: "/trademarkCategory" });
    }
  }
};
</script>

<style scope>
.content {
  width: 100%;
  min-width: 140px;
}
.content-1 {
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
}
.content-1-item1,
.content-1-item2,
.content-1-item3 {
  cursor:pointer;
  width: 25%;
  min-width: 330px;
  height: 250px;
  margin-left: 50px;
  background-size: cover;
  border-radius: 10px;
  margin-top: 50px;
  color: #ffffff;
}
.content-1-item1 {
  background: url("../bannerAndIcon/content1-item-bg1.png") no-repeat center;
}
.content-1-item2 {
  background: url("../bannerAndIcon/content1-item-bg2.png") no-repeat center;
}
.content-1-item3 {
  background: url("../bannerAndIcon/content1-item-bg3.png") no-repeat center;
}
.content-2 {
  padding: 1px;
  width: 100%;
  min-width: 1400px;
  height: 426px;
  background: rgba(236, 236, 236, 1);
  opacity: 1;
}
.content-2-title {
  margin-top: 31px;
  text-align: center;
}
.content-2-title1 {
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.content-2-title2 {
  height: 14px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  opacity: 1;
}
.content-2-list {
  width: 60%;
  min-width: 840px;
  margin: 20px auto 0px;
  display: flex;
}
.content-2-list-item {
  width: 17%;
  min-width: 143px;
  height: 272px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  margin-left: 47px;
  text-align: center;
}
.content-2-list-item-1 {
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  margin-top: 54px;
  color: rgba(53, 185, 236, 1);
  opacity: 1;
}
.content-2-list-item-2 {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin-top: 17px;
  color: rgba(102, 102, 102, 1);
  opacity: 1;
}
.content-2-list-item-3 {
  font-size: 36px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  margin-top: 17px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.content-2-list-button {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: rgba(108, 200, 232, 1);
  opacity: 1;
  border: 1px solid rgba(108, 200, 232, 1);
  border-radius: 5px;
}
.content-2-list-button:hover {
  cursor: pointer;
  background-color: rgba(41, 158, 249, 1);
  color: rgba(255, 255, 255, 1);
}
.content-3 {
  width: 100%;
  min-width: 1400px;
  height: 140px;
  display: flex;
  padding: 20px 25% 20px 25%;
}
.content-3-item {
  margin-top: 30px;
  display: flex;
  width: 25%;
  height: 80px;
  min-width: 175px;
}
.content-3-item-icon {
  height: 80px;
  width: 80px;
}
.content-3-item-text {
  margin-left: 15px;
}
.content-3-item-text-1 {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 31px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.content-4 {
  padding:1px;
  margin-top:20px;
  width: 100%;
  min-width: 1400px;
  height: 253px;
  background: url("../bannerAndIcon/sept-bg.png") no-repeat center;
  opacity: 0.5;
  background-size: cover;
}
.content-4-title,.content-4-des{
  text-align: center;
}
.content-4-title{
font-size:28px;
font-family:Source Han Sans CN;
font-weight:500;
color:rgba(255,255,255,1);
opacity:1;
margin-top:20px;
}
.content-4-des{
font-size:14px;
font-family:Source Han Sans CN;
font-weight:400;
color:rgba(255,255,255,1);
opacity:1;
}
.content-4-step{
  margin-left:20%;
  margin-right:20%;
  margin-top:20px;
  width:60%;
  min-width: 840px;
  display: flex;
  justify-content: space-around;
}
.content-4-step-item{
 margin-left:30px;
}
.content-4-step-item-des1{
 border:1px solid rgba(255,255,255,1);
opacity:1;
border-radius:5px;
font-size:16px;
font-family:Source Han Sans CN;
font-weight:400;
color:rgba(255,255,255,1);
text-align: center;
}
.content-4-step-item-des2,.content-4-step-item-des3{
width:126px;
font-size:14px;
font-family:Source Han Sans CN;
font-weight:400;
color:rgba(255,255,255,1);
opacity:1;
text-align: center;
}
.content-4-step-item-des2{
  margin-top:20px;
}
.content-4-step-item-des3{
  margin-top:10px;
}
.content-4-step-item-icon{
  margin-top:30px;
  width:40px;
  height:35px;
  margin-left:40px;
}
.content-4-step-item-icon-pic{
  width:100%;
  height:100%;
}
</style>