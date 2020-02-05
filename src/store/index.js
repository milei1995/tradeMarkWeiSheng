import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        keyword: '化学',
        searchType: '4',
        userName:'',//用户名
    },
    actions:{
      setUser({commit},item){
          commit('setUser',item)
      }
    },
    mutations: {
        updataKeyword(state, newData) {
            state.keyword = newData
        },
        updataSearchType(state,newType){
          state.searchType=newType
        },
        //设置登录信息
        setUser(state,item){
            state.userName=item
            sessionStorage.setItem('$user',JSON.stringify(state.userName))
        },
        //注销登录
        clearUser(state){
            state.userName=null
            sessionStorage.setItem('$user',JSON.stringify(state.userName))
        }
    }
})