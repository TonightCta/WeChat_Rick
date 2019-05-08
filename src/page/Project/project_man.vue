<!-- 项目管理 -->
<template lang="html">
  <div class="project_man">
    <WorkHeader>
      <span>项目管理</span>
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
