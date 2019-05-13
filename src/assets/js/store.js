import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    token:'1232132132',
    userID:null,
    newsListT:[],
    conListT:[],
    isBackM:false,//个人中心注册返回
    isBackT:false,//首页注册返回
    userMes:{},//用户信息
    logMes:{},//工作日志详情
    orderList:[],
    engSkill:{},//工程师技能相关
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
    },
    userID_fn(state,opt){
      state.userID=opt;
    },
    logMes_fn(state,opt){//工作日志详情
      state.logMes=opt
    },
    orderList_fn(state,opt){//我的接单列表
      state.orderList=opt;
    },
    engSkill_fn(state,opt){//更新工程师技能相关
      state.engSkill=opt;
    }
  },
  getters:{

  },
  actions:{

  }
});
export default store;
