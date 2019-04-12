<!-- 首页功能列表 -->
<template lang="html">
  <div class="">
    <div class="home_table">
      <ul>
        <li @click="hasLogin()">小哥注册</li>
        <router-link to="/takeOrder" tag="li">接单赚钱<span class="orderNum">{{15}}</span></router-link>
        <router-link to="/demandNeed" tag="li">发布需求</router-link>
        <router-link to="/workLog" tag="li">工作日志</router-link>
        <!-- <li>接单赚钱</li>
        <li>发布需求</li>
        <li>工作日志</li> -->
      </ul>
    </div>
    <div class="adv_box" v-show="alertBox">
      <p @click="closeAdv()"></p>
    </div>
    <div class="adv_mask" v-show="alertBox">

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      alertBox:true
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    if(sessionStorage.getItem('alertB')){
      this.alertBox=false
    }
  },
  methods:{
    closeAdv(){//关闭广告
      window.sessionStorage.setItem('alertB',false)
      this.alertBox=false
    },
    hasLogin(){
      if(this.userMes.engineerVO){
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
    justify-content: space-between;
    li{
      width: 22%;
      height:6rem;
      background: red;
      text-align: center;
      font-size: 1.1rem;
      color: white;
      padding-top: 4.3rem;
      box-sizing: border-box;
      letter-spacing:2px;
    }
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
      }
    }
    li:nth-child(3){
      background: url('../../../static/img/table2.png');
      background-size: 100% 100%;
    }
    li:nth-child(4){
      background: url('../../../static/img/table3.png');
      background-size: 100% 100%;
    }
  }
}
.adv_box{
  width: 70%;
  height: 15rem;
  position: fixed;
  background: white;
  top:50%;
  margin-left:-35%;
  left:50%;
  margin-top:-7.5rem;
  z-index: 9010;
  p{
    width: 3rem;
    height: 3rem;
    background: url('../../../static/img/adv_close.png');
    background-size: 100% 100%;
    position: absolute;
    bottom:-5rem;
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
