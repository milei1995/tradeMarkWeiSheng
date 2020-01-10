<template>
  <div class="detail">
    <div class="detail-banner">
      <div class="detail-banner-part1">
        <div class="detail-banner-part1-1">
          <img src="../../bannerAndIcon/detail-img.png" class="detail-banner-part1-1-bg" />
        </div>
        <div class="detail-banner-part1-2">
          <div class="detail-banner-part1-2-des1">
            <span class="des1-1">韩庭</span>
            <span class="des1-2">多类别</span>
            <span class="des1-3">交易类型:转让</span>
          </div>
          <div class="detail-banner-part1-2-des2">
            <span>类别:&nbsp;&nbsp;第36类&nbsp;</span>
            <span style="margin-left:15px;">注册号:&nbsp;&nbsp;22335651</span>
          </div>
          <div class="detail-banner-part1-2-des3">
            <div class="des3-1">同名多类:&nbsp;&nbsp;45类;&nbsp;&nbsp;44类;&nbsp;&nbsp;21类</div>
            <div class="des3-2">有效期限:&nbsp;&nbsp;2019-08-21至2029-08-20</div>
            <div
              class="des3-3"
            >类似群组:&nbsp;&nbsp;3602;&nbsp;&nbsp;3601;&nbsp;&nbsp;3603;&nbsp;&nbsp;3604;</div>
            <div class="des3-4">使用范围:&nbsp;&nbsp;1111111111111111111111111111111111111111111</div>
          </div>
        </div>
        <div class="detail-banner-part1-3">
          <a-button class="btn1">
            <a-icon type="mobile" />输入联系方式
          </a-button>
          <a-button type="primary" class="btn2">
            <a-icon type="search" />点击帮你找标
          </a-button>
        </div>
      </div>
    </div>
    <div class="content">
      <p>商标详情</p>
      <div class="content-detail">
        <div class="content-detail-item" v-for="(item,index) in detailAray" :key="index">
          <div class="detail-item-1">{{item.title}}</div>
          <div class="detail-item-2">{{item.value}}</div>
        </div>
      </div>
      <p>商标转让</p>
      <div class="content-transfer"></div>
      <p>过户资料</p>
      <div class="transfer-info"></div>
      <p>服务承诺</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrademarkDetail",
  data() {
    return {
      detailAray: [
        { title: "商标名称", value: "韩庭" },
        { title: "商标注册号", value: "351602256" },
        { title: "商标类别", value: "36类" },
        { title: "出省公告日期", value: "1658" },
        { title: "商标申请日期", value: "2018-12-07" },
        { title: "初审公告期号", value: "2019-05-20" },
        { title: "商标持有公司", value: "海宁天捷软件" },
        { title: "商标类型", value: "R型" },
        { title: "是否永久转让", value: "是" },
        { title: "专用权期限", value: "2019-08-21至2029-08-20" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  min-width: 1400px;
  .detail-banner {
    width: 100%;
    height: 364px;
    background: rgba(243, 243, 243, 1);
    opacity: 1;
    .detail-banner-part1 {
      padding: 25px 20% 25px 20%;
      display: flex;
      justify-content: space-between;
      .detail-banner-part1-1 {
        width: 30%;
        min-width: 266px;
        height: 260px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(232, 232, 232, 1);
        opacity: 1;
        padding: 20px 20px 20px 20px;
        .detail-banner-part1-1-bg {
          width: 100%;
          height: 100%;
        }
      }
      .detail-banner-part1-2 {
        width: 46%;
        min-width: 392px;
        height: 260px;
        opacity: 1;
        border-radius: 10px;
        .detail-banner-part1-2-des1 {
          width: 100%;
          //   line-height:50px;
          height: 50px;
          border-bottom: 1px solid rgba(231, 231, 231, 1);
          display: flex;
          background: rgba(243, 243, 243, 1);
          vertical-align: middle;
          .des1-1 {
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 50px;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
            margin-left: 10px;
          }
          .des1-2 {
            width: 56px;
            height: 24px;
            margin-left: 40px;
            margin-top: 15px;
            line-height: 24px;
            text-align: center;
            background: rgba(41, 158, 249, 1);
            opacity: 1;
            border-radius: 5px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .des1-3 {
            margin-left: 60px;
            height: 24px;
            line-height: 24px;
            margin-top: 15px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            opacity: 1;
          }
        }
        .detail-banner-part1-2-des2 {
          padding-left: 10px;
          padding-top: 8px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          background: rgba(243, 243, 243, 1);
          font-weight: 400;
          line-height: 24px;
          color: rgba(102, 102, 102, 1);
          opacity: 1;
        }
        .detail-banner-part1-2-des3 {
          width: 100%;
          height: 174px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(232, 232, 232, 1);
          opacity: 1;
          border-radius: 10px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(153, 153, 153, 1);
          opacity: 1;
          .des3-1,
          .des3-2,
          .des3-3,
          .des3-4 {
            margin-top: 10px;
            margin-left: 10px;
          }
          .des3-4 {
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }
      }
      .detail-banner-part1-3 {
        width: 20%;
        min-width: 168px;
        height: 289px;
        background: rgba(50, 182, 227, 1);
        opacity: 1;
        border-radius: 10px;
        background: url("../../bannerAndIcon/detail-part3-bg.png") no-repeat
          center;
        background-size: cover;
        text-align: center;
        .btn1 {
          margin-top: 180px;
        }
        .btn2 {
          margin-top: 20px;
        }
      }
    }
  }
  .content {
    width: 100%;
    min-width: 1400px;
    background: rgba(250, 250, 250, 1);
    padding: 20px 19% 20px 19%;
    text-align: center;
    p {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 41px;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
    }
    .content-detail {
      width: 100%;
      padding: 20px 20px 20px 20px;
      display: flex;
      flex-wrap: wrap;
      .content-detail-item {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 15px;
        width: 33%;
        height: 20px;
        .detail-item-1 {
          width: 30%;
          height: 20px;
          text-align: left;
        }
        .detail-item-2 {
          width: 70%;
          height: 20px;
          text-align: left;
        }
      }
    }
    .content-transfer {
      width: 100%;
      height: 260px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      background: url("../../assets/detail-step.jpg") no-repeat center;
      background-size: cover;
    }
    .transfer-info {
      width: 100%;
      height: 260px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      background: url("../../assets/detail-transfer.jpg") no-repeat center;
      background-size: cover;
    }
  }
}
</style>