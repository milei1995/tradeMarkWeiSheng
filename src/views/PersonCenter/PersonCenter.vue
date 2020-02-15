<template>
  <div class="container">
    <div class="left-menu">
      <div class="left-menu-header">
        <div class="header">
          <div v-if="!isheader" class='header1'>暂无头像</div>
          <img v-else :src='headerUrl' />
        </div>
      </div>
      <div class="left-menu-nav">
        <a-menu style="width: 100%" mode="vertical" >
          <a-menu-item key="1" @click='toPersonalSetting'>
            <a-icon type="setting" />个人设置
          </a-menu-item>
          <a-menu-item key="2" @click='toMyOrder'>
            <a-icon type="smile" />我的订单
          </a-menu-item>
        </a-menu>
      </div>
    </div>

    <div class="right-info">
        <router-view />
    </div>
  </div>
</template>

<script>
import {getStorage} from '../../mixin/storage'
export default {
  name: "personCenter",
  data(){
    return{
        isheader:false,
        headerUrl:''
    }
  },
  mounted(){
    const imgUrl=getStorage('headerImg')
    if(imgUrl){
      this.headerUrl=imgUrl
      this.isheader=true
    }else{
      this.isheader=false
    }
  },
  methods:{
      toPersonalSetting(){
          this.$router.push({path:'/personCenter/personalSetting'})
      },
      toMyOrder(){
          this.$router.push({path:'/personCenter/myOrder'})
      }
  }
};
</script>

<style lang="scss" scoped>
   .container{
       width:100%;
       height:650px;
       min-width: 1600px;
       display:flex;
       justify-content: space-around;
       padding:30px 20% 0px 20%;
       background-color: #E8ECEF;
       .left-menu{
           width:15%;
           min-width: 126px;;
           height:580px;
           background-color: #FFFEFF;
           .left-menu-header{
               width:100%;
               height:150px;
               padding-top:1px;
               border-bottom:1px solid black;
               .header{
                   width:100px;
                   height:100px;
                  //  line-height:100px;
                   text-align: center;
                   margin:25px auto 0px;
                   border-radius: 50%;
                   border:1px solid black;
                   .header1{
                      margin:35px auto;
                   }
                   img{
                     width:100%;
                     height:100%;
                     border-radius: 50%;
                   }
               }
           }
           .left-menu-nav{
               width:100%;
           }
       }
       .right-info{
           width:75%;
           min-width:780px;
           height:580px;
          //  border:1px solid black;
       }
   }

</style>

