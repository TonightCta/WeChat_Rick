<!-- 身份认证页 -->
<template lang="html">
  <div class="cer_card">
    <WorkHeader>
      <span>技能认证</span>
    </WorkHeader>
    <div class="" style="margin-top:7rem;">

    </div>
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
    <p class="sendCard" @click="sendCards()" v-show="upBtn">提交</p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      skillsPic:[],
      skillsFile:[],
      isTwo:true,
      upBtn:false
    }
  },
  watch:{
    skillsPic(val,oldVal){
      console.log(val.length);
      if(val.length>=1){
        this.upBtn=true;
      }else{
        this.upBtn=false
      }
      if(val.length>=4){
        this.isTwo=false;
      }else{
        this.isTwo=true
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
        _this.skillsPic.push(img.src);
      };
      this.skillsFile.push(e.target.files[0]);
    },
    delCard(index){
      this.skillsPic.splice(index,1);
      this.skillsFile.splice(index,1);
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
    background: white;
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
}
</style>
