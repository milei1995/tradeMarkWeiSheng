<template>
  <div class="tradeMarkCategory" style="width:100%;">
    <a-tabs class="tabs" :activeKey="currentActiveKey" @change="callback" type="card">
      <a-tab-pane class="tab-pane" tab="请选择国际分类" key="1">
        <div class="category1">
          <div
            class="category1-item"
            v-for="(item,index) in category1"
            :key="index"
            @click="chooseTrade(item.classifyNum,item.classifyName)"
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
      <a-tab-pane class="tab-pane" tab="请选择具体商品/服务" key="3">
        <div class="category3">
          <div class="category3-title">
            <span>{{category3.groupsNum}}</span>--
            <span>{{category3.groupName}}</span>
          </div>
          <div class="category3-content">
            <div class="content1">
              <div
                class="content-item"
                v-for="(item,index) in category3.groupsNormGoodsList"
                @click="selectGoods(item,category3.groupsNum)"
                :class="[isSelected(item)===true ? 'active3':'unactive']"
                :key="index"
              >{{item}}</div>
            </div>
            <div class="remark" style="color:red;margin-left:20px;">{{category3.remark}}</div>
            <div class="notNorm-tip">新增可网报的非规范商品（不建议选择，商标局随时都可能会调整）</div>
            <div class="content2">
              <div
                class="content-item"
                v-for="(item,index) in category3.groupsNotNormGoodsList"
                @click="selectGoods(item,category3.groupsNum)"
                :class="[isSelected(item)===true ? 'active3':'unactive']"
                :key="index"
              >{{item}}</div>
            </div>
            <!-- <div
              class="category3-item"
              v-for="(item,index) in category3.goodsList"
              :key="index"
              @click="selectGoods(item,category3.groupsNum)"
              :class="[isSelected(item)===true ? 'active3':'unactive']"
            >{{item}}</div>-->
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div class="choose-content">
      <template v-for="(item,index) in selectedClone">
        <div class="choose-content-item" :key="index" v-if="item.totalArray.length>0">
          <div class="item-part1">
            <span style="font-size:16px;">第{{item.classNum}}类&nbsp;{{item.className}}</span>
            <span style="margin-left:20px;">所选群组:&nbsp;</span>
            <span v-for="(item2,index2) in item.chooseGroup" :key="index2" style="margin-left:5px;">
              <span
                v-if="item2.groupArray.length>0"
                style="display:inline-block;background-color:#5D5C5C;color:#ffffff;border-radius:2px;padding:0 5px 0 5px;"
              >{{item2.groupsNum}}({{item2.groupArray.length}})</span>
            </span>
            <span style="margin-left:20px;">当前选择{{item.totalArray.length}}个商品/服务</span>
            <div class="price">￥{{item.totalPriceItem}}</div>
          </div>
          <div class="item-part2">
            <span class="item-part2-item" v-for="(item3,index3) in item.totalArray" :key="index3">
              {{item3}}
              <a-icon
                type="close-circle"
                style="color:red;font-size:20px;margin-top:2px;cursor:pointer;"
                @click="reduce(item3)"
              />
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
var groupArray = []; //当前挑选类的小类
var chooseGroup = []; //当前挑选类的小类的商品
var currentSelectedClass = {}; //当前挑选的类
import { deepClone } from "../../untils/deepClone";
export default {
  data() {
    return {
      category1: [], //存放国际分类
      category2: [], //存放类似群组
      category3: [], //存放具体商品
      currentActiveKey: "1",
      selected: [], //挑选的整体数组
      selectedClone: [], // 深度克隆selected
      totalSelectItemArray: [], //将选择所有的小类放入一个数组
      tradeMarkPriceConfig: {
        freeNumber: null, //大类免费选择几项
        classifyPrice: null, //大类的价格
        extraPrice: null //超出部分外加费用
      }
    };
  },
  props: {
    currentOrderGoods: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    'currentOrderGoods': {
      handler(newGoods,oldGoods){
      console.log(JSON.parse(JSON.stringify(newGoods)), oldGoods);
      this.selected = JSON.parse(JSON.stringify(newGoods));
      this.selectedClone = JSON.parse(JSON.stringify(newGoods));
      JSON.parse(JSON.stringify(newGoods)).forEach(item=>{
        this.totalSelectItemArray.push(...item.totalArray)
      })
      },
      immediate:true,
      deep:true
    }
  },
  computed: {
    isSelected() {
      return val => {
        var isExist = this.totalSelectItemArray.includes(val);
        if (isExist) {
          return true;
        } else {
          return false;
        }
      };
    }
  },
  mounted() {
    console.log(this.currentOrderGoods)
    this.getCategory(1, "");
    this.getPriceConfig();
  },
  destroyed() {
    console.log("关闭了");
    groupArray = [];
    chooseGroup = [];
  },
  methods: {
    callback(e) {
      //   this.currentActiveKey = e;
      if (e === "1") {
        this.currentActiveKey = "1";
        currentSelectedClass = {};
        chooseGroup = [];
        groupArray = [];
        // this.selected=[]
        // this.selectedClone=[]
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
    getPriceConfig() {
      //获取价格配置
      this.$axios({
        method: "get",
        url: "/api/trademark/trademarkClassifyGoods/findTrademarkGoodsConfig"
      }).then(res => {
        if (res.data.success) {
          res.data.data.list.forEach(item => {
            if (item.type === 1) {
              this.tradeMarkPriceConfig.classifyPrice = item.price;
            }
            if (item.type === 2) {
              this.tradeMarkPriceConfig.freeNumber = item.freeNumber;
              this.tradeMarkPriceConfig.extraPrice = item.price;
            }
          });
        }
      });
    },

    chooseTrade(code, name) {
      this.currentActiveKey = "2";
      this.getCategory(2, code);
      const isExist = this.selected.find(z => z.classNum == code);
      console.log(isExist);
      if (!isExist) {
        const obj1 = {
          className: name,
          classNum: code
        };
        currentSelectedClass = { ...obj1 };
        // console.log(currentSelectedClass);
        this.selected.push(currentSelectedClass);
      } else {
        currentSelectedClass = isExist;
        chooseGroup = isExist.chooseGroup;
      }
    },
    chooseTrade2(groupsNum) {
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
      // console.log(currentSelectedClass);
    },
    selectGoods(goods, groupsNum) {
      const isExist = groupArray.find(n => n == goods);
      if (!isExist) {
        groupArray.push(goods);
        this.totalSelectItemArray.push(goods);
        const target = currentSelectedClass.chooseGroup.find(
          n => n.groupsNum == groupsNum
        );
        target.groupArray = groupArray;
        var totalArray = [];
        currentSelectedClass.chooseGroup.forEach(item => {
          // console.log(item.groupArray);
          totalArray = totalArray.concat(item.groupArray);
        });
        currentSelectedClass.totalArray = totalArray;
        // console.log(currentSelectedClass);
        if (this.selected.length > 0) {
          this.selected.forEach(item => {
            if (item.totalArray.length > this.tradeMarkPriceConfig.freeNumber) {
              item.totalPriceItem = (
                this.tradeMarkPriceConfig.classifyPrice +
                (item.totalArray.length -
                  this.tradeMarkPriceConfig.freeNumber) *
                  this.tradeMarkPriceConfig.extraPrice
              ).toFixed(2);
            } else {
              item.totalPriceItem = this.tradeMarkPriceConfig.classifyPrice;
            }
          });
        }
        // console.log(this.selected);
        this.selectedClone = deepClone(this.selected, []);
        // console.log(this.selectedClone);
        this.$emit("selectGoods", this.selectedClone);
      }
    },
    reduce(val) {
      // console.log(this.selected);
      var index1 = 0; //val在totalArray中的下标
      var index2 = 0; //val在大类中的第几项
      var index3 = 0; //val在已知大类中中类groupArray的下标
      var index4 = 0; //val在已知大类中中类的第几项
      var index5 = 0; //val在totalSelectItemArray中的下标
      for (var i = 0; i < this.selectedClone.length; i++) {
        var y = this.selectedClone[i].totalArray.indexOf(val);
        if (y >= 0) {
          index1 = y;
          index2 = i;
        }
        for (var l = 0; l < this.selectedClone[i].chooseGroup.length; l++) {
          var z = this.selectedClone[i].chooseGroup[l].groupArray.indexOf(val);
          if (z >= 0) {
            index3 = z;
            index4 = l;
          }
        }
      }
      // console.log(index1, index2, index3, index4);
      this.selected[index2].totalArray.splice(index1, 1);
      this.selected[index2].chooseGroup[index4].groupArray.splice(index3, 1);
      // if( this.selected[index2].chooseGroup[index4].groupArray.length==0){
      //    this.selected[index2].chooseGroup.splice(index4,1)
      //     if(this.selected[index2].chooseGroup.length==0){
      //       this.selected.splice(index2,1)
      //    }
      // }
      this.selectedClone[index2].totalArray.splice(index1, 1);
      this.selectedClone[index2].chooseGroup[index4].groupArray.splice(
        index3,
        1
      );
      if (
        this.selectedClone[index2].chooseGroup[index4].groupArray.length == 0
      ) {
        this.selectedClone[index2].chooseGroup.splice(index4, 1);
        if (this.selectedClone[index2].chooseGroup.length == 0) {
          this.selectedClone.splice(index2, 1);
        }
      }
      index5 = this.totalSelectItemArray.indexOf(val);
      if (index5 > -1) {
        this.totalSelectItemArray.splice(index5, 1);
      }
      this.selectedClone.forEach(item => {
        if (item.totalArray.length > this.tradeMarkPriceConfig.freeNumber) {
          item.totalPriceItem = (
            this.tradeMarkPriceConfig.classifyPrice +
            (item.totalArray.length - this.tradeMarkPriceConfig.freeNumber) *
              this.tradeMarkPriceConfig.extraPrice
          ).toFixed(2);
        } else {
          item.totalPriceItem = this.tradeMarkPriceConfig.classifyPrice;
        }
      });
      this.$emit("reduceGoods", this.selectedClone);
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
        height: 300px;
        overflow-y: auto;
        display: flex;
        align-content: flex-start;
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
        height: 300px;
        overflow-y: auto;
        display: flex;
        align-content: flex-start;
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
          height: 300px;
          overflow-y: auto;
          width: 100%;
          .content1,
          .content2 {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .content-item {
              margin-left: 20px;
              height: 25px;
              margin-top: 4px;
              cursor: pointer;
              line-height: 25px;
            }
            .unactive {
              color: #000000;
              background-color: #ececec;
            }
            .active3 {
              color: #ffffff;
              background-color: #faa80a;
            }
            .content-item:hover {
              color: red;
            }
          }
          .notNorm-tip {
            width: 100%;
            margin-top: 5px;
            color: azure;
            text-indent: 20px;
            background-color: #b8c5ca;
          }
        }
      }
    }
  }
  .choose-content {
    margin-top: 5px;
    width: 100%;
    height: 300px;
    overflow: auto;
    .choose-content-item {
      margin-top: 5px;
      width: 100%;
      overflow: auto;
      height: 120px;
      background-color: #ebecec;
      .item-part1 {
        width: 100%;
        position: relative;
        display: flex;
        height: 30px;
        line-height: 30px;
        .price {
          top: 5px;
          right: 5px;
          font-size: 25px;
          color: #faa80a;
          position: absolute;
        }
      }
      .item-part2 {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .item-part2-item {
          height: 30px;
          margin-top: 2px;
          margin-left: 5px;
          line-height: 30px;
          border: 1px solid #f3a80a;
        }
      }
    }
  }
}
</style>