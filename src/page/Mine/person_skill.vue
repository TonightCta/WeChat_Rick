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
    <div class="skill_con" v-show="showFirst">
      <p>{{first.categoryName}}</p>
      <ul>
        <li v-for="(skillCon,index) in first.skillTagVOList" ref="chooseLabel" @click="turnLabel(index)">
          {{skillCon.name}}
          <span ref="cancellabel" class="cancellabel" @click.stop="noLabel(index)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con" v-show="showSecond">
      <p>{{second.categoryName}}</p>
      <ul>
        <li v-for="(skillCon,indexT) in second.skillTagVOList" ref="chooseLabelSec" @click="turnLabelSec(indexT)">
          {{skillCon.name}}
          <span class="cancellabel" ref="cancellabelSec" @click.stop="noLabelSec(indexT)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con" v-show="showThree">
      <p>{{three.categoryName}}</p>
      <ul>
        <li v-for="(skillCon,indexS) in three.skillTagVOList" ref="chooseLabelThr" @click="turnLabelThr(indexS)">
          {{skillCon.name}}
          <span class="cancellabel" ref="cancellabelThr" @click.stop="noLabelThr(indexS)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con" v-show="showFour">
      <p>{{four.categoryName}}</p>
      <ul>
        <li v-for="(skillCon,indexF) in four.skillTagVOList" ref="chooseLabelFour" @click="turnLabelFour(indexF)">
          {{skillCon.name}}
          <span class="cancellabel" ref="cancellabelFour" @click.stop="noLabelFour(indexF)"></span>
        </li>
      </ul>
    </div>
    <div class="skill_con custom">
      <p>{{cusInn.categoryName}}</p>
      <ul  class="cusTom_add">
        <li v-for="(skillCon,indexC) in cusInn.skillTagVOList" ref="chooseLabelCustom" v-if="hasCustom" @click="turnLabelCustom(indexC)">
          {{skillCon.name}}
          <span class="cancellabel" ref="cancellabelCustom" @click.stop="noLabelCustom(indexC)" style="display:block;"></span>
        </li>
        <li v-for="(skillCon,indexY) in custom.show" ref="chooseLabelCustomLoca" @click="cancelLocaSkill(indexY)">
          {{skillCon}}
          <span class="cancellabel" ref="cancellabelCustomLoca" @click.stop="turnLocaSkill(indexY)" style="display:block;"></span>
        </li>
        <li @click="addSkill()">
          <i class="iconfont icon-icon-test"></i>
        </li>
      </ul>
    </div>
    <div class="custom_mask" @touchmove.prevent v-show="showCustom">

    </div>
    <div class="custom_box" v-show="showCustom" ref="custom_box" @touchmove.prevent>
      <i class="iconfont icon-guanbi" @click="closeCustom()"></i>
      <p class="custom_input">
        <input type="text" name="" value="" placeholder="请输入自定义标签名称" v-model="customText">
      </p>
      <p class="sub_btn">
        <button type="button" name="button" @click="turnCustom()">确定</button>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
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
      four:{},
      firstChoose:[],//第一项选择
      secondChoose:[],//第二项选择
      threeChoose:[],//第三项选择
      fourChoose:[],//第四项选择
      isUpSkill:true,//是否禁用上传按钮
      custom:{
        title:'自定义',
        children:[],
        show:[],
      },
      cusInn:{},//自定义回显列表
      showCustom:false,//新增自定义弹框
      customText:null,//自定义标签文本
      showFirst:true,
      showSecond:true,
      showThree:true,
      showFour:true,
      allSkillsID:[],//全部技能ID
      hasCustom:false,//是否有自定义
    }
  },
  computed:{
    ...mapState(['engSkill'])
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
  created(){
    this.getSkillList()
  },
  mounted(){

  },
  methods:{
    ...mapMutations(['engSkill_fn']),
    turnLabel(index){//first
      this.$refs.chooseLabel[index].style.background='#eb7a1d';
      this.$refs.chooseLabel[index].style.color='white';
      this.$refs.cancellabel[index].style.display='block';
      this.firstChoose.push(this.first.skillTagVOList[index].id);
    },
    noLabel(index){//cancel  first
      this.$refs.chooseLabel[index].style.background='white';
      this.$refs.chooseLabel[index].style.color='black';
      this.$refs.cancellabel[index].style.display='none';
      if(this.firstChoose.indexOf(this.first.skillTagVOList[index].id)>-1){
        this.firstChoose.splice(this.firstChoose.indexOf(this.first.skillTagVOList[index].id),1)
      }
    },
    turnLabelSec(indexT){//second
      this.$refs.chooseLabelSec[indexT].style.background='#eb7a1d';
      this.$refs.chooseLabelSec[indexT].style.color='white';
      this.$refs.cancellabelSec[indexT].style.display='block';
      this.secondChoose.push(this.second.skillTagVOList[indexT].id);
    },
    noLabelSec(indexT){//cancel  second
      this.$refs.chooseLabelSec[indexT].style.background='white';
      this.$refs.chooseLabelSec[indexT].style.color='black';
      this.$refs.cancellabelSec[indexT].style.display='none';
      if(this.secondChoose.indexOf(this.second.skillTagVOList[indexT].id)>-1){
        this.secondChoose.splice(this.secondChoose.indexOf(this.second.skillTagVOList[indexT].id),1)
      }
    },
    turnLabelThr(indexS){//three
      this.$refs.chooseLabelThr[indexS].style.background='#eb7a1d';
      this.$refs.chooseLabelThr[indexS].style.color='white';
      this.$refs.cancellabelThr[indexS].style.display='block';
      this.threeChoose.push(this.three.skillTagVOList[indexS].id);
    },
    noLabelThr(indexS){//cancel  three
      this.$refs.chooseLabelThr[indexS].style.background='white';
      this.$refs.chooseLabelThr[indexS].style.color='black';
      this.$refs.cancellabelThr[indexS].style.display='none';
      if(this.threeChoose.indexOf(this.three.skillTagVOList[indexS].id)>-1){
        this.threeChoose.splice(this.threeChoose.indexOf(this.three.skillTagVOList[indexS].id),1)
      }
    },
    turnLabelFour(indexF){//four
      this.$refs.chooseLabelFour[indexF].style.background='#eb7a1d';
      this.$refs.chooseLabelFour[indexF].style.color='white';
      this.$refs.cancellabelFour[indexF].style.display='block';
      this.fourChoose.push(this.four.skillTagVOList[indexF].id);
    },
    noLabelFour(indexF){//cancel  four
      this.$refs.chooseLabelFour[indexF].style.background='white';
      this.$refs.chooseLabelFour[indexF].style.color='black';
      this.$refs.cancellabelFour[indexF].style.display='none';
      if(this.fourChoose.indexOf(this.four.skillTagVOList[indexF].id)>-1){
        this.fourChoose.splice(this.fourChoose.indexOf(this.four.skillTagVOList[indexF].id),1)
      };
    },
    noLabelCustom(indexC){//cancel custom
      this.$refs.cancellabelCustom[indexC].style.display='none';
      this.$refs.chooseLabelCustom[indexC].style.background='white';
      this.$refs.chooseLabelCustom[indexC].style.color='black';
      if(this.allSkillsID.indexOf(this.cusInn.skillTagVOList[indexC].id)>-1){
        this.allSkillsID.splice(this.allSkillsID.indexOf(this.cusInn.skillTagVOList[indexC].id),1)
      }
    },
    turnLabelCustom(indexC){//custom
      this.$refs.cancellabelCustom[indexC].style.display='block';
      this.$refs.chooseLabelCustom[indexC].style.background='#eb7a1d';
      this.$refs.chooseLabelCustom[indexC].style.color='white';
      this.allSkillsID.push(this.cusInn.skillTagVOList[indexC].id);
    },
    turnLocaSkill(indexY){//loca custom
      this.$refs.chooseLabelCustomLoca[indexY].style.background='white';
      this.$refs.chooseLabelCustomLoca[indexY].style.color='black';
      this.$refs.cancellabelCustomLoca[indexY].style.display='none';
      this.custom.children.splice(indexY,1);
    },
    cancelLocaSkill(indexY){//cancel loca custom
      this.$refs.chooseLabelCustomLoca[indexY].style.background='#eb7a1d';
      this.$refs.chooseLabelCustomLoca[indexY].style.color='white';
      this.$refs.cancellabelCustomLoca[indexY].style.display='block';
      this.custom.children.push(this.custom.show[indexY]);
    },
    upSkill(){//保存选择技能
      let _vm=this;
      let formdata=new FormData();
      let userID=window.localStorage.getItem('engID');
      _vm.$Indicator.open()
      _vm.firstChoose.forEach((f)=>{
        _vm.allSkillsID.push(f)
      });
      _vm.secondChoose.forEach((s)=>{
        _vm.allSkillsID.push(s)
      });

      _vm.threeChoose.forEach((t)=>{
        _vm.allSkillsID.push(t)
      });
      _vm.fourChoose.forEach((e)=>{
        _vm.allSkillsID.push(e)
      });
      formdata.append('engineerId',userID);
      formdata.append('skillTagIds',_vm.allSkillsID);
      if(_vm.custom.children.length>0){
        formdata.append('skillTagNames',_vm.custom.children)
      };
      _vm.$axios.post(_vm.oUrl+'/engineerSelectSkillTag',formdata).then((res)=>{
        if(res.data.code==0){
          window.localStorage.setItem('engID',res.data.data.id)
          window.localStorage.setItem('phone',res.data.data.phone);
          _vm.engSkill_fn(res.data.data);
          _vm.$Toast('上传技能成功');
          _vm.$router.go(-1);
          _vm.$Indicator.close()
        }else{
          _vm.$Toast(res.data.msg)
          _vm.$Indicator.close()
        }
      }).catch((err)=>{
        _vm.$Toast('未知异常,请联系管理员')
        _vm.$Indicator.close()
        console.log(err)
      })
      // this.$Toast('上传选中技能')
    },
    addSkill(){//添加自定义技能
      let _vc=this;
      _vc.showCustom=true;
      setTimeout(()=>{
        _vc.$refs.custom_box.style.top='60%';
        _vc.$refs.custom_box.style.opacity='1';
      },10)
    },
    closeCustom(){//关闭自定义弹框
      this.$refs.custom_box.style.top='40%';
      this.$refs.custom_box.style.opacity='0';
      setTimeout(()=>{
        this.showCustom=false;
      },300);
      this.customText=null;
    },
    turnCustom(){//确定添加自定义标签
      if(this.customText==null||this.customText==''){
        this.$Toast('请输入自定义标签名称')
      }else{
        this.$refs.custom_box.style.top='40%';
        this.$refs.custom_box.style.opacity='0';
        setTimeout(()=>{
          this.showCustom=false;
        },300);
        this.custom.children.push(this.customText);
        this.custom.show.push(this.customText);
        console.log(this.custom.children)
        setTimeout(()=>{
          this.customText=null;
        },100)
      }
    },
    getSkillList(){//获取技能列表
      let _vm=this;
      _vm.$Indicator.open()
      let userID=window.localStorage.getItem('engID');
      _vm.$axios.get(_vm.oUrl+'/skillTag/skillTagListInfoForMobileView?engineerId='+userID).then((res)=>{
        if(res.data.code==0){
          _vm.$Indicator.close()
          _vm.first=res.data.data.skillTagList[0];
          _vm.second=res.data.data.skillTagList[1];
          _vm.three=res.data.data.skillTagList[2];
          _vm.four=res.data.data.skillTagList[3];
          if(res.data.data.skillTagList[4]){
            _vm.cusInn=res.data.data.skillTagList[4];
            if(this.engSkill.skillTagIds!=null){
              _vm.cusInn.skillTagVOList.forEach((e)=>{
                if(this.engSkill.skillTagIds.indexOf(e.id)>-1){
                  _vm.allSkillsID.push(e.id);
                }
              })
            }
            _vm.hasCustom=true;
          }else{
            _vm.hasCustom=false;
          }
          if(_vm.first.skillTagVOList==null){
            _vm.showFirst=false;
          }else if(_vm.second.skillTagVOList==null){
            _vm.showSecond=false;
          }else if(_vm.three.skillTagVOList==null){
            _vm.showThree=false;
          }else if(_vm.four.skillTagVOList==null){
            _vm.showFour=false;
          };
          setTimeout(()=>{
            if(this.engSkill.skillTagIds!=null){
              for(let i in this.engSkill.skillTagIds){
                //第一组对比
                if(_vm.first!=null){
                  for(let x in this.first.skillTagVOList){
                    if(this.first.skillTagVOList[x].id===this.engSkill.skillTagIds[i]){
                      this.$refs.chooseLabel[x].style.background='#eb7a1d';
                      this.$refs.chooseLabel[x].style.color='white';
                      this.$refs.cancellabel[x].style.display='block';
                      this.firstChoose.push(this.first.skillTagVOList[x].id);
                    }
                  };
                }
                //第二组对比
                if(_vm.second!=null){
                  for(let y in this.second.skillTagVOList){
                    if(this.second.skillTagVOList[y].id===this.engSkill.skillTagIds[i]){
                      this.$refs.chooseLabelSec[y].style.background='#eb7a1d';
                      this.$refs.chooseLabelSec[y].style.color='white';
                      this.$refs.cancellabelSec[y].style.display='block';
                      this.secondChoose.push(this.second.skillTagVOList[y].id);
                    }
                  };
                }
                //第三组比对
                if(_vm.three!=null){
                  for(let a in this.three.skillTagVOList){
                    if(this.three.skillTagVOList[a].id===this.engSkill.skillTagIds[i]){
                      this.$refs.chooseLabelThr[a].style.background='#eb7a1d';
                      this.$refs.chooseLabelThr[a].style.color='white';
                      this.$refs.cancellabelThr[a].style.display='block';
                      this.threeChoose.push(this.three.skillTagVOList[a].id);
                    }
                  };
                };
                //第四组对比
                if(_vm.four!=null){
                  for(let p in this.four.skillTagVOList){
                    if(this.four.skillTagVOList[p].id===this.engSkill.skillTagIds[i]){
                      this.$refs.chooseLabelFour[p].style.background='#eb7a1d';
                      this.$refs.chooseLabelFour[p].style.color='white';
                      this.$refs.cancellabelFour[p].style.display='block';
                      this.fourChoose.push(this.four.skillTagVOList[p].id);
                    }
                  };
                };
                //自定义比对
                if(_vm.cusInn!=null){
                  for(let m in this.$refs.cancellabelCustom){
                    this.$refs.cancellabelCustom[m].style.display='none';
                    this.$refs.chooseLabelCustom[m].style.background='white';
                    this.$refs.chooseLabelCustom[m].style.color='black';
                  }
                  setTimeout(()=>{
                    for(let o in this.cusInn.skillTagVOList){
                      if(this.cusInn.skillTagVOList[o].id===this.engSkill.skillTagIds[i]){
                        this.$refs.cancellabelCustom[o].style.display='block';
                        this.$refs.chooseLabelCustom[o].style.background='#eb7a1d';
                        this.$refs.chooseLabelCustom[o].style.color='white';
                      }
                    };
                  })

                }
              }
            }
          })
        }else{
          _vm.$Indicator.close()
          _vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$Toast('未知异常,请联系管理员')
        _vm.$Indicator.close()
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.person_skill{
  padding-top: 5rem;
  position: relative;
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
  .custom{
    border-bottom:0;
    li{
        background: #eb7a1d;
        color:white;
        .cancellabel{
          display: block;
          z-index: 10;
        }
    }
    li:last-child{
      width: 2.5rem;
      background: white;
      color:#eb7a1d;
    }
  }
  .custom_mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,.5);
    z-index: 999;
  }
  .custom_box{
    width: 70%;
    height: 14rem;
    background: white;
    position: absolute;
    border-radius:8px;
    top:40%;
    left:50%;
    margin-left: -35%;
    margin-top: -7rem;
    z-index: 1000;
    transition: .3s all;
    opacity: 0;
    overflow-y: hidden;
    i{
      color:#eb7a1d;
      position: absolute;
      right:.5rem;
      top:.5rem;
      font-size: 1.8rem;
    }
    .custom_input{
      width: 100%;
      height: 3.5rem;
      margin-top: 4rem;
      box-sizing: border-box;
      padding-bottom: .5rem;
      text-align: center;
      input{
        display: inline-block;
        width:80%;
        margin:0 auto;
        height:3.5rem;
        text-align: center;
        border-bottom:1px solid #ccc;
        font-size: 1.4rem;
        border-radius: 0;
      }
    }
    .sub_btn{
      width: 100%;
      height: 4rem;
      background: blue;
      margin-top: 2rem;
      button{
        width: 100%;
        height: 100%;
        text-align: center;
        background: white;
        font-size: 1.5rem;
        color:#eb7a1d;
      }
    }
  }
}

</style>
