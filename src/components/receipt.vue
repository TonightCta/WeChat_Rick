<!-- 回执页面 -->
<template lang="html">
  <div class="">

  </div>
</template>

<script>
export default {
  created(){
    this.$router.push({
      path:'/home',
      query:{
        color:1
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
