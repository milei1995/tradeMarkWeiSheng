<template>
  <div class="trademarkUpload">
    <div class="title">商标转让</div>
    <div class="upload-content">
      <div class='search-area'>
         <a-button icon='plus' type='primary' @click='handleAdd' >新增</a-button>
      </div>
      <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" style="margin-top:5px;">
        <span slot="imgSlot" slot-scope="text, record">
          <a-popover title="图片详情">
            <template slot="content">
              <img :src="record.tmImg" style="width:200px;height:200px;" />
            </template>
            <img :src="record.tmImg" style="width:60px;height:60px;" />
          </a-popover>
        </span>
        <span slot="action" slot-scope="text, record">
           <a @click="edit(record)">编辑</a>
           <a-divider type="vertical" />
           <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <a-modal :visible="visible"
      title="精选商标新增"
      width="1400px"
      @ok="handleOk"
      @cancel="handleCancel">
          <a-form :form="tradeMarkForm"> 
             <a-row :gutter="24">
               <a-col :span="8" >
                  <a-form-item  style='display:flex;' label='商标注册号'>
                      <a-input />
                  </a-form-item>
               </a-col>
               <a-col :span="8">
                  <a-form-item  style='display:flex;' label='商标名称'>
                      <a-input />
                  </a-form-item>
               </a-col>
               <a-col :span="8">
                  <a-form-item   style='display:flex;' label='注册公告日期'>
                      <a-input />
                  </a-form-item>
               </a-col>
               <a-col :span="8">
                  <a-form-item  style='display:flex;' label='公司名称'>
                      <a-input />
                  </a-form-item>
               </a-col>
                <a-col :span="8">
                  <a-form-item  style='display:flex;' label='商标状态'>
                      <a-input />
                  </a-form-item>
               </a-col>
               <a-col :span="8">
                  <a-form-item  style='display:flex;' label='商标注册地址'>
                      <a-input />
                  </a-form-item>
               </a-col>
               <a-col :span="8">
                  <a-form-item  style='display:flex;' label='商标价格'>
                      <a-input />
                  </a-form-item>
               </a-col>
               <a-col :span="8">
                  <a-form-item  style='display:flex;' label='备注'>
                      <a-input />
                  </a-form-item>
               </a-col>
             </a-row>
             <a-row :gutter="24">
                <a-col :span="10">
                  <a-form-item style='display:flex;' label="图片上传">
                     <upload-pic />
                  </a-form-item>
                </a-col>
             </a-row>
          </a-form>
          <div><trade-mark-category /></div>
    </a-modal>

  </div>
</template>

<script>
import UploadPic from './UploadPic'
import TradeMarkCategory  from './tradeMarkCategory/index'
const columns = [
  { title: "商标注册号", dataIndex: "regNo", width: 80 },
  { title: "商标名称", dataIndex: "tmName", width: 80 },
  {
    title: "商标图片",
    dataIndex: "tmImg",
    width: 100,
    scopedSlots: { customRender: "imgSlot" }
  },
  { title: "商标价格", dataIndex: "tmPrice", width: 80 },
  {
    title: "审核状态",
    dataIndex: "verifyStatus",
    width: 80,
    customRender: text => {
        let res=''
        if(text===0){
            res='审核中'
        }
        if(text===1){
            res="审核成功"
        }
        return res
    }
  },
  { title: "操作", dataIndex: "action", width: 150,scopedSlots:{customRender:"action"} }
];
import { getStorage } from "../mixin/storage";
export default {
  name: "trademarkUpload",
  components: {
    UploadPic,
    TradeMarkCategory
  },
  data() {
    return {
      columns,
      data: [], //表格数据
      pagination: {
        current: 1,
        total: null,
        pageSize: 5,
        onChange: this.pageChange
      },
      visible:false,
      form: this.$form.createForm(this),
    };
  },
  mounted() {
    this.getUploadData(1);
  },
  methods: {
    getUploadData(page) {
      const url =
        "/api/trademark/carefullyChosenTrademark/queryCarefullyChosenTrademarkList";
      const accessToken = getStorage("AccessToken");
      const headers = {
        accessToken: accessToken
      };
      const params = {
        page: page,
        pageSize: 5
      };
      this.$axios({
        method: "post",
        url: url,
        data: params,
        headers: headers
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.pagination.total = res.data.data.total;
          this.data = res.data.data.list;
        }
      });
    },
    pageChange() {

    },
    handleOk() {
      this.visible=false
    },
    handleCancel() {
      this.visible = false;
    },
    edit(record){
       console.log(record)
    },
    handleDelete(record){
      console.log(record)
    },
    handleAdd(){ //新增
      this.visible=true
    }
  }
};
</script>

<style  scoped>
.trademarkUpload {
  width: 100%;
}
.title {
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
.upload-content {
    width: 100%;
    height: 530px;
    padding: 15px 15px 15px 15px;
    background-color: #fffeff;
  }


.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

</style>