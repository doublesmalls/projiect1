"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ajax;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ajax() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parmas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  //1.变量
  var promise; //2.返回一个promise对象

  return new Promise(function (resolve, reject) {
    //2.1判断请求类型
    if (type.toUpperCase() === 'GET') {
      //2.2拼接字符串
      var parmaStr = ''; //2.3遍历

      Object.keys(parmas).forEach(function (key) {
        parmaStr += key + '=' + parmas[key] + '&';
      }); //2.4过滤最后的&

      if (parmaStr) {
        parmaStr = parmaStr.substr(0, parmaStr.lastIndexOf('&')); //2.5拼接完整路径

        url += '？' + parmaStr;
      } //2.6发起axios请求


      promise = _axios.default.get(url);
    } else if (type.toUpperCase() === 'POST') {
      //2.7发起post请求
      promise = _axios.default.post(url, parmas);
    } //2.8处理结果并返回


    promise.then(function (response) {
      resolve(response.data);
    }).catch(function (error) {
      reject(error);
    });
  });
}