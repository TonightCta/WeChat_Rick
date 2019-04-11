<!-- 消息中心 -->
<template lang="html">
  <div class="message_center">
    <WorkHeader>
      <span>消息中心</span>
    </WorkHeader>
    <div class="message_list">
      <ul>
        <li v-for="(message,index) in messageList" :key="index">
          <span>{{message.content}}</span>
          <span>{{message.time}}</span>
          <span class="message_status"></span>
          <img src="../../../static/img/bookmarks_icon.png" alt="" class="icon">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {set,get} from '@/assets/js/loca'
export default {
  data(){
    return{
      messageList:[
        {
          content:'万维网（World Wide Web）是作为欧洲核子研究组织的一个项目发展起来的，在那里Tim Berners-Lee 开发出万维网的雏形。Tim Berners-Lee - 万维网的发明人 - 目前是万维网联盟的主任。W3C 在 1994 年被创建的目的是，为了完成麻省理工学院（MIT）与欧洲粒子物理研究所（CERN）之间的协同工作，并得到了美国国防部高级研究计划局（DARPA）和欧洲委员会（European Commission）的支持。',
          time:'2019/04/10  10:15'
        },
        {
          content:'万维网（World Wide Web）Berners-Lee - 万维网的发明人 - 目前是万维网联盟的主任。W3C 在 1994 年被创建的目的是，为了完成麻省理工学院（MIT）与欧洲粒子物理研究所（CERN）之间的协同工作，并得到了美国国防部高级研究计划局（DARPA）和欧洲委员会（European Commission）的支持。',
          time:'2019/04/10  10:15'
        },
        {
          content:'万维网（World Wide  Berners-Lee  Berners-Lee -  - 目前是万维网联盟的主任。W3C 在 1994  Commission）的支持。',
          time:'2019/04/10  10:15'
        },
      ]
    }
  },
  mounted(){
    set('information',123)
  },
  components:{
    WorkHeader:resolve=>require(['@/components/work_header'],resolve)
  },
  methods:{
    clear(){
      let dataObjData=get('information',1000*60);
      if(dataObjData!=''&&dataObjData!=null){
        alert('有数据')
      }else{
        alert('信息已过期')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message_list{
  margin-top: 6rem!important;
  width: 95%;
  margin: 0 auto;
  ul{
    li{
      margin-top: 1rem;
      text-align: justify;
      position: relative;
      padding:1.5rem 1rem 2.5rem 1rem;
      border-radius:8px;
      box-shadow: 0px 0px 10px #999;
      background: white;
      span:nth-child(1){
        text-indent:1.8rem;
        font-size:1.4rem;
      }
      span:nth-child(2){
        position: absolute;
        bottom:.5rem;
        right:.5rem;
        font-size: 1.2rem;
        color: #666;
      }
      .icon{
        position: absolute;
        left:.5rem;
        top:-.3rem;
        width: 2rem;
      }
      .message_status{
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        position: absolute;
        top:.5rem;
        right:.5rem;
        background: red;
      }
    }
  }
}
</style>
