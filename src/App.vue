<template>
  <div id="app">
    <global-header></global-header>
     <router-view v-if='isRouterAlive'></router-view>
     <global-footer></global-footer>
  </div>
</template>

<script>


export default {
  name: 'app',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
   return {
     isRouterAlive:true
   }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style>

</style>
