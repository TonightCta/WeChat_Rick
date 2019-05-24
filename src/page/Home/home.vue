<!-- 首页 -->
<template lang="html">
  <div class="home_wapper">
    <Loading/>
    <Banner/>
    <Table/>
    <Plat/>
    <EngBanner/>
    <News/>
    <Footer/>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  methods:{
    ...mapMutations(['userMes_fn','engSkill_fn'])
  },
  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    let userId=window.localStorage.getItem('Uid');
    if(window.localStorage.getItem('Uid')){
      if(!this.userMes.engineerVO){
        this.$axios.get(this.oUrl+'/mobile/getOperatorInfo?operatorId='+userId).then((res)=>{
          if(res.data.code==0){
            if(res.data.data.identityCode==2){
              window.localStorage.setItem('engID',res.data.data.engineerVO.id)
              this.userMes_fn(res.data.data);
              this.engSkill_fn(res.data.data.engineerVO);
            }
          }else{
            this.$Toast(res.data.msg)
          }
        }).catch((err)=>{
          console.log(err);
          this.$Toast('未知错误')
        })
      }
    }
  },
  components:{
    Footer:resolve=>require(['@/components/footer_wapper'],resolve),
    Banner:resolve=>require(['./homeBanner'],resolve),
    Table:resolve=>require(['./homeTable'],resolve),
    News:resolve=>require(['./homeNews'],resolve),
    EngBanner:resolve=>require(['./homeEngBanner'],resolve),
    Plat:resolve=>require(['./homePlat'],resolve),
    Loading:resolve=>require(['./homeLoading'],resolve)

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
