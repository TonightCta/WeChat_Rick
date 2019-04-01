<!-- 筛选插件 -->
<template lang="html">
  <div class="screening" v-show="visible">
    <div class="screening_con">

    </div>
    <div class="screening_mask">

    </div>
  </div>
</template>

<script>
export default {
  props:{
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.screening{
  width: 100%;
  height: 100%;
  position: relative;
  .screening_con{
    width: 100%;
    height: 15rem;
    background: rgba(0,0,0,1);
  }
  .screening_mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,.5);
    z-index: 100;
  }
}
</style>
