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
import {mapState,mapMutations} from 'vuex'
export default {
  methods:{
    ...mapMutations(['userMes_fn'])
  },
  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    let userId=window.localStorage.getItem('Uid');
    if(!this.userMes.engineerVO&&window.localStorage.getItem('Uid')){
      this.$axios.get(this.oUrl+'/mobile/getOperatorInfo?operatorId='+userId).then((res)=>{
        if(res.data.code==0){
          this.userMes_fn(res.data.data)
        }else{
          this.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        console.log(err);
        this.$Toast('未知错误')
      })
    }
  },
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
