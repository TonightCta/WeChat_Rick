<!-- 身份认证页 -->
<template lang="html">
  <div class="cer_card">
    <WorkHeader>
      <span>身份认证</span>
    </WorkHeader>
    <div class="" style="margin-top:7rem;">

    </div>
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
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      cardPic:[],//回显列表
      cardFile:[],//上传列表
      isTwo:true,//添加按钮
      upBtn:true,//提交按钮
    }
  },
  watch:{
    cardPic(val,oldVal){
      if(val.length>=2){
        this.isTwo=false;
        this.upBtn=false;
      }else{
        this.isTwo=true;
        this.upBtn=true;
      }
    }
  },
  methods:{
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
    sendCards(){//提交认证数据
      this.$Indicator.open('提交中...');
      setTimeout(()=>{
        this.$Indicator.close();
        this.$Toast('提交成功');
        this.$router.push({
          path:'/mine',
          query:{
            color:4
          }
        })
      },1000)
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
      // animation:myfirst 2s linear infinite;
      //  -webkit-animation:myfirst 2s linear infinite; /* Safari and Chrome */
    }
    // @keyframes myfirst{
    //   0%{top: 7rem;}
    //   50%{top:5rem;}
    //   100%{top:7rem;}
    // }
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
}
</style>
