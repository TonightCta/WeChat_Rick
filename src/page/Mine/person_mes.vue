<!-- 用户资料展示/修改页面 -->
<template lang="html">
  <div class="person_mes">
    <WorkHeader>
      <span>个人信息</span>
    </WorkHeader>
    <div class="person_con">
      <ul class="mes_list">
        <li>
          <img src="../../../static/img/mes_number.png" alt="">
          <span>登录&nbsp;&nbsp;ID:</span>
          <span>
            <input type="text" v-model="userId" name="" value="">
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <!-- <li>
          <img src="../../../static/img/mes_pass.png" alt="">
          <span>登录密码:</span>
          <span>
            <input type="password" v-model="userPass"name="" value=""
             placeholder="请输入您的密码"
             >
             <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li> -->
        <li>
          <img src="../../../static/img/mes_location.png" alt="">
          <span>服务范围:</span>
          <span>
            <input type="text" v-model="userLoca" name="" value=""
            placeholder="请输入您的工作地址"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_person.png" alt="">
          <span>身份认证:</span>
          <span>
            <input type="text" v-model="userCard" name="" value=""
            placeholder="请输入您的身份证号"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_skills.png" alt="">
          <span>技能认证:</span>
          <span>
            <input type="text" v-model="userSkill" name="" value="">
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_date.png" alt="">
          <span>工作年限:</span>
          <span>
            <input type="text" v-model="userDate" name="" value=""
            placeholder="请输入您的工作年限"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_email.png" alt="">
          <span>电子邮箱:</span>
          <span>
            <input type="text" v-model="userEmail" name="" value=""
            placeholder="请输入您的邮箱地址"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_phone.png" alt="">
          <span>联系电话:</span>
          <span>
            <input type="text" v-model="userPhone" name="" value=""
            placeholder="请输入您的联系电话"
            >
            <span class="mes_mask" v-show="disabled"></span>
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
import {mapState} from 'vuex'
export default {
  data(){
    return{
      disabled:true,//是否禁用输入框
      userId:'-',//用户ID
      userPass:'-',//用户密码
      userLoca:'-',//用户工作地址
      userCard:'-',//用户身份认证
      userSkill:'-',//用户技能认证
      userDate:'-',//用户工作年限
      userEmail:'-',//用户邮箱
      userPhone:'-',//用户联系电话
      placeArr:[],
      delArr:[]
    }
  },

  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    this.disabled=this.$route.query.isDis;
    console.log(this.userMes);
    if(this.userMes.name){//登录ID
      this.userId=this.userMes.name;
    }
    if(this.userMes.engineerVO.childPlaces.length>0){//服务地址
      let locaList=this.userMes.engineerVO.childPlaces;
      for(let i in locaList){
        let subLoca=locaList[i].parentPlace.name+'-'+locaList[i].name;
        this.placeArr.push(subLoca)
      }
      this.userLoca=this.placeArr.splice(0,2).join('/')+'...'
    };
    if(this.userMes.engineerVO.state){//身份认证
      if(this.userMes.engineerVO.state==0){
        this.userCard='未认证'
      }else if(this.userMes.engineerVO.state==1){
        this.userCard='认证中'
      }else if(this.userMes.engineerVO.state==2){
        this.userCard='已认证'
      }
    };
    if(this.userMes.engineerVO.levels.length>0){//技能认证
      let delList=this.userMes.engineerVO.levels;
      for(let x in delList){
        let subDel=delList[x].technology.name+'-'+delList[x].name;
        this.delArr.push(subDel)
      };
      this.userSkill=this.delArr.splice(0,2).join('/')+'...'
    };
    if(this.userMes.engineerVO.workYear){//工作年限
      this.userDate=this.userMes.engineerVO.workYear+'年';
    };
    if(this.userMes.email){//用户邮箱
      this.userEmail=this.userMes.email;
    };
    if(this.userMes.mobile){//用手电话
      this.userPhone=this.userMes.mobile
    }
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
  margin-top:6rem;
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
      .mes_mask{
        width: 100%;
        height: 100%;
        position: absolute;
        background: black;
        opacity: 0;
        left:5%;
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
