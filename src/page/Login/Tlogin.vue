<!-- 登录页 -->
<template lang="html">
  <div class="Tlogin_page">
    <ul>
      <li>
        <img src="../../../static/img/mes_number.png" alt="">
        <input type="number" placeholder="请输入账号/手机号" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/btn_pass.png" alt="">
        <input type="password" v-model="userPass" ref="userpass" placeholder="请输入密码" name="" value="">
        <i class="iconfont icon-chakan" v-show="isPass" @click="showPass()"></i>
      </li>
    </ul>
    <p class="login_btn">登录</p>
    <p class="forget_pass">忘记密码?</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userPass:'',
      isPass:false
    }
  },
  watch:{
    userPass(val,oldVal){
      if(val!==''){
        this.isPass=true;
      }else{
        this.isPass=false
      }
    }
  },
  methods:{
    showPass(){
      this.$refs.userpass.type='number';
    }
  }
}
</script>

<style lang="scss" scoped>
.Tlogin_page{
  width: 100%;
  ul{
    width: 70%;
    margin:0 auto;
    li{
      width: 100%;
      height: 5rem;
      box-shadow: 0px 10px 30px #999;
      background: white;
      border-radius:10px;
      margin-top:2rem;
      padding-left: 1.5rem;
      padding-top:.8rem;
      box-sizing: border-box;
      position: relative;
      img{
        width: 3.5rem;
        height: 3.5rem;
      }
      input{
        font-size: 1.5rem;
        position: absolute;
        top:1.7rem;
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
    box-shadow: 0px 10px 30px #999;
    margin-top: 5rem;
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
    text-decoration:underline;
  }
}
</style>
