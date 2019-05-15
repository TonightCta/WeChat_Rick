<!-- 项目详情 -->
<template lang="html">
  <div class="project_details">
    <WorkHeader>
      <span>订单详情</span>
    </WorkHeader>
    <div class="details_con">
      <p class="details_title">项目信息</p>
      <ul class="details_mes">
        <li>项目名称:&nbsp;{{name}}</li>
        <li>项目内容:&nbsp;{{name}}</li>
        <li>项目负责人:&nbsp;&nbsp;{{peo}}</li>
        <li>项目状态:&nbsp;&nbsp;{{state}}</li>
        <li>项目进度:&nbsp;&nbsp;{{speed}}%</li>
      </ul>
      <p class="details_title">工作时间</p>
      <ul class="details_workTime">
        <li :class="{first:mission!=null}">
          <p class="vertical"></p>
          <p class="transverse"></p>
          <span v-if="mission!=null">入场时间:{{mission}}</span>
          <span v-else>入场时间:-</span>
        </li>
        <li :class="{first:fin!=null}">
          <p class="vertical"></p>
          <p class="transverse"></p>
          <span v-if="fin!=null">完工时间:{{fin}}</span>
          <span v-else>完工时间:-</span>
        </li>
        <li :class="{first:take!=null}">
          <p class="vertical"></p>
          <p class="transverse"></p>
          <span v-if="take!=null">验收时间:{{take}}</span>
          <span v-else>验收时间:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </li>
      </ul>
      <div class="">
        <p class="details_title">局点信息</p>
        <ul class="details_point details_mes">
          <li>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:&nbsp;&nbsp;北京-北京市</li>
          <li>人员组成:&nbsp;&nbsp;彭闯</li>
        </ul>
        <ul class="details_workTime">
          <li v-for="(point,index) in pointList" :class="{first:point.creatTime!=null}">
            <p class="vertical"></p>
            <p class="transverse"></p>
            <span v-if="point.creatTime!=null">{{point.text}}:{{point.creatTime}}</span>
            <span v-else>{{point.text}}:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </li>
        </ul>
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
      name:'双方就爱上咖啡机哈萨克交付哈空间规划卡设计稿has',
      peo:'彭闯',
      state:'进场开工',
      speed:'80',
      mission:'2018-05-06',
      fin:'2018-06-08',
      take:null,
      pointList:[
        {
          creatTime:'2018-05-09',
          text:'上门开工'
        },
        {
          creatTime:'2018-05-11',
          text:'加电单调'
        },
        {
          creatTime:null,
          text:'硬件安装'
        },
        {
          creatTime:null,
          text:'联调割接'
        },
        {
          creatTime:null,
          text:'培训'
        },
        {
          creatTime:null,
          text:'完工'
        }
      ]
    }
  },
  created(){
    this.PageID=this.$route.query.ProID;
  },
  mounted(){
    console.log(this.PageID)
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
      margin-top: 2rem;
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
