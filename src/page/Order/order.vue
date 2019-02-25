<!-- 订单列表 -->
<template lang="html">
  <div class="order_wapper">
    <h1>这是订单</h1>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/footer_wapper'
export default {
  components:{
    Footer
  }
}
</script>

<style lang="scss" scoped>
.order_wapper{
  h1{
    color:green;
  }
}
</style>
