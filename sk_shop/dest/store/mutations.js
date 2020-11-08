"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mutationsType = require("./mutations-type");

var _global = require("../config/global");

var _vue = _interopRequireDefault(require("vue"));

var _ADD_GOODS$INIT_SHOP_;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_ADD_GOODS$INIT_SHOP_ = {}, _defineProperty(_ADD_GOODS$INIT_SHOP_, _mutationsType.ADD_GOODS, function (state, _ref) {
  var goodsId = _ref.goodsId,
      goodsName = _ref.goodsName,
      smallImage = _ref.smallImage,
      goodsPrice = _ref.goodsPrice;
  var shopCart = state.shopCart; //判断商品是否存在

  if (shopCart[goodsId]) {
    shopCart[goodsId]['num']++;
  } else {
    shopCart[goodsId] = {
      'num': 1,
      'id': goodsId,
      'name': goodsName,
      'small_image': smallImage,
      'price': goodsPrice,
      'checked': true
    };
  } //产生新对象


  state.shopCart = _objectSpread({}, shopCart); //存入本地

  (0, _global.setStore)('shopCart', state.shopCart);
}), _defineProperty(_ADD_GOODS$INIT_SHOP_, _mutationsType.INIT_SHOP_CART, function (state) {
  var initCart = (0, _global.getStore)('shopCart');

  if (initCart) {
    state.shopCart = JSON.parse(initCart);
    console.log(state);
  }
}), _defineProperty(_ADD_GOODS$INIT_SHOP_, _mutationsType.REDUCE_CART, function (state, _ref2) {
  var goodsId = _ref2.goodsId;
  var shopCart = state.shopCart;
  console.log(shopCart);
  var goods = shopCart[goodsId];

  if (goods) {
    console.log(222);

    if (goods['num'] > 0) {
      goods['num']--;

      if (goods['num'] === 0) {
        delete shopCart[goodsId];
      }
    } else {
      goods = null;
    } //更新


    state.shopCart = _objectSpread({}, shopCart); //存入本地

    (0, _global.setStore)('shopCart', state.shopCart);
  }
}), _defineProperty(_ADD_GOODS$INIT_SHOP_, _mutationsType.SELECTED_SINGER_GOODS, function (state, _ref3) {
  var goodsId = _ref3.goodsId;
  var shopCart = state.shopCart;
  var goods = shopCart[goodsId];
  console.log(goods);

  if (goods) {
    if (goods.checked) {
      goods.checked = !goods.checked;
      console.log(goods['checked']);
    } else {
      _vue.default.set(goods, 'checked', true);
    }
  } //同时数据


  state.shopCart = _objectSpread({}, shopCart);
  (0, _global.setStore)('shopCart', state.shopCart);
}), _defineProperty(_ADD_GOODS$INIT_SHOP_, _mutationsType.SELECTED_ALL_GOODS, function (state, _ref4) {
  var isSeleted = _ref4.isSeleted;
  var shopCart = state.shopCart;
  Object.values(shopCart).forEach(function (goods, index) {
    if (goods.checked) {
      //存在该属性
      goods.checked = !isSeleted;
    } else {
      _vue.default.set(goods, 'checked', true);
    }
  }); //同时数据

  state.shopCart = _objectSpread({}, shopCart);
  (0, _global.setStore)('shopCart', state.shopCart);
}), _defineProperty(_ADD_GOODS$INIT_SHOP_, _mutationsType.CLEAR_CART, function (state) {
  state.shopCart = null;
  state.shopCart = _objectSpread({}, state.shopCart);
  (0, _global.setStore)('shopCart', state.shopCart);
}), _ADD_GOODS$INIT_SHOP_);

exports.default = _default;