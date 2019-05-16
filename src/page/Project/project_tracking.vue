<!-- 项目追踪-->
<template lang="html">
  <div class="work_log">
    <WorkHeader>
      <span>订单追踪</span>
    </WorkHeader>
    <p class="push_work" v-if="false">
      <img src="../../../static/img/screening_icon.png" alt="">
      <input type="text" placeholder="请输入时间地点等关键字" v-model="searchKey" name="" value="">
      <i class="iconfont icon-guanbi" v-show="hasText" @click="searchKey=null"></i>
      <span v-show="hasText" @click="$Toast('该功能尚未开放,敬请期待')">搜索</span>
      <span class="mask" @click="$Toast('该功能尚未开放,敬请期待')"></span>
    </p>
    <div class="" style="margin-top:10rem;">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" ref="myscroller">
        <ul>
          <li class="work_list" v-for="(log,index) in logList">
            <p class="work_time">{{log.createTimeSec}}</p>
            <p class="work_type con">项目名称:&nbsp;{{log.name}}</p>
            <p class="work_place con">项目负责人:&nbsp;{{log.creatorName}}</p>
            <p class="work_place con">项目进度:&nbsp;{{log.schedule}}%</p>
            <p class="work_pro">
              <button type="button" name="button" @click="logDeti(index)"><i class="iconfont icon-fuwutiaokuan"></i>详情</button>
            </p>
            <p class="click_mask con" @click="logDeti(index)"></p>
          </li>
        </ul>
      </scroller>
      <!-- <p class="noLog" v-show="!hasLog">暂无订单</p> -->
    </div>

  </div>
</template>
<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      listLength:false,
      logList:[],
      hasLog:true,//是否当前列表有数据
      hasText:false,//是否有输入内容
      searchKey:null,//搜索关键字
      pageNum:0,//页码
    }
  },
  components:{
    WorkHeader,
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
    ...mapState(['userMes'])
  },
  methods:{
    ...mapMutations(['logMes_fn']),
    getLogList(){//获取日志列表
      let _vm=this;
      let formdata=new FormData();
      _vm.$Indicator.open();
      formdata.append('page',_vm.pageNum);
      if(window.localStorage.getItem('Ident')==1){
        formdata.append('customerId',_vm.userMes.customerVO.id)
      }
      _vm.$axios.post(_vm.oUrl+'/findProjectListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          res.data.data.content.forEach((e)=>{
            let creatT=new Date(e.createTime);
            let year=creatT.getFullYear();
            let mon=creatT.getMonth()+1;
            if(mon<10){
              mon='0'+mon
            }
            let day=creatT.getDate();
            if(day<10){
              day='0'+day
            };
            let creatSec=year+'-'+mon+'-'+day;
            _vm.$set(e,'createTimeSec',creatSec)
          })
          _vm.logList=res.data.data.content;
          _vm.$Indicator.close();
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
      this.getLogList();
      setTimeout(()=>{
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done(true)
      },1500)
    },
    logDeti(index){//日志详情
      this.$router.push({
        name:'ProjeceMes',
        query:{
          ProID:this.logList[index].id
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.work_log{
  width: 100%;
  padding-top:10rem;
  height: auto;
  overflow-x: hidden;
  padding-bottom: 1rem;
}
._v-container{
  margin-top: 5rem!important;
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
  height: 14.5rem;
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
      background: white;
      border:1px solid #eb7a1d;
      color:#eb7a1d;
      i{
        font-size: 1.3rem;
      }
    }
  }
}
</style>
