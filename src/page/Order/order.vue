<!-- 我的接单-->
<template lang="html">
  <div class="work_log">
    <!-- <WorkHeader>
      <span>接单赚钱</span>
    </WorkHeader> -->
    <!-- <Deve/> -->
    <p class="push_work">
      <img src="../../../static/img/screening_icon.png" alt="">
      <input type="text" placeholder="请输入时间地点等关键字" v-model="searchKey" name="" value="">
      <i class="iconfont icon-guanbi" v-show="hasText" @click="searchKey=null"></i>
      <span v-show="hasText" @click="$Toast('该功能尚未开放,敬请期待')">搜索</span>
      <span class="mask" @click="$Toast('该功能尚未开放,敬请期待')"></span>
    </p>
    <!-- <v-screen :visible.sync="visible"></v-screen> -->
    <div class="">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :showBtn="listLength" v-show="hasLog">
        <div class="work_list" v-for="(log,index) in orderList">
          <p class="work_time">{{log.createTimeStr}}</p>
          <p class="work_type con">项目名称:&nbsp;{{log.name}}</p>
          <p class="work_place con">工作地点:&nbsp;{{log.address}}</p>
          <span class="status" v-if="log.stateStr==='接单状态'" style="color:#eb7a1d;">接单中</span>
          <span class="status" v-else style="color:#666;">已截单</span>
          <p class="work_pro">
            <button type="button" name="button" @click="logDeti(index)"><i class="iconfont icon-fuwutiaokuan"></i>详情</button>
          </p>
          <p class="click_mask con" @click="logDeti(index)"></p>
        </div>
      </v-scroll>
      <p class="noLog" v-show="!hasLog">暂无订单</p>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Scroll from '@/page/Home/newListCon'
import Screen from '@/components/screening'
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      listLength:false,
      logList:[],
      hasLog:true,//是否当前列表有数据
      hasText:false,//是否有输入内容
      searchKey:null,//搜索关键字
      visible:false
    }
  },
  components:{
    Footer:resolve=>require(['@/components/footer_wapper'],resolve),
    'v-scroll':Scroll,
    'v-screen':Screen
  },
  watch:{
    searchKey(val,oldVal){
      if(val){
        this.hasText=true;
      }else{
        this.hasText=false;
      }
    }
  },
  mounted(){
    this.getLogList()
  },
  computed:{
    ...mapState(['orderList'])
  },
  methods:{
    ...mapMutations(['logMes_fn','orderList_fn']),
    getLogList(){//获取日志列表
      let _vm=this;
      let formdata=new FormData();
      _vm.$Indicator.open();
      let userId=window.localStorage.getItem('engID');
      // let userId='d7b801d7-16b5-4dc5-b628-33a966dfc95c';
      formdata.append('engineerIdIn',userId);
      _vm.$axios.post(_vm.oUrl+'/mission/findMissionListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.logList=res.data.data.content;
          _vm.orderList_fn(res.data.data.content);
          if(res.data.data.content.length<1){
            this.hasLog=false;
          }
          setTimeout(()=>{
            _vm.$Indicator.close();
          },500)
        }else{
          this.hasLog=false;
          _vm.$Indicator.close();
          _vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$Indicator.close();
        console.log(err)
      })
    },
    onRefresh(done){//下拉刷新
      this.getLogList()
      done()
    },
    onInfinite(done){//加载更多
      done()
    },
    logDeti(index){//日志详情
      this.$router.push({
        name:'OrderDetails'
      });
      window.localStorage.setItem('orderMes',JSON.stringify(this.logList[index]))
    },
  }
}
</script>

<style lang="scss" scoped>
.work_log{
  width: 100%;
  height: auto;
  overflow-x: hidden;
}
.yo-scroll{
  top:4.5rem!important;
  margin-bottom: 3rem;
}
.push_work{
  position: absolute;
  height: 4.5rem;
  min-height: 4.5rem;
  background: white;
  width: 100%;
  left:0;
  z-index: 888;
  box-shadow: 0px 0px 5px #999;
  padding-top: .1rem;
  box-sizing: border-box;
  overflow-y: hidden;
  top:0;
  .mask{
    position: absolute;
    top:0;
    left:0;
    background: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
  }
  img{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left:1.2rem;
    top:50%;
    margin-top: -.75rem;
  }
  input{
    height: 100%;
    width: 65%;
    margin-left: 3.2rem;
    font-size: 1.5rem;
    position: absolute;
    top:0;
    box-sizing: border-box;
  }
  i{
    color:#999;
    font-size: 1.4rem;
    position: absolute;
    right:7rem;
    height: 100%;
    line-height: 4.4rem;
    top:0;
  }
  span{
    position: absolute;
    right:1.5rem;
    color:#eb7a1d;
    font-size: 1.5rem;
    height: 100%;
    top:0;
    line-height: 4.5rem;
  }
}
.noLog{
  width: 100%;
  position: fixed;
  top:20%;
  text-align: center;
  left:0;
  color:#999;
  font-size: 1.6rem;
}
.work_list{
  width: 95%;
  margin:0 auto;
  height: 12rem;
  max-height: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 5px #ddd;
  position: relative;
  margin-bottom: .5rem;
  margin-top: 1rem;
  .status{
    position: absolute;
    right:1rem;
    top:1rem;
    font-size: 1.4rem;
  }
  p{
    width: 100%;
    padding-left: 1rem;
    padding-top: 1rem;
    color:#666;
  }
  .click_mask{
    width: 100%;
    position: absolute;
    height: 70%;
    background: rgba(0,0,0,0);
    left:0;
    top:0;
  }
  .work_time{
    font-size: 1.4rem;
    box-sizing: border-box;
  }
  .con{
    color:black;
    box-sizing: border-box;
    font-size: 1.4rem;
    padding-top: 1.2rem;
  }
  .work_pro{
    width: 100%;
    height: 3rem;
    text-align: right;
    position: absolute;
    right: .8rem;
    line-height: 3rem;
    bottom:.3rem;
    button{
      width: 7rem;
      height: 2.5rem;
      border-radius:5px;
      font-size: 1.3rem;
      text-align: center;
      i{
        font-size: 1.3rem;
      }
    }
    button:nth-child(1){
      background: white;
      border:1px solid #eb7a1d;
      color:#eb7a1d;
      i{
        font-size: 1.4rem;
      }
    }
    button:nth-child(2){
      background: white;
      background :#eb7a1d;
      color:white;
    }
  }
}
</style>
