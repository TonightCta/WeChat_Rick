<!-- 接单项目详情 -->
<template lang="html">
  <div class="work_detis">
    <WorkHeader>
      <span>项目详情</span>
    </WorkHeader>
    <div class="detis_con">
      <p class="detis_title">项目信息:<span></span></p>
      <div class="con_mes publicBox">
        <p>项目名称:&nbsp;{{mes.name}}</p>
        <p>项目地点:&nbsp;{{mes.placeVO.parentName+'-'+mes.placeVO.name}}</p>
        <p style="max-height:none;line-height:2.5rem;">详细地址:&nbsp;{{mes.address}}</p>
        <p><span>项目状态:&nbsp;{{mes.stateStr}}</span></p>
        <p>
          <span>发布日期:&nbsp;{{mes.createTimeStr}}</span>
        </p>
      </div>
      <p class="detis_title">项目内容:<span></span></p>
      <div class="con_text publicBox">
        <p class="con_text">
          <textarea name="name" v-model="mes.content" disabled="disabled"></textarea>
          <!-- <span></span> -->
        </p>
      </div>
      <!-- <p class="detis_title">项目附件:<span></span></p>
      <div class="con_file publicBox">
        <p class="file_show" style="marginTop:1rem;" v-for="(file,index) in fileList" :key="'A'+index">
          <span>{{file.fileName}}.xls</span>
          <a :href="oUrl+'/'+'准格尔旗法院机房项目开工协调会纪要_1550718883384.docx'"></a>
        </p>
      </div>
      <p class="detis_title">项目图片:<span></span></p>
      <div class="con_pic publicBox">
        <span class="work_pic"></span>
        <p class="file_pic" v-for="(pic,index) in picList" :key="index">
          <img :src="oUrl+'/'+pic.fileName" alt="" :preview="index"  ref="file_pic">
        </p>
      </div> -->
      <p class="applyOrder" @click="applyOrder()" v-show="mes.state==2">立即申请</p>
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
import { MessageBox } from 'mint-ui'
export default {
  data(){
    return{
      mes:{},//详情数据
      isLarger:false,//是否查看大图
      delLarger:false,//关闭蒙层
      zIndex:null,//当前查看的项目图片
      picList:[],
      //文件列表
      fileList:[],
      content:'就开始读后感科技大厦更健康的数据库更合适的开个会 大好时光华盛顿更合适的健康韩国思考红烧冬瓜就开始读后感会计师对韩国可视对讲的鬼话四大皆空更合适的健康更合适的健康感受到规划局时代光华数据库的个感受到好几个号圣诞节开个会是的感受到韩国进口首都航空国际化是的空间规划速度快 该数据库的规划是大家客观环境可适当广寒深宫收到就好该数据库的桂花树看感受到好几个很深刻的结构化数据库的规划开始更合适的结构化考试结构化考试的 个杀鸡给猴看手机号刚开始读后感更合适的结构化数据库韩国司空见惯和三个和尚贵航股份就开始读后感开始接电话更深刻晃过上帝进口国和数据库的规划刚回到家烧开后改加快速度红烧冬瓜见客户速度快更合适的空间规划师规划设计快点干活数据库的规划开始就 更合适的接口规划设计看到过黄寺大街开个会感受到会更好四大金刚黄寺大街kg施工开始就换个数据库的规划开始就给换上'
    }
  },
  computed:{
    ...mapState(['logMes','userMes'])
  },
  created(){
    this.mes=JSON.parse(window.localStorage.getItem('takeMes'));
  },
  mounted(){
    this.$previewRefresh();
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
    },
    applyOrder(){
      let _vm=this;
      if(_vm.userMes.engineerVO){
        if(_vm.mes.stateStr==='截单状态'){
          _vm.$Toast('很抱歉,该项目已截单')
        }else if(_vm.userMes.engineerVO.state==0){
          MessageBox({
            message:'当前未进行工程师认证,是否立即前往？',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            showCancelButton:true
          }).then(action => {
            if(action=='confirm'){
              _vm.$router.push({
                path:'/mine',
                query:{
                  color:4
                }
              })
            }
          }).catch(err=>{
            if(err=='cancel'){
              console.log(err)
            }
          })
        }else{
          let formdata=new FormData();
          let userId=window.localStorage.getItem('engID');
          formdata.append('missionId',_vm.mes.id);
          formdata.append('engineerId',userId);
          _vm.$axios.post(_vm.oUrl+'/mission/saveMissionRecord',formdata).then((res)=>{
            if(res.data.code==0){
              _vm.$Toast('申请成功,稍后将会为您进行审核,请留意');
              _vm.$router.go(-1);
            }else{
              _vm.$Toast(res.data.msg)
            }
          }).catch((err)=>{
            _vm.$Toast('未知异常,请联系客服')
            console.log(err)
          })
        }
      }else{
        _vm.$Toast('请先登录');
        setTimeout(()=>{
          _vm.$router.push('/Tlogin')
        },500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.work_detis{
  width: 100%;
  padding-top:6rem;
  padding-bottom:10rem;
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
      margin-top: -.5rem;
      p{
        font-size: 1.4rem;
        padding-left: 1.5rem;
        display: flex;
        line-height: 3rem;
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
        min-height: 15rem;
        max-height: none;
        padding-bottom: 2rem!important;
        outline: none;
        padding:.5rem;
        font-size: 1.4rem;
        border:1px solid #ccc;
        overflow: auto;
        background: white;
      }
      textarea[disabled]{color:black;opacity:1}
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
    .applyOrder{
      width: 100%;
      text-align: center;
      height: 3.8rem;
      line-height: 3.8rem;
      background: #eb7a1d;
      color:white;
      position: fixed;
      bottom:0;
      left: 0;
    }
    .file_show{
      width: 90%;
      height: 5rem;
      margin:0 auto;
      border:1px solid #eb7a1d;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
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
