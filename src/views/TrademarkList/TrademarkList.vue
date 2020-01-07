<template>
  <div class="list">
    <trademark-category-search :searchTitle="searchTitle" :searchTitleResult="searchTitleResult" />
    <div class="list-content">
      <search-category-condition />
      <div class="list-content-result">
        <div class="result-item" v-for="i in 20" :key="i">
          <div class="result-item-img">
            <img src="../../assets/list-case.jpg" />
          </div>
          <div class="result-item-button">求购咨询</div>
          <div class="result-item-describe">第35类-1111111111111111111111111111111</div>
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
import TrademarkCategorySearch from "../../components/TrademarkCategorySearch";
import SearchCategoryCondition from "../../components/SearchCategoryCondition";
export default {
  name: "TrademarkList",
  components: {
    TrademarkCategorySearch,
    SearchCategoryCondition
  },
  data() {
    return {
      searchTitle: "商标优选首页",
      searchTitleResult: "商标优选结果"
    };
  },
  methods: {}
};
</script>

<style scoped>
.list {
  width: 100%;
  background: #f9f9f9;
}
.list-content {
  padding: 25px 18% 25px 18%;
  min-width: 1130px;
}
.list-content-result {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  min-width: 1130px;
}
.result-item {
  padding: 10px 10px 10px 10px;
  width: 19%;
  height: 250px;
  box-sizing: border-box;
  margin-top: 15px;
  background-color: #ffffff;
}
.result-item-img img {
  width: 100%;
  height: 130px;
}
.result-item-button {
  margin: 0px auto 0px;
  box-sizing: border-box;
  width: 110px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  border: 2px solid #ff6a00;
  color: #ff6a00;
  border-radius: 5px;
}
.result-item-button:hover {
  color: #ffffff;
  background-color: #ff6a00;
  cursor: pointer;
}
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
.list-page{
    margin-top:15px;
    padding-left:50%;
}
</style>