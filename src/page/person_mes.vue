<!-- 用户资料展示/修改页面 -->
<template lang="html">
  <div class="person_mes">
    <WorkHeader>
      <span>个人信息</span>
    </WorkHeader>
    <div class="person_con">
      <ul class="mes_list">
        <li>
          <img src="../../static/img/mes_number.png" alt="">
          <span>登录&nbsp;&nbsp;ID:</span>
          <span>
            <input type="text" v-model="userId" disabled="disabled" name="" value="">
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_pass.png" alt="">
          <span>登录密码:</span>
          <span>
            <input type="password" v-model="userPass"
             :disabled="disabled" name="" value=""
             placeholder="请输入您的密码"
             >
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_location.png" alt="">
          <span>服务范围:</span>
          <span>
            <input type="text" v-model="userLoca"
            :disabled="disabled" name="" value=""
            placeholder="请输入您的工作地址"
            >
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_person.png" alt="">
          <span>身份认证:</span>
          <span>
            <input type="text" v-model="userCard"
            :disabled="disabled" name="" value=""
            placeholder="请输入您的身份证号"
            >
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_skills.png" alt="">
          <span>技能认证:</span>
          <span>
            <input type="text" v-model="userSkill" disabled="disabled" name="" value="">
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_date.png" alt="">
          <span>工作年限:</span>
          <span>
            <input type="text" v-model="userDate"
            :disabled="disabled" name="" value=""
            placeholder="请输入您的工作年限"
            >
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_email.png" alt="">
          <span>电子邮箱:</span>
          <span>
            <input type="text" v-model="userEmail"
            :disabled="disabled" name="" value=""
            placeholder="请输入您的邮箱地址"
            >
          </span>
        </li>
        <li>
          <img src="../../static/img/mes_phone.png" alt="">
          <span>联系电话:</span>
          <span>
            <input type="text" v-model="userPhone"
            :disabled="disabled" name="" value=""
            placeholder="请输入您的联系电话"
            >
          </span>
        </li>
      </ul>
      <p class="saveMes" @click="saveMes()">
        <button type="button" name="button" v-show="!disabled">保存</button>
      </p>
    </div>

  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      disabled:true,//是否禁用输入框
      userId:10086,//用户ID
      userPass:123456,//用户密码
      userLoca:'北京市海淀区万霖大厦',//用户工作地址
      userCard:411381199502284536,//用户身份认证
      userSkill:'区块链架构师',//用户技能认证
      userDate:'十年',//用户工作年限
      userEmail:'18888888888@gmail.com',//用户邮箱
      userPhone:'18888888888',//用户联系电话
    }
  },
  mounted(){
    this.disabled=this.$route.query.isDis;
  },
  methods:{
    saveMes(){
      this.$Indicator.open();
      setTimeout(()=>{
        this.$Indicator.close();
        this.$Toast('保存成功');
        window.history.back()
      },1000)
    }
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.personBor{
  border-bottom:1px solid #999;
}
.person_con{
  width: 92%;
  margin:0 auto;
  .mes_list{
    width: 100%;
    li{
      width: 100%;
      height: 5rem;
      margin-bottom:1.5rem;
      background: white;
      box-shadow: 0px 0px 30px #999;
      border-radius: 8px;
      box-sizing: border-box;
      padding-left: 2rem;
      padding-top:.8rem;
      position: relative;
      img{
        width: 3.5rem;
        height: 3.5rem;
      }
      span{
        height: 5rem;
        position: absolute;
        top:0;
        line-height: 5.2rem;
        font-size: 1.2rem;
        left:6.5rem;
      }
      input{
        margin-left: 5.5rem;
        background: white;
        outline: none;
        background: white;
      }
    }
    li:nth-child(1){
      margin-top:1.5rem;
    }
  }
  .saveMes{
    position: absolute;
    bottom:1rem;
    width: 92%;
    button{
      width: 100%;
      height:3.5rem;
      border-radius: 10px;
      background: #eb7a1d;
      color:white;
    }
  }
}

</style>
