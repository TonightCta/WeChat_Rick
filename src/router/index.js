import Vue from 'vue'
import Router from 'vue-router'
// import  from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',//首页
      name: 'Home',
      component: resolve=>require(['@/page/Home/home'],resolve)
    },
    {
      path:'/order',//订单页
      name:'Order',
      component:resolve=>require(['@/page/Order/order'],resolve)
    },
    {
      path:'/mine',//个人中心
      name:'Mine',
      component:resolve=>require(['@/page/Mine/mine'],resolve)
    },
    {
      path:'/about',//关于我们
      name:'About',
      component:resolve=>require(['@/page/About/about_company'],resolve),
      children:[
        {
          path:'/companyIn',//公司简介
          name:'CompanyIn',
          component:resolve=>require(['@/page/About/company_intro'],resolve)
        },
        {
          path:'/companyCon',//联系我们
          name:'CompanyCon',
          component:resolve=>require(['@/page/About/company_contact'],resolve)
        }
      ],
      redirect:'/companyIn'
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
      children:[
        {
          path:'/register',//注册页
          name:'Register',
          component:resolve=>require(['@/page/Login/register'],resolve)
        },
        {
          path:'/Tlogin',//登录页
          name:'TLogin',
          component:resolve=>require(['@/page/Login/Tlogin'],resolve)
        }
      ],
      redirect:'/register'
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
      path:'/cerSkill',//技能认证页
      name:'CerSkill',
      component:resolve=>require(['@/page/Mine/cer_skill'],resolve)
    },
    {
      path:'/cerCard',//身份认证页
      name:'CerCard',
      component:resolve=>require(['@/page/Mine/cer_card'],resolve)
    }
  ]
})
