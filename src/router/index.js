import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from  '../views/Login/Login.vue'
import TrademarkBuy from '../views/TrademarkBuy/TrademarkBuy.vue'
import TrademarkCategory from '../views/TrademarkCategory/TrademarkCategory.vue'
import UserRegister from '../views/UserRegister/UserRegister.vue'
import TrademarkList from '../views/TrademarkList/TrademarkList.vue'
import TrademarkDetail from '../views/TrademarkDetail/TrademarkDetail.vue'
import WriteTrademarkInfo from '../components/WriteTrademarkInfo.vue'
import ChooseApplicant from '../components/ChooseApplicant.vue'
import PayOrder from '../components/PayOrder.vue'
import CommitTradermark from '../components/CommitTrademark.vue'
import ExpertApplication from '../views/ExpertApplication/ExpertApplication.vue'
import PersonCenter from '../views/PersonCenter/PersonCenter.vue'
import PersonalSetting from '../components/PersonalSetting.vue'
import MyOrder from '../components/MyOrder.vue'

Vue.use(Router)

const routes = [
    {
        path:'/',
        redirect: '/home'
    },
    {
       path:'/home',
       name:'home',
       component:Home
    },
    {
       path:'/trademarkBuy',
       name:'trademarkBuy',
       component:TrademarkBuy,
       children:[
           {
               path:'/trademarkBuy',
               name:'trademarkBuy',
               redirect:'/trademarkBuy/writeTrademarkInfo'
           },
           {
               path:'/trademarkBuy/writeTrademarkInfo',
               name:'writeTrademarkInfo',
               component:WriteTrademarkInfo
           },
           {
             path:'/trademarkBuy/chooseApplicant',
             name:'chooseApplicant',
             component:ChooseApplicant
           },
           {
               path:'/trademarkBuy/payOrder',
               name:'payOrder',
               component:PayOrder
           },
           {
               path:'/trademarkBuy/commitTrademark',
               name:'commitTrademark',
               component:CommitTradermark
           }
       ]
    },
    {
       path:'/expertApplication',
       name:'expertApplication',
       component:ExpertApplication
    },
    {
       path:'/trademarkCategory',
       name:'trademarkCategory',
       component:TrademarkCategory
    },
    {
       path:'/userRegister',
       name:'userRegister',
       component:UserRegister
    },
     {
         path: '/trademarkList',
         name: 'trademarkList',
         component: TrademarkList
     },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/detail',
        name:'detail',
        component:TrademarkDetail
    },
    {
        path:'/personCenter',
        name:'personCenter',
        component:PersonCenter,
        children:[
           {
               path:'/personCenter',
               name:'personCenter',
               redirect:'/personCenter/personalSetting'
           },
           {
               path: '/personCenter/personalSetting',
               name:'personalSetting',
               component:PersonalSetting
           },
           {
               path:'/personCenter/myOrder',
               name:'myOrder',
               component:MyOrder
           }
        ]
    }
   
] 

const router = new Router({
    routes
});

export default router;
