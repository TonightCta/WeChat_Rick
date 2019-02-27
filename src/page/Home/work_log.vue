<!-- 工作日志页 -->
<template lang="html">
  <div class="work_log">
    <WorkHeader>
      <span>工作日志</span>
    </WorkHeader>
    <Deve/>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import Deve from '@/components/development_of'
export default {
  components:{
    WorkHeader,
    Deve
  }
}
</script>

<style lang="scss" scoped>
</style>
