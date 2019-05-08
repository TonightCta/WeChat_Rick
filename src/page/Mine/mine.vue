<!-- 个人中心 -->
<template lang="html">
  <div class="mine">
    <!-- 个人资料块 -->
    <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" >
      <div class="" style="magin-bottom:10rem;">
        <div class="person_mes">
          <img src="../../../static/img/user_pic.jpg" alt="" class="person_pic" @click="goMes()">
          <router-link to="/TLogin" tag="p" class="person_oper" @click.native="mineCon()" v-show="didLogin">
            请登录
          </router-link>
          <p class="person_oper" v-show="hasLogin">{{nickName}}</p>
          <div class="person_del">
            <ul>
              <li>
                <span class="iconfont icon-icon-test"></span>
                <span>电话：</span>
                <span>{{userPhone}}</span>
              </li>
              <li>
                <span class="iconfont icon-rili"></span>
                <span>工作年限：</span>
                <span>{{userDate}}年</span>
              </li>
            </ul>
            <p>
              <span class="iconfont icon-mail"></span>
              <span>邮箱：</span>
              <span>{{userEmail}}</span>
            </p>
            <p class="engMes">
              <span class="iconfont icon-renzheng"></span>
              <span>技能认证：</span>
              <span>{{userEng}}</span>
            </p>
            <!-- <span class="iconfont icon-iconfontzhizuobiaozhun023114 y" ref="certColor"></span> -->
            <span class="certIcon" @click="cert()">{{cerText}}</span>
          </div>
        </div>
        <!-- 阴影盒子 -->

        <div class="person_mask">

        </div>

        <!-- 功能块 -->
        <div class="person_work">
          <ul>
            <router-link to="/message" tag="li">
              <i class="iconfont icon-chakan"></i>
              <span class="mine_text">消息中心</span>
              <span class="message_num" v-show="hasMsg">{{msgNum}}</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
            <router-link to="/cerSkill" tag="li">
              <i class="iconfont icon-renzheng"></i>
              <span class="mine_text">技能认证</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
            <router-link to="/cerCard" tag="li">
              <i class="iconfont card_icon icon-shimingrenzheng"></i>
              <span class="mine_text">身份认证</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
            <router-link :to="{path:'/personMes',query:{isDis:false}}" tag="li">
              <i class="iconfont write_icon icon-bianjiziliao"></i>
              <span class="mine_text">编辑资料</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
            <router-link :to="{path:'/order',query:{color:2}}" tag="li">
              <i class="iconfont icon-dingdan"></i>
              <span class="mine_text">我的接单</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
            <router-link to="/workLog" tag="li">
              <i class="iconfont icon-fuwutiaokuan"></i>
              <span class="mine_text">我的日志</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
            <router-link to="/setTing" tag="li">
              <i class="iconfont icon-shezhi"></i>
              <span class="mine_text">设置</span>
              <i class="iconfont forward icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </router-link>
          </ul>
        </div>
      </div>
    </scroller>
    <Footer/>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import { MessageBox } from 'mint-ui'
import Footer from '@/components/footer_wapper'
export default {
  inject:['reload'],
  data(){
    return{
      userPhone:'-',
      userDate:'-',
      userEmail:'-',
      userEng:'-',
      messageTitle:'提示',//操作盒子标题
      messageCon:'请先进行身份认证',//操作盒子内容
      cerText:'点击认证',//认证按钮文本
      pathdyn:null,//跳转地址
      didLogin:true,//未登录
      hasLogin:false,//未登录
      msgNum:null,//未读消息条数
      hasMsg:false,//是否有未读消息
    }
  },
  computed:{
    ...mapState(['userMes']),
    nickName(){
      if(this.userMes.engineerVO){
        return this.userMes.engineerVO.name
      }
    }
  },
  created(){
    this.getMsgNum();
    this.isEx();
  },
  mounted(){
    if(this.userMes.engineerVO){
      this.didLogin=false;
      this.hasLogin=true;
      this.userPhone=this.userMes.engineerVO.phone
      if(this.userMes.engineerVO.state==0){
        this.cerText='点击认证'
      }else if(this.userMes.engineerVO.state==1){
        this.cerText='认证中'
      }else{
        this.cerText='已认证'
      }
    }
    if(this.userMes.email!=null&&this.userMes.email!=''){
      this.userEmail=this.userMes.email
    }
    if(this.userMes.engineerVO){
      if(this.userMes.engineerVO.workYear!=null&&this.userMes.engineerVO.workYear!=''){
        this.userDate=this.userMes.engineerVO.workYear
      }
      if(this.userMes.engineerVO.levelStr!=null&&this.userMes.engineerVO.levelStr!=''){
        this.userEng=this.userMes.engineerVO.levelStr
      }
    };
    let userId=window.localStorage.getItem('Uid');
    if(window.localStorage.getItem('Uid')){
      if(!this.userMes.engineerVO){
        this.$axios.get(this.oUrl+'/mobile/getOperatorInfo?operatorId='+userId).then((res)=>{
          if(res.data.code==0){
            this.userMes_fn(res.data.data);
          }else{
            this.$Toast(res.data.msg)
          }
        }).catch((err)=>{
          console.log(err);
          this.$Toast('未知错误')
        })
      }
    };
  },
  methods:{
    ...mapMutations(['isBackM_fn','isBackT_fn','userMes_fn']),
    isEx(){//是否为外部直接进入个人中心
      if(this.$Grap.isExterna){
        let userId=window.localStorage.getItem('Uid');
        if(window.localStorage.getItem('Uid')){
            this.$axios.get(this.oUrl+'/mobile/getOperatorInfo?operatorId='+userId).then((res)=>{
              if(res.data.code==0){
                this.didLogin=false;
                this.hasLogin=true;
                this.userMes_fn(res.data.data)
                window.localStorage.setItem('engID',res.data.data.engineerVO.id);
                this.userPhone=res.data.data.engineerVO.phone
                if(res.data.data.engineerVO.state==0){
                  this.cerText='点击认证'
                }else if(res.data.data.engineerVO.state==1){
                  this.cerText='认证中'
                }else{
                  this.cerText='已认证'
                }
              if(res.data.data.email!=null&&res.data.data.email!=''){
                this.userEmail=res.data.data.email
              }
              if(res.data.data.engineerVO){
                if(res.data.data.engineerVO.workYear!=null&&res.data.data.engineerVO.workYear!=''){
                  this.userDate=res.data.data.engineerVO.workYear
                }
                if(res.data.data.engineerVO.levelStr!=null&&res.data.data.engineerVO.levelStr!=''){
                  this.userEng=res.data.data.engineerVO.levelStr
                }
              };
              }else{
                this.$Toast(res.data.msg)
              }
            }).catch((err)=>{
              console.log(err);
              this.$Toast('未知错误')
            })
        };
      }
    },
    goMes(){//点击进入个人详情页
      this.$router.push({
        path:'/personMes',
        query:{
          isDis:true
        }
      })
    },
    getMsgNum(){//获取未读消息
        let formdata=new FormData();
        formdata.append('id',this.userMes.id);
        formdata.append('isRead',false);
        this.$axios.post(this.oUrl+'/message/findMessageNumberByOperator',formdata).then((res)=>{
          if(res.data.data>0){
            this.msgNum=res.data.data;
            this.hasMsg=true;
            sessionStorage.setItem('mineMsg',res.data.data);
          }else{
            this.msgNum=null;
            this.hasMsg=false;
            sessionStorage.removeItem('mineMsg')
          }
        }).catch((err)=>{
          console.log(err)
        });
        setTimeout(()=>{
          if(sessionStorage.getItem('mineMsg')){
            this.msgNum=sessionStorage.getItem('mineMsg');
            this.hasMsg=true;
          }
        })
    },
    onRefresh(done){//下拉刷新
      this.getMes()
      setTimeout(()=>{
        done()
      },1000)
    },
    onInfinite(done){
      done()
    },
    mineCon(){//进入登录注册页
      this.isBackM_fn(true);
      this.isBackT_fn(false);
    },
    getMes(){
      let userId=window.localStorage.getItem('Uid');
      if(window.localStorage.getItem('Uid')){
          this.$axios.get(this.oUrl+'/mobile/getOperatorInfo?operatorId='+userId).then((res)=>{
            if(res.data.code==0){
              this.userMes_fn(res.data.data);
              this.didLogin=false;
              this.hasLogin=true;
              this.userPhone=res.data.data.engineerVO.phone
              if(res.data.data.engineerVO.state==0){
                this.cerText='点击认证'
              }else if(res.data.data.engineerVO.state==1){
                this.cerText='认证中'
              }else{
                this.cerText='已认证'
              }
              if(res.data.data.email!=null&&res.data.data.email!=''){
                this.userEmail=res.data.data.email
              }
              if(res.data.data.engineerVO){
                  if(res.data.data.engineerVO.workYear!=null&&res.data.data.engineerVO.workYear!=''){
                    this.userDate=res.data.data.engineerVO.workYear;
                  }
                  if(res.data.data.engineerVO.levelStr!=null&&res.data.data.engineerVO.levelStr!=''){
                    this.userEng=res.data.data.engineerVO.levelStr
                  }
                };
            }else{
              this.$Toast(res.data.msg)
            }
          }).catch((err)=>{
            console.log(err);
            this.$Toast('未知错误')
          })
      }else{
        this.$Toast('请先登录');
      }
    },
    cert(){//申请认证
      let _this=this;
      let beLing=_this.userMes.engineerVO
      if(!_this.userMes.engineerVO){
        _this.$Toast('请先登录');
        _this.$router.push('/Tlogin')
      }else if(beLing.identifyState==0){
        MessageBox({
          message:'当前未进行资料完善，是否前往？',
          confirmButtonText:'前往',
          cancelButtonText:'取消',
          showCancelButton:true
        }).then(action => {
          if(action=='confirm'){
            _this.$router.push({
              path:'/personMes',
              query:{
                isDis:false
              }
            })
          }
        }).catch(err=>{
          if(err=='cancel'){
            console.log(err)
          }
        })
      }else if(beLing.identifyState==1){
        MessageBox({
          message:'当前未进行身份认证，是否前往？',
          confirmButtonText:'前往',
          cancelButtonText:'取消',
          showCancelButton:true
        }).then(action => {
          if(action=='confirm'){
            _this.$router.push('/cerCard')
          }
        }).catch(err=>{
          if(err=='cancel'){
            console.log(err)
          }
        })
      }else if(beLing.identifyState==2){
        MessageBox({
          message:'当前未进行技能认证，是否前往？',
          confirmButtonText:'前往',
          cancelButtonText:'取消',
          showCancelButton:true
        }).then(action => {
          if(action=='confirm'){
            _this.$router.push('/cerSkill')
          }
        }).catch(err=>{
          if(err=='cancel'){
            console.log(err)
          }
        })
      }else if(beLing.identifyState==3){
        let formData=new FormData();
        formData.append('id',_this.userMes.engineerVO.id);
        _this.$axios.post(_this.oUrl+'/mobile/externalEngineerApply',formData).then((res)=>{
          if(res.data.code==0){
            _this.messageTitle=res.data.data.title;
            _this.messageCon=res.data.data.con;
            this.userMes_fn(res.data.data);
            if(res.data.data.engineerVO.state==0){
              this.$Toast(res.data.data.engineerVO.identifyMsg)
            }else if(res.data.data.engineerVO.state==1){
              this.$Toast('已申请认证，请等待')
            }else{
              this.$Toast('您已完成认证')
            }
          }else{
            _this.$Toast(res.data.msg)
          }
          _this.reload();
        }).catch((err)=>{
          _this.$Toast('未知错误')
          console.log(err)
        })
      }else{
        _this.$Toast('当前账户异常，请联系客服')
      }
    }
  },
  components:{
    Footer
  }
}
</script>

<style lang="scss">
.mine{
  width: 100%;
  position: relative;
  height:90rem!important;

  ._v-container{
    // position: static!important;
    // padding-bottom: 10rem!important;
    width: 92%!important;
    height: 80%!important;
    margin-left:4%!important;
    // overflow: auto!important;
    overflow: visible!important;
    // background: black;
    ._v-content{
      height:145%!important;
      // padding-bottom: 10rem!important;
    }
  }
  .person_mes{
    width: 100%;
    background: url('../../../static/img/person_background.png');
    background-size: 100% 100%;
    min-height: 28rem;
    border-radius:12px;
    margin-top: 2rem;
    position: relative;
    z-index: 10;
    .person_pic{
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      margin-top: 4rem;
      margin-left: 2rem;
    }
    .person_oper{
      font-size: 1.6rem;
      position: absolute;
      left:12rem;
      top:7rem;
      color:white;
    }
    .person_del{
      width: 100%;
      height: 6rem;
      // background: blue;
      padding-top: 1rem;
      z-index: 10;
      ul{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: 1;
        margin-top: 1rem;
        li{
          width: 50%;
          font-size: 1.2rem;
          color:white;
        }
        li:nth-child(1){
          padding-left: 1rem;
        }
      }
      p{
        margin-top:2rem;
        width: 100%;
        font-size: 1.2rem;
        padding-left:1rem;
        color:white;
      }
      .engMes{
        display: flex;
        span:nth-child(2){
          min-width: 5.5rem;
        }
        span:nth-child(3){
          padding-right: 2rem;
        }
      }
      .certIcon{
        position: absolute;
        left:50%;
        margin-left: -5.5rem;
        bottom:-1.5rem;
        width: 11rem;
        height: 3.5rem;
        background: url('../../../static/img/cer_bg.png');
        background-size: 100% 100%;
        text-align: center;
        color:white;
        line-height: 3.1rem;
        font-size: 1.5rem;
      }
    }

  }
  .person_mask{
    width: 60%;
    height: 10rem;
    background: white;
    margin:0 auto;
    position: absolute;
    top:11rem;
    box-shadow:0px 30px 100px #666;
    z-index: 1;
    left:50%;
    margin-left: -30%;
  }

  .person_work{
    width: 100%;
    margin-bottom: 15rem;
    z-index: -1;
    ul{
      width: 100%;
      li{
        width: 100%;
        margin-top: 1rem;
        height: 5rem;
        background: white;
        box-shadow: 0px 0px 15px #999;
        line-height: 5.5rem;
        border-radius: 10px;
        padding-left: 2rem;
        box-sizing: border-box;
        position: relative;
        i{
          font-size: 2.2rem;
        }
        .forward{
          color:#999;
          position: absolute;
          right:2rem;
          font-weight: bold;
        }
        .mine_text{
          font-size: 1.2rem;
          position: absolute;
          top:0;
          left:5rem;
        }
        .message_num{
          width: 1.8rem;
          height: 1.8rem;
          border-radius:50%;
          background: red;
          position: absolute;
          right:4rem;
          color:white;
          text-align: center;
          line-height: 1.8rem;
          top:50%;
          margin-top: -.6rem;
          font-size: 1.2rem;
        }
      }
      li:nth-child(1){
        margin-top:4rem;
      }
      li:nth-child(3){
        .write_icon{
          font-size: 1.8rem;
        }
      }
      li:nth-child(2){
        .card_icon{
          position: absolute;
          top:.2rem;
          left:2rem;
        }
      }
    }
  }
}
</style>
