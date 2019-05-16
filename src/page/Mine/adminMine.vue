<!-- 管理员个人中心 -->
<template lang="html">
  <div class="mine">
    <!-- 个人资料块 -->
    <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" >
      <div class="" style="magin-bottom:10rem;">
        <div class="person_mes">
          <img src="../../../static/img/user_pic.jpg" alt="" class="person_pic">
          <router-link to="/TLogin" tag="p" class="person_oper" @click.native="mineCon()" v-show="didLogin">
            请登录
          </router-link>
          <p class="person_oper" v-show="hasLogin">{{nickName}}</p>
          <div class="person_del">
            <ul>
              <li>
                <span class="iconfont icon-weibiaoti-"></span>
                <span>电话：</span>
                <span>{{userPhone}}</span>
              </li>
            </ul>
            <p>
              <span class="iconfont icon-mail"></span>
              <span>邮箱：</span>
              <span>{{userEmail}}</span>
            </p>
            <!-- <span class="iconfont icon-iconfontzhizuobiaozhun023114 y" ref="certColor"></span> -->
            <!-- <span class="certIcon" @click="cert()">{{cerText}}</span> -->
          </div>
        </div>
        <!-- 阴影盒子 -->

        <div class="person_mask">

        </div>

        <!-- 功能块 -->
        <div class="person_work">
          <ul>
            <router-link to="/message" tag="li">
              <i class="iconfont icon-xiaoxi"></i>
              <span class="mine_text">消息中心</span>
              <span class="message_num" v-show="hasMsg">{{msgNum}}</span>
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
      nickName:null,
    }
  },
  computed:{
    ...mapState(['userMes']),
  },
  created(){
    this.getMsgNum();
    this.isEx();
  },
  mounted(){
    if(this.userMes){
      this.didLogin=false;
      this.hasLogin=true;
    }
    this.nickName=this.userMes.name;
    if(this.userMes.mobile!=null&&this.userMes.mobile!=''){
      this.userPhone=this.userMes.mobile
    };
    if(this.userMes.email!=null&&this.userMes.email!=''){
      this.userEmail=this.userMes.email
    }
    if(this.userMes.customerVO){
      this.didLogin=false;
      this.hasLogin=true;
    }
    if(this.userMes.email!=null&&this.userMes.email!=''){
      this.userEmail=this.userMes.email
    }
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
              if(res.data.data.email!=null&&res.data.data.email!=''){
                this.userEmail=res.data.data.email
              }
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
              console.log(res)

              this.userMes_fn(res.data.data);
              this.didLogin=false;
              this.hasLogin=true;
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
  },
  components:{
    Footer
  }
}
</script>

<style lang="scss" scoped>
.mine{
  width: 100%;
  position: relative;
  height:50rem!important;
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
    min-height: 22rem;
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
      li:nth-child(5){
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
