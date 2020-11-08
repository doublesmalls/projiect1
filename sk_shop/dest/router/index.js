"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _databorad = _interopRequireDefault(require("./../views/databorad/databorad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue.default.use(_vueRouter.default); //引入组件


var home = function home() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/home/home'));
  });
};

var cart = function cart() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/cart/cart'));
  });
};

var category = function category() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/category/category'));
  });
};

var mine = function mine() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/mine/mine'));
  });
};

var Login = function Login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/login/Login'));
  });
};

var Back = function Back() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../back/views/dataBox'));
  });
}; //引入组件相关


var Order = function Order() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/order/Order'));
  });
};

var myAddress = function myAddress() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/order/children/myAddress'));
  });
};

var AddAddress = function AddAddress() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/order/children/children/addAddress'));
  });
};

var EditAddress = function EditAddress() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../views/order/children/children/editAddress'));
  });
};

var Sowing = function Sowing() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./../back/views/components/sowings'));
  });
};

var _default = new _vueRouter.default({
  routes: [{
    path: '/',
    redirect: '/databorad'
  }, {
    path: '/databorad',
    name: 'databorad',
    component: _databorad.default,
    redirect: '/databorad/home',
    children: [{
      path: 'home',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true
      }
    }, {
      path: 'cart',
      name: 'cart',
      component: cart
    }, {
      path: 'category',
      name: 'category',
      component: category,
      meta: {
        keepAlive: true
      }
    }, {
      path: 'mine',
      name: 'mine',
      component: mine
    }]
  }, {
    path: '/back',
    name: 'dataBox',
    component: Back,
    redirect: '/back/sowing',
    children: [{
      path: 'sowing',
      name: 'sowing',
      component: Sowing
    }]
  }, {
    path: '/confirmOrder',
    name: 'order',
    component: Order,
    children: [{
      path: 'myAddress',
      name: 'myAddress',
      component: myAddress,
      children: [{
        path: 'addAddress',
        name: 'addAddress',
        component: AddAddress
      }, {
        path: 'editAddress',
        name: 'editAddress',
        component: EditAddress
      }]
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }]
});

exports.default = _default;