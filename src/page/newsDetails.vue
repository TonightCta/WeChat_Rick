<template lang="html">
  <div class="news_details">
    <WorkHeader>
      <span>新闻详情</span>
    </WorkHeader>
    <div class="details_mes" ref="details_mes">

    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  mounted(){
    console.log();
    console.log();
    this.$refs.details_mes.innerHTML=this.$route.query.Mes;
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.details_mes{
  font-size: 1.6rem;
  overflow: hidden;
  .MsoNormal{
    color:red!important;
  }
  p{
    color:red;
  }
  img{
    width: 100%;

  }
}
</style>
