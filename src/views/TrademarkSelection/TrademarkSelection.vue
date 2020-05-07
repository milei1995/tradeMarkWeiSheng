<template>
  <div class="list">
    <div class="list-banner">
      <!-- <div class="banner-search">
          <a-input  placeholder="请输入相关搜索内容"/>
          <a-button @click='handleSearch'>搜索</a-button>
       </div>-->
    </div>
    <div class="list-content">
      <div class="list-content-result">
        <div class="result-item" v-for="(item,index) in categoryList" :key="index">
          <div class="result-item-img">
            <img :src="item.tmImg" @click="toDetail(item.regNo)"/>
          </div>
          <div class="result-item-des">
            <span class='result-item-des1'>类{{item.intCls}}</span>&nbsp;
            <span class='result-item-des2'>{{item.tmName}}</span>&nbsp;
            <a-button class="result-item-button" @click="toDetail(item.regNo,item.intCls)">认证</a-button>
          </div>
          <div class="result-item-describe">价格:<span style='color:#DD5246;'>￥{{item.tmPrice}}</span>(元)</div>
        </div>
      </div>
      <div class="list-page">
        <a-pagination
          :total="total"
          :showTotal="total => `共计${total}个商标 `"
          :pageSize="20"
          :current="currentPage"
          :defaultCurrent="defaultCurrent"
          @change='pageChange'
        />
      </div>
    </div>
  </div>
</template>

<script>
// import {TradeMarkSearch} from '../../api/api'
export default {
  name: "trademarkSelection",
  components: {
   
  },
  data() {
    return {
      searchTitle: "商标优选首页",
      searchTitleResult: "商标优选结果",
      categoryList: [],
      total: 0,
      defaultCurrent:1,//默认页码
      currentPage:1,//当前页码
    };
  },
  watch: {
    
  },
  mounted() {
      this.getSelectedTradeMarkList(1)
  },
  methods: {
    getSelectedTradeMarkList(pageNum) {
      const that = this;
      const url = "/api/trademark/main/carefullyChosenTrademarkAllList";
      const params = {
        page: pageNum,
        pageSize: 20
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            that.categoryList = res.data.data.list;
            that.total = res.data.data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    pageChange(pageNumber){
       console.log(pageNumber)
       this.currentPage=pageNumber
       this.getSelectedTradeMarkList(this.currentPage)
    },
    toDetail(regNo){
      this.$router.push({path:'/tradeMarkSelectionDetail',query:{regNo:regNo}})
    },
    handleSearch(){     
      this.getSelectedTradeMarkList(this.currentPage)
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  background: #f9f9f9;
}
.list-content {
  padding: 25px 18% 25px 18%;
  min-width: 1130px;
}
.list-banner {
  padding: 20px 26% 20px 18%;
  width: 100%;
  height: 350px;
  min-width: 1400px;
  background: url("http://wssbw-images.oss-cn-hangzhou.aliyuncs.com/trademark/web/1180d04d-e0ef-4875-87eb-ef26cb89b2fe.png") no-repeat center;
  background-size: cover;
}
.banner-search{
  display: flex;
  width:60%;
  height:50px;
  line-height: 50px;
  margin:2px auto 0px;
  opacity: 0.9;
}
.list-banner-title {
  margin-top: 80px;
  margin-left: 42%;
  width: 175px;
  height: 39px;
  font-size: 35px;
  font-family: FZZongYi-M05S;
  font-weight: 400;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.list-banner-des {
  margin-top: 10px;
  margin-left: 51%;
  width: 420px;
  height: 39px;
  font-size: 35px;
  font-family: FZZongYi-M05S;
  font-weight: 400;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.list-content-result {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  min-width: 1130px;
}
.result-item {
  padding: 30px 30px 30px 30px;
  width: 19%;
  height: 250px;
  box-sizing: border-box;
  margin-top: 15px;
  background-color: #ffffff;
}
.result-item-img img {
  width: 100%;
  height: 150px;
  border: 1px dashed black;
  cursor: pointer;
}
.result-item-des {
  margin: 0px auto 0px;
  box-sizing: border-box;
  /* width: 110px; */
  height: 35px;
  line-height: 35px;
  text-align: center;
  justify-content: space-around;
  font-size: 14px;
  display: flex;
  /* border: 2px solid #ff6a00;
  color: #ff6a00;
  border-radius: 5px; */
}
.result-item-des1{
  width:50px;
  overflow: hidden;
  font-size:13px;
}
.result-item-des2{
  width:70px;
  font-size:13px;
  overflow: hidden;
}
.result-item-button {
  width: 50px;
  margin-top:5px;
  height: 22px;
  line-height: 22px;
  background: rgba(253, 114, 55, 1);
  opacity: 1;
  padding: 1px 10px 1px 10px;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
/* .result-item-button:hover {
  color: #ffffff;
  background-color: #ff6a00;
  cursor: pointer;
} */
.result-item-describe {
  margin-top: 15px;
  color: #373d41;
  font-size: 12px;
  height: 34px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
/deep/.list-page {
  min-width: 800px;
  margin-top: 15px;
  padding-left: 30%;
  .ant-pagination {
    .ant-pagination-item {
      // background-color:rgba(41,158,249,1);
    }
    .ant-pagination-item-active {
      background-color: rgba(41, 158, 249, 1);
      a {
        color: #f9f9f9;
      }
    }
  }
}
</style>