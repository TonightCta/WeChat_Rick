<!-- 注册页 -->
<template lang="html">
  <div class="register_page">
    <WorkHeader>
      <span>注册</span>
    </WorkHeader>
    <div class="login_pic">
      <img src="../../../static/img/login_bg2.png" alt="">
    </div>
    <div class="radio_mask first">

    </div>
    <div class="radio_mask second">

    </div>
    <div class="radio_mask three">

    </div>
    <p>
      <mt-radio
        v-model="isCompany"
        :options="['小哥账户', '公司账户']">
      </mt-radio>
    </p>
    <ul>
      <li>
        <img src="../../../static/img/regi_icon.png" alt="">
        <input type="text" v-model="userName" @blur="regisClear" placeholder="请输入姓名或公司名称" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/btn_icon.png" alt="">
        <input type="number" v-model="userPhone" @blur="regisClear" placeholder="请输入手机号" name="" value="">
      </li>

      <li>
        <img src="../../../static/img/mes_pass.png" alt="">
        <input type="password" v-model="userPass" @blur="regisClear" placeholder="请输入密码" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/btn_pass.png" alt="">
        <input type="password" v-model="turnPass" @blur="regisClear" placeholder="确认密码" name="" value="">
      </li>
      <li>
        <img src="../../../static/img/mes_number.png" alt="">
        <input type="text" v-model="inviCode" @blur="regisClear" placeholder="请输入邀请码（选填）" name="" value="">
      </li>
    </ul>
    <p class="login_btn" @click="regis()">注册</p>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import WorkHeader from '@/components/work_header'
import {downIOS} from '@/assets/js/default'
export default {
  components:{
    WorkHeader
  },
  data(){
    return{
      userName:null,//用户姓名
      userPhone:null,//用户手机
      nickName:null,//用户登录名
      userPass:null,//用户密码
      turnPass:null,//确认密码
      inviCode:'',//邀请码
      regisClear:downIOS,
      isCompany:'小哥账户',//账户类型
    }
  },
  methods:{
    ...mapMutations(['userMes_fn','userID_fn','engSkill_fn']),
    regis(){
      let _this=this;
      if(_this.userName==null){
        _this.$Toast('请输入姓名')
      }else if(_this.userPhone==null){
        _this.$Toast('请输入手机号')
      }else if(_this.userPhone.length<11){
        _this.$Toast('请输入正确的手机号')
      }else if(_this.turnPass==null){
        _this.$Toast('请输入登录密码')
      }else if(_this.userPass!==_this.turnPass){
        _this.$Toast('两次输入密码不一致')
      }else{
        _this.$Indicator.open('注册中...')
        let formData=new FormData();
        formData.append('name',this.userName);
        formData.append('phone',this.userPhone);
        formData.append('username',this.userPhone);
        formData.append('password',this.turnPass);
        formData.append('recommendCode',this.inviCode);
        if(_this.isCompany==='小哥账户'){
          formData.append('isCompany',false)
        }else{
          formData.append('isCompany',true)
        }
        _this.$axios.post(_this.oUrl+'/saveExternalEngineer',formData).then((res)=>{
          _this.$Indicator.close();
          if(res.data.code==0){
            _this.$Toast('注册成功');
            _this.userMes_fn(res.data.data);
            _this.userID_fn(res.data.data.id);
            if(res.data.data.identityCode==2||res.data.data.identityCode==3){
              window.localStorage.setItem('engID',res.data.data.engineerVO.id)
              _this.engSkill_fn(res.data.data.engineerVO);
            }
            window.localStorage.setItem('Uid',res.data.data.id);
            window.localStorage.setItem('name',res.data.data.engineerVO.name);
            window.localStorage.setItem('phone',res.data.data.engineerVO.phone);
            window.localStorage.setItem('login',true)
            setTimeout(()=>{
              window.localStorage.clear('login')
            },24*60*60*1000);
            if(res.data.data.identityCode==3){
              _this.$router.push({
                path:'/companyMine',
                query:{
                  color:4
                }
              })
            }else{
              _this.$router.push({
                path:'/mine',
                query:{
                  color:4
                }
              })
            }
          }else{
            _this.$Toast(res.data.msg)
          }
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
  .login_pic{
    width: 100%;
    height: 12rem;
    background: url('../../../static/img/login_bg.png');
    background-size: 100% 100%;
    position: relative;
    margin-top: 5rem;
    z-index: 20;
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
  .radio_mask{
    width: 40%;
    height: 3rem;
    background: white;
    position: absolute;
    left:10%;
    z-index: 10;
    top:16.5rem;
  }
  .second{
    left: 50%;
  }
  .three{
    top:23rem;
    left: 50%;
    height: 1rem;
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
    border-radius: 14px;
    box-shadow: 0px 8px 15px #ccc;
    margin-top: 2rem;
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    color:white;
    margin-bottom:5rem;
  }
}
</style>
