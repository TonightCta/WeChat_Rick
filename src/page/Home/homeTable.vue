<!-- 首页功能列表 -->
<template lang="html">
  <div class="">
    <div class="home_table">
      <ul>
        <li @click="hasLogin()">小哥注册</li>
        <router-link to="/takeOrder" tag="li">接单赚钱</router-link>
        <router-link to="/demandNeed" tag="li">发布需求</router-link>
        <router-link to="/workLog" tag="li">工作日志</router-link>
        <!-- <li>接单赚钱</li>
        <li>发布需求</li>
        <li>工作日志</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['userMes'])
  },
  methods:{
    hasLogin(){
      if(this.userMes.engineerVO){
        this.$Toast('当前已登录，请退出登录后再试')
      }else{
        this.$router.push('/register')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home_table{
  width: 100%;
  margin-top: 2rem;
  border-radius:12px;
  ul{
    display: flex;
    width: 95%;
    margin:0 auto;
    justify-content: space-between;
    li{
      width: 22%;
      height:6rem;
      background: red;
      text-align: center;
      font-size: 1.1rem;
      color: white;
      padding-top: 4.3rem;
      box-sizing: border-box;
      letter-spacing:2px;
    }
    li:nth-child(1){
      background: url('../../../static/img/table_1_1.png');
      background-size: 100% 100%;
    }
    li:nth-child(2){
      background: url('../../../static/img/table1.png');
      background-size: 100% 100%;
    }
    li:nth-child(3){
      background: url('../../../static/img/table2.png');
      background-size: 100% 100%;
    }
    li:nth-child(4){
      background: url('../../../static/img/table3.png');
      background-size: 100% 100%;
    }
  }
}
</style>
