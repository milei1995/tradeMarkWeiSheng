<template>
  <div class="modal1">
    <a-modal
      :visible="visible"
      title='提交成功'
      @ok="handleOk"
      @cancel="handleCancel"
      okText='确定'
      cancelText='取消'
    >
      <p>已经收到您的询价留言，正在为您派遣商标顾问，
请耐心等待！</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "TrademarkModal3",
  data(){
      return {
          visible:false,
      }
  },
   methods: {
    showModal() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
      this.$emit('toNextModal2')
    },
    handleCancel() {
      this.visible = false
    },
  }
};
</script>

<style lang="sass" scoped>

</style>