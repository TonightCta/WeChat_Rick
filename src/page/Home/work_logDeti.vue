<!-- 日志详情 -->
<template lang="html">
  <div class="work_detis">
    <WorkHeader>
      <span>日志详情</span>
    </WorkHeader>
    <div class="detis_con">
      <p>项目名称:&nbsp;{{mes.type}}</p>
      <p>项目地点:&nbsp;{{mes.place}}</p>
      <p>节点进程:&nbsp;{{mes.status}}</p>
      <p>工作内容:&nbsp;</p>
      <p>
        <textarea name="name" rows="8" cols="80" v-model="mes.type"></textarea>
        <span></span>
      </p>
      <p>进行时间:&nbsp;{{mes.time}}</p>
      <p>项目附件:&nbsp;<span class="work_file" @click="workFile()">
        <a href="http://admin.rightservicetech.com/多媒体融合通信系统升级扩容项目数通交付日报_1523459624442.xls"></a>
      </span></p>
      <p>项目图片:&nbsp;<span class="work_pic"></span></p>
      <p class="file_pic" v-for="(pic,index) in picList" :key="index">
        <img :src=pic.url alt="" @click="larger(index)" ref="file_pic">
      </p>
      <div class="work_mask" @touchmove.prevent v-show="isLarger">

      </div>
      <div class="mask_closelar" @touchmove.prevent v-show="delLarger" @click="closeLarger()">

      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      mes:{},//详情数据
      isLarger:false,//是否查看大图
      delLarger:false,//关闭蒙层
      zIndex:null,//当前查看的项目图片
      picList:[
        {url:'static/img/engPic/person_ght.png'},
        {url:'static/img/engPic/person_lsh.png'},
        {url:'static/img/engPic/person_sly.png'},
        {url:'static/img/engPic/person_zyz.png'},
      ]
    }
  },
  created(){
    this.mes=this.$route.params.con;
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
      this.$refs.file_pic[index].style.top='30%';
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
    p{
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      font-size: 1.6rem;
      height: 3rem;
      line-height: 4rem;
    }
    p:nth-child(5){
      margin-bottom: 8rem;
      margin-top:1.5rem;
      position: relative;
      textarea{
        display: inline-block;
        width: 100%;
        resize: none;
        border-radius:5px;
        height: 10rem;
        outline: none;
        box-sizing: border-box;
        padding:.5rem;
        font-size: 1.4rem;
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
    p:nth-child(7){
      position: relative;
      margin-bottom: 5rem;
      .work_file{
        display: inline-block;
        position: absolute;
        width: 8rem;
        height: 8rem;
        background: red;
        top:1.2rem;
        border-radius:8px;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;

        }
      }
    }
    .file_pic{
      width: 100%;
      height: 10rem;
      overflow-y: hidden;
      margin-bottom: 1rem;
      border-radius:7px;
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
  }
}
</style>
