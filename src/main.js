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


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Antd)
Vue.use(common)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
}).$mount('#app')