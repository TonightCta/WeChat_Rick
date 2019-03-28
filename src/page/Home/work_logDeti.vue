<!-- 日志详情 -->
<template lang="html">
  <div class="work_detis">
    <WorkHeader>
      <span>日志详情</span>
    </WorkHeader>
    <div class="detis_con">
      <p class="detis_title">项目信息:<span></span></p>
      <div class="con_mes publicBox">
        <p>项目名称:&nbsp;{{mes.type}}</p>
        <p>
          <span>项目地点:&nbsp;{{mes.place}}</span>
          <span>节点进程:&nbsp;{{mes.status}}</span>
        </p>
        <p>
          <span>进行日期:&nbsp;2019-03-22</span>
          <span>进行时间:&nbsp;13:00-16:00</span>
        </p>
      </div>
      <p class="detis_title">工作内容:<span></span></p>
      <div class="con_text publicBox">
        <p class="con_text">
          <textarea name="name" rows="8" cols="80" v-model="mes.type"></textarea>
          <span></span>
        </p>
      </div>
      <p class="detis_title">项目附件:<span></span></p>
      <div class="con_file publicBox">
        <p class="file_show" style="marginTop:1rem;" v-for="(file,index) in fileList" :key="'A'+index">
          <span>{{file.name}}.xls</span>
          <a :href='file.href'></a>
        </p>
      </div>
      <p class="detis_title">项目图片:<span></span></p>
      <div class="con_pic publicBox">
        <span class="work_pic"></span>
        <p class="file_pic" v-for="(pic,index) in picList" :key="index">
          <img :src=pic.url alt="" :preview="index"  ref="file_pic">
        </p>
      </div>
      <div class="work_mask" @touchmove.prevent v-show="isLarger">

      </div>
      <div class="mask_closelar" @touchmove.prevent v-show="delLarger" @click="closeLarger()">

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
      picList:[//图片列表
        {url:'static/img/engPic/person_ght.png'},
        {url:'static/img/engPic/person_lsh.png'},
        {url:'static/img/engPic/person_sly.png'},
        {url:'static/img/engPic/person_zyz.png'},
      ],
      fileList:[//文件列表
        {
          name:'多媒体融合通信系统升级扩容项目数通交付日报',
          href:'http://admin.rightservicetech.com/多媒体融合通信系统升级扩容项目数通交付日报_1523459624442.xls'
        },
        {
          name:'多媒体融合通信系统升级扩容项目数通交付日报',
          href:'http://admin.rightservicetech.com/多媒体融合通信系统升级扩容项目数通交付日报_1523459624442.xls'
        },
        {
          name:'多媒体融合通信系统升级扩容项目数通交付日报',
          href:'http://admin.rightservicetech.com/多媒体融合通信系统升级扩容项目数通交付日报_1523459624442.xls'
        }
      ]
    }
  },
  computed:{
    ...mapState(['logMes'])
  },
  created(){
    this.mes=JSON.parse(window.localStorage.getItem('logMes'));
  },
  mounted(){
    this.$previewRefresh()
  },
  components:{
    WorkHeader
  },
  methods:{
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
    closeLarger(){
      this.isLarger=false;
      this.delLarger=false;
      this.$refs.file_pic[this.zIndex].style.position='static';
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
      height: 10.5rem;
      margin-top: -.5rem;
      p{
        font-size: 1.4rem;
        padding-left: 1.5rem;
        display: flex;
        span{
          width: 50%;
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
      height: 10rem;
      min-height: 10.5rem;
      position: relative;
      padding-bottom: .5rem;
      text-align: center;
      margin-bottom: 1rem;
      textarea{
        display: inline-block;
        width:92%;
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
        margin-top: -20%;
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
  }
}
</style>
