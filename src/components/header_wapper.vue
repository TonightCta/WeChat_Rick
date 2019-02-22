<template lang="html">
  <div class="header_wapper">
    <span>犀牛小哥ICT服务平台</span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
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
