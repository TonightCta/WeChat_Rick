<!-- 注册页 -->
<template lang="html">
  <div class="register_page">
    <ul>
      <li>
        <img src="../../../static/img/regi_icon.png" alt="">
        <input type="text" v-model="userName" placeholder="请输入姓名" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/btn_icon.png" alt="">
        <input type="number" v-model="userPhone" placeholder="请输入手机号" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/mes_number.png" alt="">
        <input type="text" v-model="nickName" placeholder="请输入登录名" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/mes_pass.png" alt="">
        <input type="text" v-model="userPass" placeholder="请输入11位密码" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/btn_pass.png" alt="">
        <input type="text" v-model="turnPass" placeholder="确认密码" name="" value="">
      </li>
    </ul>
    <p class="login_btn" @click="regis()">注册</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userName:null,
      userPhone:null,
      nickName:null,
      userPass:null,
      turnPass:null
    }
  },
  methods:{
    regis(){
      let _this=this;
      if(_this.userName==''){
        _this.$Toast('请输入姓名')
      }else if(_this.userPhone==''){
        _this.$Toast('请输入手机号')
      }else if(_this.nickName==''){
        _this.$Toast('请输入登录名')
      }else if(_this.turnPass==''){
        _this.$Toast('请输入登录密码')
      }else{
        let formData=new FormData();
        formData.append('name',this.userName);
        formData.append('phone',this.userPhone);
        formData.append('username',this.nickName);
        formData.append('password',this.turnPass);
        _this.$axios.post(_this.oUrl+'/saveExternalEngineer',formData).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register_page{
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
        height: 2rem;
        font-size: 1.5rem;
        position: absolute;
        top:50%;
        margin-top: -1.2rem;
        margin-left: .6rem;
      }
    }
  }
  .login_btn{
    width: 60%;
    height: 4rem;
    background: url('../../../static/img/btn_bg3.png');
    background-size: 100% 100%;
    margin:0 auto;
    border-radius: 8px;
    box-shadow: 0px 10px 30px #999;
    margin-top: 2rem;
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    color:white;
    margin-bottom:5rem;
  }
}
</style>
