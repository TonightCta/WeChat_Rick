<template lang="html">
  <div class="header_wapper">
    <i class="iconfont icon-fanhui"  @click="backPage()"></i>
    <slot>
      <span></span>
    </slot>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      backUrl:'../../static/img/back.png'
    }
  },
  computed:{
    ...mapState(['isBackM','isBackT'])
  },
  mounted(){
    // this.isBackT=this.$route.query.isBack;
    // this.isBackM=this.$route.query.isBackI;
  },
  methods:{
    backPage(){
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
