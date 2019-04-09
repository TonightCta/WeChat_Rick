<!-- 消息中心 -->
<template lang="html">
  <div class="message_center">
    <WorkHeader>
      <span>消息中心</span>
    </WorkHeader>
  </div>
</template>

<script>
export default {
  components:{
    WorkHeader:resolve=>require(['@/components/work_header'],resolve)
  }
}
</script>

<style lang="scss" scoped>
</style>
