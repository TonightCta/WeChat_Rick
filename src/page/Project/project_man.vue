<!-- 项目管理 -->
<template lang="html">
  <div class="project_man">
    <div class="header_wapper">
      <i class="iconfont icon-fanhui" @click="backOf()"></i>
      <slot>
        <span>项目管理</span>
      </slot>
    </div>
    <div class="admin_bar">
      <router-link to="/projectMan/proList" tag="span"  v-if="Tab" @click.native="Tab=false">
        <img src="../../../static/img/admin_bar.png" alt="">
      </router-link>
      <router-link to="/projectMan/proGress" tag="span"  style="width:2.4rem;height:2.4rem;" v-else @click.native="Tab=true">
        <img src="../../../static/img/admin_e.png" alt="">
      </router-link>
    </div>
    <div class="pro_list">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      Tab:false,//切换路径
    }
  },
  components:{
    WorkHeader
  },
  methods:{

    backOf(){//返回上级
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>
.project_man{
  width: 100%;
  .header_wapper{
    width: 100%;
    height:5rem ;
    background: linear-gradient(#101013, #2c2d31);
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
    i{
      font-size: 2rem;
      position: absolute;
      top:1.3rem;
      left:1.5rem;
      color:white;
    }
    span{
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 1.8rem;
      line-height: 4.8rem;
      color:white;
    }
  }
  .admin_bar{
    margin-top: 5rem;
    height: 1rem;
    position: relative;
    z-index: 8888;
    span{
      display: inline-block;
      width: 2rem;
      height: 2rem;
      position: fixed;
      top:1.4rem;
      right:2rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .pro_list{
    width: 100%;
    height: 100%;
    margin-top: 10rem;
  }
}
</style>
