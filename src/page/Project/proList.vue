<!-- 项目列表 -->
<template lang="html">
  <div class="pro_list">
    <div class="">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" ref="myscroller">
        <ul>
          <li class="work_list" v-for="(pro,index) in proList">
            <img src="../../../static/img/bookmarks_icon.png" alt="">
            <p class="work_time">{{pro.createTimeStr}}</p>
            <p class="work_type con">项目名称:&nbsp;{{pro.name}}</p>
            <p class="work_type con" v-if="pro.contractNumber!=null&&pro.contractNumber!=''">合同号:&nbsp;{{pro.contractNumber}}</p>
            <p class="work_type con" v-else>合同号:&nbsp;-</p>
            <p class="work_type con">项目状态:&nbsp;{{pro.stateStr}}</p>
            <p class="work_type con">产品线:&nbsp;{{pro.technologyName}}</p>
            <p class="work_type con">项目负责人:&nbsp;{{pro.creatorName}}</p>
            <p class="work_type con">进度:&nbsp;{{pro.schedule}}%</p>
            <p class="work_pro">
              <button type="button" name="button"><i class="iconfont icon-fuwutiaokuan" @click="proDetails(index)"></i>详情</button>
            </p>
            <p class="click_mask con" @click="proDetails(index)"></p>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      proList:[],//项目列表
    }
  },
  created(){
    this.getLogList();
  },
  computed:{
    ...mapState(['userMes'])
  },
  methods:{
    getLogList(){//获取日志列表
      let _vm=this;
      _vm.$Indicator.open();
      let formdata=new FormData();
      formdata.append('size',100);
      if(_vm.userMes.identityCode==2||_vm.userMes.identityCode==3){
        formdata.append('managerName',_vm.userMes.nickname)
      }
      _vm.$axios.post(_vm.oUrl+'/findProjectListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          console.log(res)
          _vm.proList=res.data.data.content;
          _vm.$Indicator.close();
        }else{
          _vm.$Indicator.close();
          _vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$Toast('未知异常,请联系管理员')
        _vm.$Indicator.close();
        console.log(err)
      })
    },
    onRefresh(done){//下拉刷新
      this.getLogList();
      setTimeout(()=>{
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done(true)
      },1500)
    },
    proDetails(index){//项目详情
      this.$router.push({
        path:'/projectMes',
        query:{
          proID:this.proList[index].id
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  margin-top: 5rem!important;
}
.work_list{
  width: 90%;
  margin:0 auto;
  max-height: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 5px #ddd;
  position: relative;
  margin-bottom: .5rem;
  margin-top: 1rem;
  padding-bottom: 3.5rem;
  padding-left: .5rem;
  padding-right: .5rem;
  img{
    position: absolute;
    left:.5rem;
    top:-.3rem;
    width: 2rem;
  }
  p{
    width: 100%;
    padding-left: 1rem;
    padding-top: 1rem;
    color:#666;
  }
  .status{
    position: absolute;
    right:1rem;
    top:1rem;
    font-size: 1.4rem;
  }
  .click_mask{
    width: 100%;
    position: absolute;
    height: 70%;
    background: rgba(0,0,0,0);
    left:0;
    top:0;
  }
  .work_time{
    font-size: 1.4rem;
    box-sizing: border-box;
  }
  .con{
    color:black;
    box-sizing: border-box;
    font-size: 1.4rem;
    padding-top: 1.2rem;
  }
  .work_pro{
    width: 100%;
    height: 3rem;
    text-align: right;
    position: absolute;
    right: .8rem;
    line-height: 3rem;
    bottom:.3rem;
    button{
      width: 7rem;
      height: 2.5rem;
      border-radius:5px;
      font-size: 1.3rem;
      text-align: center;
      i{
        font-size: 1.3rem;
      }
    }
    button:nth-child(1){
      background: white;
      border:1px solid #eb7a1d;
      color:#eb7a1d;
      i{
        font-size: 1.4rem;
      }
    }
  }
}
</style>
