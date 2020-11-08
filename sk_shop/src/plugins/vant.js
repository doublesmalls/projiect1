import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
import { Loading } from 'vant';

Vue.use(Loading);

//提示
import {Toast} from "vant";
Vue.use(Toast);

//蒙版提示
import {Dialog} from 'vant'
Vue.use(Dialog);
//导航栏
import { NavBar } from 'vant';

Vue.use(NavBar);

//收货地址
import { ContactCard, ContactList, ContactEdit } from 'vant';

Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
import { AddressList } from 'vant';

Vue.use(AddressList);
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);

//单元格
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
//提交订单
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);

//宫格
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);

//弹出层
import { Popup } from 'vant';

Vue.use(Popup);

//时间选择
import { DatetimePicker } from 'vant';

Vue.use(DatetimePicker);