<template>
  <div class="modal1">
    <a-modal
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      okText='确定'
      cancelText='取消'
    >
      <p>请耐心等待，马上会有客服联系您！</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "TrademarkModal1",
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
    },
    handleCancel() {
      this.visible = false
    },
  }
};
</script>

<style lang="sass" scoped>

</style>