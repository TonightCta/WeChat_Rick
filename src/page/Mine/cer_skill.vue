<!-- 身份认证页 -->
<template lang="html">
  <div class="cer_card">
    <WorkHeader>
      <span>技能认证</span>
    </WorkHeader>
    <div class="" style="margin-top:7rem;">

    </div>
    <ul class="showCardPic">
      <li v-for='(webPic,index) in webView'>
        <img :src="oUrl+'/'+webPic.fileName" alt="">
        <i class="iconfont icon-guanbi" @click="delWhenPic(index)"></i>
      </li>
    </ul>
    <ul class="showCardPic">
      <li v-for='(item,index) in skillsPic'>
        <img :src="item" alt="">
        <i class="iconfont icon-guanbi" @click="delCard(index)"></i>
      </li>
    </ul>
    <div class="card_is" v-show="isTwo">
      <input type="file" accept="image/*" @change="upCardIs" name="" value="">
      <i class="iconfont icon-icon19"></i>

    </div>
    <p class="sendCard" @click="sendCards()">提交</p>
    <div class="up_mask"  v-show="upBtn">

    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  inject:['reload'],
  data(){
    return{
      skillsPic:[],
      skillsFile:[],
      webView:[],//回显列表
      isTwo:true,
      upBtn:true
    }
  },
  watch:{
    skillLength(val,oldVal){
      if(val>=1){
        this.upBtn=false;
      }else{
        this.upBtn=true
      }
      if(val>=5){
        this.isTwo=false;
      }else{
        this.isTwo=true
      }
    }
  },
  computed:{
    ...mapState(['userMes']),
    skillLength(){
      return this.skillsPic.length+this.webView.length
    }
  },
  mounted(){
    if(this.userMes.engineerVO){
      if(this.userMes.engineerVO.certificateFiles.length>=1){
        let  localCertificateFiles=this.userMes.engineerVO.certificateFiles;
        this.webView=localCertificateFiles;
        setTimeout(()=>{
          if(this.skillLength>=1){
            this.upBtn=false;
          }else{
            this.upBtn=true
          }
          if(this.skillLength>=5){
            this.isTwo=false;
          }else{
            this.isTwo=true
          }
        })
      }
    }
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    upCardIs(e){//上传身份证照片
      let _this=this;
      let file=e.target.files[0];
      let reader=new FileReader();
      reader.readAsDataURL(file);
      let img=new Image;
      reader.onload=function(e){
        var width=400,
        quality=0.1,
        canvas=document.createElement("canvas"),
        drawer=canvas.getContext("2d");
        img.src=this.result;
        img.onload=()=>{
          canvas.width=width;
          canvas.height=width*(img.height/img.width);
          drawer.drawImage(img,0,0,canvas.width,canvas.height);
          img.src=canvas.toDataURL('image/png',quality);
        }
        _this.skillsPic.push(img.src);
      };
      this.skillsFile.push(e.target.files[0]);
    },
    delCard(index){//删除当前本地照片
      this.skillsPic.splice(index,1);
      this.skillsFile.splice(index,1);
    },
    delWhenPic(index){//删除当前已上传照片
      let _vm=this;
      if(_vm.userMes.engineerVO.state==0){
        _vm.$Indicator.open('删除中...');
        let formData=new FormData();
        formData.append('id',_vm.webView[index].id);
        formData.append('type','certificateFile');
        _vm.$axios.post(_vm.oUrl+'/mobile/deleteEngineerFile',formData).then((res)=>{
          if(res.data.code==0){
            _vm.$Indicator.close();
            _vm.$Toast('删除成功');
            _vm.userMes_fn(res.data.data);
            _vm.reload()
            this.webView=res.data.data.engineerVO.certificateFiles
          }else{
            _vm.$Indicator.close();
            _vm.$Toast(res.data.msg);
          }
        }).catch((err)=>{
          _vm.$Toast('未知错误')
        })
      }else{
          _vm.$Toast('当前资料认证中或已认证，如需修改请联系客服')
      }
    },
    sendCards(){//提交认证数据
      let _vm=this;
      _vm.$Indicator.open('提交中...');
      let _form=new FormData();
      _form.append('id',_vm.userMes.engineerVO.id)
      _form.append('certificateUploadFiles',_vm.skillsFile[0]);
      _form.append('certificateUploadFiles',_vm.skillsFile[1]);
      _form.append('certificateUploadFiles',_vm.skillsFile[2]);
      _form.append('certificateUploadFiles',_vm.skillsFile[3]);
      _form.append('certificateUploadFiles',_vm.skillsFile[4]);
      _vm.$axios.post(_vm.oUrl+'/mobile/uploadEngineerFile',_form).then((res)=>{
        if(res.data.code==0){
          _vm.$Indicator.close();
          _vm.userMes_fn(res.data.data)
          _vm.$Toast('提交成功');
          _vm.$router.push({
            path:'/mine',
            query:{
              color:4
            }
          })
        }else{
          _vm.$Indicator.close();
          _vm.$Toast(res.data.msg);
        }
      }).catch((err)=>{
        _vm.$Indicator.close();
        _vm.$Toast('未知错误')
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
.cer_card{
  width: 100%;
  position: relative;
  .showCardPic{
    width: 70%;
    margin:0 auto;
    border-radius:10px;
    margin-bottom:2rem;
    li{
      width: 100%;
      border-radius: 10px;
      height: 15rem;
      background: white;
      box-shadow: 0px 0px 15px #999;
      margin-bottom: 1rem;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      i{
        position: absolute;
        color:#666;
        font-size: 1.6rem;
        right:-.8rem;
        top:-.8rem;
      }
    }
  }
  .card_is{
    width: 70%;
    height: 15rem;
    border-radius: 10px;
    margin-top:2rem;
    background: url('../../../static/img/skill_bg.jpg');
    background-size: 100% 100%;
    margin:0 auto;
    box-sizing: border-box;
    box-shadow: 0px 0px 15px #999;
    position:relative;
    input{
      width: 100%;
      height: 100%;
      background: red;
      position: absolute;
      left:0;
      top:0;
      border-radius:10px;
      opacity: 0;
      z-index: 1;
    }
    i{
      color:#666;
      font-size: 8rem;
      position: absolute;
      top:50%;
      left:50%;
      margin-left:-4rem;
      margin-top:-5rem;
    }
  }
  .sendCard{
    width: 5rem;
    font-size: 1.6rem;
    position: fixed;
    top:-5.5rem;
    z-index: 999;
    right:0;
    color:white;
  }
  .up_mask{
    width: 5rem;
    position: absolute;
    top:-6.5rem;
    z-index: 1999;
     background: linear-gradient(#101013, #2c2d31);
     opacity: .5;
    right:0;
    height: 4rem;
  }
}
</style>
