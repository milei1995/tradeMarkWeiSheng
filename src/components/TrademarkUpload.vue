<template>
  <div class="trademarkUpload">
    <div class="title">商标转让</div>
    <div class="upload-content">
      <div class="search-area">
        <a-button icon="plus" type="primary" @click="handleAdd">新增</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="data"
        bordered
        :pagination="pagination"
        style="margin-top:5px;"
      >
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
    <a-modal
      :visible="visible"
      :title="type==='add'?'精选商标新增':'精选商标编辑'"
      width="1400px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="tradeMarkForm">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item style="display:flex;" label="商标注册号">
              <a-input v-decorator="['regNo',validatorRules.regNo]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="商标名称">
              <a-input v-decorator="['tmName',validatorRules.tmName]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="注册公告日期">
              <!-- <a-date-picker :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')" v-decorator="['regDate',validatorRules.regDate]" /> -->
              <a-input v-decorator="['regDate',validatorRules.regDate]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="公司名称">
              <a-input v-decorator="['agency',validatorRules.agency]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="商标状态">
              <a-select
                v-decorator="['currentStatus',validatorRules.currentStatus]"
                style="width:150px;"
              >
                <a-select-option :value="'1'">商标审查</a-select-option>
                <a-select-option :value="'2'">商标形式审查</a-select-option>
                <a-select-option :value="'3'">商标异议</a-select-option>
                <a-select-option :value="'4'">商标有效注册</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="商标注册地址">
              <a-input v-decorator="['registerAddress',validatorRules.registerAddress]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="商标价格">
              <a-input v-decorator="['tmPrice',validatorRules.tmPrice]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item style="display:flex;" label="备注">
              <a-input v-decorator="['remark',validatorRules.remark]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="10">
            <a-form-item style="display:flex;" label="图片上传">
              <upload-pic
                :type="'商标上传'"
                @getImageUrl7="setUploadImg"
                :imageUrlFromParent="imgUrl"
                ref="uploadPic"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div>
        <trade-mark-category
          v-if="hackReset"
          @selectGoods="selectGoods"
          @reduceGoods="reduceGoods"
          :currentOrderGoods="currentOrderGoods"
          ref="goodsSelectModal"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
// const _ = require('lodash/object');
import UploadPic from "./UploadPic";
import TradeMarkCategory from "./tradeMarkCategory/index";
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
      let res = "";
      if (text === 0) {
        res = "审核中";
      }
      if (text === 1) {
        res = "审核成功";
      }
      return res;
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    width: 150,
    scopedSlots: { customRender: "action" }
  }
];
import { getStorage } from "../mixin/storage";
const accessToken = getStorage("AccessToken");
const headers = {
  accessToken: accessToken
};
export default {
  name: "trademarkUpload",
  components: {
    UploadPic,
    TradeMarkCategory
  },
  data() {
    return {
      columns,
      type: "", //是新增还是编辑
      data: [], //表格数据
      imgUrl: "", //图片url
      currentRecored: {}, //当前选中的商标详情
      currentOrderGoods: [], //当前选中的商标详情里的选择商品
      pagination: {
        current: 1,
        total: null,
        pageSize: 5,
        onChange: this.pageChange
      },
      visible: false,
      tradeMarkForm: this.$form.createForm(this),
      validatorRules: {
        regNo: {
          rules: [{ required: true, message: "请填写商标注册号" }]
        },
        tmName: {
          rules: [{ required: true, message: "请填写商标名称" }]
        },
        regDate: {
          rules: [{ required: false }]
        },
        agency: {
          rules: [{ require: false }]
        },
        currentStatus: {
          rules: [{ required: true, message: "请选择商标状态" }],
          initialValue: "4"
        },
        remark: {
          rules: [{ required: false }]
        },
        registerAddress: {
          rules: [{ required: false }]
        },
        tmPrice: {
          rules: [{ required: true, message: "请输入价格" }]
        }
      },
      orderGoods: [], //选择的商标
      hackReset: true ///
    };
  },
  mounted() {
    this.getUploadData(1);
  },
  methods: {
    getCurrentData() {
      return new Date().toLocaleDateString();
    },
    getUploadData(page) {
      const url =
        "/api/trademark/carefullyChosenTrademark/queryCarefullyChosenTrademarkList";
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
    pageChange() {},
    handleOk() {
      this.tradeMarkForm.validateFields((err, value) => {
        if (!err) {
          const values = value;
          // values.regDate=(value.regDate).formart("YYYY-MM-DD")
          if (this.type === "add") {
            const url =
              "/api/trademark/carefullyChosenTrademark/addCarefullyChosenTrademark";
            const params = {
              orderGoods: this.orderGoods,
              tmImg: this.imgUrl,
              ...values
            };
            console.log(params);
            this.$axios({
              method: "post",
              url: url,
              data: JSON.stringify(params),
              headers: headers
            }).then(res => {
              console.log(res);
              if (res.data.success) {
                this.$message.success("添加成功");
                this.getUploadData(1);
                this.visible = false;
              }
            });
          }
          if (this.type === "edit") {
            console.log("edit");
            const url =
              "/api/trademark/carefullyChosenTrademark/updateCarefullyChosenTrademark";
            const params = {
              orderGoods: this.orderGoods,
              tmImg: this.imgUrl,
              ...values,
              trademarCarefullyChosenId: this.currentRecored
                .trademarCarefullyChosenId
            };
            console.log(params);
            this.$axios({
              method: "post",
              url: url,
              data: JSON.stringify(params),
              headers: headers
            }).then(res => {
              console.log(res);
              if (res.data.success) {
                this.$message.success("修改成功");
                this.getUploadData(1);
                this.visible = false;
              }
            });
          }
        }
      });

      // this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    edit(record) {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
      console.log(record);
      this.currentOrderGoods = record.orderGoods;
      this.orderGoods = record.orderGoods;
      // this.tradeMarkForm.setFieldsValue({['regNo']:record.regNo})
      this.validatorRules.regNo.initialValue = record.regNo;
      this.validatorRules.tmName.initialValue = record.tmName;
      this.validatorRules.regDate.initialValue = record.regDate;
      this.validatorRules.agency.initialValue = record.agency;
      this.validatorRules.currentStatus.initialValue = record.currentStatus;
      this.validatorRules.remark.initialValue = record.remark;
      this.validatorRules.registerAddress.initialValue = record.registerAddress;
      this.validatorRules.tmPrice.initialValue = record.tmPrice;
      this.imgUrl = record.tmImg;
      console.log(this.imgUrl);
      // this.$refs.goodsSelectModal.selectedClone=record.orderGoods
      // this.$refs.goodsSelectModal.selected=record.orderGoods
      // this.$refs.uploadPic.imageUrl=record.tmImg
      this.visible = true;
      this.type = "edit";
      this.currentRecored = record;

      // this.visible = true;
    },
    handleDelete(record) {
      console.log(record);
      const url =
        "/api/trademark/carefullyChosenTrademark/deleteCarefullyChosenTrademark";
      const params = {
        trademarCarefullyChosenId: record.trademarCarefullyChosenId
      };
      this.$axios({
        method: "post",
        url: url,
        data: params,
        headers: headers
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.$message.success("删除成功");
          this.getUploadData(1);
        }
      });
    },
    handleAdd() {
      //新增
      this.currentOrderGoods = [];
      this.orderGoods = [];
      this.type = "add";
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true; //强制刷新子组件
      });
      this.validatorRules.regNo.initialValue = '';
      this.validatorRules.tmName.initialValue = '';
      this.validatorRules.regDate.initialValue = '';
      this.validatorRules.agency.initialValue = '';
      this.validatorRules.currentStatus.initialValue = '';
      this.validatorRules.remark.initialValue = '';
      this.validatorRules.registerAddress.initialValue = '';
      this.validatorRules.tmPrice.initialValue = '';
      this.imgUrl=''
      this.visible = true;
    },
    setUploadImg(imgUrl) {
      console.log(imgUrl);
      this.imgUrl = imgUrl;
    },
    selectGoods(goods) {
      console.log(goods);
      this.orderGoods = goods;
    },
    reduceGoods(goods) {
      console.log(goods);
      this.orderGoods = goods;
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