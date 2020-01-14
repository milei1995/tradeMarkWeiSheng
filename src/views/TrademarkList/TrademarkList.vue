<template>
  <div class="list">
    <div class="list-banner">
      <div class="list-banner-title">全行业覆盖</div>
      <div class="list-banner-des">为您量身定制商标注册方案</div>
    </div>
    <div class="list-content">
      <search-category-condition  :currentId="categoryId" @getCategoryId="getCategoryId"/>
      <div class="list-content-result">
        <div class="result-item" v-for="(item,index) in categoryList" :key="index">
          <div class="result-item-img">
            <img :src="item.src1" />
          </div>
          <div class="result-item-des">
            <span class='result-item-des1'>第{{item.intCls}}类</span>&nbsp;
            <span class='result-item-des2'>{{item.tmName}}</span>&nbsp;
            <a-button class="result-item-button">认证</a-button>
          </div>
          <div class="result-item-describe">{{item.applicantCn}}</div>
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
import SearchCategoryCondition from "../../components/SearchCategoryCondition";
// import {TradeMarkSearch} from '../../api/api'
export default {
  name: "TrademarkList",
  components: {
    SearchCategoryCondition
  },
  data() {
    return {
      searchTitle: "商标优选首页",
      searchTitleResult: "商标优选结果",
      categoryId: "0",
      categoryList: [],
      total: 0,
      keyword:'化学',//商标keyWord
      defaultCurrent:1,//默认页码
      currentPage:1,//当前页码
      searchType:'4'
    };
  },
  watch: {
    categoryId(newCate, oldCate) {
      console.log(newCate, oldCate);
      if(newCate!==undefined){
      this.currentPage=1;
      this.getTradeMarkListData(newCate,1,this.keyword,this.searchType);
      }
      if(newCate===undefined){
         this.getTradeMarkListData(0,1,this.keyword,this.searchType);
      }
    }
  },
  mounted() {
    const queryData=this.$router.history.current.query
    console.log(queryData)
    this.keyword=queryData.keyword
    this.searchType=queryData.searchType
    this.categoryId = this.$router.history.current.query.id;
    this.getTradeMarkListData(0,1,this.keyword,this.searchType)
  },
  methods: {
    getTradeMarkListData(id,pageNum,key,type) {
      const that = this;
      const keyword = key;
      const searchType =type;
      const intCls = id;
      const url = "/api/trademark/main/trademarkSearch";
      const params = {
        page: pageNum,
        pageSize: 20,
        keyword: keyword,
        intCls: intCls,
        searchType: searchType
      };
      this.$axios({
        method: "get",
        url: url,
        params: params
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            that.categoryList = res.data.data.trademarkList;
            that.categoryList.forEach(item => {
              (item.src1 = "http://tmpic.tmkoo.com/" + item.tmImg), //大图
                (item.src2 = "http://tmpic.tmkoo.com/" + item.tmImgm), //中图
                (item.src3 = "http://tmpic.tmkoo.com/" + item.tmImgs); //小图
            });
            console.log(that.categoryList);
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
       console.log(this.categoryId)
       this.getTradeMarkListData(this.categoryId,this.currentPage,this.keyword,this.searchType)
    },
    getCategoryId(id){
      this.categoryId=id
      // this.currentPage=1
      // console.log(id)
      // this.getTradeMarkListData(this.categoryId,this.currentPage)
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
  background: url("../../bannerAndIcon/list-banner-bg.png") no-repeat center;
  background-size: cover;
}
.list-banner-title {
  margin-top: 100px;
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
  height: 130px;
  border: 1px dashed black;
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
  width:40px;
  font-size:13px;
}
.result-item-des2{
  width:40px;
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