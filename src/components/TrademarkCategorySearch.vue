<template>
   <div class="list-search">
      <div class="list-search-part1">
        <span class="list-search-part1-1" @click="changeRouter(now)">{{searchTitle}}&nbsp;>&nbsp;</span>
        <span style="color:#9b9ea0;">{{searchTitleResult}}</span>
      </div>
      <div class="list-search-part2">
        <div class="list-search-part2-1">商标优选</div>
        <a-input placeholder="输入您想检索的商标名,注册号或者申请人" class="list-search-part2-2"  size="large" />
        <a-button size="large" icon="search"  class='list-search-part2-3'>搜索</a-button>
      </div>
    </div>
</template>

<script>
export default {
  name:'TradeamrkCategorySearch',
  props:{
      searchTitle:{
          type:String,
          default:''
      },
      searchTitleResult:{
          type:String,
          default:''
      }
  },
  methods:{
      changeRouter(now){
          now=this.searchTitle
        switch(now){
            case '知识产权服务':
                this.$router.push({path:'/home'})
                break;
            case '商标优选首页':
                this.$router.push({path:'/trademarkCategory'})
                break;
        }
      }
  }
}
</script>

<style scoped>
 .list-search {
  padding: 20px 26% 20px 18%;
  width: 100%;
  height: 130px;
  min-width: 1400px;
  background: url("../assets/listSearch-bg.jpg") no-repeat center;
  background-size: cover;
}
.list-search-part1-1 {
  color: #c8d0d4;
}
.list-search-part1-1:hover {
  cursor: pointer;
  color: #00b7d3;
}
.list-search-part2 {
  display: flex;
  min-width: 1000px;
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}
.list-search-part2-1 {
  font-size: 34px;
  color: #fff;
}
.list-search-part2-2 {
  width: 600px;
  margin-top: 12px;
  margin-left: 80px;
}
.list-search-part2-3{
  margin-top:12px;
  margin-left:5px;
  width:160px;
  color:#fff;
  background-color: #FF6A00;
  border-color:transparent;
}
.list-search-part2-3:hover{
     background-color:#FE8A28;
}
</style>