<template>
  <div class="myCollect">
    <div class="title">我的收藏</div>
    <div class="collect-content">
      <template v-if='collectList.length>0'>
        <div class="collect-item" v-for="(item,index) in collectList" :key="index">
          <div class="collect-item-img">
             <img style='width:100%;height:100%;' :src='item.tmImg' />
          </div>
          <div class="collect-item-info">
            <div class="collect-item-info-title">商标信息</div>
            <div class="collect-item-info-content">
              <div class="info1">商标分类-{{item.intCls}}-{{item.classifyName}}</div>
              <div class="info2">适用项目:{{item.goodsName}}</div>
              <div class="info3">商标编号:{{item.regNo}}</div>
            </div>
          </div>
          <div class="collect-operation">
            <div class="collect-button">取消收藏</div>
            <div class="collect-button">立即咨询</div>
          </div>
        </div>
      </template>
      <div v-else>您目前没有收藏任何商标哦，赶快前往商标列表收藏吧！</div>
    </div>
  </div>
</template>

<script>
import { getStorage } from "../mixin/storage";
export default {
  name: "myCollect",
  data() {
    return {
      collectList: [] //我的收藏
    };
  },
  mounted() {
    this.getCollect();
  },
  methods: {
    getCollect() {
      const url =
        "/api/trademark/trademarkCollection/selectTrademarkCollection";
      const accessToken = getStorage("AccessToken");
      const headers = {
        accessToken: accessToken
      };
      this.$axios({
        method: "get",
        url: url,
        headers: headers
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.collectList = res.data.data.collectionList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.myCollect {
  width: 100%;
  .title {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fd7237;
    font-weight: bold;
    font-family: Source Han Sans CN;
    background-color: #fffeff;
  }
  .collect-content {
    width: 100%;
    height: 530px;
    overflow-y: scroll;
    padding: 30px 50px 30px 50px;
    background-color: #fffeff;
    .collect-item {
      padding: 15px 15px 15px 15px;
      width: 100%;
      height: 150px;
      // background-color: #fd7237;
      display: flex;
      .collect-item-img {
        height: 115px;
        width: 115px;
        border: 1px solid rgba(232, 232, 232, 1);
        opacity: 1;
      }
      .collect-item-info {
        height: 115px;
        width: 58%;
        margin-left: 20px;
        //   border: 1px solid black;
        .collect-item-info-title {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 27px;
          color: rgba(51, 51, 51, 1);
          opacity: 1;
        }
        .collect-item-info-content {
          width: 100%;
          height: 88px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(153, 153, 153, 1);
          opacity: 1;
          text-indent: 20px;
          border: 1px solid rgba(232, 232, 232, 1);
          border-radius: 4px;
          .info1,
          .info2,
          .info3 {
            width: 100%;
            height: 29px;
            line-height: 29px;
            overflow: hidden;
            border-bottom: 1px solid rgba(232, 232, 232, 1);
          }
        }
      }
      .collect-operation {
        margin-left: 20px;
        margin-top: 30px;
        .collect-button {
          width: 74px;
          height: 25px;
          line-height: 25px;
          background: rgba(253, 114, 55, 1);
          opacity: 1;
          border-radius: 5px;
          color: #ffffff;
          text-align: center;
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>



