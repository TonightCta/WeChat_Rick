<!-- 消息中心 -->
<template lang="html">
  <div class="message_center">
    <WorkHeader>
      <span>消息中心</span>
    </WorkHeader>
    <div class="message_list">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite">
        <ul>
          <li v-for="(message,index) in messageList" :key="index" @click="upRead(index)">
            <span>{{message.content}}</span>
            <span>{{message.createTimeStr}}</span>
            <span class="message_status" v-if="!message.isRead"></span>
            <img src="../../../static/img/bookmarks_icon.png" alt="" class="icon">
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import {set,get} from '@/assets/js/loca'
import {mapState} from 'vuex'
export default {
  inject:['reload'],
  data(){
    return{
      messageList:[]
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    this.getMessageList()
  },
  components:{
    WorkHeader:resolve=>require(['@/components/work_header'],resolve)
  },
  methods:{
    onRefresh(done){//刷新
      setTimeout(()=>{
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done(true)
      },1500)
    },
    getMessageList(){//获取消息列表
      let _vm=this;
      _vm.$Indicator.open()
      let formdata=new FormData();
      console.log(_vm.userMes)
      formdata.append('id',_vm.userMes.id);
      _vm.$axios.post(_vm.oUrl+'/message/findMessageListByOperator',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.messageList=res.data.data.content;
          _vm.$Indicator.close()
        }else{
          _vm.$Indicator.close()
          _vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$Indicator.close()
        _vm.$Toast('未知异常,请联系客服')
        console.log(err)
      })
    },
    upRead(index){//更新消息读取状态
      let formdata=new FormData();
      formdata.append('id',this.messageList[index].id);
      formdata.append('isRead',true);
      this.$axios.post(this.oUrl+'/message/updateMessageIsRead',formdata).then((res)=>{
        if(res.data.code==0){
          this.messageList[index].isRead=true;
          this.reload();
        }else{
          this.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$Toast('未知错误,请联系客服')
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  margin-top: 5rem!important;
}
.message_list{
  margin-top: 6rem!important;
  ul{
    li{
      margin-top: 1rem!important;
      text-align: justify;
      position: relative;
      padding:1.5rem 1rem 2.5rem 1rem;
      border-radius:8px;
      box-shadow: 0px 0px 10px #999;
      background: white;
      width: 86%;
      margin:0 auto;
      span:nth-child(1){
        text-indent:1.8rem;
        font-size:1.4rem;
      }
      span:nth-child(2){
        position: absolute;
        bottom:.5rem;
        right:.5rem;
        font-size: 1.3rem;
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
