<!-- 广告加载页 -->
<template lang="html">
  <div class="home_loading" @touchmove.prevent ref="home_loading" v-show="isLogin">
    <span class="close_time" @click="closeLoading()">跳过({{clsoeTime}}s)</span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      clsoeTime:3,
      isLogin:true
    }
  },
  watch:{
    clsoeTime(val,oldVal){
      if(val==0){
        setTimeout(()=>{
          // this.$refs.home_loading.style.transform='translateX(-100%)'
          this.$refs.home_loading.style.opacity='0'
          window.localStorage.setItem('login',1);
        },1000)
        setTimeout(()=>{
          this.isLogin=false;
        },2000)
        setTimeout(()=>{
          window.localStorage.clear('login')
        },24*60*60*1000)
      }
    }
  },
  created(){
    if(window.localStorage.getItem('login')){
      this.isLogin=false;
    }else{
      this.isLogin=true;
    }
  },
  mounted(){
    this.PourPur()
  },
  methods:{
    //倒计时关闭
      PourPur(){
       if(this.clsoeTime>0){
         this.clsoeTime--;
         setTimeout(this.PourPur,1000);
       };
     },
     //关闭加载页
    closeLoading(){
      // this.$refs.home_loading.style.transform='translateX(-100%)'
      this.$refs.home_loading.style.opacity='0';
      setTimeout(()=>{
        this.isLogin=false;
      },1000)
      window.localStorage.setItem('login',1);
      setTimeout(()=>{
        window.localStorage.clear('login')
      },24*60*60*1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.home_loading{
  width: 100%;
  height: 100%;
  background: url('../../../static/img/loading_bg.png');
  background-size: 100% 100%;
  position: fixed;
  top:0;
  left:0;
  z-index: 9999;
  transition:1s all;
  .close_time{
    width: 6rem;
    text-align: center;
    border-radius:10px;
    color:white;
    background: rgba(0,0,0,.2);
    font-size: 1.4rem;
    height: 2.2rem;
    line-height: 2.2rem;
    position: fixed;
    right:1.8rem;
    top:1.8rem;
  }
}
</style>
