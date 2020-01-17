import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        keyword: '化学',
        searchType: '4',
        accessToken:'',//用户token
        userName:'',//用户名
        userId:''//用户Id
    },
    mutations: {
        updataKeyword(state, newData) {
            state.keyword = newData
        },
        updataSearchType(state,newType){
          state.searchType=newType
        },
        updataAssessToken(state,newToken){
          state.accessToken=newToken
        },
        updataUserName(state,newName){
            state.userName=newName
        },
        updataUserId(state,newId){
            state.userId=newId
        }
    }
})