<template>
  <div v-if="isShow" class="globalHeader">
    <img src="../bannerAndIcon/login-logo2.png" class="globalHeader-logo" @click="goHome" />
    <div class="globalHearder-nav">
      <div
        class="globalHeader-nav-item"
        v-for="(item,index) in nav"
        :key="index"
        @click="chooseCategory(item.path)"
        :class="{active:item.path===$route.path}"
      >{{item.name}}</div>
      <div class="globalHeader-nav-item" :class="{active:$router.path==='/login'}">
        <span v-if="!isLogin" @click="chooseCategory('/login')">登录</span>
        <span v-else>
          <a-dropdown>
            <div class="ant-dropdown-link" href="#">
               <span style='color:rgba(41, 158, 249, 1);'> {{userName}}</span>
              <a-icon type="down" style='color:rgba(41, 158, 249, 1);'/>
            </div>
            <a-menu slot="overlay">
              <a-menu-item>
                <div @click='toPersonCenter' :class="{active:$router.path==='/personCenter'}">个人中心</div>
              </a-menu-item>
              <a-menu-item>
                <div  @click='logout'>注销</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {removeStorage,getStorage} from '../mixin/storage'
export default {
  name: "globalHeader",
  data() {
    return {
      nav: [
        {
          name: "首页",
          path: "/home"
        },
        {
          name: "商标分类",
          path: "/trademarkCategory"
        },
        {
          name: "商标列表",
          path: "/trademarkList"
        },
        {
          name: "商标注册",
          path: "/trademarkBuy/writeTrademarkInfo"
        },
        {
          name: "专家申请",
          path: "/expertApplication"
        },
        // {
        //   name: "登录",
        //   path: "/login"
        // },
        {
          name: "免费注册",
          path: "/userRegister"
        }
      ],
      isShow: true,
      categoryIndex: 0,
      isLogin: false
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      const accessToken=getStorage('AccessToken')
     const userName=getStorage('UserName')
      if(!accessToken){
        this.isLogin=false
      }else{
        this.isLogin=true
        this.userName=userName
      }
      if (to.name === "login" || to.name === "userRegister") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },
  mounted(){
     const accessToken=getStorage('AccessToken')
     const userName=getStorage('UserName')
      if(!accessToken){
        this.isLogin=false
      }else{
        this.isLogin=true
        this.userName=userName
      }
  },
  methods: {
    ...mapMutations(['clearUser']),
    chooseCategory(path) {
      this.$router.push({ path: path });
    },
    goHome() {
      this.$router.push({ path: "/home" });
    },
    logout(){
      this.clearUser();
      removeStorage('AccessToken')
      removeStorage('UserName')
      removeStorage('UserId')
      this.$router.push({path:'/login'})
    },
    toPersonCenter(){
      this.$router.push({path:'/personCenter'})
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
  cursor: pointer;
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
  cursor: pointer;
  margin-left: 20px;
  font-size: 16px;
  font-family: Source Han Sans CN;
}
.active {
  color: rgba(41, 158, 249, 1);
  border-bottom: 2px solid rgba(41, 158, 249, 1);
}
</style>