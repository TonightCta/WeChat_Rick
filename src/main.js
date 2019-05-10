// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from './App';
import router from './router';
import store from './assets/js/store';
import MintUi from 'mint-ui';
import Axios from 'axios'
import { Indicator,Toast   } from 'mint-ui';
import VueWechatTitle from 'vue-wechat-title';
import './index.css';
import 'mint-ui/lib/style.css';
import './assets/iconfont/iconfont.css';
import './assets/iconfontT/iconfont.css';
import './assets/iconfontS/iconfont.css';
import './assets/iconfontF/iconfont.css';
import 'jquery'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.prototype.$axios=Axios
import {UrlSearch} from './assets/js/fun'
let Grap=new UrlSearch()
Vue.prototype.$Grap=Grap;
import VueScroller from 'vue-scroller'
// Vue.prototype.oUrl='http://admin.rightservicetech.com';
Vue.prototype.oUrl='http://hexsoft.top:8080';
// Vue.prototype.oUrl='http://10.0.0.31:8080';
Vue.prototype.$Indicator=Indicator;
Vue.prototype.$Toast=Toast;
Vue.config.productionTip = false;
Vue.use(MintUi);
Vue.use(VueWechatTitle);
Vue.use(VueScroller)
Vue.use(preview)
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
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
