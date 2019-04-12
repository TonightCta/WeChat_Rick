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
          <span>我的接单</span>
        </router-link>
        <router-link :to="{path:'/about',query:{color:3}}" tag="li" :class="{active:color==3}" @click.native="color==3">
          <i class="iconfont icon-guanyuwomen1" style="font-size:1.7rem;"></i>
          <span>关于我们</span>
        </router-link>
        <router-link :to="{path:'/mine',query:{color:4}}" tag="li" :class="{active:color==4}" @click.native="color==4">
          <i class="iconfont icon-wd"></i>
          <span>个人中心</span>
          <i class="mesStatus" v-show="hasMsg"></i>
        </router-link>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      color:1,
      hasMsg:false
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    this.getMessState()
  },
  mounted(){
    if(this.$route.query.color){
      this.color=this.$route.query.color;
    }else{
      this.color=1;
    }
  },
  methods:{
    getMessState(){
      if(this.userMes.id){
        let formdata=new FormData();
        formdata.append('id',this.userMes.id);
        formdata.append('isRead',false);
        this.$axios.post(this.oUrl+'/message/findMessageNumberByOperator',formdata).then((res)=>{
          if(res.data.data>0){
            this.hasMsg=true;
          }else{
            this.hasMsg=false;
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
  z-index: 8008;
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
    li:last-child{
      position: relative;
      .mesStatus{
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        position: absolute;
        top:1rem;
        right:3rem;
        background: red;
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
