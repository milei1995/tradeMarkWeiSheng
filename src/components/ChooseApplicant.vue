<template>
  <div class="chooseApplicant">
    <a-form :form="form" @submit="handleSave">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商标类型">
        <a-radio-group
          :options="plainOptions"
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
            <a-select-option value="1">中国大陆</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营业执照">
          <upload-pic :type="'企业营业执照'" @getImageUrl1="getImageUrl1" />
          <div style="color:rgb(253, 114, 55);">请上传公司营业执照！</div>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请企业行政区划">
          <a-cascader
            placeholder="请选择地区"
            :props="{ expandTrigger: 'hover' }"
            :options="areaData"
            @change="onChange1"
            v-decorator="[ 'licenseArea', validatorRules.licenseArea]"
          ></a-cascader>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营业执照地址">
          <a-input
            placeholder="请填写营业执照地址"
            v-decorator="[ 'licenseAddress', validatorRules.licenseAddress]"
          />
          <span style="font-size:12px;">
            <span style="color:#999999;">填写营业执照的完整地址;</span>
            <span style="color:#FD7237;">如果地址不包含省市区，请补足。</span>
          </span>
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
            <a-select-option value="1">身份证</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证号码">
          <a-input v-decorator="[ 'personId', validatorRules.personId]" placeholder="请填写身份证号码"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证正面">
          <upload-pic :type="'身份证正面'" @getImageUrl2="getImageUrl2" />
          <div style="color:rgb(253, 114, 55);">请上传身份证正面！</div>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证反面">
          <upload-pic :type="'身份证反面'" @getImageUrl3="getImageUrl3" />
          <div style="color:rgb(253, 114, 55);">请上传身份证反面！</div>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资格证明文件">
          <upload-pic :type="'个体户证明资料'" @getImageUrl4="getImageUrl4" />
          <div style="color:rgb(253, 114, 55);">请上传个体工商户证明资料！</div>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请人行政区">
          <a-cascader
            placeholder="请选择地区"
            :props="{ expandTrigger: 'hover' }"
            @change="onChange2"
            :options="areaData"
            v-decorator="[ 'personArea', validatorRules.personArea]"
          ></a-cascader>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证地址">
          <a-input
            placeholder="请填写身份证地址"
            v-decorator="[ 'idcardAddress', validatorRules.idcardAddress]"
          />
          <span style="font-size:12px;">
            <span style="color:#999999">填写身份证件的完整地址;</span>
            <span style="color:#FD7237;">如果地址不含省市区,请补足</span>
          </span>
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
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="下载委托书">
        <a
          href="http://wssbw-images.oss-cn-hangzhou.aliyuncs.com/trademark/web/cdf99a33-7206-40e6-ba52-5b5dcbea12ec.docx"
        >点击下载委托书</a>
        <upload-pic :type="'下载委托书'" @getImageUrl6="getImageUrl6" />
        <div style="color:rgb(253, 114, 55);">请上传委托书！</div>
        <div style="color:red;">
         <p style='line-height:15px;'> 重要提示：
          请确保上传委托书模板图片分辨率在800*800-3900*3900之间；</p>
          <p style='line-height:15px;'>请确保上传委托书模板图片大小不能超过2000K的JPG或JPEG格式图片；</p>
          <p style='line-height:15px;'>扫描或拍照前，请确保委托书模板纸面工整顺平，不能有褶皱、反光等；</p>
        </div>
      </a-form-item>
      <a-button html-type="submit">保存</a-button>
    </a-form>
    <div class="topay">
      <span class="topay1">应付金额</span>
      <span class="topay2">￥{{totalPrice}}</span>
      <a-button @click="toNext">下一步</a-button>
    </div>
  </div>
</template>

<script>
import UploadPic from "./UploadPic";
import AreaMixin from "../mixin/areaMixin";
import { getStorage } from "../mixin/storage";
export default {
  name: "chooseApplicant",
  mixins: [AreaMixin],
  components: {
    UploadPic
  },
  data() {
    return {
      istypeChange: true, //商标类型切换
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
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
          rules: [{ required: true, message: "请填写企业名称!" }],
          initialValue: ""
        },
        applyType: {
          rules: [{ required: true, message: "请填写申请人类型!" }]
        },
        license: {
          rules: [{ required: false, message: "请上传营业执照!" }]
        },
        licenseArea: {
          rules: [{ required: true, message: "请填写申请企业行政区域!" }]
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
          rules: [{ required: false, message: "请上传身份证正面信息!" }]
        },
        idcardBack: {
          rules: [{ required: false, message: "请上传身份证背面信息!" }]
        },
        individual: {
          rules: [{ required: false, message: "请上传个体工商户执照!" }]
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
      isErr: true,
      currentType: "企业单位", //当前类型
      writeInfo: [], //当前填写的信息
      imgUrl1: "", //企业营业执照
      imgUrl2: "", //身份证正面
      imgUrl3: "", //身份证反面
      imgUrl4: "", //个体户证明资料
      imgUrl6: "", //下载委托书
      params: {}, //支付请求的参数
      paramsPart1: null, //接收参数1
      paramsPart2: {
        payType: "1", //默认微信支付
        powerOfAttorney:''//委托书图片地址
      }, //请求参数2
      isSave: false, //是否保存
      totalPrice: "" //总价
    };
  },
  created() {
    for (var i = 0; i < this.areaData.length; i++) {
      if (this.areaData[i].children.length == 0) {
        delete this.areaData[i].children; //解决因为省级区域没有下级市的BUG
      }
    }
  },
  mounted() {
    this.validatorRules.type.initialValue = this.plainOptions[0];
    const totalPrice = this.$router.history.current.query.totalPrice;
    const paramsPart1 = this.$router.history.current.query.paramsPart1;
    this.paramsPart1 = { ...paramsPart1 };
    this.totalPrice = totalPrice;
    console.log(this.paramsPart1);
  },
  methods: {
    handleTypeChange(e) {
      console.log(e);
      this.currentType = e.target.value;
      if (e.target.value === "企业单位") {
        this.istypeChange = true;
      }
      if (e.target.value === "自然人") {
        this.istypeChange = false;
      }
    },
    toNext() {
      const isErr = this.isErr;
      const isSave = this.isSave;
      if (isErr) {
        this.$message.error("请填写全信息");
      } else {
        if (isSave) {
          this.params = Object.assign(this.paramsPart2, this.paramsPart1);
          console.log(this.params);
          console.log(this.paramsPart2);
          console.log(this.paramsPart1);
          this.$router.push({
            path: "/trademarkBuy/payOrder",
            query: { params: this.params, orderType: "1" }
          });
        } else {
          this.$message.error("请先保存");
        }
      }
    },
    getImageUrl1(imageUrl) {
      this.imgUrl1 = imageUrl;
    },
    getImageUrl2(imageUrl) {
      this.imgUrl2 = imageUrl;
    },
    getImageUrl3(imageUrl) {
      this.imgUrl3 = imageUrl;
    },
    getImageUrl4(imageUrl) {
      this.imgUrl4 = imageUrl;
    },
    getImageUrl6(imageUrl) {
      this.imgUrl6 = imageUrl;
      this.paramsPart2.powerOfAttorney=imageUrl
    },
    onChange1(value) {
      console.log(value);
    },
    onChange2(value) {
      console.log(value);
    },
    handleSave(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.writeInfo = values;
          this.isErr = false;
          const accessToken = getStorage("AccessToken");
          console.log(accessToken);
          if (accessToken) {
            const currentType = this.currentType;
            console.log(currentType);
            if (currentType === "企业单位") {
              console.log(this.writeInfo);
              const url = "/api/trademark/configApply/addConfigCompanyApply";
              const applyType = this.writeInfo.applyType;
              const companyName = this.writeInfo.bussinessName;
              const companyProveImage = this.imgUrl1;
              const province = this.writeInfo.licenseArea[0];
              const city = this.writeInfo.licenseArea[1];
              const district = this.writeInfo.licenseArea[2];
              const businessLicenseAddress = this.writeInfo.licenseAddress;
              const contacts = this.writeInfo.contacts;
              const contactsPhone = this.writeInfo.phone;
              const contactFax = this.writeInfo.fax;
              const contactEmail = this.writeInfo.mail;
              const params = {
                applyType: applyType,
                companyName: companyName,
                companyProveImage: companyProveImage,
                province: province,
                city: city,
                district: district,
                businessLicenseAddress: businessLicenseAddress,
                contacts: contacts,
                contactsPhone: contactsPhone,
                contactFax: contactFax,
                contactEmail: contactEmail
              };
              const headers = {
                accessToken: accessToken
              };
              const jsonparams = JSON.stringify(params);
              console.log(jsonparams);
              this.$axios({
                method: "post",
                url: url,
                data: jsonparams,
                headers: headers
              })
                .then(res => {
                  console.log(res);
                  if (res.data.success) {
                    this.$message.success("保存成功");
                     this.paramsPart2.companyConfigId = res.data.data.configCompanyId,
                     this.paramsPart2.userConfigId = 0;
                    this.isSave = true;
                  } else {
                    if (res.data.code === "10004") {
                      this.$message.error("当前用户已过期，请重新登录");
                      setTimeout(() => {
                        this.$router.push({ path: "/login" });
                      }, 2000);
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
            if (currentType === "自然人") {
              console.log(this.writeInfo);
              const url = "/api/trademark/configApply/addConfigUserApply";
              const headers = {
                accessToken: accessToken
              };
              const applyUserName = this.writeInfo.applyPersonName;
              const credentialsType = this.writeInfo.certificatesType;
              const idCard = this.writeInfo.personId;
              const idCardFront = this.imgUrl2;
              const idCardReverse = this.imgUrl3;
              const companyProveImage = this.imgUrl4;
              const province = this.writeInfo.personArea[0];
              const city = this.writeInfo.personArea[1];
              const district = this.writeInfo.personArea[2];
              const idCardAddress = this.writeInfo.idcardAddress;
              const contactsPhone = this.writeInfo.phone;
              const contacts = this.writeInfo.contacts;
              const contactEmail = this.writeInfo.mail;
              // const contactFax=this.writeInfo.contactFax
              const params = {
                applyUserName: applyUserName,
                credentialsType: credentialsType,
                idCard: idCard,
                idCardFront: idCardFront,
                idCardReverse: idCardReverse,
                companyProveImage: companyProveImage,
                province: province,
                city: city,
                district: district,
                idCardAddress: idCardAddress,
                contacts: contacts,
                contactsPhone: contactsPhone,
                contactEmail: contactEmail
              };
              const jsonparams = JSON.stringify(params);
              console.log(params);
              this.$axios({
                method: "post",
                url: url,
                headers: headers,
                data: jsonparams
              })
                .then(res => {
                  console.log(res);
                  if (res.data.success) {
                    this.$message.success("保存成功");
                    this.isSave = true;
                    this.paramsPart2.companyConfigId = 0,
                    this.paramsPart2.userConfigId = res.data.data.configUserId;
                  } else {
                    if (res.data.code === "10004") {
                      this.$message.error("当前用户已过期，请重新登录");
                      setTimeout(() => {
                        this.$router.push({ path: "/login" });
                      }, 2000);
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          } else {
            this.$message.warning("请先登录！");
          }
        }
      });
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
    height: 70px;
    align-items: center;
    justify-content: space-between;
    background: rgba(245, 246, 250, 1);
    opacity: 1;
    display: flex;
    .topay1 {
      width: 20%;
      min-width: 100px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
    }
    .topay2 {
      margin-left: 50px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
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
      margin-left: 40%;
    }
  }
}
</style>