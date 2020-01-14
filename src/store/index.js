import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        keyword: '化学',
        searchType: '4'
    },
    mutations: {
        updataKeyword(state, newData) {
            state.keyword = newData
        },
        updataSearchType(state,newType){
          state.searchType=newType
        }
    }
})