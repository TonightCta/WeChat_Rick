<!-- 工作日志页 -->
<template lang="html">
  <div class="work_log">
    <WorkHeader>
      <span>工作日志</span>
    </WorkHeader>
    <!-- <Deve/> -->
    <p class="push_work" @click="pushLog()">
      <button type="button" name="button">添加工作日志</button>
    </p>
    <div class="">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" :showBtn="listLength" v-show="hasLog">
        <ul>
          <li class="work_list" v-for="(log,index) in logList">
            <p class="work_time">{{log.workTime}}</p>
            <p class="work_type con">项目名称:&nbsp;{{log.projectName}}</p>
            <p class="work_place con">工作地点:&nbsp;{{log.projectPointPlace}}</p>
            <p class="work_status con">进程节点:&nbsp;{{log.projectCourseNodeName}}</p>
            <p class="work_pro">
              <button type="button" name="button" @click="delWorkLog(index)"><i class="iconfont icon-duomeitiicon-"></i>删除</button>
              <button type="button" name="button" @click="logDeti(index)"><i class="iconfont icon-fuwutiaokuan"></i>详情</button>
            </p>
            <p class="click_mask con" @click="logDeti(index)"></p>
          </li>
        </ul>
      </scroller>
      <p class="noLog" v-show="!hasLog">暂无日志</p>
    </div>

  </div>
</template>
<script>
import WorkHeader from '@/components/work_header'
import Deve from '@/components/development_of'
import {mapMutations} from 'vuex'
export default {
  data(){
    return{
      listLength:false,
      logList:[],
      hasLog:true
    }
  },
  components:{
    WorkHeader,
    Deve
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
      this.getLogList();
      setTimeout(()=>{
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done()
      },1500)
    },
    delWorkLog(index){//删除当前日志
      this.$Toast('删除日志');
      let vm=this;
      let formdata=new FormData();
      formdata.append('id',vm.logList[index].id);
      vm.$Indicator.open('删除中...')
      vm.$axios.post(vm.oUrl+'/mobile/deleteWorkRecord',formdata).then((res)=>{
        if(res.data.code==0){
          vm.logList.splice(index,1);
          vm.$Toast('删除成功')
          vm.$Indicator.close()
        }else{
          vm.$Indicator.close()
          vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        vm.$Indicator.close()
        console.log(err)
      })
    },
    logDeti(index){//日志详情
      this.$router.push({
        name:'LogDetis'
      });
      window.localStorage.setItem('logMes',JSON.stringify(this.logList[index]))
    },
    pushLog(){//添加日志
      let _vm=this;
      let formdata=new FormData();
      let engID=window.localStorage.getItem('engID');
      // let engID='d7b801d7-16b5-4dc5-b628-33a966dfc95c';
      formdata.append('engineerId',engID)
      _vm.$axios.post(_vm.oUrl+'/mobile/findProjectPointAndProjectCourseNodeByEngineer',formdata).then((res)=>{
        if(res.data.code==0){
          if(res.data.data.length<1){
            this.$Toast('当前暂无可更新的项目');
          }else{
            this.$router.push('/addLog');
          }
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  margin-top: 9rem!important;
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
  background: white;
  width: 100%;
  left:0;
  top:5.3rem;
  line-height: 3.5rem;
  text-align: center;
  button{
    width: 90%;
    background: #eb7a1d;
    height: 3.5rem;
    border-radius:5px;
    color:white;
    text-align: center;
    font-size: 1.6rem;
    margin:0 auto;
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
