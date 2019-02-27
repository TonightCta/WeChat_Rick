<!-- 订单列表 -->
<template lang="html">
  <div class="order_wapper">
    <Deve/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/footer_wapper'
import Deve from '@/components/development_of'
export default {
  components:{
    Footer,
    Deve
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
