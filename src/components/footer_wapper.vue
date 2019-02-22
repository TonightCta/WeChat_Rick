<template lang="html">
  <div class="footer_wapper">
    <ul class="icon_list">
      <li>
        <router-link :to="{path:'/home',query:{color:1}}" tag="span" @click.native="color==1">
          <!-- <img src="../../static/img/home_icon.png" alt=""> -->
          <i class="iconfont icon-shouye1" :class="{active:color==1}"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/order',query:{color:2}}" tag="span" @click.native="color==2">
          <!-- <img src="../../static/img/order_icon.png" alt=""> -->
          <i class="iconfont icon-shouye" :class="{active:color==2}"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/mine',query:{color:3}}" tag="span" @click.native="color==3">
          <!-- <img src="../../static/img/mine_icon.png" alt=""> -->
          <i class="iconfont icon-wode" :class="{active:color==3}"></i>
        </router-link>
      </li>
    </ul>
    <ul class="text_list">
      <li :class="{active:color==1}">首页</li>
      <li :class="{active:color==2}">订单</li>
      <li :class="{active:color==3}">我的</li>
    </ul>
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
  color:black!important;
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
    height:50%;
    line-height: 4rem;
    justify-content: space-around;
    padding-bottom:.5rem;
    li{
      color: #666;
      span{
        i{
          font-size: 2rem;
        }
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
