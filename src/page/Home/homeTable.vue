<!-- 首页功能列表 -->
<template lang="html">
  <div class="">
    <div class="home_table">
      <ul class="top">
        <li @click="hasLogin()">小哥注册</li>
        <router-link to="/takeOrder" tag="li">接单赚钱<span class="orderNum" v-show="hasAvi">{{aviLength}}</span></router-link>
        <router-link to="/workLog" tag="li">工作日志</router-link>
      </ul>
      <ul class="bottom">
        <router-link to="/demandNeed" tag="li">发布需求</router-link>
        <router-link to="/projectTrak" tag="li">订单追踪</router-link>
        <router-link to="/projectMan" tag="li">项目管理</router-link>
      </ul>
    </div>
    <div class="adv_box" v-show="alertBox">
      <p @click="closeAdv()"></p>
      <div class="bg"  @click="goOrder()">

      </div>
      <span class="advNum">{{aviLength}}</span>
      <span class="intBorder"></span>
    </div>
    <div class="adv_mask" @touchmove.prevent v-show="alertBox">

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      alertBox:true,
      hasAvi:false,
      aviLength:0
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
  },
  mounted(){
    this.getAviList();
    if(sessionStorage.getItem('alertB')){
      this.alertBox=false
    };
  },
  methods:{
    goOrder(){
      this.$router.push('/takeOrder');
      window.sessionStorage.setItem('alertB',false)
      this.alertBox=false
    },
    getAviList(){
      let _vm=this;
      let formdata=new FormData();
      let userId=window.localStorage.getItem('engID');
      // let userId='d7b801d7-16b5-4dc5-b628-33a966dfc95c';
      if(window.localStorage.getItem('engID')){
        formdata.append('engineerIdOut',userId);
      }else{
        console.log('未登录')
      };
      if(sessionStorage.getItem('aviNum')){
        _vm.aviLength=sessionStorage.getItem('aviNum');
        _vm.hasAvi=true;
      }else{
        _vm.$axios.post(_vm.oUrl+'/mission/findMissionListByCondition',formdata).then((res)=>{
          if(res.data.code==0){
            if(res.data.data.totalElements>0){
              _vm.hasAvi=true;
              _vm.aviLength=res.data.data.totalElements;
              sessionStorage.setItem('aviNum',res.data.data.totalElements)
            }else{
              _vm.hasAvi=false;
            }
          }else{
            _vm.hasAvi=false;
          }
        }).catch((err)=>{
          console.log(err);
          _vm.hasAvi=false;
        })
      }
    },
    closeAdv(){//关闭广告
      window.sessionStorage.setItem('alertB',false)
      this.alertBox=false
    },
    hasLogin(){
      if(window.localStorage.getItem('Uid')){
        this.$Toast('当前已登录，请退出登录后再试')
      }else{
        this.$router.push('/register')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home_table{
  width: 100%;
  margin-top: 2rem;
  border-radius:12px;
  ul{
    display: flex;
    width: 95%;
    margin:0 auto;
    justify-content: space-around;
    margin-top: 1rem;
    li{
      width: 29%;
      height:6rem;
      background: red;
      text-align: center;
      font-size: 1.1rem;
      color: white;
      padding-top: 4.3rem;
      box-sizing: border-box;
      letter-spacing:2px;
    }
  }
  .top{
    li:nth-child(1){
      background: url('../../../static/img/table_1_1.png');
      background-size: 100% 100%;
    }
    li:nth-child(2){
      background: url('../../../static/img/table1.png');
      background-size: 100% 100%;
      position: relative;
      .orderNum{
        position: absolute;
        width: 1.9rem;
        height: 1.9rem;
        background: red;
        border-radius: 50%;
        top:-.8rem;
        right:-.8rem;
        line-height: 1.9rem;
        text-align: center;
        font-size: 1rem;
        letter-spacing:0px;
      }
    }
    li:nth-child(3){
      background: url('../../../static/img/table2.png');
      background-size: 100% 100%;
    }
  }
  .bottom{
    li:nth-child(1){
      background: url('../../../static/img/table3.png');
      background-size: 100% 100%;
    }
    li:nth-child(2){
      background: url('../../../static/img/table4.png');
      background-size: 100% 100%;
      position: relative;
      .orderNum{
        position: absolute;
        width: 1.9rem;
        height: 1.9rem;
        background: red;
        border-radius: 50%;
        top:-.8rem;
        right:-.8rem;
        line-height: 1.9rem;
        text-align: center;
        font-size: 1rem;
        letter-spacing:0px;
      }
    }
    li:nth-child(3){
      background: url('../../../static/img/table5.png');
      background-size: 100% 100%;
    }
  }
}
.adv_box{
  width: 70%;
  height: 15rem;
  position: fixed;
  top:50%;
  margin-left:-35%;
  left:50%;
  margin-top:-12.5rem;
  z-index: 9010;
  .bg{
    width: 100%;
    height: 100%;
    background: url('../../../static/img/adi_bg.png');
    background-size: 100% 100%;
  }
  .intBorder{
    width: 3rem;
    height:5rem;
    position: absolute;
    left:50%;
    margin-left: -2px;
    border-left: 4px solid rgba(255,255,255,.5);
    bottom: -5rem;
    z-index: 9000;
  }
  .advNum{
    position: absolute;
    width: 4rem;
    height: 3rem;
    line-height: 3rem;
    background:rgba(0,0,0,0);
    color:#f43233;
    text-align: center;
    font-size: 2.0rem;
    font-weight: bold;
    top:50%;
    margin-top: -1.5rem;
    left:50%;
    margin-left: -2.5rem;
  }
  p{
    width: 3rem;
    height: 3rem;
    background: url('../../../static/img/adv_close.png');
    background-size: 100% 100%;
    position: absolute;
    bottom:-8rem;
    left:50%;
    margin-left:-1.5rem;
  }
}
.adv_mask{
  width: 100%;
  height: 100%;
  z-index: 9008;
  position: fixed;
  top:0;
  left:0;
  background: rgba(0,0,0,.7);
}
</style>
