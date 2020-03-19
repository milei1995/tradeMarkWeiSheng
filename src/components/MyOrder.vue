<template>
  <div class='myOrder'>
     <div class='title'>我的订单</div>
     <div class='myOrder-content'>
          <a-table :columns="columns" :dataSource="data" bordered  :pagination="pagination" :rowSelection="rowSelection"/> 
          <div class='tobuy' @click='tobuy'>
            去购买
            </div>
          <div class='openOrderDetail' @click='searchDetail'>
            查看详情
          </div>
           <div v-if='hasDetail'>
             <order-detail :currentRecord="selectRows" ref='orderDetailModal'></order-detail>
          </div>
     </div>    
  </div>
</template>

<script>
import OrderDetail from './orderDetail'
const columns = [
  {
  title: '订单号',
  dataIndex: 'orderNo',
  scopedSlots: { customRender: 'name' },
}, {
  title: '商标名',
  className: 'column-money',
  dataIndex: 'trademarkName',
}, 
{
  title:'状态',
  dataIndex:'payStatus',
    customRender: text => {
      let res = "";
      if (text === 0) {
        res = "未支付";
      }
      if (text === 1) {
        res = "支付成功";
      }
      if (text === 2) {
        res = "退款";
      }
      return res;
    }
},{
  title:'支付/开通时间',
  dataIndex:'createTime'
},{
  title:'应付金额',
  dataIndex:'totalPrice'
}

];

import { getStorage } from '../mixin/storage'
export default {
   name:'myOrder',
   components:{
      OrderDetail
   },
   data(){
     return{
       columns,//表头
       data:[],//表格数据
       pagination:{
         current:null,
         total:null,
         pageSize:5,
         onChange:this.pageChange
       },   
      selectRows:{},//单选的订单信息
      hasDetail:false
     }
   },
   computed:{
     rowSelection() {
      return {
        type:'radio',
        defaultValue:0,
        onChange: this.onSelectChange,
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }
        }),
      }
    }
   },
   mounted(){
       this.getOrderData(1)
   },
   methods:{
     onSelectChange(selectedRowKeys, selectedRows){
       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.selectRows=selectedRows[0]
        console.log(this.currentRecord)
     },
    
     getOrderData(page){
       const url='/api/trademark/trademarkOrder/selectOrderPageList'
       const accessToken=getStorage('AccessToken')
       const headers={
         accessToken:accessToken
       }
       const params={
         page:page,
         pageSize:5
       }
       this.$axios({
         method:'get',
         url:url,
         params:params,
         headers:headers
       }).then(res=>{
         console.log(res)
         if(res.data.success){
            this.pagination.total=res.data.data.total
            this.data=res.data.data.list
         }
       })
     },
     pageChange(page){
        console.log(page)
        this.pagination.current=page
        this.getOrderData(page)
     },
     tobuy(){
       const selectedRows=this.selectRows
       console.log(selectedRows)
      if(JSON.stringify(selectedRows) === '{}'){
        this.$message.error('请选择订单号')
      }else{
        console.log(selectedRows)
        if(selectedRows.payStatus===0){
          this.$router.push({path:'/trademarkBuy/payOrder',query:{orderNo:selectedRows.orderNo,payType:'1',orderType:'2'} })
        }else{
          this.$message.warning('此订单已经付款')
        }
      }
     },
     searchDetail(){
        const selectedRows=this.selectRows
      if(JSON.stringify(selectedRows) === '{}'){
        this.hasDetail=false
        this.$message.error('请选择订单号')
      }else{
        this.hasDetail=true
        this.$refs.orderDetailModal.showModal()
      }
     }

   }
}
</script>

<style lang="scss" scoped>
  .myOrder{
    width:100%;
    .title{
      width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fd7237;
    font-weight: bold;
    font-family: Source Han Sans CN;
    background-color: #fffeff;
    }
    .myOrder-content{
    width: 100%;
    height:530px;
    padding: 15px 15px 15px 15px;
    background-color: #fffeff;
    position:relative;
      .tobuy{
        position:absolute;
        bottom:35px;
        left:100px;
        width:100px;
        height:30px;
        line-height: 30px;
        text-align:center;
        background:rgba(255,90,96,1);
        opacity:1;
        color:#fffeff;
        cursor: pointer;
      }
      .openOrderDetail{
         position:absolute;
        bottom:35px;
        left:220px;
        width:100px;
        height:30px;
        line-height: 30px;
        text-align:center;
        background:#007ACC;
        opacity:1;
        color:#fffeff;
        cursor: pointer;
      }
    }
  }
</style>>

