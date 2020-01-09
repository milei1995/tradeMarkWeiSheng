<template>
  <div class="globalHeader">
    <img src="../bannerAndIcon/login-logo2.png" class="globalHeader-logo" />
    <div class="globalHearder-nav">
      <div
        class="globalHeader-nav-item"
        v-for="(item,index) in nav"
        :key="index"
        @click="chooseCategory(index)"
        :class="{active:categoryIndex==index}"
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
          path: "home"
        },
        {
          name: "商标转让",
          path: "1111"
        },
        {
          name: "商标注册",
          path: "2222"
        },
        {
          name: "专家申请",
          path: "3333"
        },
        {
          name: "登录",
          path: "login"
        },
        {
          name: "免费注册",
          path: "4444"
        }
      ],
      categoryIndex: 0
    };
  },
  methods: {
    chooseCategory(index) {
      console.log(index);
      this.categoryIndex = index;
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