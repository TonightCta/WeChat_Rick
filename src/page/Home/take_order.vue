<!-- 接单赚钱-->
<template lang="html">
  <div class="work_log">
    <WorkHeader>
      <span>接单赚钱</span>
    </WorkHeader>
    <!-- <Deve/> -->
    <p class="push_work">
      <img src="../../../static/img/search_icon.png" alt="">
      <input type="text" placeholder="请输入时间地点等关键字" v-model="searchKey" name="" value="">
      <i class="iconfont icon-guanbi" v-show="hasText" @click="searchKey=null"></i>
      <span v-show="hasText" @click="$Toast('该功能尚未开放,敬请期待')">搜索</span>
      <span class="mask" @click="$Toast('该功能尚未开放,敬请期待')"></span>
    </p>
    <div class="">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :showBtn="listLength" v-show="hasLog">
        <div class="work_list" v-for="(log,index) in logList">
          <p class="work_time">{{log.workTime}}</p>
          <p class="work_type con">项目名称:&nbsp;{{log.projectName}}</p>
          <p class="work_place con">工作地点:&nbsp;{{log.projectPointPlace}}</p>
          <p class="work_status con">进程节点:&nbsp;{{log.projectCourseNodeName}}</p>
          <p class="work_pro">
            <button type="button" name="button" @click="logDeti(index)"><i class="iconfont icon-fuwutiaokuan"></i>详情</button>
          </p>
          <p class="click_mask con" @click="logDeti(index)"></p>
        </div>
      </v-scroll>
      <p class="noLog" v-show="!hasLog">暂无日志</p>
    </div>

  </div>
</template>
<script>
import WorkHeader from '@/components/work_header'
import Deve from '@/components/development_of'
import Scroll from './newListCon'
import {mapMutations} from 'vuex'
export default {
  data(){
    return{
      listLength:false,
      logList:[],
      hasLog:true,//是否当前列表有数据
      hasText:false,//是否有输入内容
      searchKey:null,//搜索关键字
    }
  },
  components:{
    WorkHeader,
    Deve,
    'v-scroll':Scroll
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
  methods:{
    ...mapMutations(['logMes_fn']),
    getLogList(){//获取日志列表
      let _vm=this;
      let formdata=new FormData();
      _vm.$Indicator.open();
      let userId=window.localStorage.getItem('engID');
      // let userId='d7b801d7-16b5-4dc5-b628-33a966dfc95c';
      formdata.append('engineerId',userId);
      _vm.$axios.post(_vm.oUrl+'/mobile/findWorkRecordListByEngineerId',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.logList=res.data.data.content;
          console.log(_vm.logList)
          _vm.$Indicator.close();
          _vm.logList.forEach((e)=>{
            let date=new Date(e.workTime);
            let year = date.getFullYear();
    				let month = date.getMonth() + 1;
    				let day = date.getDate();
    				let hour = date.getHours();
    				let min = date.getMinutes();
    				if(day > 0 && day < 9) {
    					day = '0' + day
    				}
    				e.workTime = year + ' /' + month + ' /' + day
          });
          if(res.data.data.content.length<1){
            this.hasLog=false;
          }
        }else{
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
        name:'LogDetis'
      });
      window.localStorage.setItem('logMes',JSON.stringify(this.logList[index]))
    },
  }
}
</script>

<style lang="scss" scoped>
.yo-scroll{
  top:9.5rem!important;
}
.work_log{
  width: 100%;
  padding-top:10rem;
  height: auto;
  overflow-x: hidden;
  padding-bottom: 1rem;
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
  top:5rem;
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
  height: 16rem;
  max-height: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 5px #ddd;
  position: relative;
  margin-bottom: .5rem;
  margin-top: 1rem;
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
      margin-right: 1rem;
      i{
        font-size: 1.4rem;
      }
    }
    button:nth-child(2){
      background: white;
      background :#eb7a1d;
      color:white;
      margin-right: .2rem;
    }
  }
}
</style>
