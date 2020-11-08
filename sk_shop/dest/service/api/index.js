"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhoneCodeLogin = exports.getPhoneCode = exports.getCategoriesDetail = exports.getCategories = exports.getHomedata = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//定义基础路径
var Base_Url = 'http://demo.itlike.com/web/xlmc';

var getHomedata = function getHomedata() {
  return (0, _ajax.default)(Base_Url + '/api/homeApi');
};

exports.getHomedata = getHomedata;

var getCategories = function getCategories() {
  return (0, _ajax.default)(Base_Url + '/api/homeApi/categories');
};

exports.getCategories = getCategories;

var getCategoriesDetail = function getCategoriesDetail(preParams) {
  return (0, _ajax.default)(Base_Url + '/api/homeApi/categoriesdetail' + preParams);
}; //获取短信验证码


exports.getCategoriesDetail = getCategoriesDetail;

var getPhoneCode = function getPhoneCode(phone) {
  return (0, _ajax.default)('http://demo.itlike.com/web/xlmc/api/send_code', {
    phone: phone
  });
}; //手机验证码登录（POST）


exports.getPhoneCode = getPhoneCode;

var getPhoneCodeLogin = function getPhoneCodeLogin(phone, code) {
  return (0, _ajax.default)(Base_Url + '/api/login_code', {
    phone: phone,
    code: code
  }, 'POST');
};

exports.getPhoneCodeLogin = getPhoneCodeLogin;