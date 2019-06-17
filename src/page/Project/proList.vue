<!-- 项目列表 -->
<template lang="html">
  <div class="pro_list">
    <div class="">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" ref="myscroller">
        <ul>
          <li class="work_list" v-for="(log,index) in logList">
            <p class="work_time">{{log.createTimeStr}}</p>
            <p class="work_type con">项目名称:&nbsp;{{log.name}}</p>
            <p class="work_place con">工作地点:&nbsp;{{log.placeVO.parentName+'-'+log.placeVO.name}}</p>
            <span class="status" v-if="log.stateStr==='接单状态'" style="color:#eb7a1d;">可接单</span>
            <span class="status" v-else style="color:#666;">已截单</span>
            <p class="work_pro">
              <button type="button" name="button"><i class="iconfont icon-fuwutiaokuan"></i>详情</button>
              <button type="button" name="button"  v-show="log.state==2"><i class="iconfont icon-fuwutiaokuan"></i>申请</button>
            </p>
            <p class="click_mask con"></p>
          </li>
        </ul>
      </scroller>
      <!-- <p class="noLog" v-show="!hasLog">暂无订单</p> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      logList:[],//项目列表
    }
  },
  created(){
    this.getLogList();
  },
  methods:{
    getLogList(){//获取日志列表
      let _vm=this;
      let formdata=new FormData();
      _vm.$Indicator.open();
      let userId=window.localStorage.getItem('engID');
      if(window.localStorage.getItem('engID')){
        formdata.append('engineerIdOut',userId);
      }else{
        console.log('未登录')
      };
      // formdata.append('size',10)
      _vm.$axios.post(_vm.oUrl+'/mission/findMissionListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.logList=res.data.data.content;
          sessionStorage.setItem('aviNum',res.data.data.totalElements)
          _vm.$Indicator.close();
          if(res.data.data.content.length<1){
            this.hasLog=false;
          }
        }else{
          _vm.$Indicator.close();
          // this.hasLog=false;
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
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  margin-top: 5rem!important;
}
.work_list{
  width: 95%;
  margin:0 auto;
  height: 12.5rem;
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
  .status{
    position: absolute;
    right:1rem;
    top:1rem;
    font-size: 1.4rem;
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
    }
  }
}
</style>
