<!-- 技能选择 -->
<template lang="html">
  <div class="person_skill">
    <WorkHeader>
      <span>擅长领域</span>
    </WorkHeader>
    <p class="subSkill">
      <span @click="upSkill()">提交</span>
      <span class="subMask" v-show="isUpSkill"></span>
    </p>
    <div class="skill_con">
      <p>{{first.title}}</p>
      <ul>
        <li v-for="(skillCon,index) in first.children" ref="chooseLabel" @click="turnLabel(index)">
          {{skillCon.name}}
          <span ref="cancellabel" class="cancellabel" @click.stop="noLabel(index)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con">
      <p>{{second.title}}</p>
      <ul>
        <li v-for="(skillCon,indexT) in second.children" ref="chooseLabelSec" @click="turnLabelSec(indexT)">
          {{skillCon.name}}
          <span class="cancellabel" ref="cancellabelSec" @click.stop="noLabelSec(indexT)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con">
      <p>{{three.title}}</p>
      <ul>
        <li v-for="(skillCon,indexS) in three.children" ref="chooseLabelThr" @click="turnLabelThr(indexS)">
          {{skillCon.name}}
          <span class="cancellabel" ref="cancellabelThr" @click.stop="noLabelThr(indexS)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con custom">
      <p>{{custom.title}}</p>
      <ul>
        <li v-for="(skillCon,indexY) in custom.children" ref="chooseLabelThr">
          {{skillCon}}
          <span class="cancellabel" ref="cancellabelThr"></span>
        </li>
        <li @click="addSkill()">
          <i class="iconfont icon-icon-test"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {MessageBox} from 'mint-ui'
export default {
  data(){
    return{
      first:{
        title:'厂商',
        children:[
          {name:'思科',id:0},{name:'华为',id:1},{name:'H3C',id:2},{name:'juniper',id:3},{name:'中兴',id:4},{name:'东软',id:5}
        ]
      },
      second:{
        title:'产品类型',
        children:[
          {name:'路由器',id:0},{name:'交换机',id:1},{name:'安全',id:2},{name:'语音',id:3},{name:'无线',id:4}
        ]
      },
      three:{
        title:'专项技能',
        children:[
          {name:'E1/POS/ATM',id:0},{name:'运营商数通',id:1},{name:'QOS',id:2},{name:'BGP',id:3},{name:'MPLS',id:4}
        ]
      },
      firstChoose:[],//第一项选择
      secondChoose:[],//第二项选择
      threeChoose:[],//第三项选择
      isUpSkill:true,//是否禁用上传按钮
      custom:{
        title:'自定义',
        children:[]
      }
    }
  },
  watch:{
    firstChoose(val,olVal){
      if(val.length>0||this.secondChoose.length>0||this.threeChoose.length>0){
        this.isUpSkill=false;
      }else{
        this.isUpSkill=true;
      }
    },
    secondChoose(val,oldVal){
      if(val.length>0||this.firstChoose.length>0||this.threeChoose.length>0){
        this.isUpSkill=false;
      }else{
        this.isUpSkill=true;
      }
    },
    threeChoose(val,oldVal){
      if(val.length>0||this.firstChoose.length>0||this.secondChoose.length>0){
        this.isUpSkill=false;
      }else{
        this.isUpSkill=true;
      }
    }
  },
  components:{
    WorkHeader
  },
  methods:{
    turnLabel(index){//first
      this.$refs.chooseLabel[index].style.background='#eb7a1d';
      this.$refs.chooseLabel[index].style.color='white';
      this.$refs.cancellabel[index].style.display='block';
      this.firstChoose.push(this.first.children[index].id);
    },
    noLabel(index){//cancel  first
      this.$refs.chooseLabel[index].style.background='white';
      this.$refs.chooseLabel[index].style.color='black';
      this.$refs.cancellabel[index].style.display='none';
      if(this.firstChoose.indexOf(this.first.children[index].id)>-1){
        this.firstChoose.splice(this.firstChoose.indexOf(this.first.children[index].id),1)
      }
    },
    turnLabelSec(indexT){//second
      this.$refs.chooseLabelSec[indexT].style.background='#eb7a1d';
      this.$refs.chooseLabelSec[indexT].style.color='white';
      this.$refs.cancellabelSec[indexT].style.display='block';
      this.secondChoose.push(this.second.children[indexT].id);
    },
    noLabelSec(indexT){//cancel  second
      this.$refs.chooseLabelSec[indexT].style.background='white';
      this.$refs.chooseLabelSec[indexT].style.color='black';
      this.$refs.cancellabelSec[indexT].style.display='none';
      if(this.secondChoose.indexOf(this.second.children[indexT].id)>-1){
        this.secondChoose.splice(this.secondChoose.indexOf(this.second.children[indexT].id),1)
      }
    },
    turnLabelThr(indexS){//three
      this.$refs.chooseLabelThr[indexS].style.background='#eb7a1d';
      this.$refs.chooseLabelThr[indexS].style.color='white';
      this.$refs.cancellabelThr[indexS].style.display='block';
      this.threeChoose.push(this.three.children[indexS].id);
    },
    noLabelThr(indexS){//cancel  three
      this.$refs.chooseLabelThr[indexS].style.background='white';
      this.$refs.chooseLabelThr[indexS].style.color='black';
      this.$refs.cancellabelThr[indexS].style.display='none';
      if(this.threeChoose.indexOf(this.three.children[indexS].id)>-1){
        this.threeChoose.splice(this.threeChoose.indexOf(this.three.children[indexS].id),1)
      }
    },
    upSkill(){
      this.$Toast('上传选中技能')
    },
    addSkill(){//添加自定义技能
      let _vc=this;
      MessageBox.prompt('请输入自定义技能名称','',{inputValidator:(val)=>{
          if(val==null){
            return false
          }
      },inputErrorMessage: '请输入自定义技能名称'}).then(({ value, action }) => {
        _vc.custom.children.push(value)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.person_skill{
  padding-top: 5rem;
  .subSkill{
    width: 5rem;
    height: 5rem;
    position: fixed;
    top:0;
    right:0;
    z-index: 999;
    text-align: center;
    line-height: 5rem;
    font-size: 1.6rem;
    color:white;
    .subMask{
      display: inline-block;
      height: 100%;
      width: 100%;
      background: linear-gradient(#101013, #2c2d31);
      opacity: .5;
      position: absolute;
      right:0;
      top:0;
    }
  }
  .skill_con{
    margin-top: 2rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 3rem;
    p{
      width: 100%;
      box-sizing: border-box;
      padding-left: 2rem;
      font-size: 1.7rem;
    }
    ul{
      width: 90%;
      margin:0 auto;
      margin-top:.5rem;
      display: flex;
      flex-wrap: wrap;
      li{
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        height: 3rem;
        margin-left: 2rem;
        text-align: center;
        line-height: 3rem;
        border:1px solid #eb7a1d;
        border-radius:3px;
        font-size: 1.5rem;
        margin-top: 1.5rem;
        position: relative;
        .cancellabel{
          display:inline-block;
          width:100%;
          height:100%;
          background: rgba(0,0,0,0);
          left:0;
          top:0;
          position: absolute;
          display: none;
        }
      }
    }
  }
  .skill_con:last-child{
    border-bottom:0;
  }
  .custom{
    li{
        background: #eb7a1d;
        color:white;
    }
    li:last-child{
      width: 2.5rem;
      background: white;
      color:#eb7a1d;
    }
  }
}

</style>
