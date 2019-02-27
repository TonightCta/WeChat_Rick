<template lang="html">
  <div class="news_details">
    <WorkHeader>
      <span>新闻详情</span>
    </WorkHeader>
    <p class="newsTitle_cl">{{newsTitle}}</p>
    <div class="details_mes" ref="details_mes">
      <div class="" v-html='content' ref="contentF">

      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      content:null,
      newsTitle:'',
    }
  },
  mounted(){
    this.content=this.$route.params.Mes;
    this.newsTitle=this.$route.params.title;
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss">
.newsTitle_cl{
  width: 100%;
  margin-top: 8rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;

}
.news_details{
  width: 95%;
  margin:0 auto;
}
.details_mes{
  margin-top: 2rem;
  width: 100%;
  p{
    font-size: 1.4rem!important;
    text-align:justify!important;
    text-justify:inter-ideograph!important;
    img{
      width: 95%!important;
      margin-left:-6.5%!important;
      margin-top: 2rem;
    }
  }
}
</style>
