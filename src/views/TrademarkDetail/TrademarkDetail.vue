<template>
  <div class="detail">
    <div class="detail-banner">
      <div class="detail-banner-part1">
        <div class="detail-banner-part1-1">
          <img src="../../bannerAndIcon/detail-img.png" class="detail-banner-part1-1-bg" />
        </div>
        <div class="detail-banner-part1-2">
          <div class="detail-banner-part1-2-des1">
            <span class="des1-1">韩庭</span>
            <span class="des1-2">多类别</span>
            <span class="des1-3">交易类型:转让</span>
          </div>
          <div class="detail-banner-part1-2-des2"></div>
          <div class="detail-banner-part1-2-des3"></div>
        </div>
        <div class="detail-banner-part1-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  min-width: 1400px;
  .detail-banner {
    width: 100%;
    height: 364px;
    background: rgba(243, 243, 243, 1);
    opacity: 1;
    .detail-banner-part1 {
      padding: 25px 20% 25px 20%;
      display: flex;
      justify-content: space-between;
      .detail-banner-part1-1 {
        width: 30%;
        min-width: 266px;
        height: 260px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(232, 232, 232, 1);
        opacity: 1;
        padding: 20px 20px 20px 20px;
        .detail-banner-part1-1-bg {
          width: 100%;
          height: 100%;
        }
      }
      .detail-banner-part1-2 {
        width: 46%;
        min-width: 392px;
        height: 260px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(232, 232, 232, 1);
        opacity: 1;
        border-radius: 10px;
        .detail-banner-part1-2-des1 {
          width:100%;
          line-height:50px;
          height:50px;
          display: flex;
          .des1-1 {
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
          .des1-2 {
            width: 56px;
            height:28px;
            background: rgba(41, 158, 249, 1);
            opacity: 1;
            border-radius: 5px;
          }
          .des1-3 {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            opacity: 1;
          }
        }
      }
      .detail-banner-part1-3 {
        width: 20%;
        min-width: 168px;
        height: 289px;
        background: rgba(50, 182, 227, 1);
        opacity: 1;
        border-radius: 10px;
      }
    }
  }
}
</style>