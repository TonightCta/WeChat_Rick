<!-- 发布需求页 -->
<template lang="html">
  <div class="demand_need">
    <WorkHeader>
      <span>发布需求</span>
    </WorkHeader>
    <div class="put_bg">

    </div>
    <div class="put_area">
      <div class="area_top">
        <p class="top_title">请填写您的需求</p>
        <ul class="mount" style="marginBottom:1rem;">
          <li>
            <p><span style="color:red;">*</span>公司名称：</p>
          </li>
          <li>
            <input type="text" @blur="clearIOS" name="" value="" v-model="company" placeholder="请输入您的公司名称">
          </li>
        </ul>
        <ul class="textarea">
          <li>
            <p><span style="color:red;">*</span>需求描述：</p>
          </li>
          <li>
            <textarea name="name" @blur="clearIOS" placeholder="请输入您的需求描述" v-model="needCon"></textarea>
          </li>
        </ul>
        <ul class="mount">
          <li>
            <p><span style="color:red;">*</span>预算金额：</p>
          </li>
          <li>
            <input type="number" @blur="clearIOS" name="" value="" v-model="amount" placeholder="请输入您的预算金额">
          </li>
        </ul>
      </div>
      <div class="area_bot">
        <p class="top_title">联系方式</p>
        <ul class="mount">
          <li>
            <p><span style="color:red;">*</span>联系人：</p>
          </li>
          <li>
            <input type="text" @blur="clearIOS" name="" value="" placeholder="请输入联系人姓名" v-model="contactName">
          </li>
        </ul>
        <ul class="mount">
          <li>
            <p><span style="color:red;">*</span>联系电话：</p>
          </li>
          <li>
            <input type="number" @blur="clearIOS" name="" value="" placeholder="请输入联系人电话" v-model="contactPhone">
          </li>
        </ul>
      </div>
    </div>
    <p class="put_need" @click="subNeed()">提交</p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {downIOS} from '@/assets/js/default'
export default {
  data(){
    return{
      needCon:null,//需求详情
      amount:null,//预算金额
      contactName:null,//联系人姓名
      contactPhone:null,//联系人电话
      company:null,//公司名称
      clearIOS:downIOS
    }
  },
  components:{
    WorkHeader
  },
  methods:{
    subNeed(){//提交需求
      let _this=this;
      if(_this.company==null){
        _this.$Toast('请输入您的公司名称')
      }else if(_this.needCon==null){
        _this.$Toast('请输入需求详情')
      }else if(_this.amount==null){
        _this.$Toast('请输入预算金额')
      }else if(_this.contactName==null){
        _this.$Toast('请输入联系人姓名')
      }else if(_this.contactPhone==null){
        _this.$Toast('请输入联系人电话')
      }else if(!(/^1[34578]\d{9}$/.test(_this.contactPhone))){
        _this.$Toast('请输入正确的手机号')
      }else{
        _this.$Indicator.open('提交中...');
        let formData=new FormData();
        formData.append('company',_this.company);
        formData.append('content',_this.needCon);
        formData.append('budget',_this.amount);
        formData.append('linkman',_this.contactName);
        formData.append('contact',_this.contactPhone);
        _this.$axios.post(_this.oUrl+'/saveDemand',formData).then((res)=>{
          console.log(res)
          _this.$Toast('发布成功');
          if(res.data.code==0){
            _this.$Indicator.close();
            _this.$router.push({
              path:'/home',
              query:{
                color:1
              }
            })
          }else{
            _this.$Toast(res.data.msg);
            _this.$Indicator.close();
          }
        }).catch((err)=>{
          // _this.$Toast('未知错误')
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.put_bg{
  width: 100%;
  height:12rem;
  background: url('../../../static/img/demand_bg.png');
  background-size:100% 100%;
  margin-top: 5rem;
}
.put_area{
  width: 93%;
  margin:0 auto;
  padding-top:2rem;
  .area_top{
    width: 100%;
    padding-bottom:2rem;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #999;
    background: white;
    overflow-x: hidden;
    .top_title{
      width: 100%;
      font-size: 1.4rem;
      padding-top:.5rem;
      // margin-left:.5rem;
      padding-bottom:.5rem;
      box-sizing: border-box;
      text-align: center;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .textarea{
      width: 100%;
      display: flex;
      margin-bottom: 2rem;
      li{
        height: 10rem;
      }
      li:nth-child(1){
        width: 20%;
        p{
          width: 100%;
          font-size: 1.2rem;
          text-align: right;
        }
      }
      li:nth-child(2){
        width: 80%;
        textarea{
          width: 92%;
          border-radius: 8px;
          height:100%;
          resize: none;
          outline: none;
          padding-left:.5rem;
          padding-top: .5rem;
          border:1px solid #ccc;
        }
      }
    }
    .mount{
      width: 100%;
      display: flex;
      li{
        height: 3.5rem;
      }
      li:nth-child(1){
        width: 20%;
        // background: yellow;
        p{
          width: 100%;
          font-size: 1.2rem;
          text-align: right;
          line-height: 3.5rem;
        }
      }
      li:nth-child(2){
        width: 80%;
        // background: green;
        input{
          width: 92%;
          padding-left:.6rem;
          border-radius: 6px;
          height: 90%;
          border:1px solid #ccc;
        }
      }
    }
  }
  .area_bot{
    width: 100%;
    padding-bottom:2rem;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #999;
    background: white;
    overflow-x: hidden;
    margin-top: 2rem;
    .top_title{
      width: 100%;
      font-size: 1.4rem;
      padding-top:.5rem;
      // margin-left:.5rem;
      padding-bottom:.5rem;
      box-sizing: border-box;
      text-align: center;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .textarea{
      width: 100%;
      display: flex;
      margin-bottom: 2rem;
      li{
        height: 10rem;
      }
      li:nth-child(1){
        width: 20%;
        p{
          width: 100%;
          font-size: 1.2rem;
          text-align: right;
        }
      }
      li:nth-child(2){
        width: 80%;
      }
    }
    .mount{
      width: 100%;
      display: flex;
      li{
        height: 3.5rem;
        margin-bottom: 1rem;
      }
      li:nth-child(1){
        width: 20%;
        // background: yellow;
        p{
          width: 100%;
          font-size: 1.2rem;
          text-align: right;
          line-height: 3.5rem;
        }
      }
      li:nth-child(2){
        width: 80%;
        // background: green;
        input{
          width: 92%;
          padding-left:.6rem;
          border-radius: 6px;
          height: 85%;
          border:1px solid #ccc;
        }
      }
    }
  }
}
.put_need{
  width: 60%;
  height: 3.5rem;
  background: url('../../../static/img/btn_bg2.png');
  background-size: 100% 100%;
  margin:0 auto;
  border-radius: 11px;
  box-shadow: 0px 2px 10px #999;
  margin-top: 2rem;
  text-align: center;
  font-size: 2rem;
  line-height:3.5rem;
  color:white;
}
</style>
