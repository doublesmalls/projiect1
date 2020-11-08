"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _index = _interopRequireDefault(require("./router/index"));

var _index2 = _interopRequireDefault(require("./store/index"));

var _fastclick = _interopRequireDefault(require("fastclick"));

require("./style/common.less");

require("@/plugins/vant.js");

require("@/config/filters.js");

require("@/plugins/iView.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入路由
//1.引入fastclick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    _fastclick.default.attach(document.body);
  }, false);
}

_vue.default.config.productionTip = false; //2.引入全局样式

new _vue.default({
  router: _index.default,
  store: _index2.default,
  render: function render(h) {
    return h(_App.default);
  }
}).$mount('#app');