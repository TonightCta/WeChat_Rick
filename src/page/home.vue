<!-- 首页 -->
<template lang="html">
  <div class="home_wapper">
    <Header/>
    <div class="banner_wapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img :src=bannerUrl alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src=bannerUrl alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src=bannerUrl alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="home_table">
      <ul>
        <li>接单</li>
        <li>工作</li>
      </ul>
    </div>

    <!-- 新闻列表 -->

    <p class="home_newsTitle">新闻</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(item,index) in newsList">
          <img :src="`http://rightservicetech.com:8080/${item.imgName}`" alt="">
          <span class="home_newsDeta_title">{{item.title}}</span>
          <span class="home_newsDeta_de">{{item.intro}}</span>
          <span class="home_newsDeta_time">{{item.timeStr}}</span>
        </li>
      </ul>
      <router-link to="/newslist" tag="p" class="lookMoreNews">查看更多新闻</router-link>
    </div>

    <!-- 咨询列表 -->

    <p class="home_newsTitle">咨询</p>
    <div class="home_newsDeta">
      <ul>
        <li>
          <img :src=bannerUrl alt="">
          <span class="home_newsDeta_title">江南皮革厂江南皮革厂</span>
          <span class="home_newsDeta_de">王八蛋王八蛋黄鹤老板带着他的小姨子跑啦王八蛋王八蛋黄鹤老板带着他的小姨子跑啦</span>
          <span class="home_newsDeta_time">2019/02/21</span>
        </li>
      </ul>
      <p class="lookMoreNews" @click="getNews()">查看更多资讯</p>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/header_wapper'
import Footer from '@/components/footer_wapper'

export default {
  data(){
    return{
      bannerUrl:'../../static/img/banner.jpg',
      newsList:[],//新闻列表
      conList:[]//咨询信息列表
    }
  },
  components:{
    Footer,
    Header
  },
  mounted(){
    this.getNewsList();
    this.getConList()
  },
  methods:{
    //获取新闻列表
    getNewsList(){
      let _this=this;
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition',{
        'type':'1',
        'size':'3',
        'page':'1'
      }).then((res)=>{
        _this.newsList=res.data.data.content;
        for(let i in _this.newsList){
          if(_this.newsList[i].title.length>10){
            let subT=_this.newsList[i].title;
            _this.newsList[i].title=subT.substring(0,14)+'...'
          }
          if(_this.newsList[i].intro.length>38){
            let subX=_this.newsList[i].intro;
            _this.newsList[i].intro=subX.substring(0,39)+'...'
          }
        };
      }).catch((err)=>{
        console.log(err)
      })
    },
    //获取咨询列表
    getConList(){
      let _this=this;
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition',{
        'type':'2',
        'size':'3',
        'page':'1'
      }).then((res)=>{
        _this.conList=res.data.data.content;
        for(let i in _this.conList){
          if(_this.conList[i].title.length>10){
            let subT=_this.conList[i].title;
            _this.conList[i].title=subT.substring(0,14)+'...'
          }
          if(_this.conList[i].intro.length>38){
            let subX=_this.conList[i].intro;
            _this.conList[i].intro=subX.substring(0,39)+'...'
          }
        };
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  computed:{
    ...mapState(['token'])
  }
}
</script>

<style lang="scss" scoped>
.home_wapper{
  margin-bottom:7rem;
  margin-top:5rem;
  .banner_wapper{
    height:16rem;
    img{
      width: 100%;
      height:100%;
    }
  }
  .home_table{
    width: 100%;
    margin-top: 1rem;
    height:4rem;
    border-radius:12px;
    background: #ccc;
    ul{
      display: flex;
      width: 100%;
      li{
        width: 50%;
        text-align: center;
        font-size: 1.6rem;
        line-height: 4rem;
        box-sizing: border-box;
      }
      li:nth-child(1){
        border-right:1px solid #000;
      }
    }
  }
  .home_newsTitle{
    width: 100%;
    margin-top: 1rem;
    font-size: 1.7rem;
    text-align: center;
  }
  .home_newsDeta{
    width: 100%;
    ul{
      width: 100%;
      li{
        height:11rem;
        position: relative;
        box-sizing: border-box;
        img{
          width: 8rem;
          height: 8rem;
          position: absolute;
          top:1.5rem;
          left:2rem;
        }
        .home_newsDeta_title{
          font-size: 1.4rem;
          position: absolute;
          top:1.5rem;
          left:12rem;
        }
        .home_newsDeta_de{
          font-size: 1.2rem;
          width: 18rem;
          position: absolute;
          top:4rem;
          left:12rem;
          line-height: 1.9rem;
        }
        .home_newsDeta_time{
          color: #999;
          font-size: 1.2rem;
          position: absolute;
          right:.5rem;
          bottom:1.5rem;
        }
      }
      li:nth-child(2){
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
      }
    }
    .lookMoreNews{
      width: 96%;
      height: 3rem;
      background: #ccc;
      margin: 0 auto;
      border-radius:10px;
      font-size: 1.4rem;
      line-height: 3rem;
      text-align: center;
      margin-top:1rem;
    }
  }
}
</style>
