<!-- 日志详情 -->
<template lang="html">
  <div class="work_detis">
    <WorkHeader>
      <span>日志详情</span>
    </WorkHeader>
    <div class="detis_con">
      <div class="con_mes publicBox">
        <p @click="showProject()">项目名称:&nbsp;
          <input type="text" name="" placeholder="请选择项目名称" v-model="projectName" value="">
          <span></span>
        </p>
        <p @click="showProgress()">节点进程:&nbsp;
          <input type="text" placeholder="请选择节点进程" v-model="progress" name="" value="">
          <span></span>
        </p>
        <p @click="showTimePicker()">进行时间:&nbsp;
          <input type="text" placeholder="请选择进行时间" v-model="choseTime" name="" value="">
          <span></span>
        </p>
      </div>
      <div class="con_text publicBox">
        <p>工作内容:&nbsp;</p>
        <p class="con_text">
          <textarea name="name" rows="8" cols="80" placeholder="请输入工作内容"></textarea>
        </p>
      </div>
      <div class="con_file publicBox">
        <p>项目附件:&nbsp;</p>
        <p class="file_show" style="marginTop:1rem;">

        </p>
      </div>
      <div class="con_pic publicBox">
        <p>项目图片:&nbsp;<span class="work_pic"></span></p>
        <p class="file_pic" >

        </p>
      </div>
      <div class="work_mask" @touchmove.prevent v-show="isLarger" @click="closePicker()">

      </div>
      <div class="mask_closelar" @touchmove.prevent v-show="delLarger" @click="closeLarger()">

      </div>
      <!-- 项目名称 -->
      <div class="picker_box" ref="project_picker" @touchmove.prevent>
        <p @click="closePicker()">
          <span>取消</span>
          <span>确定</span>
        </p>
        <mt-picker :slots="slotsProject" @change="onValuesChangeProject"></mt-picker>
      </div>
      <!-- 进程选择器 -->
      <div class="picker_box" ref="progress_picker" @touchmove.prevent>
        <p @click="closePicker()">
          <span>取消</span>
          <span>确定</span>
        </p>
        <mt-picker :slots="slotsProgress" @change="onValuesChangeProgess"></mt-picker>
      </div>
      <!-- 时间选择器 -->
      <div class="picker_box" ref="time_picker" @touchmove.prevent>
        <p @click="closePicker()">
          <span>取消</span>
          <span>确定</span>
        </p>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      mes:{},//详情数据
      isLarger:false,//是否查看大图
      delLarger:false,//关闭蒙层
      zIndex:null,//当前查看的项目图片
      picList:[],//图片列表
      fileList:[],//文件列表
      projectName:null,//项目名称
      progress:null,//进程节点
      choseTime:null,//进行时间
      // 时间选择列表
      slots: [
       {
         flex: 1,
         values: [
           '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
           '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
           '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
           '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
           '24:00'
         ],
         className: 'slot1',
         textAlign: 'right'
       }, {
         divider: true,
         content: '-',
         className: 'slot2'
       }, {
         flex: 1,
         values: [
           '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
           '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
           '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
           '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
           '24:00'
         ],
         className: 'slot3',
         textAlign: 'left'
         }
       ],
      //进程节点列表
      slotsProgress:[
        {
          values: ['开始接单','上门工作'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      //项目名称列表
      slotsProject:[
        {
          values:['北京的','天津的'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  computed:{
    ...mapState(['logMes'])
  },
  created(){
    this.mes=JSON.parse(window.localStorage.getItem('logMes'))
  },
  components:{
    WorkHeader
  },
  methods:{
    onValuesChangeProject(picker,values){//项目名称选择
      this.projectName=values[0]
    },
    onValuesChangeProgess(picker,values){//进程节点选择
      this.progress=values[0]
    },
    onValuesChange(picker, values) {//时间选择
     if (values[0] > values[1]) {
       picker.setSlotValue(1, values[0]);
     }
     this.choseTime=values.join(' 至 ')
   },
    workFile(){//查看项目文件
      this.$Toast('项目文件')
    },
    larger(index){//查看项目图片
      this.isLarger=true;
      this.delLarger=true;
      this.zIndex=index;
      this.$refs.file_pic[index].style.position='fixed';
      this.$refs.file_pic[index].style.top='30%';
      this.$refs.file_pic[index].style.left='0';
      this.$refs.file_pic[index].style.height='auto';
      this.$refs.file_pic[index].style.zIndex='8888';
      this.$refs.file_pic[index].style.borderRaiuds='0';
    },
    closeLarger(){//关闭大图
      this.isLarger=false;
      this.delLarger=false;
      this.$refs.file_pic[this.zIndex].style.position='static';
    },
    closePicker(){//关闭时间选择器
      this.$refs.time_picker.style.bottom='-40%'
      this.$refs.progress_picker.style.bottom='-40%'
      this.$refs.project_picker.style.bottom='-40%'
      setTimeout(()=>{
        this.isLarger=false;
      },400)
    },
    showProject(){//项目名称选择
      this.isLarger=true;
      this.$refs.project_picker.style.bottom='0'
    },
    showProgress(){//进程节点选择
      this.isLarger=true;
      this.$refs.progress_picker.style.bottom='0'
    },
    showTimePicker(){//时间选择器
      this.isLarger=true;
      this.$refs.time_picker.style.bottom='0'
    }
  }
}
</script>

<style lang="scss" scoped>
.work_detis{
  width: 100%;
  height: 100%;
  padding-top:6rem;
  .detis_con{
    width: 90%;
    margin:0 auto;
    .publicBox{
      border-radius:12px;
      background: white;
      box-shadow: 0px 2px 10px #999;
      box-sizing: border-box;
      padding-top: .5rem;
    }
    .con_mes{
      width: 100%;
      height: 17rem;
      p{
        font-size: 1.4rem;
        padding-left: .5rem;
        height: 5rem;
        position: relative;
        overflow: hidden;
        input{
          position: absolute;
          width:70%;
          border-bottom: 1px solid #ccc;
          height: 3rem;
          top:.4rem;
          padding-left: .5rem;
        }
        span{
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0,0,0,0);
          top:0;
          left:0;
        }
      }
    }
    .con_file{
      p:nth-child(1){
        padding-left: .5rem;
        // margin-bottom: 1rem;
      }
      margin-top: 1.5rem;
      margin-bottom:1.5rem;
      padding-bottom: 1rem;
    }
    p{
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      font-size: 1.6rem;
      height: 3rem;
      line-height: 4rem;
    }
    .con_text{
      height: 16.5rem;
      min-height: 10.5rem;
      margin-top:1.5rem;
      position: relative;
      padding-bottom: .5rem;
      text-align: center;
      p:nth-child(1){
        padding-left: .5rem;
      }
      textarea{
        display: inline-block;
        width:95%;
        resize: none;
        border-radius:5px;
        height: 10rem;
        outline: none;
        box-sizing: border-box;
        padding:.5rem;
        font-size: 1.4rem;
        border:1px solid #ccc;
      }
      span{
        width: 100%;
        height: 15rem;
        background: rgba(0,0,0,0);
        position: absolute;
        top:0;
        left:0;
      }
    }
    .con_pic{
      width: 100%;
      padding-bottom: 1rem;
      min-height: 10.5rem;
      p:nth-child(1){
        padding-left: .5rem;
        margin-bottom: 1rem;
      }
    }
    .file_show{
      width: 90%;
      height: 5rem;
      margin:0 auto;
      border:1px solid #eb7a1d;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;
      span{
        width: 100%;
        font-size: 1.3rem;
        height: 100%;
        line-height: 5rem;
      }
      a{
        width: 100%;
        height: 100%;
        display: inline-block;
        position: absolute;
        top:0;
        left:0;
      }
    }
    .file_pic{
      width: 95%;
      height: 10rem;
      overflow-y: hidden;
      margin-bottom: 1rem!important;
      border-radius:7px;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
    .work_mask{
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.7);
      z-index: 7777;
    }
    .mask_closelar{
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0);
      z-index: 8998;
    }
    .picker_box{
      width: 100%;
      height: auto;
      position: fixed;
      background: white;
      bottom:-40%;
      left:0;
      transition:.6s all;
      z-index: 7788;
      p{
        width: 100%;
        height:4rem;
        line-height: 4rem;
        border-bottom: 1px solid #eb7a1d;
        display: flex;
        span{
          width: 50%;
          padding-left: 2rem;
        }
        span:nth-child(2){
          text-align: right;
          color:#eb7a1d;
          padding-right:2rem;
        }
      }
    }
  }
}
</style>
