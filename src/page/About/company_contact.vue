<!-- 联系我们 -->
<template lang="html">
  <div class="company_contact">
    <div class="company_mes">
      <ul>
        <li>公司文化</li>
        <li>梦想、诚信、执着、务实</li>
        <li>公司使命</li>
        <li>为员工、股东和社会创造最大价值，为客户提供最佳服务</li>
        <li>公司愿景</li>
        <li>成为卓越的ICT服务提供商</li>
        <li>企业核心价值观</li>
        <li>以客户为中心，以执行力为本</li>
      </ul>
      <div class="company_num">
        <ul>
          <li>
            <i class="iconfont icon-zongicon-"></i>
            <span>企业名称：北京瑞得音信息技术有限公司</span>
          </li>
          <li>
            <i class="iconfont icon-weibiaoti"></i>
            <span>联系电话：010-62115806</span>
          </li>
          <li>
            <i class="iconfont icon-gongzhonghao"></i>
            <span>公众号：北京瑞得音信息技术有限公司</span>
          </li>
          <li>
            <i class="iconfont icon-mail"></i>
            <span>邮箱：service@rightservicetech.com</span>
          </li>
          <li>
            <i class="iconfont icon-dizhi"></i>
            <span>地址：北京市海淀区马连洼北路8号万霖科技大厦B座707-708</span>
          </li>
        </ul>
        <p class="company_QR">
          <span>扫描关注微信公众号</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.company_contact{
  width: 100%;
  margin-bottom:8rem;
  .company_mes{
    width: 90%;
    margin:0 auto;
    padding-top:2rem;
    ul{
      width: 100%;
      li{
        font-size: 1.4rem;
        line-height: 2.2rem;
      }
      li:nth-of-type(even){
        font-size: 1.2rem;
      }
    }
  }
  .company_num{
    width: 100%;
    border-top:1px solid #eee;
    padding-top:2rem;
    margin-top:1rem;
    ul{
      width: 100%;
      li{
        font-size: 1.2rem;
        line-height: 4rem;
        position: relative;
        padding-left:3.5rem;
        i{
          position: absolute;
          font-size: 2.8rem;
          left:0;
        }
      }
    }
    .company_QR{
      width: 10rem;
      height: 10rem;
      background: url('../../../static/img/company_qr.jpg');
      background-size: 100% 100%;
      margin:0 auto;
      text-align: center;
      position: relative;
      span{
        font-size: 1rem;
        position: absolute;
        left: .5rem;
        bottom:-.8rem;
      }
    }
  }
}
</style>
