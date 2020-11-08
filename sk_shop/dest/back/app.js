"use strict";

//引入express
var express = require('express');

var app = express(); //引入路由

var sowingRouter = require('./routes/sowing'); //挂载路由


app.use(sowingRouter);
app.listen(3000, function () {
  console.log('服务器已经启动');
});