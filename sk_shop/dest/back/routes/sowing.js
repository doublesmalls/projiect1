"use strict";

var express = require('express');

var formidable = require('formidable');

var path = require('path');

var Sowing = require('./../models/sowing');

var router = express.Router({});
/* ************************************ API routes ***************************************** */

router.post('/api/sowing/add', function (req, res, next) {
  var form = formidable.IncomingForm();
  form.uploadDir = config.uploadpath; //上传图片的文件夹名

  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    } //取出普通字段


    var body = fields; //解析上传文件路径，取出文件名保存到数据库

    body.icon_url = path.basename(files.icon_url.path.toString()); //操作数据库

    var sowing = new Sowing({
      icon_url: body.icon_url,
      puclic_name: body.puclic_name
    });
    sowing.save(function (err, result) {
      if (err) {
        return next(err);
      }
    });
  });
});
module.exports = router;