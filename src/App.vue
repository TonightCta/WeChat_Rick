<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="view_box">
      <keep-alive>
        <router-view v-if="$route.meta.keep"></router-view>
      </keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keep"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isLoad:true
    }
  },
  methods:{
    reload(){
      this.isLoad=false;
      this.$nextTick(()=>{
        this.isLoad=true;
      })
    }
  },
  components:{
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
  overflow-x: hidden;
  padding-bottom: 2rem;
}
</style>
