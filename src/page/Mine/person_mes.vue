<!-- 用户资料展示/修改页面 -->
<template lang="html">
  <div class="person_mes">
    <WorkHeader>
      <span>个人信息</span>
    </WorkHeader>
    <div class="person_con">
      <ul class="mes_list">
        <li>
          <img src="../../../static/img/mes_number.png" alt="">
          <span>登录&nbsp;&nbsp;ID:</span>
          <span>
            <input type="text" v-model="userId" name="" value="">
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_location.png" alt="">
          <span>服务范围:</span>
          <span>
            <input type="text" v-model="choseTurn" name="" value=""
            placeholder="请输入您的工作地址"
             style="width:85%"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
          <span class="choseVince" v-show="!disabled" @click="choseVins()"></span>
        </li>
        <li>
          <img src="../../../static/img/mes_person.png" alt="">
          <span>身份认证:</span>
          <span>
            <input type="text"  v-model="userCard" name="" value=""
            placeholder="请输入您的身份证号"
            >
            <span class="mes_mask" v-show="true"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_skills.png" alt="">
          <span>技能认证:</span>
          <span>
            <input type="text" v-model="userSkill" name="" value="">
            <span class="mes_mask" v-show="true"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_date.png" alt="">
          <span>工作年限:</span>
          <span>
            <input type="number" @blur="mesClear" v-model="userDate" name="" value=""
            placeholder="单位：年" oninput="this.value=this.value.replace(/[^0-9.]+/,'');"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
          <!-- <font v-show="isTime">年</font> -->

        </li>
        <li>
          <img src="../../../static/img/mes_email.png" alt="">
          <span>电子邮箱:</span>
          <span class="aaaaa">
            <input type="text" @blur="mesClear" v-model="userEmail" name="" value=""
            placeholder="请输入您的邮箱地址"
            >
            <span class="mes_mask" v-show="disabled"></span>
          </span>
        </li>
        <li>
          <img src="../../../static/img/mes_phone.png" alt="">
          <span>联系电话:</span>
          <span>
            <input type="number" @blur="mesClear" v-model="userPhone" name="" value=""
            placeholder="请输入您的联系电话"
            >
            <span class="mes_mask" v-show="true"></span>
          </span>
        </li>
      </ul>
      <p class="saveMes" @click="saveMes()">
        <button type="button" name="button" v-show="!disabled">保存</button>
      </p>
    </div>
    <div class="locaBox" ref="locaBox">
      <p class="locaBox_title">
        <span @click="cancelChose()">取消</span>
        <span @click="turnChose()">确认</span>
      </p>
      <input type="text" name="" value="" v-model="choseTurn">
      <input type="text" name="" value="" v-model="choseText">
      <span class="text_mask"></span>
      <div class="localist">
        <ul class="loca_vince">
          <li v-for="(item,index) in cityList"
          @click="choseInV(index)"
          ref="InV"
          >
          {{item.name}}</li>
        </ul>
        <ul class="loca_city">
          <li ref="allchose">
            <p @click="allChose()">全选</p>
            <span class="cityMask" ref="allicon" @click="cancelAll()">
              <i class="iconfont icon-xuanzhong"></i>
            </span>
          </li>
          <li v-for="(itemlea,index) in delArr"
          ref="city"
          >
          <p @click="choseCity(index)" >{{itemlea.name}}</p>
          <span class="cityMask" @click="delCity(index)">
            <i class="iconfont icon-xuanzhong"></i>
          </span>
        </li>
      </ul>
      </div>
    </div>
    <div class="locaMask" @touchmove.prevent v-show="showloca" ref="locaMask"  @click="cancelChose()">

    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
import {downIOS} from '@/assets/js/default'
export default {
  data(){
    return{
      disabled:true,//是否禁用输入框
      userId:'-',//用户ID
      userPass:'-',//用户密码
      userLoca:'-',//用户工作地址
      userCard:'-',//用户身份认证
      userSkill:'-',//用户技能认证
      userDate:'',//用户工作年限
      userEmail:'',//用户邮箱
      userPhone:'',//用户联系电话
      placeArr:[],
      delArr:[],
      showloca:false,
      choseText:'-',
      choseTurn:'-',
      choseVal:null,//当前选择的省份
      isAll:[],//是否全选
      cityID:[],//城市ID
      proID:0,//省份ID
      showPl:[],//回显地址
      cityList:[],
      a:[],//数据暂存数组
      b:[],//数据暂存数组2
      isTime:false,//年限是否为空
      mesClear:downIOS
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    this.getLocation();//获取地址
    // if(this.userDate.length>1){
    //   this.isTime=true;
    // }else{
    //   this.isTime=false
    // }
    this.disabled=this.$route.query.isDis;
    if(this.userMes.name){//登录ID
      this.userId=this.userMes.name;
    }
    if(this.userMes.engineerVO.childPlaces.length>0){//服务地址
      let locaList=this.userMes.engineerVO.childPlaces;
      for(let i in locaList){
        let subLoca=locaList[i].parentPlace.name+'-'+locaList[i].name;
      }
    };
    setTimeout(()=>{
      if(this.userMes.engineerVO){//身份认证
        if(this.userMes.engineerVO.state==0){
          this.userCard='未认证'
        }else if(this.userMes.engineerVO.state==1){
          this.userCard='认证中'
        }else if(this.userMes.engineerVO.state==2){
          this.userCard='已认证'
        }
      };
    })
    if(this.userMes.engineerVO){
      if(this.userMes.engineerVO.childPlaces.length>0){
        for (let a in this.userMes.engineerVO.childPlaces){
          this.showPl.push(this.userMes.engineerVO.childPlaces[a].parentPlace.name+'-'+this.userMes.engineerVO.childPlaces[a].name);
        }
        this.choseTurn=this.showPl.join('/');
      }
    }
    if(this.userMes.engineerVO.levels.length>0){//技能认证
      let delList=this.userMes.engineerVO.levels;
      for(let x in delList){
        let subDel=delList[x].technology.name+'-'+delList[x].name;
        this.delArr.push(subDel)
      };
      this.userSkill=this.delArr.splice(0,2).join('/')+'...'
    };
    if(this.userMes.engineerVO.workYear){//工作年限
      this.userDate=this.userMes.engineerVO.workYear;
    };
    if(this.userMes.email){//用户邮箱
      this.userEmail=this.userMes.email;
    };
    if(this.userMes.mobile){//用手电话
      this.userPhone=this.userMes.mobile
    };
  },
  watch:{
    // userDate(val,oldVal){
    //   if(val.length>1){
    //     this.isTime=true;
    //   }else{
    //     this.isTime=false
    //   }
    // }
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    getLocation(){//获取服务地址
      let _vm=this;
      _vm.$axios.get(_vm.oUrl+'/mobile/getUsingPlaceList?engineerId='+_vm.userMes.engineerVO.id).then((res)=>{
        if(res.data.code==0){
          _vm.cityList=res.data.data.placeList;
          _vm.delArr=_vm.cityList[0].usingChildList;
          _vm.choseVal=_vm.cityList[0].name;
          let b=[];//存放是全选状态
          _vm.delArr.forEach((c)=>{
            _vm.a.push(c.id);
            b.push(c.selected)
          });
          if(b.indexOf(false)>=0){
            console.log(1)
          }else{
            _vm.isAll.push(_vm.choseVal);
            _vm.isAll.forEach((x)=>{
              if(_vm.choseVal===x){
                _vm.$refs.allchose.style.color='#eb7a1d';
                _vm.$refs.allicon.style.display='block';
              }else{
                _vm.$refs.allchose.style.color='black';
                _vm.$refs.allicon.style.display='none';
              }
            });
          }
          _vm.cityList.forEach((cityL)=>{
            cityL.usingChildList.forEach((x)=>{
              if(x.selected){
                _vm.cityID.push(x.id);
              }
            })
          });
          _vm.b.push(_vm.cityList[0].usingChildList[0].id)
          setTimeout(()=>{
            _vm.cityID.forEach((s)=>{
              let c=_vm.b.indexOf(s);
              if(c>=0){
                _vm.$refs.city[c].style.color='#eb7a1d';
                _vm.$refs.city[c].children[1].style.display='block';
              }else{
                return
              }
            })
          })
        }else{
          _vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$Toast('未知错误')
        console.log(err)
      })
    },
    saveMes(){//保存信息
      let _vm=this;
      if(_vm.userDate==''){
        _vm.$Toast('请输入工作年限')
      }else if(_vm.userEmail==''){
        _vm.$Toast('请输入您的邮箱')
      }else if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.userEmail))){
        _vm.$Toast('请输入正确的邮箱格式')
      }else if(_vm.userPhone.length<11){
        _vm.$Toast('请输入正确的手机号')
      }else if(_vm.cityID.length<1){
        _vm.$Toast('请选择至少一个地址')
      }else{
        this.$Indicator.open();
        let _vm=this;
        let formData=new FormData();
        formData.append('id',_vm.userMes.engineerVO.id);
        formData.append('workYear',_vm.userDate);
        formData.append('email',_vm.userEmail);
        for(let i in _vm.cityID){
          formData.append('placeIds',_vm.cityID[i]);
        }
        _vm.$axios.post(_vm.oUrl+'/mobile/editEngineer',formData).then((res)=>{
          if(res.data.code==0){
            _vm.userMes_fn(res.data.data);
              _vm.$Indicator.close();
              _vm.$Toast('保存成功');
              _vm.$router.go(-1)
          }else{
            _vm.$Indicator.close();
            _vm.$Toast(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$Indicator.close();
          console.log(err)
          _vm.$Toast('未知错误')
        })
      }
    },
    choseVins(){//地址选择
      this.showloca=true;
      this.$refs.locaBox.style.bottom='0'
      setTimeout(()=>{
        this.$refs.locaMask.style.opacity='0.8'
      })

    },
    cancelChose(){//取消选择
      this.$refs.locaMask.style.opacity='0'
      this.$refs.locaBox.style.bottom='-100%'
      setTimeout(()=>{
        this.showloca=false;
      })
    },
    choseInV(index){//选择省份
      let _vm=this;
      _vm.a=[]//暂存数据
      _vm.$refs.allchose.style.color='black';
      _vm.$refs.allicon.style.display='none';
      _vm.proID=index;
      for(let i in _vm.$refs.InV){
        _vm.$refs.InV[index].style.color='#eb7a1d'
        _vm.$refs.InV[i].style.color='black';
      };
      _vm.delArr=_vm.cityList[index].usingChildList;
      let b=[];//存放是全选状态
      _vm.delArr.forEach((c)=>{
        _vm.a.push(c.id);
        b.push(c.selected)
      });
      if(b.indexOf(false)>=0){
        console.log(1)
      }else{
        _vm.isAll.push(_vm.choseVal);
        _vm.isAll.forEach((x)=>{
          if(_vm.choseVal===x){
            _vm.$refs.allchose.style.color='#eb7a1d';
            _vm.$refs.allicon.style.display='block';
          }else{
            _vm.$refs.allchose.style.color='black';
            _vm.$refs.allicon.style.display='none';
          }
        });
      }
      setTimeout(()=>{
        _vm.cityID.forEach((v)=>{
          let b=_vm.a.indexOf(v);
          if(b>=0){
            _vm.$refs.city[b].style.color='#eb7a1d';
            _vm.$refs.city[b].children[1].style.display='block';
          }else{
            return
          }
        })
      })
      _vm.choseVal=_vm.cityList[index].name;
      _vm.$refs.city.forEach((e)=>{
        e.style.color='black';
        e.children[1].style.display='none'
      })
      setTimeout(()=>{
        _vm.placeArr.forEach((e)=>{
          let indexV=[];
          let a=[];
          _vm.delArr.forEach((i)=>{
            a.push(i.name);
            if(a.indexOf(_vm.getCaption(e))!=-1){
              _vm.$refs.city[a.indexOf(_vm.getCaption(e))].children[1].style.display='block'
              _vm.$refs.city[a.indexOf(_vm.getCaption(e))].style.color='#eb7a1d'
            }
          })
        });
      });
    },
    getCaption(obj){
        var index=obj.lastIndexOf("\-");
        obj=obj.substring(index+1,obj.length);
        return obj;
    },
    choseCity(index){//选择城市
      let _vm=this;
      _vm.placeArr.push(_vm.choseVal+'-'+_vm.delArr[index].name);
      setTimeout(()=>{
        _vm.cityID.push(_vm.cityList[_vm.proID].usingChildList[index].id);
      });
      _vm.showPl.push(_vm.choseVal+'-'+_vm.delArr[index].name);
      _vm.choseText=_vm.placeArr.join('/');
      _vm.choseTurn=_vm.showPl.join('/');
      _vm.$refs.city[index].style.color='#eb7a1d';
      _vm.$refs.city[index].children[1].style.display='block';
    },
    delCity(index){//删除当前选中
      let _vm=this;
      let indexT=_vm.placeArr.indexOf(_vm.choseVal+'-'+_vm.delArr[index].name);
      _vm.placeArr.splice(indexT,1);
      let indexE=_vm.showPl.indexOf(_vm.choseVal+'-'+_vm.delArr[index].name);
      if(indexE>=0){
        _vm.showPl.splice(indexE,1);
        _vm.choseTurn=_vm.showPl.join('/');
      }
      let indexID=_vm.cityID.indexOf(_vm.cityList[_vm.proID].usingChildList[index].id);
      _vm.cityID.splice(indexID,1);
      _vm.choseText=_vm.placeArr.join('/');
      _vm.$refs.city[index].children[1].style.display='none';
      _vm.$refs.city[index].style.color='black';
    },
    allChose(){//全选
      this.$refs.allchose.style.color='#eb7a1d';
      this.$refs.allicon.style.display='block';
      this.$refs.city.forEach((e)=>{
        e.style.color='#eb7a1d';
        e.children[1].style.display='block';
      });
      this.delArr.forEach((y)=>{
        let indexD=this.placeArr.indexOf(this.choseVal+'-'+y.name);
        this.placeArr.splice(indexD,1);
        setTimeout(()=>{
          this.placeArr.push(this.choseVal+'-'+y.name);
          this.showPl.push(this.choseVal+'-'+y.name)
          this.choseText=this.placeArr.join('/');
          this.choseTurn=this.showPl.join('/');
        })
      });
      this.delArr.forEach((i)=>{
        this.cityID.push(i.id);
      })
      this.isAll.push(this.choseVal);
    },
    cancelAll(){//取消全选
      let _vm=this;
      _vm.$refs.allchose.style.color='black';
      _vm.$refs.allicon.style.display='none';
      for(let l in this.isAll){
        let indexI=this.isAll.indexOf(this.choseVal);
        this.isAll.splice(indexI,1);
      }
      _vm.$refs.city.forEach((i)=>{
        i.style.color='black';
        i.children[1].style.display='none';
      });
      _vm.delArr.forEach((r)=>{
        let indexT=_vm.placeArr.indexOf(_vm.choseVal+'-'+r.name)
        let indexPc=_vm.showPl.indexOf(_vm.choseVal+'-'+r.name);
        _vm.placeArr.splice(indexT,1)
        _vm.showPl.splice(indexPc,1)
        this.choseText=this.placeArr.join('/');
        this.choseTurn=this.showPl.join('/');
      });
      let arr=[];
      _vm.delArr.forEach((c)=>{
        arr.push(c.id)
      });
      arr.forEach((x)=>{
        let indexDel=_vm.cityID.indexOf(x);
        _vm.cityID.splice(indexDel,1);
      });
    },
    turnChose(){//确认选中
      this.$refs.locaMask.style.opacity='0'
      this.$refs.locaBox.style.bottom='-100%'
      if(this.choseTurn==='-'){
        this.choseTurn=this.choseText
      }
      setTimeout(()=>{
        this.showloca=false;
      })
    },
    //禁止页面滑动
    stop(){
      document.body.addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
      }, {passive: false})
    },
    //取消禁止页面滑动
    move(){
      document.body.addEventListener('touchmove', function (e) {
          e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
      }, {passive: true})
    }
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.person_mes{
  position: relative;
  padding-bottom: 4rem;
}
.personBor{
  border-bottom:1px solid #999;
}
.person_con{
  width: 92%;
  margin:0 auto;
  margin-top:6rem;
  .mes_list{
    width: 100%;
    li{
      width: 100%;
      height: 5rem;
      margin-bottom:1.5rem;
      background: white;
      box-shadow: 0px 0px 30px #999;
      border-radius: 8px;
      box-sizing: border-box;
      padding-left: 2rem;
      padding-top:.8rem;
      position: relative;
      overflow-y: hidden;
      img{
        width: 3.5rem;
        height: 3.5rem;
      }
      span{
        height: 5rem;
        position: absolute;
        top:0;
        line-height: 5.2rem;
        font-size: 1.2rem;
        left:6.5rem;
      }
      .mes_mask{
        width: 100%;
        height: 100%;
        position: absolute;
        background: black;
        opacity: 0;
        left:8%;
      }
      .choseVince{
        width: 100%;
        height: 100%;
        position: absolute;
        background: black;
        opacity: 0;
        left:0;
      }
      input{
        width:80%;
        margin-left: 5.5rem;
        background: white;
        outline: none;
      }
    }
    li:nth-child(1){
      margin-top:1.5rem;
    }
    li:nth-child(5){
      position: relative;
      font{
        display: inline-block;
        position: absolute;
        top:50%;
        margin-top:-.7rem;
        font-size: 1.2rem;
        left:45%;
        color:#666;
      }
    }
  }
  .saveMes{
    position: absolute;
    bottom:0rem;
    width: 92%;
    button{
      width: 100%;
      height:3.5rem;
      border-radius: 10px;
      background: #eb7a1d;
      color:white;
    }
  };

}
.locaBox{
  width: 100%;
  height: 50%;
  background: white;
  position: fixed;
  bottom:-100%;
  transition: 1s all;
  z-index: 100;
  .locaBox_title{
    width: 100%;
    height: 3rem;
    // background: red;
    line-height: 3rem;
    display: flex;
    border-bottom:1px solid #ccc;
    span{
      display: inline-block;
      width: 50%;
      font-size: 1.4rem;
      padding-left:3rem;
      padding-right:3rem;
    }
    span:nth-child(2){
      text-align: right;
      color:#eb7a1d;
    }
  }
  input{
    width: 100%;
    height: 3.5rem;
    padding-left:1rem;
    border-bottom:1px solid #ccc;
  }
  .text_mask{
    width: 100%;
    height: 3.8rem;
    position: absolute;
    top:3rem;
    left:0;
  }
  .localist{
    width: 100%;
    // overflow-y: auto;
    height: 100%;
    display: flex;
    ul{
      height: 100%;
      overflow-y: auto;
      li{
        height: 3.5rem;
        font-size: 1.3rem;
        text-align: center;
        line-height:3.5rem;
      }
    }
    .loca_vince{
      width: 25%;
      padding-bottom: 10rem;
      overflow: auto;
      box-sizing: border-box;
      border-right:1px solid #ccc;
      li:nth-child(1){
        color:#eb7a1d;
      }
    }
    .loca_city{
      width: 75%;
      li{
        position: relative;
        .cityMask{
          position: absolute;
          width: 100%;
          height:100%;
          background: rgba(0,0,0,0);
          position: absolute;
          top:0;
          left:0;
          display: none;
          i{
            font-size: 1.2rem;
            font-weight: bold;
            color:#eb7a1d;
            position: absolute;
            right:3rem;
          }
        }
      }
    }
  }
}
.locaMask{
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0,0,0,.5);
  top:0;
  left:0;
  z-index: 10;
  transition: 1s all;
}

</style>
