<!-- 登录页 -->
<template lang="html">
  <div class="Tlogin_page">
    <WorkHeader>
      <span>登录</span>
    </WorkHeader>
    <div class="login_pic">
      <img src="../../../static/img/login_bg2.png" alt="">
    </div>
    <ul>
      <li>
        <img src="../../../static/img/mes_number.png" alt="">
        <input type="text" @blur="clearIOS" placeholder="请输入账号/手机号" name="" value="" v-model="userName">
      </li>
      <li>
        <img src="../../../static/img/btn_pass.png" alt="">
        <input type="password" @blur="clearIOS" v-model="userPass" ref="userpass" placeholder="请输入密码" name="" value="">
        <i class="iconfont icon-chakan" v-show="isPass" @click="showPass()"></i>
        <i class="iconfont icon-chakan" v-show="hidePs" @click="hidePass()"></i>
      </li>
    </ul>
    <p class="login_btn" @click="login()">登录</p>
    <p class="forget_pass">
      <span>忘记密码？</span>
      <span>/</span>
      <router-link to="/register" tag='span'>立即注册</router-link>
    </p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapMutations,mapState} from 'vuex'
import {downIOS} from '@/assets/js/default'
export default {
  components:{
    WorkHeader
  },
  data(){
    return{
      userName:null,//用户登录名
      userPass:null,//用户密码
      isPass:false,
      hidePs:false,
      clearIOS:downIOS
    }
  },
  watch:{
    userPass(val,oldVal){
      if(val!==''){
        this.isPass=true;
      }else{
        this.isPass=false;
      }
    }
  },
  computed:{
    // ...mapState('userMes')
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    showPass(){//显示密码
      this.$refs.userpass.type='number';
      this.isPass=false;
      this.hidePs=true;
    },
    hidePass(){//隐藏密码
      this.$refs.userpass.type='password';
      this.isPass=true;
      this.hidePs=false;
    },
    login(){
      let _this=this;
      if(_this.userName==null){
        _this.$Toast('请输入您的账号')
      }else if(_this.userPass==null){
        _this.$Toast('请输入您的密码')
      }else{
        _this.$Indicator.open('登录中...')
        let formData=new FormData();
        formData.append('name',_this.userName);
        formData.append('password',_this.userPass);
        _this.$axios.post(_this.oUrl+'/login',formData).then((res)=>{
          if(res.data.code===0){
            window.localStorage.setItem('Uid',res.data.data.id);
            window.localStorage.setItem('name',res.data.data.name);
            window.localStorage.setItem('phone',res.data.data.engineerVO.phone);
            _this.$Indicator.close();
            _this.userMes_fn(res.data.data);
            _this.$Toast('登录成功')
            _this.$router.push({
              path:'/mine',
              query:{
                color:4
              }
            })
          }else{
            _this.$Indicator.close();
            _this.$Toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$Indicator.close();
          console.log(err);
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Tlogin_page{
  width: 100%;
  .login_pic{
    width: 100%;
    height: 12rem;
    background: url('../../../static/img/login_bg.png');
    background-size: 100% 100%;
    position: relative;
    margin-top: 5rem;
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
  ul{
    width: 70%;
    margin:0 auto;
    li{
      width: 100%;
      height: 5rem;
      box-shadow: 0px 8px 15px #ccc;
      background: white;
      border-radius:10px;
      margin-top:2rem;
      padding-left: 1.5rem;
      padding-top:.8rem;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      img{
        width: 3.5rem;
        height: 3.5rem;
      }
      input{
        font-size: 1.5rem;
        height: 2rem;
        position: absolute;
        top:50%;
        margin-top: -1.2rem;
        margin-left: 1rem;
      }
      i{
        position: absolute;
        top:35%;
        right:15%;
      }
    }
  }
  .login_btn{
    width: 60%;
    height: 4rem;
    background: url('../../../static/img/btn_bg2.png');
    background-size: 100% 100%;
    margin:0 auto;
    border-radius: 8px;
    box-shadow: 0px 8px 15px #999;
    margin-top: 3rem;
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    color:white;
    // font-weight: bold;
  }
  .forget_pass{
    width: 100%;
    text-align: center;
    margin-top: 3rem;
    font-size: 1.3rem;
    color:#eb7a1d;
    span:nth-child(1){
      text-decoration:underline;
    }
    span:nth-child(2){
      margin-left: 1rem;
      margin-right:1rem;
    }
    span:nth-child(3){
      text-decoration:underline;
    }
  }
}
</style>
