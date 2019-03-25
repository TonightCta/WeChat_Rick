import Vue from 'vue'
import Router from 'vue-router'
import { Toast  } from 'mint-ui';
Vue.use(Router)
import NProgress from 'nprogress'


const router= new Router({
  routes: [
    {
      path:'/',
      redirect:'/home',
      meta:{
        keep:false
      }
    },
    {
      path: '/home',//首页
      name: 'Home',
      component: resolve=>require(['@/page/Home/home'],resolve),
      meta:{
        title:'犀牛小哥ICT服务平台',
        keep:false
      }
    },
    {
      path:'/order',//订单页
      name:'Order',
      component:resolve=>require(['@/page/Order/order'],resolve),
      meta:{
        title:'我的订单'
      }
    },
    {
      path:'/mine',//个人中心
      name:'Mine',
      component:resolve=>require(['@/page/Mine/mine'],resolve),
      meta:{
        title:'个人中心'
      }
    },
    {
      path:'/setTing',//设置
      name:'SetTing',
      component:resolve=>require(['@/page/Mine/person_setting'],resolve)
    },
    {
      path:'/personSer',//服务条款
      name:'PersonSer',
      component:resolve=>require(['@/page/Mine/person_service'],resolve)
    },
    {
      path:'/about',//关于我们
      name:'About',
      component:resolve=>require(['@/page/About/about_company'],resolve),
      children:[
        {
          path:'/companyIn',//公司简介
          name:'CompanyIn',
          component:resolve=>require(['@/page/About/company_intro'],resolve),
          meta:{
            title:'关于我们'
          }
        },
        {
          path:'/companyCon',//联系我们
          name:'CompanyCon',
          component:resolve=>require(['@/page/About/company_contact'],resolve),
          meta:{
            title:'关于我们'
          }
        }
      ],
      redirect:'/companyIn',

    },
    {
      path:'/newslist',//新闻列表
      name:'NewsList',
      component:resolve=>require(['@/page/Home/newslist'],resolve)
    },
    {
      path:'/newDetails',//新闻详情
      name:'NewsDetails',
      component:resolve=>require(['@/page/Home/newsDetails'],resolve)
    },
    {
      path:'/personMes',//个人信息页
      name:'PersonMes',
      component:resolve=>require(['@/page/Mine/person_mes'],resolve)
    },
    {
      path:'/login',//登录/注册
      name:'Login',
      component:resolve=>require(['@/page/Login/login'],resolve),
    },
    {
      path:'/register',//注册页
      name:'Register',
      component:resolve=>require(['@/page/Login/register'],resolve)
    },
    {
      path:'/Tlogin',//登录页
      name:'TLogin',
      component:resolve=>require(['@/page/Login/Tlogin'],resolve)
    },
    {
      path:'/takeOrder',//接单页
      name:'TakeOrder',
      component:resolve=>require(['@/page/Home/take_order'],resolve)
    },
    {
      path:'/demandNeed',//发布需求页
      name:'DemandNeed',
      component:resolve=>require(['@/page/Home/demand_need'],resolve)
    },
    {
      path:'/workLog',//工作日志页
      name:'WorkLog',
      component:resolve=>require(['@/page/Home/work_log'],resolve)
    },
    {
      path:'/logDetis',//日志详情
      name:'LogDetis',
      component:resolve=>require(['@/page/Home/work_logDeti'],resolve)
    },
    {
      path:'/cerSkill',//技能认证页
      name:'CerSkill',
      component:resolve=>require(['@/page/Mine/cer_skill'],resolve),
      meta:{
        keep:false
      }
    },
    {
      path:'/cerCard',//身份认证页
      name:'CerCard',
      component:resolve=>require(['@/page/Mine/cer_card'],resolve),
      meta:{
        keep:false
      }
    }
  ]
});
router.beforeEach((to,from,next)=>{
  NProgress.start();
  //登录权限页面
  const nextRoute=['CerSkill','CerCard','PersonMes','TakeOrder','DemandNeed','WorkLog'];
  if(nextRoute.indexOf(to.name) > -1){
    if (!window.localStorage.getItem('Uid')) {
      Toast('请先登录');
      next('/Tlogin')
   }
  }
  next()
});
router.afterEach(() => {
    NProgress.done()
})
export default router;
