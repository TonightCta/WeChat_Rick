import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    token:'1232132132',
    newsListT:[],
    conListT:[],
    isBackM:false,//个人中心注册返回
    isBackT:false,//首页注册返回
    userMes:{},//用户信息
  },
  mutations:{
    newsListT_fn(state,opt){//新闻列表缓存
      state.newsListT=opt;
    },
    conListT_fn(state,opt){//咨询列表缓存
      state.conListT=opt;
    },
    isBackM_fn(state,opt){
      state.isBackM=opt;
    },
    isBackT_fn(state,opt){
      state.isBackT=opt;
    },
    userMes_fn(state,opt){
      state.userMes=opt;
    }
  },
  getters:{

  },
  actions:{

  }
});
export default store;
