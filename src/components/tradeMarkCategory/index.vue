<template>
  <div class="tradeMarkCategory" style="width:100%;">
    <a-tabs class="tabs" :activeKey="currentActiveKey" @change="callback" type="card">
      <a-tab-pane class="tab-pane" tab="请选择国际分类" key="1">
        <div class="category1">
          <div
            class="category1-item"
            v-for="(item,index) in category1"
            :key="index"
            @click="chooseTrade(item.classifyNum)"
          >第{{item.classifyNum}}类&nbsp;{{item.classifyName}}</div>
        </div>
      </a-tab-pane>
      <a-tab-pane class="tab-pane" tab="请选择类似群组" key="2">
        <div class="category2">
          <div
            class="category2-item"
            v-for="(item,index) in category2"
            :key="index"
            @click="chooseTrade2(item.groupsNum)"
          >{{item.groupsNum}}--{{item.groupName}}</div>
        </div>
      </a-tab-pane>
      <a-tab-pane class="tab-pane" tab="情选择具体商品/服务" key="3">
        <div class="category3">
          <div class="category3-title">
            <span></span>
          </div>
          <div class="category3-item" v-for="(item,index) in category3" :key="index">{{item}}</div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category1: [], //存放国际分类
      category2: [], //存放类似群组
      category3: [], //存放具体商品
      currentActiveKey: "1"
    };
  },
  mounted() {
    this.getCategory(1, "");
  },
  methods: {
    callback(e) {
      this.currentActiveKey = e;
    },
    chooseTrade(code) {
      this.currentActiveKey = "2";
      this.getCategory(2, code);
    },
    chooseTrade2(groupsNum) {
      let choosed = this.category2.find(n => n.groupsNum == groupsNum);
      console.log(choosed);
      this.currentActiveKey = "3";
      this.category3 = choosed.goodsList;
    },
    getCategory(queryType, code) {
      const url =
        "/api/trademark/trademarkClassifyGoods/findTmClassifyGroupGoodsListByCode";
      const params = {
        queryType: queryType,
        code: code
      };
      this.$axios({
        method: "get",
        url: url,
        params: params
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          if (queryType === 1) {
            this.category1 = res.data.data.classifyList;
          }
          if (queryType === 2) {
            this.category2 = res.data.data.groupsList;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'  scoped>
.tradeMarkCategory {
  width: 100%;
  .tabs {
    width: 100%;
    .tab-pane {
      width: 100%;
      .category1 {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .category1-item {
          width: 14%;
          height: 30px;
          cursor: pointer;
          line-height: 30px;
        }
        .category1-item:hover {
          background-color: #faa80a;
          color: #ffffff;
        }
      }
      .category2 {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .category2-item {
          width: 50%;
          padding-left:20px;
          overflow:hidden;
          height: 30px;
          cursor: pointer;
          line-height: 30px;
        }
        .category2-item:hover {
          background-color: #faa80a;
          color: #ffffff;
        }
      }
      .category3{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .category3-item {
          background-color:#ECECEC;
          margin-left:20px;
          margin-top:10px;
          cursor: pointer;
          line-height: 30px;
        }
        .category3-item:hover {
          background-color: #faa80a;
          color: #ffffff;
        }
      }
    }
  }
}
</style>