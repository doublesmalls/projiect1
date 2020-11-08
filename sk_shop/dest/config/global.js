"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeStore = exports.getStore = exports.setStore = void 0;

/*
    本地化存储
*/
var setStore = function setStore(name, content) {
  if (!name) return;

  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }

  window.localStorage.setItem(name, content);
};
/*
    本地化获取
*/


exports.setStore = setStore;

var getStore = function getStore(name) {
  if (!name) return;
  return window.localStorage.getItem(name);
};
/*
    本地化删除
*/


exports.getStore = getStore;

var removeStore = function removeStore(name) {
  if (!name) return;
  return window.localStorage.removeItem(name);
};

exports.removeStore = removeStore;