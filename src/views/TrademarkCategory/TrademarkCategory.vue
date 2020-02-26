<template>
  <div>
    <trademark-category-search :searchTitle="searchTitle" :searchTitleResult="searchTitleResult" />
    <div class="category">
      <div class="category-part1">覆盖全行业&nbsp;&nbsp;热门商标推荐</div>
      <div class="category-part2">海量资源&nbsp;&nbsp;即买即用</div>
      <div class="category-part3">
        <div
          class="category-part3-item"
          @click="toTrademarkList(item.id)"
          v-for="(item,index) in category"
          :key="index"
        >
          <img class="category-part3-item-img" :src="item.src" />
          <span style="margin-left:15px;">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="category-part4">
      <div class="category-part4-title">为什么购买已注册商标</div>
      <div class="category-part4-des">官方服务，品质保证，节约时间成本</div>
      <div class="category-part4-bg">
        <img class='category-part4-bg-img' src='../../bannerAndIcon/category-bg1.png' />
      </div>
    </div>
    <div class="category-part5">
       <div class='category-part5-title'>商标交易流程</div>
       <div class='category-part5-des'>有我们，商标转让就是这么简单</div>
       <div class='category-part5-bg'>
         <img class='category-part5-bg-img' src='../../bannerAndIcon/category-bg2.png' />
       </div>

    </div>
    <div class="category-part6">
      <div class="category-part6-title">填写商标需求，即刻享受专属服务</div>
      <div class="category-part6-des">万尚倾尽全力&nbsp;为您保驾护航</div>
      <div class="category-part6-form">
        <div class="category-part6-form-part1">
          <div class="category-part6-form-part1-label">需要服务:</div>
          <a-textarea class="category-part6-form-part1-input" v-model="needServe"></a-textarea>
        </div>
        <div class="category-part6-form-part2">
          <div class="category-part6-form-part2-label">联系方式:</div>
          <a-input v-model="mobilePhone" class="category-part6-form-part2-input"></a-input>
        </div>
        <a-button class="category-part6-form-button" @click="commitNeeds">提交需求</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage } from "../../mixin/storage";
import TrademarkCategorySearch from "../../components/TrademarkCategorySearch";
export default {
  name: "TrademarkCategory",
  components: {
    TrademarkCategorySearch
  },
  data() {
    return {
      searchTitle: "知识产权服务",
      searchTitleResult: "商标优选",
      needServe: "",
      mobilePhone: "",
      category: [
        {
          id: "1",
          name: "第01类-化学原料",
          src: require("../../static/category1.png")
        },
        {
          id: "2",
          name: "第02类-颜料油漆",
          src: require("../../static/category2.png")
        },
        {
          id: "3",
          name: "第03类-日化用品",
          src: require("../../static/category3.png")
        },
        {
          id: "4",
          name: "第04类-燃料油脂",
          src: require("../../static/category4.png")
        },
        {
          id: "5",
          name: "第05类-医疗用品",
          src: require("../../static/category5.png")
        },
        {
          id: "6",
          name: "第06类-金属材料",
          src: require("../../static/category6.png")
        },
        {
          id: "7",
          name: "第07类-机械设备",
          src: require("../../static/category7.png")
        },
        {
          id: "8",
          name: "第08类-手工器械",
          src: require("../../static/category8.png")
        },
        {
          id: "9",
          name: "第09类-科学仪器",
          src: require("../../static/category9.png")
        },
        {
          id: "10",
          name: "第10类-医疗器械",
          src: require("../../static/category10.png")
        },
        {
          id: "11",
          name: "第11类-灯具空调",
          src: require("../../static/category11.png")
        },
        {
          id: "12",
          name: "第12类-运输工具",
          src: require("../../static/category12.png")
        },
        {
          id: "13",
          name: "第13类-军火烟火",
          src: require("../../static/category13.png")
        },
        {
          id: "14",
          name: "第14类-珠宝钟表",
          src: require("../../static/category14.png")
        },
        {
          id: "15",
          name: "第15类-音乐器材",
          src: require("../../static/category15.png")
        },
        {
          id: "16",
          name: "第16类-办公用品",
          src: require("../../static/category16.png")
        },
        {
          id: "17",
          name: "第17类-橡胶制品",
          src: require("../../static/category17.png")
        },
        {
          id: "18",
          name: "第18类-皮革皮具",
          src: require("../../static/category18.png")
        },
        {
          id: "19",
          name: "第19类-建筑材料",
          src: require("../../static/category19.png")
        },
        {
          id: "20",
          name: "第20类-家具用品",
          src: require("../../static/category20.png")
        },
        {
          id: "21",
          name: "第21类-厨房洁具",
          src: require("../../static/category21.png")
        },
        {
          id: "22",
          name: "第22类-绳网袋蓬",
          src: require("../../static/category22.png")
        },
        {
          id: "23",
          name: "第23类-纺织纱线",
          src: require("../../static/category23.png")
        },
        {
          id: "24",
          name: "第24类-布料床单",
          src: require("../../static/category24.png")
        },
        {
          id: "25",
          name: "第25类-服装鞋帽",
          src: require("../../static/category25.png")
        },
        {
          id: "26",
          name: "第26类-花边配饰",
          src: require("../../static/category26.png")
        },
        {
          id: "27",
          name: "第27类-地毯席垫",
          src: require("../../static/category27.png")
        },
        {
          id: "28",
          name: "第28类-健身器材",
          src: require("../../static/category28.png")
        },
        {
          id: "29",
          name: "第29类-肉食蜜饯",
          src: require("../../static/category29.png")
        },
        {
          id: "30",
          name: "第30类-方便食品",
          src: require("../../static/category30.png")
        },
        {
          id: "31",
          name: "第31类-饲料种籽",
          src: require("../../static/category31.png")
        },
        {
          id: "32",
          name: "第32类-啤酒饮料",
          src: require("../../static/category32.png")
        },
        {
          id: "33",
          name: "第33类-酒精饮料",
          src: require("../../static/category33.png")
        },
        {
          id: "34",
          name: "第34类-烟草烟具",
          src: require("../../static/category34.png")
        },
        {
          id: "35",
          name: "第35类-广告销售",
          src: require("../../static/category35.png")
        },
        {
          id: "36",
          name: "第36类-金融物管",
          src: require("../../static/category36.png")
        },
        {
          id: "37",
          name: "第37类-建筑修理",
          src: require("../../static/category37.png")
        },
        {
          id: "38",
          name: "第38类-通讯服务",
          src: require("../../static/category38.png")
        },
        {
          id: "39",
          name: "第39类-运输贮藏",
          src: require("../../static/category39.png")
        },
        {
          id: "40",
          name: "第40类-材料加工",
          src: require("../../static/category40.png")
        },
        {
          id: "41",
          name: "第41类-教育娱乐",
          src: require("../../static/category41.png")
        },
        {
          id: "42",
          name: "第42类-网站服务",
          src: require("../../static/category42.png")
        },
        {
          id: "43",
          name: "第43类-餐饮住宿",
          src: require("../../static/category43.png")
        },
        {
          id: "44",
          name: "第44类-医疗园艺",
          src: require("../../static/category44.png")
        },
        {
          id: "45",
          name: "第45类-社会服务",
          src: require("../../static/category45.png")
        }
      ]
    };
  },
  methods: {
    toTrademarkList(id) {
      const keyword = this.$store.state.keyword;
      const searchType = this.$store.state.searchType;
      this.$router.push({
        path: "/trademarkList",
        query: { id: id, keyword: keyword, searchType: searchType }
      });
    },
    commitNeeds() {
      if (this.mobilePhone === "" || this.needServe === "") {
        this.$message.warning("输入内容不能为空");
      } else {
        var re = /^1\d{10}$/; //验证手机号
        if (re.test(this.mobilePhone)) {
          const accessToken = getStorage("AccessToken");
          const url = "/api/trademark/applyNeeds/addApplyNeeds";
          const headers = {
            accessToken: accessToken
          };
          const params = {
            phone: this.mobilePhone,
            applyType: "2",
            remark: this.needServe
          };
          this.$axios({
            method: "post",
            url: url,
            headers: headers,
            data: params
          })
            .then(res => {
              console.log(res);
              if (res.data.success) {
                this.$message.success("商标需求提交成功");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("手机号码错误");
        }
      }
    }
  }
};
</script>

<style scoped>
.category {
  min-width: 1200px;
  padding: 50px 18% 50px 18%;
}
.category-part1 {
  text-align: center;
  font-size: 28px;
  color: #373d41;
}
.category-part2 {
  text-align: center;
  font-size: 14px;
  color: #373d41;
}
.category-part3 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.category-part3-item {
  box-sizing: border-box;
  width: 20%;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 16px;
  color: #181818;
  margin-top: 24px;
  /* border:1px solid rgba(0, 0, 0, 0.1); */
}
.category-part3-item:hover {
  color: #ff6a00;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.category-part3-item-img {
  width: 20px;
  height: 20px;
}
.category-part4,
.category-part5,
.category-part6 {
  width: 100%;
  min-width: 1400px;
}
.category-part4 {
  height: 400px;
  text-align: center;
  /* background: url("../../assets/category-bg1.jpg") no-repeat center;
  background-size: cover; */
}
.category-part4-title {
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 48px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.category-part4-des {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: rgba(102, 102, 102, 1);
  opacity: 1;
}
.category-part4-bg{
  width:80%;
  height:300px;
  margin:10px auto 0px;
}
.category-part4-bg-img{
  width:100%;
  height:100%;
}

.category-part5 {
  height: 300px;
  text-align: center;
  margin-top:20px;
  /* background: url("../../assets/category-bg2.jpg") no-repeat center;
  background-size: cover; */
}
.category-part5-title{
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 48px;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
}
.category-part5-des{
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: rgba(102, 102, 102, 1);
  opacity: 1;
}
.category-part5-bg{
  width:80%;
  height:150px;
  margin:10px auto 0px;
}
.category-part5-bg-img{
  width:100%;
  height:100%;
}
.category-part6 {
  padding-top: 1px;
  text-align: center;
  height: 400px;
  background: url("http://wssbw-images.oss-cn-hangzhou.aliyuncs.com/trademark/web/35e7516c-1f8b-489e-b025-e9468ddd0cf6.png")
    no-repeat center;
  background-size: cover;
}
.category-part6-title {
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  opacity: 1;
  margin-top: 20px;
}
.category-part6-des {
  margin-top: 10px;
  height: 14px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  opacity: 1;
}
.category-part6-form {
  padding: 30px, 30px, 30px, 30px;
  width: 28%;
  height: 240px;
  margin: 10px auto 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  position: relative;
}
.category-part6-form-part1,
.category-part6-form-part2 {
  width: 88%;
  display: flex;
  justify-content: space-between;
}
.category-part6-form-part1 {
  position: absolute;
  top: 35px;
  left: 30px;
  height: 80px;
  line-height: 80px;
}
.category-part6-form-part2 {
  position: absolute;
  height: 35px;
  line-height: 35px;
  left: 35px;
  top: 145px;
}
.category-part6-form-part1-input,
.category-part6-form-part2-input {
  width: 80%;
}
.category-part6-form-part1-label {
}
.category-part6-form-part1-input {
  height: 80px;
}
.category-part6-form-button {
  position: absolute;
  left: 150px;
  top: 200px;
  background: rgba(253, 114, 55, 1);
  opacity: 1;
  border-radius: 5px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
}
</style>