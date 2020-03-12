<template>
  <div class="home-bg" style="margin-top:20px;">
    <div class="home-bg1">
      <div class="title">常见问题</div>
      <div class="title-des">聚集常见问答，为您解决商标困难</div>
      <div class="question-content">
        <div class="question1">
          <div class="question-title">1.什么是商标？什么是注册商标？</div>
          <div>
            商标是指任何能够将自然人、法人或者其他组织的商品/服务与他人的商品/服务区别开的标志，包括文字、图形、字母、数字、三维标志、颜色组合和声音等，以及上述要素的组合。
            注册商标是指经过商标主管机关依照法定程序及标准进行审查并通过，经《初步审定公告》无人提出异议的商标。
          </div>
        </div>
        <div class="question2">
          <div class="question-title">2.商标注册有风险吗？</div>
          <div>商标注册存在被商标局驳回导致申请失败的风险。申请驳回失败原因可能有：受可用文字、标识资源限制，新的商标申请容易与在先申请的商标产生近似；法律法规的相关限制等。据 不完全的统计，2017年我国商标申请的驳回率约50%，2018年我国商标申请的驳回率约40%。为提高商标注册成功率，申请人可在申请时提前做好应对准备。</div>
          <div>建议：</div>
          <div>(1) 若申请人不具有一定的专业能力，尽量选择有专业顾问指导的“专家辅助申请”和“担保注册申请”。</div>
          <div>(2)申请时将中文、英文、图形等分开申请，通过后可以组合使用,以避免因某一部分近似而被商标局整体驳回的情况，且分开申请可以根据场景灵活组合使用。</div>
          <div>(3) 准备备用方案，申请时可以在主要商标申请方案的基础上，增加一到两件备用商标，以便在主商标无法通过或全部通过的情况下，有其他可以使用的商标。</div>
        </div>
        <div class="question3">
          <div class="question-title">3.商标申请费用的标准？</div>
          <div>商标局规费收取标准为： 300元/类·件，即：1件商标在1个类别中申请10个（含10个）以内的商品。超过10个商品，每超过1个商品，每个商品加收30元。 即：在一个类别中指定15项商品，规费为：300+（15-10）×30=450元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrademarkHomeFooter"
};
</script>

<style lang='scss' scoped>
.home-bg {
  width: 100%;
  min-width: 1400px;
  .home-bg1 {
    padding-top: 1px;
    width: 70%;
    margin-left: 15%;
    height: 520px;
    text-align: center;
    min-width: 1000px;
    background: rgba(236, 236, 236, 1);
    opacity: 1;
    /* background: url("../assets/common-problem-bg.jpg") no-repeat center;
  background-size: cover; */
    margin-bottom: 20px;
    .title {
      margin-top: 20px;
      font-size: 28px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 48px;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
    }
    .title-des {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .question-content {
      width: 100%;
      height: 450px;
      padding: 10px 20px 10px 20px;
      text-align: left;
      .question1 {
        .question-title {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bolder;
          line-height: 27px;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
      }
      .question2,
      .question3 {
        margin-top: 30px;
        .question-title {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bolder;
          line-height: 27px;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
      }
    }
  }
}

/* .home-bg2 {
  width: 100%;
  height: 520px;
  min-width: 1400px;
  background: url("../assets/home-bg2.jpg") no-repeat center;
  background-size: cover;
}
.home-bg3 {
  width: 100%;
  min-width: 1400px;
  height: 520px;
  background: url("../assets/home-bg3.jpg") no-repeat center;
  background-size: cover;
} */
</style>