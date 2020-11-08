"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true
});
mongoose.connection.on('open', function () {
  console.log("连接数据库成功");
});
mongoose.connection.on('error', function () {
  console.log("数据库连接失败");
});
var sowingSchema = mongoose.Schema({
  icon_url: {
    type: String,
    required: true
  },
  puclic_name: {
    type: String,
    required: true
  }
});
var Sowing = mongoose.model('Sowings', sowingSchema);
var _default = Sowing;
exports.default = _default;