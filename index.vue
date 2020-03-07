<template>
  <div class="tradeMarkCategory" style="width:100%;">
    <a-tabs class="tabs" :activeKey="currentActiveKey" @change="callback" type="card">
      <a-tab-pane class="tab-pane" tab="请选择国际分类" key="1">
        <div class="category1">
          <div
            class="category1-item"
            v-for="(item,index) in category1"
            :key="index"
            @click="chooseTrade(index, item.classifyNum,item.classifyName)"
          >第{{item.classifyNum}}类&nbsp;{{item.classifyName}}</div>
        </div>
      </a-tab-pane>
      <a-tab-pane class="tab-pane" tab="请选择类似群组" key="2">
        <div class="category2">
          <div
            class="category2-item"
            v-for="(item,index) in category2"
            :key="index"
            @click="chooseTrade2(item.groupsNum, index)"
          >{{item.groupsNum}}--{{item.groupName}}</div>
        </div>
      </a-tab-pane>
      <a-tab-pane class="tab-pane" tab="情选择具体商品/服务" key="3">
        <div class="category3">
          <div class="category3-title">
            <span>{{category3.groupsNum}}</span>--
            <span>{{category3.groupName}}</span>
          </div>
          <div class="category3-content">
            <div
              class="category3-item"
              v-for="(item,index) in category3.goodsList"
              :key="index"
              @click="selectGoods(item,category3.groupsNum)"
            >{{item}}{{lastList.includes(item)}}</div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
var groupArray = []; //当前挑选类的小类
var chooseGroup = []; //当前挑选类的小类的商品
var currentSelectedClass = {}; //当前挑选的类
export default {
  data() {
    return {
      category1: [], //存放国际分类
      category2: [], //存放类似群组
      category3: [], //存放具体商品
      currentActiveKey: "1",
      first: {},
      secoord: {},
      lastList: [],
      selected: [] //挑选的整体数组
    };
  },
  computed: {
    
  },
  mounted() {
    this.getCategory(1, "");
  },
  methods: {
    callback(e) {
      //   this.currentActiveKey = e;
      if (e === "1") {
        this.currentActiveKey = "1";
        currentSelectedClass = {};
        chooseGroup = [];
        groupArray = [];
      }
      if (e == "2") {
        console.log(this.selected);
        groupArray = [];
        if (this.selected.length === 0) {
          this.$message.warning("请先选择国际分类");
        } else {
          this.currentActiveKey = "2";
        }
      }
      if (e == "3") {
        if (this.selected.length === 0) {
          this.$message.warning("请先选择国际分类");
        } else {
          if (this.selected[0].chooseGroup) {
            this.currentActiveKey = "3";
          } else {
            this.$message.warning("请选择类似群组");
          }
        }
      }
    },

    chooseTrade(index, code, name) {
      this.first = {}
      this.secoord = {}
      this.lastList = []
      this.currentActiveKey = "2";
      this.getCategory(2, code);
      const isExist = this.selected.find(z => z.classNum == code);
      console.log(isExist);
      this.first = JSON.parse(JSON.stringify(this.category1[index]))
      if (!isExist) {
        const obj1 = {
          className: name,
          classNum: code
        };
        currentSelectedClass = { ...obj1 };
         console.log(currentSelectedClass);
        this.selected.push(currentSelectedClass);
      }else{
        var i;
        for( i=0;i<isExist.chooseGroup.length;i++){
           if(isExist.chooseGroup[i].groupsNum==this.category3.groupsNum)
           return i
        }
        console.log(i)
        groupArray=isExist.chooseGroup[i].groupArray
      } 
    },
    chooseTrade2(groupsNum, index) {
      const { category2 } = this
      console.log(category2, index)
      this.secoord = JSON.parse(JSON.stringify(category2[index]))
      let choosed = this.category2.find(n => n.groupsNum == groupsNum);
      console.log(choosed);
      this.currentActiveKey = "3";
      this.category3 = choosed;
      const obj2 = {
        groupsNum: choosed.groupsNum
      };
      const isExist = chooseGroup.find(x => x.groupsNum == groupsNum);
      if (!isExist) {
        chooseGroup.push(obj2);
      } else {
        groupArray = isExist.groupArray;
      }
      currentSelectedClass.chooseGroup = chooseGroup;
      console.log(currentSelectedClass);
    },
    selectGoods(goods, groupsNum) {
      const { lastList } =  this
      if (lastList.includes(goods)) {
        lastList.splice(lastList.indexOf(goods), 1)
      } else {
        lastList.push(goods)
      }
      this.lastList = lastList
      console.log(55555, this.first, this.secoord, this.lastList)
      groupArray.push(goods);
      // console.log(groupArray)
      const target = currentSelectedClass.chooseGroup.find(
        n => n.groupsNum == groupsNum
      );
      target.groupArray = groupArray;
      console.log(222, currentSelectedClass);
      console.log(111, this.selected);
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
        height:300px;
        overflow-y:scroll ;
        display: flex;
        align-content:flex-start;
        flex-wrap: wrap;
        .category1-item {
          width: 14%;
          height: 30px;
          cursor: pointer;
          line-height: 30px;
        }
        .active1 {
          color: #ffffff;
          background-color: #faa80a;
        }
        .category1-item:hover {
          background-color: #faa80a;
          color: #ffffff;
        }
      }
      .category2 {
        width: 100%;
        height:300px;
        overflow-y:scroll ;
        display: flex;
        align-content:flex-start;
        flex-wrap: wrap;
        .category2-item {
          width: 50%;
          padding-left: 20px;
          overflow: hidden;
          height: 30px;
          cursor: pointer;
          line-height: 30px;
        }
        .category2-item:hover {
          background-color: #faa80a;
          color: #ffffff;
        }
      }
      .category3 {
        width: 100%;
        .category3-title {
          width: 100%;
          // height:50px;
          text-align: center;
          font-size: 28px;
        }
        .category3-content {
          height:300px;
          overflow-y:scroll ;
          width: 100%;
          display: flex;
          align-content:flex-start;
          flex-wrap: wrap;
          .category3-item {
            background-color: #ececec;
            margin-left: 20px;
            margin-top: 10px;
            height:30px;
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
}
</style>