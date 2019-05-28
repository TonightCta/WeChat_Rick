<!-- 用户设置 -->
<template lang="html">
  <div class="person_setting">
    <WorkHeader>
      <span>设置</span>
    </WorkHeader>
    <div class="setting_btn">
      <ul>
        <router-link to="/personSer" tag="li">
          <i class="iconfont icon-fuwutiaokuan"></i>
          <span>服务条款</span>
          <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
        </router-link>
        <li @click="logOut()">
          <i class="iconfont icon-tuichudenglu"></i>
          <span>注销登录</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapMutations} from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  components:{
    WorkHeader
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    logOut(){//注销登录
      MessageBox({
        message:'确认注销登录？',
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        showCancelButton:true
      }).then(action => {
        if(action=='confirm'){
          this.$Indicator.open('注销中...');
          this.userMes_fn('');
          window.localStorage.clear('name');
          window.localStorage.clear('Uid');
          window.localStorage.clear('phone');
          window.localStorage.clear('engID');
          window.localStorage.clear('Ident');
          setTimeout(()=>{
            this.$Indicator.close();
            this.$Toast('注销成功');
            this.$router.push({
              path:'/mine',
              query:{
                color:4
              }
            })
          },500)
        }
      }).catch(err=>{
        if(err=='cancel'){
          console.log(err)
        }
      })

    },
  }
}
</script>

<style lang="scss" scoped>
.person_setting{
  width: 92%;
  margin:0 auto;
  margin-top: 6rem;
  .setting_btn{
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
          font-size: 1.4rem;
          position: absolute;
          top:-0.1rem;
          left:5rem;
        }
      }
    }
  }
}
</style>
