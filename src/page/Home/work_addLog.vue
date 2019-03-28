<!-- 日志详情 -->
<template lang="html">
  <div class="work_detis">
    <WorkHeader>
      <span>添加日志</span>
    </WorkHeader>
    <div class="detis_con">
      <p class="detis_title">项目信息:<span></span></p>
      <div class="con_mes publicBox">
        <p @click="showProject()">
          <span class="text_title">项目名称:&nbsp;</span>
          <span class="time_mes">
            <input type="text" name="" placeholder="请选择项目名称" v-model="projectName" value="" style="width:100%;textAlign:left;">
          </span>
          <span></span>
          </p>
        <p @click="showProgress()">
          <span class="text_title">节点进程:&nbsp;</span>
          <span class="time_mes">
            <input type="text" placeholder="请选择节点进程" v-model="progress" name="" value="" style="width:100%;textAlign:left;">
          </span>
          <span></span>
          </p>
        <p @click="showTimePicker()">进行时间:&nbsp;
          <span class="time_mes">
            <input type="text" v-model="startTime" name="" value="" placeholder="开始时间">
            至
            <input type="text" v-model="endTime" name="" value="" placeholder="结束时间">
          </span>
          <!-- <input type="text" placeholder="请选择进行时间" style="borderBottom:0;paddingLeft:1rem;" v-model="choseTime" name="" value=""> -->
          <span></span>
          </p>
      </div>
      <p class="detis_title">工作内容:<span></span></p>
      <div class="con_text publicBox">
        <p class="con_text">
          <textarea name="name" rows="8" cols="80" v-model="workContent" placeholder="请输入工作内容"></textarea>
        </p>
      </div>
      <p class="detis_title">项目附件:<span></span></p>
      <div class="con_file publicBox">
        <p class="file_show" v-for="(file,index) in fileList" :key="'A'+index">
          <span>{{file}}</span>
          <i class="iconfont icon-guanbi" @click="delFiles(index)"></i>
          <!-- <a :href='file.href'></a> -->
        </p>
        <p class="file_add">
          <input type="file" name="" value="" @change="fileAdd">
          <span>点击上传</span>
          <i class="iconfont">+</i>
        </p>
      </div>
      <p class="detis_title">
        项目图片:
        <span></span>
      </p>
      <div class="pic_box" v-for="(pic,index) in picList" :key="index">
        <p class="file_pic">
          <img :src=pic alt="" :preview="index" ref="file_pic">
        </p>
        <i class="iconfont icon-guanbi" @click="delPics(index)"></i>
      </div>
        <p class="pic_add">
          <input type="file" accept="image/*" name="" value="" @change="pushPic($event)">
          <span>点击上传</span>
          <i class="iconfont">+</i>
        </p>
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
      <!-- 提交 -->
      <p class="subWork" @click="subWork()">提交</p>
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
      //图片列表
      picList:[],
      //上传图片文件列表
      upPics:[],
      //文件列表
      fileList:[],
      //上传文件列表
      upFiles:[],
      projectName:null,//项目名称
      progress:null,//进程节点
      choseTime:null,//进行时间
      startTime:null,//开始时间
      endTime:null,//结束时间
      workContent:null,//工作内容
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
  mounted(){
    this.$previewRefresh();
    this.projectName=null;
    this.progress=null;
    this.startTime=null;
    this.endTime=null;
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
       this.startTime=values[0];
       this.endTime=values[1];
     },
    workFile(){//查看项目文件
      this.$Toast('项目文件')
    },
    larger(index){//查看项目图片
      this.isLarger=true;
      this.delLarger=true;
      this.zIndex=index;
      this.$refs.file_pic[index].style.position='fixed';
      this.$refs.file_pic[index].style.top='40%';
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
    },
    fileAdd(e){//上传文件
      this.upFiles.push(e.target.files[0]);
      this.fileList.push(e.target.files[0].name);
    },
    delFiles(index){//删除已上传文件
      this.upFiles.splice(index,1);
      this.fileList.splice(index,1);
    },
    pushPic(e){//上传图片文件
      let _vm=this;
      let file=e.target,reader=new FileReader();
      _vm.upPics.push(file.files[0]);
      console.log(_vm.upPics)
      reader.readAsDataURL(file.files[0]);
      reader.onload=function(){
        _vm.picList.push(this.result);
        _vm.$previewRefresh()
      }
    },
    delPics(index){//删除已上传图片
      this.picList.splice(index,1);
      this.upPics.splice(index,1);
    },
    subWork(){//上传日志
      let _vm=this;
      if(_vm.projectName==null){
        _vm.$Toast('请选择项目名称')
      }else if(_vm.progress==null){
        _vm.$Toast('请选择节点进程')
      }else if(_vm.startTime==null){
        _vm.$Toast('请选择开始时间')
      }else if(_vm.endTime==null){
        _vm.$Toast('请选择结束时间')
      }else if(_vm.workContent==null){
        _vm.$Toast('请填写工作内容')
      }else{
        _vm.$Indicator.open('提交中...');
        let formdata=new FormData();
        setTimeout(()=>{
           _vm.$Indicator.close();
        },1000)
        // _vm.$axios.post(_vm.url+'',formdata).then((res)=>{
        //   console.log(res);
        //   if(res.data.code){
        //     _vm.$Indicator.close();
        //     _vm.$router.push('/workLog');
        //   }else{
        //     _vm.$Toast(res.data.msg);
        //     _vm.$Indicator.close();
        //   }
        // }).catch((err)=>{
        //   _vm.$Indicator.close();
        //   _vm.$Toast('未知错误');
        //   console.log(err)
        // })
      }
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
    .detis_title{
      width: 100%;
      height: 4rem;
      font-size: 1.6rem;
      box-sizing: border-box;
      padding-left: .6rem;
      position: relative;
      span{
        position: absolute;
        height: 1.4rem;
        width: 4px;
        background: #eb7a1d;
        left:0;
        top:50%;
        margin-top:-.7rem;
      }
    }
    .publicBox{
      border-radius:12px;
      background: white;
      // box-shadow: 0px 2px 10px #999;
      box-sizing: border-box;
      padding-top: .5rem;
    }
    .con_mes{
      width: 100%;
      height: 16rem;
      p{
        font-size: 1.4rem;
        padding-left: 1rem;
        height: 5rem;
        line-height: 5rem;
        position: relative;
        overflow: hidden;
        .text_title{
          height: 5rem;
          // background: red;
          width: 25%;
          position: static;
          line-height: 5rem;
        }
        input{
          display: inline-block;
          height: 4rem;
          // background: blue;
          width:70%;
          border-bottom: 1px solid #ccc;
          margin-top: -2rem;
          font-size: 1.4rem;
          padding-left: .5rem;
          border-radius:0;
          padding-bottom: .5rem;
          box-sizing: border-box;
        }
        .time_mes{
          height: 90%;
          width:70%;
          height: 3rem;
          font-size: 1.4rem;
          padding-left: .5rem;
          border-radius:0;
          padding-bottom: .5rem;
          position: absolute;
          left:23%;
          top:-0.5px;
          input{
            height: 80%;
            width: 30%;
            border-bottom: 1px solid #ccc;
            text-align: center;
          }
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
      height: 12rem;
      min-height: 10.5rem;
      position: relative;
      text-align: center;
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
    }
    .file_show{
      width: 90%;
      height: 5rem;
      margin:0 auto;
      border:1px solid #eb7a1d;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;
      margin-bottom: .5rem;
      position: relative;
      i{
        font-size: 1.8rem;
        position: absolute;
        right:-1rem;
        top:-2rem;
        color:#666;
        z-index: 1;
      }
      span{
        width: 100%;
        font-size: 1.3rem;
        height: 100%;
        line-height: 5rem;
        padding-left: .5rem;
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
    .file_add{
      width: 90%;
      height: 5rem;
      margin:0 auto;
      border:1px solid #eb7a1d;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
      text-align: center;
      .iconfont{
        font-size: 4rem;
        color:#eb7a1d;
        position: absolute;
        top:-.6rem;
        left:50%;
        margin-left: -1.4rem;
      }
      span{
        height: 100%;
        line-height: 7.5rem;
        color:#eb7a1d;
        font-size: 1.5rem;
      }
      input{
        position: absolute;
        top:1%;
        left: 1%;
        width: 98%;
        height: 98%;
        opacity: 0;
        z-index: 1;
      }
    }
    .pic_box{
      position: relative;
      height: auto;
      i{
        font-size: 1.8rem;
        position: absolute;
        right:0;
        top:-.8rem;
        color:#666;
        z-index: 1;
      }
      .file_pic{
        width: 95%;
        height: 10rem;
        overflow-y: hidden;
        margin-bottom: 1rem!important;
        border-radius:7px;
        margin:0 auto;
        img{
          margin-top: -20%;
          width: 100%;
        }
      }
    }

    .pic_add{
      border:1px solid #eb7a1d;
      width: 95%;
      height: 10rem;
      overflow-y: hidden;
      margin-bottom: 3rem!important;
      border-radius:7px;
      margin:0 auto;
      position: relative;
      text-align: center;
      .iconfont{
        font-size: 5rem;
        color:#eb7a1d;
        position: absolute;
        top:1rem;
        left:50%;
        margin-left: -1.4rem;
      }
      span{
        height: 100%;
        line-height: 13rem;
        color:#eb7a1d;
      }
      input{
        position: absolute;
        top:1%;
        left: 1%;
        width: 98%;
        height: 98%;
        opacity: 0;
        z-index: 1;
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
    .subWork{
      width: 100%;
      height: 3.5rem;
      text-align: center;
      background: #eb7a1d;
      line-height: 3.5rem;
      position: fixed;
      bottom:0;
      left:0;
      color:white;
      border-radius:8px;
    }
  }
}
</style>
