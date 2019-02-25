<!-- 关于我们页 -->
<template lang="html">
  <div class="about_us">
    <!-- <Header>
      <span>关于我们</span>
    </Header> -->
    <div class="about_table">
      <ul>
        <router-link to="/companyIn" tag="li"
        @click.native="aboutC=1"
        :class="{aboutUs:aboutC==1}"
        >公司简介</router-link>
        <router-link to="/companyCon" tag="li"
        @click.native="aboutC=2"
        :class="{aboutUs:aboutC==2}"
        >联系我们</router-link>
      </ul>
    </div>
    <div class="about_view">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/footer_wapper'
// import Header from '@/components/header_wapper'
export default {
  data(){
    return{
      aboutC:1
    }
  },
  components:{
    Footer
  }
}
</script>

<style lang="scss" scoped>
.aboutUs{
  border-bottom:2px solid #eb7a1d;
}
.about_table{
  width: 100%;
  position: fixed;
  top:0;
  left:0;
  ul{
    width: 100%;
    display: flex;
    li{
      width: 50%;
      height: 5rem;
      text-align: center;
      line-height: 5rem;
      background: linear-gradient(#101013, #2c2d31);
      color:white;
      font-size: 1.6rem;
      box-sizing: border-box;
    }
  }
}
.about_view{
  margin-top: 4rem;
}
</style>
