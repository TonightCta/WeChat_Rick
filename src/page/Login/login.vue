<!-- 登录注册页 -->
<template lang="html">
  <div class="login">
    <WorkHeader>
      <span>登录/注册</span>
    </WorkHeader>
    <div class="change_login">
      <ul>
        <router-link to="/register" tag="li">注册</router-link>
        <router-link to="/Tlogin" tag="li">登录</router-link>
      </ul>
    </div>
    <div class="login_pic">
      <img src="../../../static/img/login_bg2.png" alt="">
    </div>
    <div class="login_view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      turnBack:true
    }
  },
  components:{
    WorkHeader
  },
  methods:{
    ...mapMutations(['isBackM_fn','isBackT_fn']),
  },
  destroyed(){
    this.isBackM_fn(false);
    this.isBackT_fn(false);
  }
}
</script>

<style lang="scss" scoped>
.change_login{
  width: 100%;
  height: 5rem;
  margin-top:5rem;
  background: linear-gradient(#101013, #2c2d31);
  ul{
    width: 100%;
    display: flex;
    li{
      height:100%;
      text-align: center;
      margin:0;
      padding:0;
      font-size: 1.6rem;
      width: 50%;
      line-height: 5rem;
      color:white;
      font-weight: bold;
    }
    li:nth-child(1){
      border-right: 1px solid white;
    }
  }
}
.login_pic{
  width: 100%;
  height: 12rem;
  background: url('../../../static/img/login_bg.png');
  background-size: 100% 100%;
  position: relative;
  img{
    width: 12rem;
    height: 7rem;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-6rem;
    margin-top:-3.5rem;
  }
}
.login_view{
  width: 100%;
}
</style>
