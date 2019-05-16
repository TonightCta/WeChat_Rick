<!-- 项目详情 -->
<template lang="html">
  <div class="project_details">
    <WorkHeader>
      <span>订单详情</span>
    </WorkHeader>
    <div class="details_con">
      <p class="details_title">项目信息</p>
      <ul class="details_mes">
        <li>项目名称:&nbsp;{{projectMes.customerName}}</li>
        <li>项目内容:&nbsp;{{projectMes.content}}</li>
        <li>项目负责人:&nbsp;&nbsp;{{projectMes.creatorName}}</li>
        <li>项目状态:&nbsp;&nbsp;{{projectMes.stateStr}}</li>
        <li>项目进度:&nbsp;&nbsp;{{projectMes.schedule}}%</li>
      </ul>
      <p class="details_title">工作时间</p>
      <ul class="details_workTime">
        <li :class="{first:projectMes.startTime!=null&&projectMes.startTime!=''}">
          <p class="vertical"></p>
          <p class="transverse"></p>
          <span v-if="projectMes.startTime!=null&&projectMes.startTime!=''">入场时间:{{projectMes.startTimeSec}}</span>
          <span v-else>入场时间:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </li>
        <li :class="{first:projectMes.finishTime!=null&&projectMes.finishTime!=''}">
          <p class="vertical"></p>
          <p class="transverse"></p>
          <span v-if="projectMes.finishTime!=null&&projectMes.finishTime">完工时间:{{projectMes.finishTimeSec}}</span>
          <span v-else>完工时间:-</span>
        </li>
        <li :class="{first:projectMes.acceptTime!=null&&projectMes.acceptTime!=''}">
          <p class="vertical"></p>
          <p class="transverse"></p>
          <span v-if="projectMes.acceptTime!=null&&projectMes.acceptTime!=''">验收时间:{{projectMes.acceptTimeSec}}</span>
          <span v-else>验收时间:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </li>
      </ul>
      <div class="" v-for="(point,index) in projectMes.projectPointVOList">
        <p class="details_title">局点信息</p>
        <ul class="details_point details_mes">
          <li>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:&nbsp;&nbsp;{{point.placeName}}</li>
          <li v-if="point.engineerNameListStr!=null&&point.engineerNameListStr!=''">人员组成:&nbsp;&nbsp;{{point.engineerNameListStr}}</li>
          <li v-else>人员组成:&nbsp;&nbsp;-</li>
        </ul>
        <ul class="details_workTime">
          <li v-for="(gress,index) in point.usingProjectCourseNodeVOList" :class="{first:gress.startTime!=null}">
            <p class="vertical"></p>
            <p class="transverse"></p>
            <span v-if="gress.startTime!=null">{{gress.courseNodeName}}:{{gress.startTimeSec}}</span>
            <span v-else>{{gress.courseNodeName}}:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </li>
        </ul>
        <!-- 老婆出门要跟“从”
             老婆命令要服“从”
             老婆讲错要盲“从”
             老婆化妆要等“得”
             老婆花钱要舍“得”
             老婆生气要忍“得”
             老婆生日要记“得” -->
      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      PageID:null,//订单ID
      projectMes:{},//项目详情
    }
  },
  created(){
    this.PageID=this.$route.query.ProID;
  },
  mounted(){
    this.getProDetails()
  },
  methods:{
    getProDetails(){//获取项目详情
      let _vc=this;
      _vc.$axios.get(_vc.oUrl+'/projectInfo?projectId='+_vc.PageID).then((res)=>{
        if(res.data.code==0){
          //入场时间
          let startDate=new Date(res.data.data.startTime);
          let sYear=startDate.getFullYear();
          let sMon=startDate.getMonth()+1;
          if(sMon<10){
            sMon='0'+sMon
          };
          let sDay=startDate.getDate();
          if(sDay<10){
            sDay='0'+sDay
          }
          let sTime=sYear+'-'+sMon+'-'+sDay;
          _vc.$set(res.data.data,'startTimeSec',sTime);
          //完工时间
          let finishDate=new Date(res.data.data.finishTime);
          let fYear=finishDate.getFullYear();
          let fMon=finishDate.getMonth()+1;
          if(fMon<10){
            fMon='0'+fMon
          };
          let fDay=finishDate.getDate();
          if(fDay<10){
            fDay='0'+fDay
          }
          let fTime=fYear+'-'+fMon+'-'+fDay;
          _vc.$set(res.data.data,'finishTimeSec',fTime);
          //验收时间
          let acceptDate=new Date(res.data.data.acceptTime);
          let aYear=acceptDate.getFullYear();
          let aMon=acceptDate.getMonth()+1;
          if(aMon<10){
            aMon='0'+aMon
          };
          let aDay=acceptDate.getDate();
          if(aDay<10){
            aDay='0'+aDay
          }
          let aTime=aYear+'-'+aMon+'-'+aDay;
          _vc.$set(res.data.data,'acceptTimeSec',aTime);
          //预警时间
          let warnDate=new Date(res.data.data.warnTime );
          let wYear=warnDate.getFullYear();
          let wMon=warnDate.getMonth()+1;
          if(wMon<10){
            wMon='0'+wMon
          };
          let wDay=warnDate.getDate();
          if(wDay<10){
            wDay='0'+wDay
          }
          let wTime=wYear+'-'+wMon+'-'+wDay;
          _vc.$set(res.data.data,'warnTimeSec',wTime);
          //计划完工时间
          let planFDate=new Date(res.data.data.planFinishTime);
          let pfYear=planFDate.getFullYear();
          let pfMon=planFDate.getMonth()+1;
          if(pfMon<10){
            pfMon='0'+pfMon
          };
          let pfDay=planFDate.getDate();
          if(pfDay<10){
            pfDay='0'+pfDay
          }
          let pfTime=pfYear+'-'+pfMon+'-'+pfDay;
          _vc.$set(res.data.data,'planFTimeSec',pfTime);
          //计划验收时间
          let planADate=new Date(res.data.data.planAcceptTime);
          let paYear=planADate.getFullYear();
          let paMon=planADate.getMonth()+1;
          if(paMon<10){
            paMon='0'+paMon
          };
          let paDay=planADate.getDate();
          if(paDay<10){
            paDay='0'+paDay
          }
          let paTime=paYear+'-'+paMon+'-'+paDay;
          _vc.$set(res.data.data,'planATimeSec',paTime);
          for(let i in res.data.data.projectPointVOList){
            for(let x in res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList){
              //开始时间
              let startDate=new Date(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x].startTime);
              let sYear=startDate.getFullYear();
              let sMon=startDate.getMonth()+1;
              if(sMon<10){
                sMon='0'+sMon
              };
              let sDay=startDate.getDate();
              if(sDay<10){
                sDay='0'+sDay
              };
              let sTime=sYear+'-'+sMon+'-'+sDay
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'startTimeSec',sTime)
              //结束时间
              let endDate=new Date(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x].endTime);
              let eYear=endDate.getFullYear();
              let eMon=endDate.getMonth()+1;
              if(eMon<10){
                eMon='0'+eMon
              };
              let eDay=endDate.getDate();
              if(eDay<10){
                eDay='0'+eDay
              };
              let eTime=eYear+'-'+eMon+'-'+eDay
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'endTimeSec',eTime);
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'openKey',_vc.lengthNum++);
            }
            for(let y in res.data.data.projectPointVOList[i].warnRecordVOList){
              //风险创建时间
              let startDate=new Date(res.data.data.projectPointVOList[i].warnRecordVOList[y].createTime);
              let sYear=startDate.getFullYear();
              let sMon=startDate.getMonth()+1;
              if(sMon<10){
                sMon='0'+sMon
              };
              let sDay=startDate.getDate();
              if(sDay<10){
                sDay='0'+sDay
              };
              let sTime=sYear+'-'+sMon+'-'+sDay
              _vc.$set(res.data.data.projectPointVOList[i].warnRecordVOList[y],'warnTimeCreat',sTime)
            }
          }
          _vc.projectMes=res.data.data;
          console.log(_vc.projectMes)
        }else{
          this.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$Toast('未知错误,请联系管理员')
        console.log(err)
      })
    }
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.first{
  .vertical{
    background: rgba(235,122,29,1)!important;
  }
  .transverse{
    background: rgba(235,122,29,1)!important;
  }
  span{
    color:rgba(235,122,29,1)!important;
  }
}
.project_details{
  width: 100%;
  height: 100%;
  padding-bottom: 5rem;
  .details_con{
    width: 90%;
    margin:0 auto;
    margin-top: 7rem;
    .details_title{
      width: 100%;
      margin-top: 4rem;
      box-sizing: border-box;
      height: 1.8rem;
      padding-left: .4rem;
      border-left:4px solid rgba(235,122,29,1);
      font-size: 1.6rem;
      line-height: 1.8rem;
    }
    .details_mes{
      width: 92%;
      margin:0 auto;
      li{
        font-size: 1.4rem;
        margin-top: 1rem;
      }
    }
    .details_workTime{
      width: 85%;
      margin:0 auto;
      margin-top: 2rem;
      li{
        width: 100%;
        position: relative;
        height:8rem;
        .vertical{
          width: .4rem;
          height: 100%;
          position: absolute;
          top:0;
          left:50%;
          margin-left: -.2rem;
          background: #ccc;
        }
        .transverse{
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          background: #ccc;
          position: absolute;
          top:0;
          left:50%;
          margin-left: -.8rem;
        }
        span{
          position: absolute;
          font-size: 1.3rem;
          right:0;
          // top:.3rem;
          color:#ccc;
        }
      }
      li:nth-of-type(even){
        span{
          left: 0;
        }
      }
      li:last-child{
        height:4rem;
        span{
          // left:55%;
          top:3rem;
        }
        .transverse{
          top:3rem;
        }
      }
    }
  }
}

</style>
