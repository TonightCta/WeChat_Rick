<!-- 个人中心 -->
<template lang="html">
  <div class="mine">
    <!-- 个人资料块 -->
    <div class="person_mes">
      <img src="../../../static/img/user_pic.jpg" alt="" class="person_pic" @click="goMes()">
      <router-link to="/TLogin" tag="p" class="person_oper" @click.native="mineCon()">
        {{nickName}}
      </router-link>
      <div class="person_del">
        <ul>
          <li>
            <span class="iconfont icon-icon-test"></span>
            <span>电话：</span>
            <span>{{userPhone}}</span>
          </li>
          <li>
            <span class="iconfont icon-rili"></span>
            <span>工作年限：</span>
            <span>{{userDate}}年</span>
          </li>
        </ul>
        <p>
          <span class="iconfont icon-mail"></span>
          <span>邮箱：</span>
          <span>{{userEmail}}</span>
        </p>
        <span class="iconfont icon-icon y" @click="cert()" ref="certColor"></span>
      </div>
      <!-- 阴影盒子 -->
      <div class="person_mask">

      </div>
    </div>

    <!-- 功能块 -->
    <div class="person_work">
      <ul>
        <router-link to="/cerSkill" tag="li">
          <i class="iconfont icon-renzheng"></i>
          <span>技能认证</span>
          <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
        </router-link>
        <router-link to="/cerCard" tag="li">
          <i class="iconfont card_icon icon-shimingrenzheng"></i>
          <span>身份认证</span>
          <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
        </router-link>
        <router-link :to="{path:'/personMes',query:{isDis:false}}" tag="li">
          <i class="iconfont write_icon icon-bianjiziliao"></i>
          <span>编辑资料</span>
          <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
        </router-link>
        <!-- <li @click="logOut()">

        </li> -->
        <router-link to="/setTing" tag="li">
          <i class="iconfont icon-shezhi"></i>
          <span>设置</span>
          <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
        </router-link>
      </ul>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import { MessageBox } from 'mint-ui'
import Footer from '@/components/footer_wapper'
export default {
  inject:['reload'],
  data(){
    return{
      nickName:'请登录',
      userPhone:'-',
      userDate:'-',
      userEmail:'-',
      messageTitle:'提示',//操作盒子标题
      messageCon:'请先进行身份认证',//操作盒子内容
      pathdyn:null,//跳转地址
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    if(window.localStorage.getItem('name')){
      this.nickName=window.localStorage.getItem('name');
    }
    if(window.localStorage.getItem('phone')){
      this.userPhone=window.localStorage.getItem('phone')
    }
    if(this.userMes.engineerVO){
      console.log(this.userMes.engineerVO.state)
      if(this.userMes.engineerVO.state==0){
        this.$refs.certColor.style.color='#999'
      }else if(this.userMes.engineerVO.state==1){
        this.$refs.certColor.style.color='black'
      }else{
        this.$refs.certColor.style.color='#eb7a1d'
      }
    }
    if(this.userMes.email){
      this.userEmail=this.userMes.email
    }

    if(this.userMes.engineerVO){
      this.userDate=this.userMes.engineerVO.workYear
    }
  },
  methods:{
    ...mapMutations(['isBackM_fn','isBackT_fn','userMes_fn']),
    goMes(){//点击进入个人详情页
      this.$router.push({
        path:'/personMes',
        query:{
          isDis:true
        }
      })
    },

    mineCon(){//进入登录注册页
      this.isBackM_fn(true);
      this.isBackT_fn(false);
    },

    cert(){//申请认证
      let _this=this;
      let formData=new FormData();
      formData.append('id',_this.userMes.engineerVO.id);
      _this.$axios.post(_this.oUrl+'/mobile/externalEngineerApply',formData).then((res)=>{
        if(res.data.code==0){
          console.log(res)
          _this.messageTitle=res.data.data.title;
          _this.messageCon=res.data.data.con;
          // if(res.data.data.delcode==0){
          //   this.pathdyn='/personMes'
          // }else if(res.data.data.delcode==1){
          //   this.pathdyn='/cerCard'
          // }else{
          //   this.pathdyn='/cerSkill'
          // }
          this.userMes_fn(res.data.data)
          setTimeout(()=>{
            MessageBox.confirm(_this.messageCon,_this.messageTitle,{confirmButtonText:'跳转',cancelButtonText:'返回'}).then(action => {
              _this.$router.push({
                path:_this.pathdyn,
                isDis:false
              })
            });
          },500)
        }else{
          _this.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$Toast('未知错误')
        console.log(err)
      })
    }
  },
  components:{
    Footer
  }
}
</script>

<style lang="scss" scoped>
.mine{
  width: 92%;
  margin:0 auto;
  position: relative;
  .person_mes{
    width: 100%;
    background: url('../../../static/img/person_background.png');
    background-size: 100% 100%;
    height: 23rem;
    border-radius:12px;
    margin-top: 2rem;
    position: relative;
    .person_pic{
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      margin-top: 4rem;
      margin-left: 2rem;
    }
    .person_oper{
      font-size: 1.6rem;
      position: absolute;
      left:12rem;
      top:7rem;
      color:white;
    }
    .person_del{
      width: 100%;
      height: 6rem;
      // background: blue;
      padding-top: 1.5rem;
      ul{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: 1;
        li{
          width: 50%;
          font-size: 1.2rem;
          color:white;
        }
        li:nth-child(1){
          padding-left: 1rem;
        }
      }
      p{
        margin-top:1rem;
        width: 100%;
        font-size: 1.2rem;
        padding-left:1rem;
        color:white;
      }
    }
    .y{
      font-size: 2rem;
      color:#999;
      position: absolute;
      left:50%;
      top:20.2rem;
      margin-left: -1.4rem;
    }
    .person_mask{
      width: 60%;
      height: 10rem;
      background: white;
      margin:0 auto;
      position: absolute;
      top:12rem;
      box-shadow:0px 30px 100px #666;
      z-index: -1;
      left:50%;
      margin-left: -30%;
    }
  }

  .person_work{
    width: 100%;
    margin-bottom: 15rem;
    ul{
      width: 100%;
      li{
        width: 100%;
        margin-top: 1rem;
        height: 5rem;
        background: white;
        box-shadow: 0px 0px 15px #999;
        line-height: 5.5rem;
        border-radius: 10px;
        padding-left: 2rem;
        box-sizing: border-box;
        position: relative;
        i{
          font-size: 2.2rem;
        }
        .forward{
          color:#999;
          position: absolute;
          right:2rem;
          font-weight: bold;
        }
        span{
          font-size: 1.2rem;
          position: absolute;
          top:0;
          left:5rem;
        }
      }
      li:nth-child(1){
        margin-top:4rem;
      }
      li:nth-child(3){
        .write_icon{
          font-size: 1.8rem;
        }
      }
      li:nth-child(2){
        .card_icon{
          position: absolute;
          top:.2rem;
          left:2rem;
        }
      }
    }
  }
}
</style>
