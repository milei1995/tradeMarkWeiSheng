<template>
  <div class="list">
    <div class='list-banner'>
       <div class='list-banner-title'>全行业覆盖</div>
       <div class='list-banner-des'>为您量身定制商标注册方案</div>
    </div>
    <div class="list-content">
      <search-category-condition />
      <div class="list-content-result">
        <div class="result-item" v-for="i in 20" :key="i">
          <div class="result-item-img">
            <img src="../../assets/list-case.jpg" />
          </div>
          <div class="result-item-des">第20类&nbsp;韩庭&nbsp;<a-button class='result-item-button'>认证</a-button></div>
          <div class="result-item-describe">沙发,桌子,家具,床垫,非金属...</div>
        </div>
      </div>
      <div class="list-page">
        <a-pagination 
          :total="500"
          :showTotal="total => `Total ${total} items`"
          :pageSize="20"
          :size="large"
          :defaultCurrent="1"
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
      searchTitleResult: "商标优选结果"
    };
  },
  methods: {
    getTradeMarkListData(){
     
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
.list-banner{
  padding: 20px 26% 20px 18%;
  width: 100%;
  height: 350px;
  min-width: 1400px;
  background: url("../../bannerAndIcon/list-banner-bg.png") no-repeat center;
  background-size: cover;
}
.list-banner-title{
margin-top:100px;
margin-left:42%;
width:175px;
height:39px;
font-size:35px;
font-family:FZZongYi-M05S;
font-weight:400;
line-height:40px;
color:rgba(255,255,255,1);
opacity:1;
}
.list-banner-des{
margin-top:10px;
margin-left:51%;
width:420px;
height:39px;
font-size:35px;
font-family:FZZongYi-M05S;
font-weight:400;
line-height:40px;
color:rgba(255,255,255,1);
opacity:1;
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
  border:1px dashed black;
}
.result-item-des {
  margin: 0px auto 0px;
  box-sizing: border-box;
  /* width: 110px; */
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  /* border: 2px solid #ff6a00;
  color: #ff6a00;
  border-radius: 5px; */
}
.result-item-button{
width:53px;
height:25px;
line-height: 22px;
background:rgba(253,114,55,1);
opacity:1;
padding:1px 10px 1px 10px;
border-radius:5px;
font-size:14px;
text-align:center;
color:rgba(255,255,255,1);
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
/deep/.list-page{
    min-width:800px;
    margin-top:15px;
    padding-left:30%;
    .ant-pagination{
      .ant-pagination-item{
        // background-color:rgba(41,158,249,1);
      }
      .ant-pagination-item-active{
           background-color:rgba(41,158,249,1);
           a{
             color:#f9f9f9;
           }
      }
    }
}

</style>