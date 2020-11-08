"use strict";

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.filter('moneyFormat', function (value) {
  return '$' + Number(value).toFixed(2);
});