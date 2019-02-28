<!-- 登录页 -->
<template lang="html">
  <div class="Tlogin_page">
    <ul>
      <li>
        <img src="../../../static/img/mes_number.png" alt="">
        <input type="text" placeholder="请输入账号/手机号" name="" value="" v-model="userName">
      </li>
      <li>
        <img src="../../../static/img/btn_pass.png" alt="">
        <input type="password" v-model="userPass" ref="userpass" placeholder="请输入密码" name="" value="">
        <i class="iconfont icon-chakan" v-show="isPass" @click="showPass()"></i>
      </li>
    </ul>
    <p class="login_btn" @click="login()">登录</p>
    <p class="forget_pass">忘记密码?</p>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
export default {
  data(){
    return{
      userName:'',//用户登录名
      userPass:'',//用户密码
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
  computed:{
    // ...mapState('userMes')
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    showPass(){
      this.$refs.userpass.type='number';
    },
    login(){
      let _this=this;
      _this.$Indicator.open('登录中...')
      let formData=new FormData();
      formData.append('name',_this.userName);
      formData.append('password',_this.userPass);
      _this.$axios.post(_this.oUrl+'/login',formData).then((res)=>{
        if(res.data.code===0){
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
        console.log(err);
      })
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
