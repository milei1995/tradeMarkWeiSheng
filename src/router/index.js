import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from  '../views/Login/Login.vue'
import TrademarkBuy from '../views/TrademarkBuy/TrademarkBuy.vue'
import TrademarkCategory from '../views/TrademarkCategory/TrademarkCategory.vue'
import TrademarkRegister from '../views/TrademarkRegister/TrademarkRegister.vue'


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
       component:TrademarkBuy
    },
    {
       path:'/trademarkCategory',
       name:'trademarkCategory',
       component:TrademarkCategory
    },
    {
       path:'/trademarkRegister',
       name:'trademarkRegister',
       component:TrademarkRegister
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
   
] 

const router = new Router({
    routes
});

export default router;
