<!-- 项目详情Admin -->
<template lang="html">
  <div class="pro_admin">
    <WorkHeader>
      <span>项目详情</span>
    </WorkHeader>
    <div class="pro_con">
      <div class="pro_mes">
        <p class="mes_title">项目信息
          <span></span>
        </p>
        <p class="mes_con">客户名称:&nbsp;{{projectMes.customerName}}</p>
        <p class="mes_con">项目名称:&nbsp;{{projectMes.name}}</p>
        <p class="mes_con">项目合同单号:&nbsp;{{projectMes.contractNumber}}</p>
        <p class="mes_con">项目内容:&nbsp;{{projectMes.content}}</p>
        <p class="mes_con bothBox">
          <span>联系人:&nbsp;{{projectMes.linkman}}</span>
          <span>联系电话:&nbsp;{{projectMes.phone}}</span>
        </p>
        <p class="mes_con bothBox">
          <span>项目人数:&nbsp;{{projectMes.peopleNumber}}</span>
          <span>工期:&nbsp;{{projectMes.dayNumber}}</span>
        </p>
        <p class="mes_con">技能要求:&nbsp;{{projectMes.levelStr}}</p>
        <p class="mes_con bothBox">
          <span>交付标准:&nbsp;{{projectMes.standard}}</span>
          <span>项目状态:&nbsp;{{projectMes.stateStr}}</span>
        </p>
        <p class="mes_con">
          <span>项目进度:&nbsp;{{projectMes.schedule}}%</span>
        </p>
        <p class="mes_con bothBox">
          <span v-if="projectMes.warnTime!=null&&projectMes.warnTime!=''">预警时间:&nbsp;{{projectMes.warnTimeSec}}</span>
          <span v-else>预警时间:&nbsp;-</span>
          <span v-if="projectMes.startTime!=null&&projectMes.startTime!=''">入场时间:&nbsp;{{projectMes.startTimeSec}}</span>
          <span v-else>入场时间:&nbsp;-</span>
        </p>
        <p class="mes_con">
          <span v-if="projectMes.planFinishTime!=null&&projectMes.planFinishTime!=''">计划完工时间:&nbsp;{{projectMes.planFTimeSec}}</span>
          <span v-else>计划完工时间:&nbsp;-</span>
        </p>
        <p class="mes_con">
          <span v-if="projectMes.planAcceptTime!=null&&projectMes.planAcceptTime!=''">计划验收时间:&nbsp;{{projectMes.planATimeSec}}</span>
          <span v-else>计划验收时间:&nbsp;-</span>
        </p>
        <p class="mes_con bothBox">
          <span v-if="projectMes.finishTime!=null&&projectMes.finishTime!=''">完工时间:&nbsp;{{projectMes.finishTimeSec}}</span>
          <span v-else>完工时间:&nbsp;-</span>
          <span v-if="projectMes.acceptTime!=null&&projectMes.acceptTime!=''">验收时间:&nbsp;{{projectMes.acceptTimeSec}}</span>
          <span v-else>验收时间:&nbsp;-</span>
        </p>
        <div class="" style="margin-top:2rem;" v-for="(point,key) in projectMes.projectPointVOList" :key="'Point'+key">
          <p class="mes_title">局点信息
            <span></span>
          </p>
          <p class="mes_con">
            <span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:&nbsp;&nbsp;&nbsp;{{point.placeName}}</span>
          </p>
          <p class="mes_con">
            <span>详细地址:&nbsp;&nbsp;&nbsp;{{point.address}}</span>
          </p>
          <p class="mes_con">
            <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:&nbsp;&nbsp;&nbsp;{{point.remark}}</span>
          </p>
          <p class="mes_con">
            <span>人员组成:&nbsp;&nbsp;&nbsp;{{point.engineerNameListStr}}</span>
          </p>
          <p class="point_title">项目进程</p>
          <div class="" v-for="(gress,index) in point.usingProjectCourseNodeVOList">
            <p class="mes_con pointBoth">{{gress.courseNodeName}}</p>
            <p class="mes_con pointBothBox">
              <span v-if="gress.startTime!=null&&gress.startTime!=''">{{gress.startTimeSec}}</span>
              <span v-else>暂无</span>
              -
              <span v-if="gress.endTime!=null&&gress.endTime!=''">{{gress.endTimeSec}}</span>
              <span v-else>暂无</span>
            </p>
          </div>
          <p class="point_title" v-if="point.projectFileVOList!=null">项目文档</p>
          <p class="mes_con" v-for="(file,index) in point.projectFileVOList" :key="'File'+index">
            <span v-show="file.fileType==0">【项目经理任命】</span>
            <span v-show="file.fileType==1">【开会检查项】</span>
            <span v-show="file.fileType==2">【会议纪要】</span>
            <span v-show="file.fileType==3">【技术方案】</span>
            <span v-show="file.fileType==4">【安装报告】</span>
            <span v-show="file.fileType==5">【加电测试】</span>
            <span v-show="file.fileType==6">【割接调测】</span>
            <span v-show="file.fileType==7">【完工报告】</span>
            <span v-show="file.fileType==8">【验收报告】</span>
            <span v-show="file.fileType==9">【进场报告】</span>
            <span v-show="file.fileType==10">【离场报告】</span>
            <a :href="oUrl+'/'+file.fileName">{{file.fileName}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      proID:null,//项目ID
      projectMes:{},//项目信息
    }
  },
  created(){
    this.proID=this.$route.query.proID
  },
  mounted(){
    this.hasDetials()
  },
  methods:{
    hasDetials(){//查看项目详情
      let _vc=this;
      _vc.$axios.get(_vc.oUrl+'/projectInfo?projectId='+_vc.proID).then((res)=>{
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
          _vc.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vc.$Toast('未知错误,请联系管理员')
        console.log(err)
      })
    },
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.pro_con{
  margin-top: 7rem;
  width: 100%;
  .pro_mes{
    width: 93%;
    margin:0 auto;
    .mes_title{
      width: 100%;
      height: 3rem;
      font-size: 1.6rem;
      box-sizing: border-box;
      padding-left: .8rem;
      position: relative;
      span{
        position: absolute;
        height: 1.4rem;
        width: 4px;
        background: #eb7a1d;
        left:0;
        top:34%;
        margin-top:-.8rem;
      }
    }
    .mes_con{
      width: 100%;
      font-size: 1.5rem;
      box-sizing: border-box;
      padding-left: .8rem;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
    .bothBox{
      width: 100%;
      display: flex;
      span{
        display: inline-block;
        width: 50%;
        text-align: left;
      }
    }
    .point_title{
      width: 100%;
      font-size: 1.6rem;
      box-sizing: border-box;
      padding-left: .8rem;
      color:#eb7a1d;
      margin-bottom: 1rem;
    }
    .pointBoth{
      padding-left: 1.4rem;
    }
    .pointBothBox{
      word-wrap: 90%;
      display: flex;
      justify-content: space-around;
      span{
        width: 10rem;
        text-align: center;
      }
    }
  }
}
</style>
