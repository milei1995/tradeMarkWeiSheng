<template>
  <div class="content">
    <div class="content-part1">商标注册申请</div>
    <div class="content-part2">
      <span class="content-part2-1">
        <a-icon type="check"></a-icon>一站式标准服务
      </span>
      <span class="content-part2-2" style="margin-left:40px;">
        <a-icon type="check"></a-icon>高效极速申报
      </span>
      <span class="content-part2-3" style="margin-left:40px;">
        <a-icon type="check"></a-icon>申请进度实时掌控
      </span>
    </div>
    <div class="content-part3">
      <div class="content-part3-1"  >
        <div class="content-part3-1-title">
          <img src="../assets/trademark-pic-1.svg" class="content-part3-1-img" />
         商标注册申请
        </div>
        <div class="content-part3-1-content">
          <div class="content-part3-1-content-1" style="margin-top:30px;">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />快速购买已注商标
          </div>
          <div class="content-part3-1-content-2">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />海量资源，明码标价
          </div>
          <div class="content-part3-1-content-3">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />官方自营，安全有保障
          </div>
          <a-divider />
          <div class="content-part3-1-content-4">
            <div class="content-part3-1-content-4-title">即买即用</div>
            <a-button class="content-part3-1-content-4-button" @click="toTrademarkCategory()">立即购买</a-button>
          </div>
        </div>   
      </div>
      <div class="content-part3-1"  >
        <div class="content-part3-1-title">
          <img src="../assets/trademark-pic-1.svg" class="content-part3-1-img" />
        自助注册申请
        </div>
        <div class="content-part3-1-content">
          <div class="content-part3-1-content-1" style="margin-top:30px;">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />便捷易用，简单高效
          </div>
          <div class="content-part3-1-content-2">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />递交迅速，反馈及时
          </div>
          <div class="content-part3-1-content-3">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />全流程掌控，随时查看进度
          </div>
          <a-divider />
          <div class="content-part3-1-content-4">
            <div class="content-part3-1-content-4-title">￥300</div>
            <a-button class="content-part3-1-content-4-button" >立即购买</a-button>
          </div>
        </div>   
      </div>
      <div class="content-part3-1"  >
        <div class="content-part3-1-title">
          <img src="../assets/trademark-pic-1.svg" class="content-part3-1-img" />
         专家辅助申请
        </div>
        <div class="content-part3-1-content">
          <div class="content-part3-1-content-1" style="margin-top:30px;">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />专业人员全流程服务
          </div>
          <div class="content-part3-1-content-2">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />优化注册方案，全方位保护
          </div>
          <div class="content-part3-1-content-3">
            <a-icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#00C1DE"
              class="content-part3-1-content-icon"
            />商标检索分析，评估成功率
          </div>
          <a-divider />
          <div class="content-part3-1-content-4">
            <div class="content-part3-1-content-4-title">￥680</div>
            <a-button class="content-part3-1-content-4-button" >立即购买</a-button>
          </div>
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
     
    };
  },
  methods:{
    toTrademarkCategory(){
      this.$router.push({path:'/trademarkCategory'})
    }
  }
};
</script>

<style scope>
.content {
  width: 100%;
  padding: 30px 22% 0px 22%;
}
.content-part1 {
  text-align: center;
  color: #424753;
  font-size: 28px;
}
.content-part2 {
  display: flex;
  justify-content: center;
  padding-top:20px;
  padding-bottom:20px;
  /* padding: 20px 28% 20px 28%; */
  font-size: 14px;
  color: rgb(119, 127, 132);
  min-width:450px;
}
.content-part3 {
  display: flex;
}
.content-part3-1 {
  width: 32%;
  min-width: 320px;
  height: 400px;
  box-shadow: 0 0 5px 0 #e1e1e1;
}
.content-part3-1-title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #373d41;
  font-size: 16px;
  color: #eceff3;
  text-align: center;
  position: relative;
}
.content-part3-1-img {
  width: 50px;
  height: 50px;
}
.content-part3-1-content {
  padding: 0px 25px 0px 25px;
}
.content-part3-1-content-1,
.content-part3-1-content-2,
.content-part3-1-content-3 {
  width: 200px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  margin-left: 22%;
}
.content-part3-1-content-2,
.content-part3-1-content-3 {
  margin-top: 15px;
}
.content-part3-1-content-icon {
  margin-right: 10px;
}
.content-part3-1-content-4-title {
  text-align: center;
  font-size: 36px;
  color: #ff8a00;
  margin-top: 50px;
}
.content-part3-1-content-4-button {
  color: #00ced1;
  width: 100%;
  height: 43px;
  margin: 23px auto 0px;
  border-color: #00ced1;
}
.content-part3-1:hover .content-part3-1-title {
  background-color: #00ced1;
  font-size: 18px;
}
.content-part3-1:hover .content-part3-1-content-4-button {
  background-color: #00ced1;
  color: #e1e1e1;
}
</style>