<template>
  <div class="search">
    <div class="search-part3">
      <a-select size='large'   style="width: 160px;height:50px" @change="handleChange">
        <a-select-option value="1">商标名</a-select-option>
        <a-select-option value="2">注册号</a-select-option>
        <a-select-option value="3">申请人</a-select-option>
      </a-select>
      <a-input placeholder="输入您想检索的商标名,注册号或者申请人" v-model="keyword" style="width:650px;"  size='large'/>
      <a-button size='large' icon="search" type='primary' @click="TrademarkSearch">搜索</a-button>
    </div>
  </div>
</template>

<script>

// import qs from 'qs'
export default {
  name: "TrademarkSearch",
  data(){
    return{
        keyword:"",
        searchType:'4',
        intCls:'0'
    }
  },
  methods:{
    handleChange(value){
      console.log(value)
      this.searchType=value
    },
    TrademarkSearch(){
      this.$router.push({path:'/trademarkList',query:{id:this.intCls,keyword:this.keyword,searchType:this.searchType}})
      this.$store.commit('updataKeyword',this.keyword)
      this.$store.commit('updataSearchType',this.searchType)
    }
  }
};
</script>

<style scoped>
.search {
  padding: 1px;
  width: 100%;
  min-width:1400px;
  height: 400px;
  background: url("../bannerAndIcon/home-bg.png") no-repeat center;
  background-size: cover;
}
/* .search-part1 {
  color: #dcdee6;
  font-size: 48px;
  width: 300px;
  height: 67px;
  line-height: 67px;
  margin: 40px auto 0px;
}
.search-part2 {
  color: #dcdee6;
  font-size: 24px;
  width: 550px;
  height: 30px;
  line-height: 30px;
  margin: 20px auto 0px;
} */
.search-part3 {
  width: 950px;
  height: 72px;
  padding: 15px 10px 15px 10px;
  margin:261px auto 0px;
  background-color: hsla(0, 0%, 100%, 0.2);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
</style>