<template lang="html">
  <div class="header_wapper">
    <img :src=backUrl alt="" @click="backPage()">
    <slot>
      <span>新闻中心</span>
    </slot>
  </div>
</template>

<script>
export default {
  data(){
    return{
      backUrl:'../../static/img/back.png'
    }
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
  background: #5277cc;
  position: fixed;
  top:0;
  left:0;
  z-index: 999;
  position: relative;
  img{
    width: 2rem;
    height: 2rem;
    position: absolute;
    top:1.5rem;
    left:1.5rem;
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
