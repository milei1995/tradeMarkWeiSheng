<template>
  <div class="chooseApplicant">
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标类型">
        <a-radio-group
          :options="plainOptions"
          :defaultValue="plainOptions[0]"
          v-decorator="['type',validatorRules.type]"
          @change="handleTypeChange"
        />
      </a-form-item>
      <!-- 企业单位 -->
      <template v-if="istypeChange">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业名称">
          <a-input
            placeholder="请填写企业名称"
            v-decorator="['bussinessName',validatorRules.bussinessName]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请人类型">
          <a-select
            placeholder="请选择申请人类型"
            v-decorator="[ 'applyType', validatorRules.applyType]"
            style="width:150px;"
          >
            <a-select-option value="jack">中国大陆</a-select-option>
            <a-select-option value="lucy">海外</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营业执照">
          <upload-pic />
          <a-input
            v-decorator="[ 'license', validatorRules.license]"
            disabled
            placeholder="请上传公司营业执照"
            style="width:150px;"
          ></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请人行政区划">
          <a-select
            :defaultValue="provinceData[0]"
            style="width: 120px;margin-left:10px"
            v-decorator="[ 'licenseArea', validatorRules.licenseArea]"
          >
            <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
          </a-select>
          <a-select v-model="secondCity" style="width: 120px;margin-left:10px;">
            <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营业执照地址">
          <a-input
            placeholder="请填写营业执照地址"
            v-decorator="[ 'licenseAddress', validatorRules.licenseAddress]"
          />
          <span style='font-size:12px;'><span style='color:#999999;'>填写营业执照的完整地址;</span><span style='color:#FD7237;'>如果地址不包含省市区，请补足。</span></span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人">
          <a-input placeholder="请填写联系人" v-decorator="[ 'contacts', validatorRules.contacts]" />
        </a-form-item>
      </template>
      <!-- 自然人 -->
      <template v-else>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请人姓名">
          <a-input
            placeholder="请填写申请人姓名"
            v-decorator="['applyPersonName',validatorRules.applyPersonName]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件类型">
          <a-select
            placeholder="请选择证件类型"
            v-decorator="[ 'certificatesType', validatorRules.certificatesType]"
            style="width:150px;"
          >
            <a-select-option value="jack">身份证</a-select-option>
            <a-select-option value="lucy">军官证</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证号码">
          <a-input v-decorator="[ 'personId', validatorRules.personId]" placeholder="请填写身份证号码"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证正面">
          <upload-pic />
          <a-input
            v-decorator="[ 'idcardFront', validatorRules.idcardFront]"
            disabled
            placeholder="请上传省份证正面"
            style="width:150px;"
          ></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证反面">
          <upload-pic />
          <a-input
            v-decorator="[ 'idcardBack', validatorRules.idcardBack]"
            disabled
            placeholder="请上传身份证背面"
            style="width:150px;"
          ></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资格证明文件">
          <upload-pic />
          <a-input
            v-decorator="[ 'individual', validatorRules.individual]"
            disabled
            placeholder="请上传个体工商户执照"
            style="width:150px;"
          ></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请人行政区划">
          <a-select
            :defaultValue="provinceData[0]"
            style="width: 120px;margin-left:10px"
            v-decorator="[ 'personArea', validatorRules.personArea]"
          >
            <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
          </a-select>
          <a-select v-model="secondCity" style="width: 120px;margin-left:10px;">
            <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证地址">
          <a-input
            placeholder="请填写身份证地址"
            v-decorator="[ 'idcardAddress', validatorRules.idcardAddress]"
          />
          <span style='font-size:12px;'><span style='color:#999999'>填写身份证件的完整地址;</span><span style='color:#FD7237;'>如果地址不含省市区,请补足</span></span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人">
          <a-input placeholder="请填写联系人" v-decorator="[ 'contacts', validatorRules.contacts]" />
        </a-form-item>
      </template>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人电话">
        <a-input placeholder="请填写联系人电话" v-decorator="[ 'phone', validatorRules.phone]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人传真">
        <a-input placeholder="请填写联系人传真" v-decorator="[ 'fax', validatorRules.fax]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人邮件">
        <a-input placeholder="请填写联系人邮件" v-decorator="[ 'mail', validatorRules.mail]" />
      </a-form-item>
      <a-button>保存</a-button>
    </a-form>
    <div class="topay">
      <span class="topay1">应付金额</span>
      <span class="topay2">￥&nbsp;300</span>
      <a-button>下一步</a-button>
    </div>
  </div>
</template>

<script>
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
};
import UploadPic from "./UploadPic";
export default {
  name: "chooseApplicant",
  components: {
    UploadPic
  },
  data() {
    return {
      istypeChange: true, //商标类型切换
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
          rules: [{ required: true, message: "请选择类型!" }]
        },
        bussinessName: {
          rules: [{ required: true, message: "请填写企业名称!" }]
        },
        applyType: {
          rules: [{ required: true, message: "请填写申请人类型!" }]
        },
        license: {
          rules: [{ required: true, message: "请上传营业执照!" }]
        },
        licenseArea: {
          rules: [{ required: true, message: "请填写申请人行政区域!" }]
        },
        licenseAddress: {
          rules: [{ required: true, message: "请填写营业执照地址!" }]
        },
        contacts: {
          rules: [{ required: true, message: "请填写联系人!" }]
        },
        phone: {
          rules: [{ required: true, message: "请填写联系人电话!" }]
        },
        fax: { rules: [{ required: true, message: "请填写联系人传真!" }] },
        mail: {
          rules: [{ required: true, message: "请填写联系人邮件!" }]
        },
        applyPersonName: {
          rules: [{ required: true, message: "请填写申请人姓名!" }]
        },
        certificatesType: {
          rules: [{ required: true, message: "请选择证件类型!" }]
        },
        personId: {
          rules: [{ required: true, message: "请输入身份证号码!" }]
        },
        idcardFront: {
          rules: [{ required: true, message: "请上传身份证正面信息!" }]
        },
        idcardBack: {
          rules: [{ required: true, message: "请上传身份证背面信息!" }]
        },
        individual: {
          rules: [{ required: true, message: "请上传个体工商户执照!" }]
        },
        personArea: {
          rules: [{ required: true, message: "请填写申请人行政区划" }]
        },
        idcardAddress: {
          rules: [{ required: true, message: "请填写身份证证件地址" }]
        }
      },
      plainOptions: ["企业单位", "自然人"],
      picOptions: ["自动生成", "手动上传"],
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0]
    };
  },
  methods: {
    handleTypeChange(e) {
      console.log(e);
      if (e.target.value === "企业单位") {
        this.istypeChange = true;
      }
      if (e.target.value === "自然人") {
        this.istypeChange = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chooseApplicant {
  width: 100%;
  min-width: 900px;
  padding: 15px 15px 15px 15px;
  /deep/.ant-form {
    /deep/ .ant-form-item {
    }
    .ant-btn {
      margin-left: 150px;
      height: 29px;
      background: rgba(253, 114, 55, 1);
      width: 98px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 20px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
  /deep/.topay {
    padding-left: 50px;
    padding-right: 50px;
    width: 60%;
    margin-top: 10px;
    line-height: 70px;
    height: 70px;
   align-items: center;
    background: rgba(245, 246, 250, 1);
    opacity: 1;
    display: flex;
    .topay1 {
       display: table-cell;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .topay2 {
       display: table-cell;
      margin-left: 50px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 41px;
      color: rgba(253, 114, 55, 1);
      opacity: 1;
    }
    .ant-btn {
       display: table-cell;
      width: 98px;
      height: 29px;
      line-height: 29px;
      background: rgba(253, 114, 55, 1);
      opacity: 1;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left:60%;
    }
  }
}
</style>