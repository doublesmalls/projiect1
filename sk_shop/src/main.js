import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
import store from './store/index'


//1.引入fastclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Vue.config.productionTip = false;

//2.引入全局样式
import './style/common.less'

//3引入全局UI组件库--vant
import '@/plugins/vant.js'
//引入全局filetr
import '@/config/filters.js'
//引入全局UI组件库--iView
import '@/plugins/iView.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
