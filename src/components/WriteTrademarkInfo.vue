<template>
  <div class="info">
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标类型">
        <a-radio-group
          :options="plainOptions"
          v-decorator="['type',validatorRules.type]"
          @change="tradeMarkTypeChange"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标名称">
        <a-input placeholder="请输入商标名称" v-decorator="[ 'name', validatorRules.name]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标说明">
        <a-textarea placeholder="请输入商标说明" v-decorator="[ 'explain', validatorRules.explain]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标图样">
        <a-radio-group
          :options="picOptions"
          @change="picTypeChange"
          v-decorator="[ 'pic', validatorRules.pic]"
        />
        <!-- 自动生成 -->
        <div v-if="isAutoPic" class="creatpicture">
          <div class="pic-area">
            <span>{{autoContent}}</span>
          </div>
          <a-button @click="autoCreatePic">生成图片</a-button>
        </div>
        <!-- 手动生成 -->
        <div v-else class="pic-area-manual">
          <upload-pic :type="'手动上传商标图样'" @getImageUrl="getUploadImageUrl" />
        </div>
        <div class="tips">
          <p class="tips-1">
            <a-icon type="info-circle" />商标含有文字不应过多，文字过多易造成商标显著性不强而被驳回。
          </p>
          <p class="tips-2">申请商标应符合法律规定，请勿模仿或复制他人已经注册的商标，以免因犯他人的合法权益。</p>
        </div>
      </a-form-item>
    </a-form>
    <div class="info-table">
      <!-- <div class="info-table-part1">
        <div class="info-table-part1-1">选择推荐方案</div>
        <a-select placeholder="请选择领域">
          <a-select-option value="jack">领域1</a-select-option>
          <a-select-option value="lucy">领域2</a-select-option>
        </a-select>
        <a-button>添加所选方案</a-button>
      </div>
      <div class="info-table-part2">
        <div class="info-table-part2-1">常用商标类别</div>
        <div class="info-table-part2-2">暂无商标类别</div>
      </div>-->
      <div class="info-table-part3">
        <div class="info-table-part3-1">
          <div class="info-table-part3-1-left">
             <div style='line-height:40px;'>请根据下方商标类型挑选您所需要的商标</div>
            <!-- <a-input-search placeholder="请输入搜索关键字，如:针筒" />
            <span class="cancel">取消</span> -->
          </div>
          <div class="info-table-part3-1-right">
            <span class="choose">已经选择的商标类型</span>
            <!-- <a-button class="save-btn" disabled>保存当前类别</a-button>
            <a-button class="clear-btn" disabled>清除全部</a-button> -->
          </div>
        </div>
        <div class="info-table-part3-2">
          <div class="info-table-part3-2-left">
            <trademark-tree @onExpandItem="getExpandItem" @onCheckItem="getCheckItem" />
          </div>
          <div class="info-table-part3-2-right">
            <div
              class="info-table-part3-2-right-item"
              v-for="(item,index) in CheckedItem"
              :key="index"
            >
              <div class="info-table-part3-2-right-item-isShow" v-if="item.selectChild.length>0">
                <div class="info-table-part3-2-right-item-title">{{item.title}}</div>
                <div class="info-table-part3-2-right-item-price">￥{{item.price}}</div>
                <div>
                  <a-tag v-for="(item2,index2) in item.selectChild" :key="index2">{{item2.title}}</a-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-part1">应付金额</div>
      <div class="footer-part2">￥{{totalPrice}}</div>
      <a-button class="footer-part3" @click="toNext">下一步</a-button>
    </div>
  </div>
</template>

<script>
import { getStorage } from "../mixin/storage";
import UploadPic from "./UploadPic";
import TrademarkTree from "./TrademarkTree";
import { filterUnderfind } from "../untils/filterUnderfind";
export default {
  name: "info",
  components: {
    UploadPic,
    TrademarkTree
  },
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      validatorRules: {
        type: {
          rules: [{ required: true, message: "请选择类型!" }],
          initialValue: ""
        },
        name: { rules: [{ required: true, message: "请输入商标名称!" }] },
        explain: {},
        pic: { rules: [{ required: true, message: "请上传商标图样!" }] }
      },
      plainOptions: ["文字商标", "图形商标", "文字图形组合商标"],
      picOptions: ["自动生成", "手动上传"],
      isAutoPic: true, //自动生成图片or手动生成图片
      autoContent: "", //自动生成内容
      ManualImgUrl: "", //手动上传图片url
      onExpected: [], //已经展开的树结构
      onChecked: [], //已经选择的树结构
      CheckedItem: [], //已经选中的商标
      paramsPart1: {
        orderType: "1"
      } //请求时的参数
    };
  },

  mounted() {
    // this.getClassifyGoods()
  },
  computed: {
    totalPrice() {
      const CheckedItem = this.CheckedItem;
      let total = null;
      CheckedItem.forEach(item => {
        if (item.selectChild.length > 0) {
          // item.price = 0.01;
          total += Number(item.price);
        } else {
          item.price = 0;
        }
      });
      return total;
    }
  },
  watch: {
    CheckedItem(newChecked, oldChecked) {
      console.log(newChecked, oldChecked);
    }
  },
  methods: {
    tradeMarkTypeChange(e) {
      console.log(e.target.value);
    },
    getUploadImageUrl(imgUrl) {
      //获取手动上传的图片Url
      this.ManualImgUrl = imgUrl;
      this.paramsPart1.trademarkImage = imgUrl;
    },
    toNext() {
      const accessToken=getStorage('AccessToken')
      if(accessToken){
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.paramsPart1.trademarkExplain = values.explain;
          this.paramsPart1.trademarkName = values.name;
          switch (values.type) {
            case "文字商标":
              this.paramsPart1.trademarkStatus = "1";
              break;
            case "图形商标":
              this.paramsPart1.trademarkStatus = "2";
              break;
            case "文字图形整合商标":
              this.paramsPart1.trademarkStatus = "3";
              break;
          }
          console.log(this.paramsPart1);
          this.$router.push({
            path: "/trademarkBuy/chooseApplicant",
            query: {
              paramsPart1: this.paramsPart1,
              totalPrice: this.totalPrice
            }
          });
        }
      });
      }else{
        this.$message.error('请先登录')
      }
    },
    picTypeChange(e) {
      console.log(e);
      if (e.target.value === "自动生成") {
        this.isAutoPic = true;
      }
      if (e.target.value === "手动上传") {
        this.isAutoPic = false;
      }
    },
    autoCreatePic() {
      const tradeMarkname = this.form.getFieldValue(["name"]).me;
      console.log(tradeMarkname);
      if (tradeMarkname !== undefined) {
        this.autoContent = tradeMarkname;
        this.paramsPart1.trademarkImage = "";
      } else {
        this.$message.warning("请输入要填写的商标名称");
      }
    }, //
    getExpandItem(value) {
      console.log(value);
      const originTreeData = getStorage("treeData");
      const onExpandArray = [];
      value.forEach(item => {
        const onExpandItem = originTreeData.filter(treeDataItem => {
          return treeDataItem.key === item;
        });
        onExpandArray.push(onExpandItem[0]);
      });
      console.log(onExpandArray);
      this.onExpected = onExpandArray;
    },
    getCheckItem(value) {
      console.log(value);
      this.paramsPart1.trademarkGroupIds = value;
      const onExpected = this.onExpected;
      const checkedArray = [];
        value.forEach(item => {
          onExpected.forEach(item2 => {
            const onCheckItem = item2.children.filter(item3 => {
              return item3.key === item;
            });
            checkedArray.push(onCheckItem[0]);
          });
        });
        filterUnderfind(checkedArray);
        console.log(checkedArray);
        this.onChecked = checkedArray;
        onExpected.forEach(item => {
          const selectChild = [];
          if (checkedArray.length > 0) {
            checkedArray.forEach(item2 => {
              if (item2.fatherId === item.id) {
                selectChild.push(item2);
                this.$set(item, "selectChild", selectChild);
              }
            });
          }else{
            this.$set(item,"selectChild",[])
          }
        });
        this.CheckedItem = onExpected;
        console.log(onExpected);
      }
    }
};
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  min-width: 1400px;
  padding: 15px 15px 15px 15px;
  /deep/ .ant-form-item {
    .ant-form-item-label {
      margin-right: 20px;
    }
    .creatpicture {
      display: flex;
      .ant-btn {
        margin-top: 70px;
        background: rgba(41, 158, 249, 1);
        color: #ffffff;
      }
    }
    .pic-area {
      width: 104px;
      height: 104px;
      border: 1px dashed #d9d9d9;
      span {
        display: block;
        width: 100%;
        height: 100px;
        font-size: 20px;
        font-weight: bold;
        line-height: 100px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        overflow: hidden;
      }
    }
    .tips {
      margin-top: 2px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 15px;
      color: rgba(153, 153, 153, 1);
      opacity: 1;
      .tips-2 {
        padding-left: 8px;
      }
    }
  }
  .info-table {
    padding: 15px 10px 15px 10px;
    width: 100%;
    height: 652px;
    border: 1px solid rgba(245, 245, 245, 1);
    opacity: 1;
    // /deep/.info-table-part1 {
    //   height: 36px;
    //   line-height: 36px;
    //   display: flex;
    //   .info-table-part1-1 {
    //     font-size: 16px;
    //     font-family: Source Han Sans CN;
    //     font-weight: 400;
    //     color: rgba(51, 51, 51, 1);
    //     opacity: 1;
    //   }
    //   .ant-select {
    //     width: 280px;
    //     height: 36px;
    //     margin-left: 20px;
    //   }
    //   .ant-btn {
    //     width: 137px;
    //     height: 33px;
    //     background: rgba(247, 247, 247, 1);
    //     border: 1px solid rgba(232, 232, 232, 1);
    //     opacity: 1;
    //     margin-left: 20px;
    //     color: rgba(153, 153, 153, 1);
    //   }
    // }
    .info-table-part2 {
      width: 100%;
      height: 36px;
      margin-top: 20px;
      line-height: 36px;
      display: flex;
      padding-left: 15px;
      border: 1px solid rgba(232, 232, 232, 1);
      .info-table-part2-1 {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        opacity: 1;
      }
      .info-table-part2-2 {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        opacity: 1;
        margin-left: 30px;
      }
    }
    .info-table-part3 {
      margin-top: 30px;
      width: 100%;
      height: 480px;
      border: 1px solid rgba(245, 245, 245, 1);
      .info-table-part3-1 {
        display: flex;
        height: 50px;
        line-height: 50px;
        width: 100%;
        /deep/ .info-table-part3-1-left {
          border: 1px solid rgba(245, 245, 245, 1);
          box-sizing: border-box;
          width: 30%;
          padding: 5px 10px 5px 10px;
          display: flex;
          .ant-input-affix-wrapper {
            width: 80%;
          }
          .cancel {
            margin-left: 20px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 40px;
            color: rgba(102, 102, 102, 1);
            opacity: 1;
          }
        }
        /deep/ .info-table-part3-1-right {
          width: 70%;
          height: 50px;
          box-sizing: border-box;
          padding: 8px 20px 8px 20px;
          display: flex;
          background: rgba(245, 246, 250, 1);
          border: 1px solid rgba(232, 232, 232, 1);
          opacity: 1;
          .choose {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 34px;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
          .save-btn {
            margin-left: 60%;
            background: rgba(41, 158, 249, 1);
            opacity: 1;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 20px;
            color: rgba(255, 255, 255, 1);
          }
          .clear-btn {
            margin-left: 30px;
            background: rgba(255, 255, 255, 1);
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            opacity: 1;
          }
        }
      }
      .info-table-part3-2 {
        width: 100%;
        height: 530px;
        display: flex;
        box-sizing: border-box;
        border: 1px solid rgba(232, 232, 232, 1);
        .info-table-part3-2-left {
          box-sizing: border-box;
          border: 1px solid rgba(221, 221, 221, 1);
          width: 30%;
          height: 100%;
          padding: 10px 10px 10px 10px;
          overflow-y: auto;
        }
        .info-table-part3-2-right {
          padding: 10px 10px 10px 10px;
          box-sizing: border-box;
          border: 1px solid rgba(221, 221, 221, 1);
          width: 70%;
          height: 100%;
          padding: 10px 30px 10px 30px;
          overflow-y: auto;
          .info-table-part3-2-right-item {
            .info-table-part3-2-right-item-isShow {
              margin-top: 5px;
              width: 100%;
              height: 80px;
              overflow-y: auto;
              position: relative;
              border-bottom: 1px solid rgba(221, 221, 221, 1);
              .info-table-part3-2-right-item-price {
                position: absolute;
                top: 2px;
                font-size: 16px;
                right: 2px;
                color: #ff8a00;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 70px;
    background: rgba(245, 246, 250, 1);
    opacity: 1;
    display: flex;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
    .footer-part1 {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .footer-part2 {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 41px;
      color: rgba(253, 114, 55, 1);
      opacity: 1;
      margin-left: 80px;
    }
    .footer-part3 {
      width: 98px;
      height: 29px;
      background: rgba(253, 114, 55, 1);
      opacity: 1;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 20px;
      color: rgba(255, 255, 255, 1);
      margin-left: 50%;
    }
  }
}
</style>