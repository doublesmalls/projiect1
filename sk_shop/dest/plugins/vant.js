"use strict";

require("vant/es/grid-item/style");

var _gridItem = _interopRequireDefault(require("vant/es/grid-item"));

require("vant/es/grid/style");

var _grid = _interopRequireDefault(require("vant/es/grid"));

require("vant/es/submit-bar/style");

var _submitBar = _interopRequireDefault(require("vant/es/submit-bar"));

require("vant/es/cell-group/style");

var _cellGroup = _interopRequireDefault(require("vant/es/cell-group"));

require("vant/es/cell/style");

var _cell = _interopRequireDefault(require("vant/es/cell"));

require("vant/es/address-edit/style");

var _addressEdit = _interopRequireDefault(require("vant/es/address-edit"));

require("vant/es/address-list/style");

var _addressList = _interopRequireDefault(require("vant/es/address-list"));

require("vant/es/contact-edit/style");

var _contactEdit = _interopRequireDefault(require("vant/es/contact-edit"));

require("vant/es/contact-list/style");

var _contactList = _interopRequireDefault(require("vant/es/contact-list"));

require("vant/es/contact-card/style");

var _contactCard = _interopRequireDefault(require("vant/es/contact-card"));

require("vant/es/nav-bar/style");

var _navBar = _interopRequireDefault(require("vant/es/nav-bar"));

require("vant/es/dialog/style");

var _dialog = _interopRequireDefault(require("vant/es/dialog"));

require("vant/es/toast/style");

var _toast = _interopRequireDefault(require("vant/es/toast"));

require("vant/es/loading/style");

var _loading = _interopRequireDefault(require("vant/es/loading"));

require("vant/es/tabbar-item/style");

var _tabbarItem = _interopRequireDefault(require("vant/es/tabbar-item"));

require("vant/es/tabbar/style");

var _tabbar = _interopRequireDefault(require("vant/es/tabbar"));

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_tabbar.default);

_vue.default.use(_tabbarItem.default);

_vue.default.use(_loading.default); //提示


_vue.default.use(_toast.default); //蒙版提示


_vue.default.use(_dialog.default); //导航栏


_vue.default.use(_navBar.default); //收货地址


_vue.default.use(_contactCard.default);

_vue.default.use(_contactList.default);

_vue.default.use(_contactEdit.default);

_vue.default.use(_addressList.default);

_vue.default.use(_addressEdit.default); //单元格


_vue.default.use(_cell.default);

_vue.default.use(_cellGroup.default); //提交订单


_vue.default.use(_submitBar.default); //宫格


_vue.default.use(_grid.default);

_vue.default.use(_gridItem.default);