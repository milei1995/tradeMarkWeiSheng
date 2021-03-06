import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import common from './components/common'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import qs from 'qs'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Antd)
Vue.use(common)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (let it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]

Vue.prototype.$axios = axios;

router.beforeEach(({meta,path},from,next) => {
  let {auth=true}=meta;//该路由是否需要登录
  let $user=JSON.parse(sessionStorage.getItem('$user'))||{};
  let isLogin=Boolean($user.auth) //true用户已经登录，false用户未登录
  console.log(isLogin)
  if(!auth && !isLogin &&path!='/login'){
    return next({path:'/login'})
  }else{
    next()
  }
})

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
}).$mount('#app')