// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './assets/js/store'
import MintUi from 'mint-ui'
import './index.css'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
Vue.prototype.$axios=Axios;
Vue.prototype.oUrl='http://rightservicetech.com:8080';
Vue.config.productionTip = false
Vue.use(MintUi);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
