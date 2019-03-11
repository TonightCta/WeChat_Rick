// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './assets/js/store';
import MintUi from 'mint-ui';
import Axios from 'axios';
import { Indicator,Toast  } from 'mint-ui';
import VueWechatTitle from 'vue-wechat-title';
import './index.css';
import 'mint-ui/lib/style.css';
import './assets/iconfont/iconfont.css';
import 'jquery'
Vue.prototype.$axios=Axios;
// Vue.prototype.oUrl='http://rightservicetech.com:8080';
Vue.prototype.oUrl='http://hexsoft.top:8080';
// Vue.prototype.oUrl='http://10.0.0.31:8080';
Vue.prototype.$Indicator=Indicator;
Vue.prototype.$Toast=Toast;
Vue.config.productionTip = false;
Vue.use(MintUi);
Vue.use(VueWechatTitle);
//跳转页面默认返回顶部
router.afterEach((to,from,next) => {
  setTimeout(()=>{
    window.scrollTo(0,0);
  },100)
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
