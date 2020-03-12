<template>
  <div class='home'>
     <trademark-search></trademark-search>
     <trademark-content></trademark-content>
     <trademark-home-footer></trademark-home-footer>
  </div>
</template>

<script>
import TrademarkSearch from '../../components/TrademarkSearch'
import TrademarkContent from '../../components/TrademarkHomeContent'
import TrademarkHomeFooter from '../../components/TrademarkHomeFooter'
import { getStorage } from '../../mixin/storage'
export default {
   name:'home',
   components:{
     TrademarkSearch,
     TrademarkContent,
     TrademarkHomeFooter
   },
   created(){
      // this.isLogin()
   },
   methods:{
     isLogin(){//判断是否登录
         const accessToken=getStorage('AccessToken')
         if(!accessToken){
           this.$router.push({path:'/login'})
         }
     }
   }
}
</script>

<style lang='scss' scoped>
   .home{
     width:100%;
     min-width:1400px;
     overflow-x:hidden;
     overflow-y:hidden;
   }
</style>