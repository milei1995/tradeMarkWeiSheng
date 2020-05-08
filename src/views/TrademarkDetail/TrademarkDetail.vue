<template>
  <div class="detail">
    <div class="detail-banner">
      <div class="detail-banner-part1">
        <div class="detail-banner-part1-1">
          <img
            :src="'http://tmpic.tmkoo.com/'+tradeMarkContent.tmImg"
            class="detail-banner-part1-1-bg"
          />
        </div>
        <div class="detail-banner-part1-2">
          <div class="detail-banner-part1-2-des1">
            <span class="des1-1">{{tradeMarkContent.tmName}}</span>
            <span class="des1-2">多类别</span>
            <span class="des1-3">交易类型:转让</span>
          </div>
          <div class="detail-banner-part1-2-des2">
            <span>类别:&nbsp;&nbsp;第{{tradeMarkContent.intCls}}类&nbsp;</span>
            <span style="margin-left:15px;">注册号:&nbsp;&nbsp;{{tradeMarkContent.regNo}}</span>
          </div>
          <div class="detail-banner-part1-2-des3">
            <div class="des3-1">同名多类:&nbsp;&nbsp;45类;&nbsp;&nbsp;44类;&nbsp;&nbsp;21类</div>
            <div class="des3-2">有效期限:&nbsp;&nbsp;{{tradeMarkContent.privateDate}}</div>
            <div class="des3-3">类似群组:&nbsp;&nbsp;{{tradeMarkContent.announcementIssue}};</div>
            <div class="des3-4">使用范围:&nbsp;&nbsp;{{useRange}}</div>
            <div class="collect" @click="collectTradeMark">
              <a-icon type="plus" />点击收藏
            </div>
          </div>
        </div>
        <div class="detail-banner-part1-3">
          <a-input class="btn1" placeholder="输入您的手机号">
            <a-icon slot="prefix" type="mobile" />
          </a-input>
          <a-button type="primary" class="btn2" @click="searchTradeMark">
            <a-icon type="search" />点击帮你找标
          </a-button>
        </div>
        <div class="detail-banner-part1-button">
          <a-button class="detail-banner-part1-button1" @click="goSearch">求购咨询</a-button>
          <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2794614592&site=qq&menu=yes" style="height:35px;margin-left:15px;" ><img border="0" style="width:100%;height:35px;" src="http://wpa.qq.com/pa?p=2:2794614592:51" alt="点击咨询" title="点击咨询"/></a>
          <!-- <a-button class="detail-banner-part1-button2">立即购买</a-button> -->
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
        <a class="gosearch" href="http://sbj.cnipa.gov.cn/sbcx/">去商标局官网查询</a>
      </div>
      <p>商标转让</p>
      <div class="content-transfer"></div>
      <p>过户资料</p>
      <div class="transfer-info"></div>
      <p>服务承诺</p>
      <div class="serve">
        <div class="serve-item" v-for="(item,index) in serveIconArray" :key="index">
          <img :src="item.src" class="serve-item-icon" />
          <span class="serve-item-text">{{item.text}}</span>
        </div>
      </div>
    </div>
    <trademark-modal1 ref="modal1" />
    <trademark-modal2
      ref="modal2"
      :tradeMarkName="tradeMarkContent.tmName"
      :tradeMarkRegNo="tradeMarkContent.regNo"
      :applyTypeNumber="'3'"
      @toNextModal="Consulteok"
    />
    <trademark-modal3 ref="modal3" @toNextModal2="toNextModal2" />
  </div>
</template>

<script>
import TrademarkModal1 from "../../components/TrademarkModal1";
import TrademarkModal2 from "../../components/TrademarkModal2";
import TrademarkModal3 from "../../components/TrademarkModal3";
import { getStorage } from "../../mixin/storage";
export default {
  name: "TrademarkDetail",
  components: {
    TrademarkModal1,
    TrademarkModal2,
    TrademarkModal3
  },
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
      ],
      serveIconArray: [
        {
          src: require("../../bannerAndIcon/serve-icon1.png"),
          text: "品种齐全，快速响应"
        },
        {
          src: require("../../bannerAndIcon/serve-icon2.png"),
          text: "一对一交易经纪人"
        },
        {
          src: require("../../bannerAndIcon/serve-icon3.png"),
          text: "交易安全保障"
        },
        {
          src: require("../../bannerAndIcon/serve-icon4.png"),
          text: "专家服务团队"
        }
      ],
      currentRegNo: "", //当前商标序号
      categoryId: "", //当前分类id
      tradeMarkContent: {}, //商标内容
      useRange: "", //使用范围
      currentGoods: [], //当前商标使用范围的数组
      isToken: false
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.currentRegNo = this.$route.query.regNo;
    this.categoryId = this.$route.query.id;
    this.getDetail(this.currentRegNo, this.categoryId);
    this.isOverdue();
  },
  watch: {
    //  currentRegNo(newNo,oldNo){
    //  }
  },
  methods: {
    isOverdue() {
      //token是否过期
      const accessToken = getStorage("AccessToken");
      const params = {
        accessToken: accessToken
      };
      this.$axios({
        method: "get",
        url: "/api/trademark/user/checkToken",
        params: params
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.isToken = res.data.data.tokenType;
        }
      });
    },
    getDetail(regNo, id) {
      const url = "/api/trademark/main/trademarkDetail";
      const params = {
        regNo: regNo,
        intCls: id
      };
      this.$axios({
        method: "get",
        url: url,
        params: params
      })
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data);
            this.tradeMarkContent = res.data.data.trademarkDetail;
            this.detailAray[0].value = res.data.data.trademarkDetail.tmName;
            this.detailAray[1].value = res.data.data.trademarkDetail.regNo;
            this.detailAray[2].value =
              "第" + res.data.data.trademarkDetail.intCls + "类";
            this.detailAray[3].value =
              res.data.data.trademarkDetail.announcementDate;
            this.detailAray[4].value = res.data.data.trademarkDetail.appDate;
            this.detailAray[5].value =
              res.data.data.trademarkDetail.announcementIssue;
            this.detailAray[6].value = res.data.data.trademarkDetail.agent;
            this.detailAray[7].value = res.data.data.trademarkDetail.category;
            this.detailAray[9].value =
              res.data.data.trademarkDetail.privateDate;
            this.tradeMarkContent.goods.forEach(item => {
              this.useRange += item.goodsName + ";";
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchTradeMark() {
      this.$refs.modal2.showModal();
    },
    goSearch() {
      this.$refs.modal2.showModal();
    },
    Consulteok() {
      this.$refs.modal3.showModal();
    },
    toNextModal2() {
      this.$refs.modal1.showModal();
    },
    collectTradeMark() {
      console.log(this.tradeMarkContent.goods);
      const url = "/api/trademark/trademarkCollection/addTrademarkCollection";
      const accessToken = getStorage("AccessToken");
      if (accessToken) {
        if (this.isToken) {
          const headers = {
            accessToken: accessToken
          };
          const params = {
            regNo: this.tradeMarkContent.regNo,
            tmName: this.tradeMarkContent.tmName,
            tmImg: "http://tmpic.tmkoo.com/" + this.tradeMarkContent.tmImg,
            intCls: this.tradeMarkContent.intCls,
            status: 1,
            goods: this.tradeMarkContent.goods
          };
          this.$axios({
            method: "post",
            url: url,
            headers: headers,
            data: params
          })
            .then(res => {
              console.log(res);
              if (res.data.success) {
                this.$message.success("收藏成功");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }else{
           this.$message.error("当前用户已过期，请重新登录")
             setTimeout(() => {
                        this.$router.push({ path: "/login" });
                      }, 2000);
        }
      } else {
        this.$message.error("请先登录");
      }
    }
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
      position: relative;
      .detail-banner-part1-button {
        position: absolute;
        width: 200px;
        height: 50px;
        bottom: 0px;
        left: 40%;
        display: flex;
        .detail-banner-part1-button1 {
          border: 1px solid #fe6a0c;
          background-color: #fe6a0c;
          color: #ffffff;
        }
        .detail-banner-part1-button2 {
          border: 1px solid #fe6a0c;
          color: #fe6a0c;
          margin-left: 10px;
        }
      }
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
            width: 50%;
            overflow: hidden;
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
            width: 30%;
            overflow: hidden;
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
          position: relative;
          .collect {
            position: absolute;
            color: #fe6a0c;
            font-size: 14px;
            cursor: pointer;
            top: 5px;
            right: 10px;
          }
          .des3-1,
          .des3-2,
          .des3-3,
          .des3-4 {
            margin-top: 10px;
            margin-left: 10px;
          }
          .des3-4 {
            height: 50px;
            overflow-x: auto;
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
          width: 140px;
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
      margin-top: 10px;
      line-height: 41px;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
    }
    .content-detail {
      width: 100%;
      background-color: #f5f5f5;
      min-width: 1050px;
      padding: 20px 20px 20px 20px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      position: relative;
      .gosearch {
        width: 120px;
        height: 15px;
        line-height: 15px;
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: rgba(41, 158, 249, 1);
        cursor: pointer;
      }
      .content-detail-item {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 15px;
        width: 33%;
        min-width: 325px;
        height: 20px;
        .detail-item-1 {
          overflow: hidden;
          width: 30%;
          min-width: 100px;
          height: 20px;
          text-align: left;
        }
        .detail-item-2 {
          width: 70%;
          overflow: hidden;
          height: 20px;
          min-width: 100px;
          text-align: left;
        }
      }
    }
    .content-transfer {
      width: 100%;
      height: 260px;
      min-width: 1050px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      background: url("../../assets/detail-step.png") no-repeat center;
      background-size: cover;
    }
    .transfer-info {
      width: 100%;
      height: 260px;
      min-width: 1050px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      background: url("../../assets/detail-transfer.jpg") no-repeat center;
      background-size: cover;
    }
    .serve {
      width: 100%;
      height: 92px;
      min-width: 1050px;
      line-height: 92px;
      background: #f3f3f3;
      opacity: 1;
      display: flex;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      justify-content: space-between;
      vertical-align: middle;
      .serve-item {
        height: 100%;
        width: 25%;
        // padding: 10px 10px 10px 10px;
        .serve-item-icon {
          width: 54px;
          height: 54px;
          border: 2px solid rgba(253, 114, 55, 1);
          border-radius: 50%;
          opacity: 1;
        }
        .serve-item-text {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>