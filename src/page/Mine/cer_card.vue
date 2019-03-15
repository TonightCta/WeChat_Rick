<!-- 身份认证页 -->
<template lang="html">
  <div class="cer_card">
    <WorkHeader>
      <span>身份认证</span>
    </WorkHeader>
    <div class="" style="margin-top:7rem;">

    </div>
    <ul class="showCardPic">
      <li v-for='(webCardPic,index) in cardWeb'>
        <img :src="oUrl+'/'+webCardPic.fileName" alt="">
        <i class="iconfont icon-guanbi" @click="delWebCard(index)"></i>
      </li>
    </ul>
    <ul class="showCardPic">
      <li v-for='(item,index) in cardPic'>
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
    <p class="card_ins"><span style="color:red;">*</span>请上传清晰身份证正反面照片，并且为 .jpg或.png格式（图片将被等比压缩为260*180大小，长度相近的图片效果更佳）</p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  inject:['reload'],
  data(){
    return{
      cardPic:[],//回显列表
      cardFile:[],//上传列表
      cardWeb:[],//回显列表
      isTwo:true,//添加按钮
      upBtn:true,//提交按钮
    }
  },
  watch:{
    publicLength(val,oldVal){
      if(val>=2){
        this.isTwo=false;
        this.upBtn=false;
      }else{
        this.isTwo=true;
        this.upBtn=true;
      }
    }
  },
  computed:{
    ...mapState(['userMes']),
    publicLength(){
      return this.cardPic.length+this.cardWeb.length
    },
  },
  created(){

  },
  mounted(){
    if(this.userMes.engineerVO){
      if(this.userMes.engineerVO.identityFiles.length>=1){
        let  localCertificateFiles=this.userMes.engineerVO.identityFiles;
        this.cardWeb=localCertificateFiles;
        setTimeout(()=>{
          console.log(this.publicLength)
          if(this.publicLength>=2){
            this.isTwo=false;
            this.upBtn=true;
          }else{
            this.isTwo=true;
            this.upBtn=false;
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
        _this.cardPic.push(img.src);
      };
      this.cardFile.push(e.target.files[0]);
    },
    delCard(index){//删除当前选中图片
      this.cardPic.splice(index,1);
      this.cardFile.splice(index,1);
    },
    delWebCard(index){//删除当前已上传认证图片
      let _vm=this;
      if(_vm.userMes.engineerVO.state==0){
        _vm.$Indicator.open('删除中...');
        let formData=new FormData();
        formData.append('id',_vm.cardWeb[index].id);
        formData.append('type','identityFile');
        _vm.$axios.post(_vm.oUrl+'/mobile/deleteEngineerFile',formData).then((res)=>{
          if(res.data.code==0){
            _vm.$Indicator.close();
            _vm.$Toast('删除成功');
            _vm.userMes_fn(res.data.data);
            _vm.reload();
            this.cardWeb=res.data.data.engineerVO.identityFiles;
          }else{
            _vm.$Indicator.close();
            _vm.$Toast(res.data.msg);
          }
        }).catch((err)=>{
          _vm.$Toast('未知错误');
          console.log(err)
        })
      }else{
        _vm.$Toast('当前资料认证中或已认证，如需修改请联系客服')
      }
    },
    sendCards(){//提交认证数据
      let _vm=this;
      _vm.$Indicator.open('提交中...');
      let formData=new FormData();
      formData.append('id',_vm.userMes.engineerVO.id)
      formData.append('identityUploadFiles',_vm.cardFile[0]);
      formData.append('identityUploadFiles',_vm.cardFile[1]);
      _vm.$axios.post(_vm.oUrl+'/mobile/uploadEngineerFile',formData).then((res)=>{
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
    background: url('../../../static/img/card_bg.png');
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
      // z-index: -1;
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
    position: absolute;
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
  .card_ins{
    width: 90%;
    margin:0 auto;
    text-align: justify;
    font-size: 1.4rem;
    color:#666;
    margin-top: 2rem!important;
  }
}
</style>
