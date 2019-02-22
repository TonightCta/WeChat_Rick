<!-- 个人中心 -->
<template lang="html">
  <div class="mine">
    <!-- 个人资料块 -->
    <div class="person_mes">
      <img src="../../static/img/table1.png" alt="" class="person_pic" @click="goMes()">
      <router-link to="/login" tag="p" class="person_oper">
        登录/注册
      </router-link>
      <div class="person_del">
        <ul>
          <li>
            <span class="iconfont icon-icon-test"></span>
            <span>电话：</span>
            <span>18888888888</span>
          </li>
          <li>
            <span class="iconfont icon-rili"></span>
            <span>工作年限：</span>
            <span>二十年Java</span>
          </li>
        </ul>
        <p>
          <span class="iconfont icon-mail"></span>
          <span>邮箱：</span>
          <span>18888888888@gmail.com</span>
        </p>
        <span class="iconfont icon-icon y"></span>
      </div>
    </div>
    <!-- 阴影盒子 -->
    <div class="person_mask">

    </div>
    <!-- 功能块 -->
    <div class="person_work">
      <ul>
        <li>
          <i class="iconfont icon-renzheng"></i>
          <span>技能认证</span>
        </li>
        <li>
          <i class="iconfont icon-shimingrenzheng"></i>
          <span>身份认证</span>
        </li>
        <router-link :to="{path:'/personMes',query:{isDis:false}}" tag="li">
          <i class="iconfont icon-bianjiziliao"></i>
          <span>编辑资料</span>
        </router-link>
        <li @click="logOut()">
          <i class="iconfont icon-tuichudenglu"></i>
          <span>注销登录</span>
        </li>
      </ul>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/footer_wapper'
export default {
  methods:{
    goMes(){//点击进入个人详情页
      this.$router.push({
        path:'/personMes',
        query:{
          isDis:true
        }
      })
    },
    logOut(){//注销登录
      this.$Indicator.open('注销中...');
      setTimeout(()=>{
        this.$Indicator.close();
        this.$Toast('注销成功')
      },1000)
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
  .person_mes{
    width: 100%;
    background: url('../../static/img/person_background.png');
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
      color:#f9871b;
      position: absolute;
      left:50%;
      top:20.2rem;
      margin-left: -1.4rem;
    }
  }
  .person_mask{
    width: 60%;
    height: 10rem;
    background: white;
    margin:0 auto;
    position: fixed;
    top:12rem;
    box-shadow:0px 30px 100px #666;
    z-index: -1;
    left:50%;
    margin-left: -30%;
  }
  .person_work{
    width: 100%;
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
        i{
          font-size: 1.8rem;
        }
      }
      li:nth-child(2){
        i{
          position: absolute;
          top:.2rem;
          left:2rem;
        }
      }
    }
  }
}
</style>
