<template>
  <div class="home-bg" style='margin-top:50px;'>
    <div class="home-bg1"></div>
    <div class="home-bg2"></div>
    <div class="home-bg3"></div>
  </div>
</template>

<script>
export default {
  name: "TrademarkHomeFooter"
};
</script>

<style scoped>
.home-bg1 {
  width: 100%;
  height: 520px;
  min-width: 1400px;
  background: url("../assets/home-bg1.jpg") no-repeat center;
  background-size: cover;
}
.home-bg2 {
  width: 100%;
  height: 520px;
  min-width: 1400px;
  background: url("../assets/home-bg2.jpg") no-repeat center;
  background-size: cover;
}
.home-bg3 {
  width: 100%;
  min-width: 1400px;
  height: 520px;
  background: url("../assets/home-bg3.jpg") no-repeat center;
  background-size: cover;
}
</style>