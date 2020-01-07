<template>
  <div>
     <trademark-search></trademark-search>
     <trademark-content></trademark-content>
     <trademark-home-footer></trademark-home-footer>
  </div>
</template>

<script>
import TrademarkSearch from '../../components/TrademarkSearch'
import TrademarkContent from '../../components/TrademarkHomeContent'
import TrademarkHomeFooter from '../../components/TrademarkHomeFooter'
export default {
   name:'home',
   components:{
     TrademarkSearch,
     TrademarkContent,
     TrademarkHomeFooter
   }
}
</script>

<style>

</style>