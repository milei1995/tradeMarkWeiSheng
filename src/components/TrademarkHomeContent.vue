<template>
  <div class="content">
    <div class="content-1">
      <div class="content-1-item1">
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
        <div class="content-2-list-item" v-for="i in 5" :key="i">
          <div class="content-2-list-item-1">服装鞋帽</div>
          <div class="content-2-list-item-2">男装&nbsp;女装&nbsp;童装&nbsp;内衣</div>
          <div class="content-2-list-item-3">25</div>
          <a-button>查看商标</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrademarkHomeContent",
  data() {
    return {};
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
</style>