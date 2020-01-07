import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  el:'#app',
   router,
   store,
}).$mount('#app')
