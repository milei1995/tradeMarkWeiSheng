<template>
  <div class='myOrder'>
     <div class='title'>我的订单</div>
     <div class='myOrder-content'>
          <a-table :columns="columns" :dataSource="data" bordered  :pagination="pagination" :rowSelection="rowSelection"/> 
          <div class='tobuy' @click='tobuy'>
            去购买
            </div>
     </div>
  </div>
</template>

<script>
const columns = [
  {
  title: '订单号',
  dataIndex: 'orderNo',
  scopedSlots: { customRender: 'name' },
}, {
  title: '商标名',
  className: 'column-money',
  dataIndex: 'production',
}, 
{
  title:'状态',
  dataIndex:'state'
},{
  title:'支付/开通时间',
  dataIndex:'createTime'
},{
  title:'应付金额',
  dataIndex:'payMoney'
}

];

// const data = [{
//   key: '1',
//   name: 'John Brown',
//   money: '￥300,000.00',
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   money: '￥1,256,000.00',
//   address: 'London No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'Joe Black',
//   money: '￥120,000.00',
//   address: 'Sidney No. 1 Lake Park',
// }];
import { getStorage } from '../mixin/storage'
export default {
   name:'myOrder',
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
      selectRows:{}//单选的订单信息

     }
   },
   computed:{
     rowSelection() {
      return {
        type:'radio',
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
        this.selectedRows=selectedRows[0]
        console.log(this.selectedRows)
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
            const dataArray=[]
            res.data.data.orderList.forEach(item=>{
               const obj={
                 orderNo:item.orderNo,
                 createTime:item.createTime,
                 production:item.trademarkName,
                 payMoney:item.totalPrice
               }
               if(item.payStatus===0){
                 obj.state='未支付'
               }
               if(item.payStatus===1){
                 obj.state='已支付'
               }
               if(item.payStatus===3){
                 obj.state='退款'
               }
               dataArray.push(obj)
               this.data=dataArray
               this.pagination.total=res.data.data.total
              //  this.pagination.pageSize=Math.ceil(res.data.data.total/5)
            })
         }
       })
     },
     pageChange(page){
        console.log(page)
        this.pagination.current=page
        this.getOrderData(page)
     },
     tobuy(){
       const selectedRows=this.selectedRows
      if(selectedRows===undefined){
        this.$message.error('请选择订单号')
      }else{
        this.$router.push({path:'/trademarkBuy/payOrder',query:{orderNo:selectedRows.orderNo,payType:'1',orderType:'2'} })
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
    }
  }
</style>>

