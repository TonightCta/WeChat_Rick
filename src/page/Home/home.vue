<!-- 首页 -->
<template lang="html">
  <div class="home_wapper">
    <Banner/>
    <Table/>
    <News/>
    <Footer/>
  </div>
</template>

<script>
export default {
  components:{
    Footer:resolve=>require(['@/components/footer_wapper'],resolve),
    Banner:resolve=>require(['./homeBanner'],resolve),
    Table:resolve=>require(['./homeTable'],resolve),
    News:resolve=>require(['./homeNews'],resolve)
  }
}
</script>

<style lang="scss" scoped>
.home_wapper{
  width: 92%;
  margin:0 auto;
  margin-bottom:7rem;
}
</style>
