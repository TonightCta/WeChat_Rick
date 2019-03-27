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
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :showBtn="listLength">
        <div class="work_list" v-for="(log,index) in logList">
          <p class="work_time">{{log.time}}</p>
          <p class="work_type con">项目名称:&nbsp;{{log.type}}</p>
          <p class="work_place con">工作地点:&nbsp;{{log.place}}</p>
          <p class="work_status con">进程节点:&nbsp;{{log.status}}</p>
          <p class="work_pro">
            <button type="button" name="button" @click="delWorkLog(index)"><i class="iconfont icon-duomeitiicon-"></i>删除</button>
            <button type="button" name="button" @click="logDeti(index)"><i class="iconfont icon-fuwutiaokuan"></i>详情</button>
          </p>
          <p class="click_mask con" @click="logDeti(index)"></p>
        </div>
      </v-scroll>
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
      listLength:true,
      logList:[
        {
          time:'2019/03/25   10:15',
          type:'UCC',
          place:'北京-北京市',
          status:'上门开工'
        },
        {
          time:'2019/02/11   10:15',
          type:'UCC',
          place:'河北-秦皇岛市',
          status:'上门开工'
        },
        {
          time:'2018/11/25   10:15',
          type:'UCC',
          place:'河南-郑州市',
          status:'上门开工'
        },
        {
          time:'2018/08/25   10:15',
          type:'UCC',
          place:'天津-天津市',
          status:'上门开工'
        },
        {
          time:'2019/05/05   10:15',
          type:'UCC',
          place:'河北-石家庄市',
          status:'上门开工'
        },
        {
          time:'2018/05/01   10:15',
          type:'UCC',
          place:'内蒙-呼伦贝尔市',
          status:'上门开工'
        }
      ]
    }
  },
  components:{
    WorkHeader,
    Deve,
    'v-scroll':Scroll
  },
  methods:{
    ...mapMutations(['logMes_fn']),
    onRefresh(done){//下拉刷新
      this.$Indicator.open();
      setTimeout(()=>{
        this.$Indicator.close()
      },1000)
      done()
    },
    onInfinite(done){//加载更多
      done()
    },
    delWorkLog(index){//删除当前日志
      this.$Toast('删除日志')
    },
    logDeti(index){//日志详情
      this.$router.push({
        name:'LogDetis'
      });
      window.localStorage.setItem('logMes',JSON.stringify(this.logList[index]))
    },
    pushLog(){
      this.$Toast('该功能开发中');
      // if(navigator.geolocation) {
      //   alert(1)
      //   navigator.geolocation.getCurrentPosition((position)=>{
      //     let long=position.coords.longitude;//经度
      //     let lat = position.coords.latitude; // 纬度
      //     // console.log(position.coords)
      //     alert('经度：'+long)
      //     alert('维度：'+lat)
      //   },(error)=>{
      //     alert('未知错误')
      //   })
      // }
      this.$router.push('/addLog')
    }
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
.work_list{
  width: 95%;
  margin:0 auto;
  height: 16rem;
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
