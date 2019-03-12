<!-- 平台介绍 -->
<template lang="html">
  <div class="home_plat">
    <p class="home_newsTitle">平台优势</p>
    <div class="plat_bg">

    </div>
    <p class="plat_case">你有能力，我有平台</p>
    <p class="plat_case">赚钱，工作，学习，犀牛小哥平台一站解决</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.home_newsTitle{
  width: 100%;
  margin-top: 3rem;
  font-size: 1.4rem;
  text-align: center;
  color:#252525;
  background: red;
  height: 4.5rem;
  line-height: 4rem;
  background: url('../../../static/img/news_title_bg.png');
  background-size: 100% 100%;
  margin-bottom:2rem;
}
.plat_bg{
  width: 100%;
  height: 210px;
  background:url('../../../static/img/plat_bg.png');
  background-size:100% 100%;

}
.plat_case{
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  margin-top: .5rem;
}
</style>
