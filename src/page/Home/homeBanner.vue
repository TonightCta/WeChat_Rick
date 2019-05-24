<!-- 首页轮播图 -->
<template lang="html">
  <div class="">
    <div class="banner_wapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img src='../../../static/img/banner2_1.png' alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src='../../../static/img/banner2_2.png' alt="">
        </mt-swipe-item>
        <!-- <mt-swipe-item>
          <img src='../../../static/img/banner1_1.png' alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src='../../../static/img/banner1_2.png' alt="">
        </mt-swipe-item> -->
        <mt-swipe-item>
          <img src='../../../static/img/banner1.png' alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src='../../../static/img/banner2.png' alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src='../../../static/img/banner3.png' alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.banner_wapper{
  margin-top: 1rem;
  height:14rem;
  img{
    width: 100%;
    height:100%;
    border-radius:10px;
  }
}
</style>
