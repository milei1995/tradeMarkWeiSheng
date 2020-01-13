import {
    postAction,
    getAction
} from './manage'

const baseUrl = "http://trademark.hnmykj.vip"

//商标模块
const TradeMarkSearchUrl = baseUrl+'/trademark/trademarkClassifyGoods/selectTrademarkClassifyGoodsList' 

const TradeMarkDetailUrl = baseUrl + '/trademark/main/trademarkDetail' 

const TradeMarkCategoryUrl = baseUrl + '/trademark/trademarkClassifyGoods/selectTrademarkClassifyGoodsList' 

const TradeMarkGroupUrl = baseUrl + '/trademark/trademarkClassifyGoods/selectTrademarkClassifyGoodsList' 

const TradeMarkSearch = (params) => getAction(TradeMarkSearchUrl, params); //查询商标列表

const TradeMarkDetail = (params) => getAction(TradeMarkDetailUrl, params); //查询商标详情

const TradeMarkCategory = (params) => getAction(TradeMarkCategoryUrl, params); //查询商标分类

const TradeMarkGroup = (params) => getAction(TradeMarkGroupUrl, params); //查询商标分组

//用户模块
const SendSmsCodeUrl = baseUrl + '/trademark/sms/sendSmsCode'

const UserLoginUrl= baseUrl + '/trademark/user/login'

const SendSmsCode =(params) => postAction(SendSmsCodeUrl, params);//短信发送

const UserLogin = (params) => postAction(UserLoginUrl, params);//登录注册

//其他
const AddApplyNeedsUrl = baseUrl + '/trademark/applyNeeds/addApplyNeeds'

const UploadImgUrl = baseUrl + '/trademark/image/uploadImage'

const AddApplyNeeds = (params) => postAction(AddApplyNeedsUrl, params);//提交商标需求

const UploadImg = (params) => postAction(UploadImgUrl, params);//上传图片

//支付模块
const AddConfigCompanyApplyUrl = baseUrl + '/trademark/configApply/addConfigCompanyApply'

const AddConfigUserApplyUrl = baseUrl + '/trademark/configApply/addConfigUserApply'

const WxPayUrl = baseUrl + '/trademark/wx/wxPay'

const AddConfigCompanyApply = (params) => postAction(AddConfigCompanyApplyUrl, params);//添加企业信息申请配置

const AddConfigUserApply = (params) => postAction(AddConfigUserApplyUrl, params);//添加用户申请配置

const WxPay = (params) => postAction(WxPayUrl, params);//微信支付

export{
    TradeMarkSearch,
    TradeMarkDetail,
    TradeMarkCategory,
    TradeMarkGroup,
    SendSmsCode,
    UserLogin,
    AddApplyNeeds,
    UploadImg,
    AddConfigCompanyApply,
    AddConfigUserApply,
    WxPay
}
