<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Header/>
    <div class="view_box">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header_wapper'
import Footer from '@/components/footer_wapper'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin:0;
  padding:0;
  width: 100%;
  height:100%;
}
</style>
