<template>
  <div v-if='isShow' class="globalHeader">
    <img src="../bannerAndIcon/login-logo2.png" class="globalHeader-logo" />
    <div class="globalHearder-nav">
      <div
        class="globalHeader-nav-item"
        v-for="(item,index) in nav"
        :key="index"
        @click="chooseCategory(item.path)"
        :class="{active:item.path===$route.path}"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalHeader",
  data() {
    return {
      nav: [
        {
          name: "首页",
          path: "/home",
        },
        {
          name:'商标分类',
          path:'/trademarkCategory'
        },
        {
          name: "商标转让",
          path: "/trademarkList",
        },
        {
          name: "商标注册",
          path: "/trademarkBuy/writeTrademarkInfo",
        },
        {
          name: "专家申请",
          path: "/expertApplication",
        },
        {
          name: "登录",
          path: "/login",
        },
        {
          name: "免费注册",
          path: "/userRegister",
        }
      ],
      isShow:true,
      categoryIndex: 0
    };
  },
   watch:{
    $route(to,from){
         console.log(to,from)
         console.log(to.path)
         if(to.name==='login'||to.name==='userRegister'){
           this.isShow=false
         }else{
           this.isShow=true
         }
    }
   },
  methods: {
    chooseCategory(path) {
      // console.log(index);
      console.log(path)
      // this.categoryIndex = index;
      this.$router.push({path:path})
    }
  }
};
</script>

<style scoped>
.globalHeader {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
 
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  min-width: 1400px;
  height: 70px;
  
}
.globalHeader-logo {
  margin-top: 10px;
  margin-left: 22%;
  width: 205px;
  height: 51px;
}
.globalHearder-nav {
  display: flex;
  flex-wrap: nowrap;
  height: 31px;
  line-height: 31px;
  margin-top: 39px;
  margin-left: 13%;
}
.globalHeader-nav-item {
    cursor:pointer;
  margin-left: 20px;
  font-size: 16px;
  font-family: Source Han Sans CN;
}
.active {
  color: rgba(41, 158, 249, 1);
  border-bottom: 2px solid rgba(41, 158, 249, 1);
}
</style>