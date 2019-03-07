<template lang="html">
  <div class="footer_wapper">
    <ul class="icon_list">
        <router-link :to="{path:'/home',query:{color:1}}" tag="li" :class="{active:color==1}" @click.native="color==1">
          <i class="iconfont icon-yemian"></i>
          <br>
          <span>首页</span>
        </router-link>
        <router-link :to="{path:'/order',query:{color:2}}" tag="li" :class="{active:color==2}" @click.native="color==2">
          <i class="iconfont icon-dingdan"></i>
          <span>订单</span>
        </router-link>
        <router-link :to="{path:'/about',query:{color:3}}" tag="li" :class="{active:color==3}" @click.native="color==3">
          <i class="iconfont icon-guanyuwomen1" style="font-size:1.7rem;"></i>
          <span>关于我们</span>
        </router-link>
        <router-link :to="{path:'/mine',query:{color:4}}" tag="li" :class="{active:color==4}" @click.native="color==4">
          <i class="iconfont icon-wd"></i>
          <span>个人中心</span>
        </router-link>
    </ul>
    <!-- <ul class="text_list">
      <li :class="{active:color==1}">首页</li>
      <li :class="{active:color==2}">订单</li>
      <li :class="{active:color==2}">关于我们</li>
      <li :class="{active:color==3}">我的</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      color:1
    }
  },
  mounted(){
    this.color=1;
    this.color=this.$route.query.color;
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.active{
  color:#eb7a1d!important;
  span{
    color:#eb7a1d!important;
  }
}
.footer_wapper{
  width: 100%;
  height:5rem;
  background: white;
  position: fixed;
  bottom:0;
  left:0;
  background: #eee;
  .icon_list{
    width: 100%;
    display: flex;
    height:100%;
    line-height: 4rem;
    // justify-content: space-around;
    padding-bottom:.5rem;
    li{
      width: 25%;
      text-align: center;
      color: #666;
      position: relative;
      i{
        font-size: 1.8rem;
      }
      span{
        display: inline-block;
        width: 100%;
        // background: red;
        position: absolute;
        font-size: 1rem;
        left:0;
        // top:0;
        font-size: 1.2rem;
        top:1.8rem;
      }
    }
    li:nth-child(2){
      i{
        font-size: 1.7rem;
      }
    }
  }
  .text_list{
    width: 100%;
    display: flex;
    height: 50%;
    justify-content: space-around;
    font-size: 1.1rem;
    padding-left:.4rem;
    li{
      width:3rem;
      color:#666;
    };
  }
}
</style>
