<template lang="html">
  <div class="news_details">
    <WorkHeader>
      <span>新闻详情</span>
    </WorkHeader>
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
      content:null
    }
  },
  mounted(){
    this.content=this.$route.params.Mes;
    // console.log(this.content);
    console.log(this.$refs.contentF[3]);
    for(let i in this.$refs.contentF){
      console.log(this.$refs.contentF[2],213213132)
    }
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.details_mes{
  font-size: 1.8rem;
  width: 100%;
  color:red;
  &>p{
    color:blue!important;
  }
  p{
    img{
      width: 100%!important;
    }
  }
}
</style>
