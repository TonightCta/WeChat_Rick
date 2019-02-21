<template lang="html">
  <div class="footer_wapper">
    <ul>
      <li>
        <router-link to="/home" tag="span">首页</router-link>
      </li>
      <li>
        <router-link to="/order" tag="span">订单</router-link>
      </li>
      <li>
        <router-link to="/mine" tag="span">我的</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.footer_wapper{
  width: 100%;
  height:5rem;
  background: #5277cc;
  position: fixed;
  bottom:0;
  left:0;
  ul{
    width: 100%;
    display: flex;
    height:100%;
    line-height: 5rem;
    justify-content: space-around;
    li{
      span{
        font-size: 1.6rem;
        color:white;
      }
    }
  }
}
</style>
