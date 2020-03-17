<template>
   <div>
       <a-modal
      title="温馨提示"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
     <div class='modalContent'>
         <span style="font-size:16px;">自助申请适合对商标法能深入理解、对商标申请流程以及近似判断很熟悉的用户，您是否满足这些条件？</span>
         <p style="color:#000000;font-size:14px;margin-top:10px;">①商标申请可能被驳回，目前行业普遍50%的成功率 </p>
         <p style="color:#000000;font-size:14px;">②不可以申请商标名为"生日快乐"这种类型</p>
         <p style="color:#000000;font-size:14px;">③别人申请了红太阳，我不可以申请红太阳</p>
         <p style="color:#000000;font-size:14px;">④图像文字组合在一起，并不会提高申请成功率</p>
         <p style="color:#000000;font-size:14px;">⑤我不可以申请商标名为"碳烤鱼"在餐馆项目上</p>
         <p style="color:#000000;font-size:14px;text-align:center;">自助申请,成功率仅有<span style="color:red;font-size:20px;">50%</span>左右</p>
         <p style="color:red;font-size:14px;text-decoration:underline;cursor:pointer;" @click="toExpertApplication">如果上面的商标规则您还不够了解,建议你选择专家申请来提高成功率>></p>
     </div>
     
    </a-modal>
   </div>
  
</template>

<script>
export default {
  name:'Reminder',
  data(){
      return{
         visible: true,
        confirmLoading: false,
      }
  },
  methods:{
       showModal() {
        this.visible = true;
      },
      handleOk() {
        this.visible=false;
      },
      handleCancel() {
        this.visible = false;
      },
      toExpertApplication(){
          this.$router.push({path:'/expertApplication'})
      }
  }
}
</script>

<style>

</style>