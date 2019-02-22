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
          <img :src=bannerUrl2 alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src=bannerUrl3 alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="home_table">
      <ul>
        <li>接单赚钱</li>
        <li>发布需求</li>
        <li>工作日志</li>
      </ul>
    </div>

    <!-- 新闻列表 -->

    <p class="home_newsTitle">>>公司新闻<<</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(item,index) in newsList" @click="newsDeHome(index)">
          <img :src="`http://rightservicetech.com:8080/${item.imgName}`" alt="">
          <span class="home_newsDeta_title">{{item.title}}</span>
          <span class="home_newsDeta_de">{{item.intro}}</span>
          <span class="home_newsDeta_time">{{item.timeStr}}</span>
        </li>
      </ul>
      <router-link to="/newslist" tag="p" class="lookMoreNews">查看更多新闻</router-link>
    </div>

    <!-- 咨询列表 -->

    <p class="home_newsTitle">>>行业资讯<<</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(itemZ,index) in conList">
          <img :src="`http://rightservicetech.com:8080/${itemZ.imgName}`" alt="">
          <span class="home_newsDeta_title">{{itemZ.title}}</span>
          <span class="home_newsDeta_de">{{itemZ.intro}}</span>
          <span class="home_newsDeta_time">{{itemZ.timeStr}}</span>
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
      bannerUrl:'../../static/img/banner1.png',
      bannerUrl2:'../../static/img/banner2.png',
      bannerUrl3:'../../static/img/banner3.png',
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
            _this.newsList[i].title=subT.substring(0,13)+'...'
          }
          if(_this.newsList[i].intro.length>38){
            let subX=_this.newsList[i].intro;
            _this.newsList[i].intro=subX.substring(0,34)+'...'
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
        'type':2,
        'size':3,
        'page':0
      }).then((res)=>{
        _this.conList=res.data.data.content;
        for(let i in _this.conList){
          if(_this.conList[i].title.length>10){
            let subT=_this.conList[i].title;
            _this.conList[i].title=subT.substring(0,13)+'...'
          }
          if(_this.conList[i].intro.length>38){
            let subX=_this.conList[i].intro;
            _this.conList[i].intro=subX.substring(0,30)+'...'
          }
        };
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    },
    //进入新闻详情
    newsDeHome(index){
      this.$router.push({
        path:'/newDetails',
        query:{
          Mes:this.newsList[index].content
        }
      })
    }
  },
  computed:{
    ...mapState(['token'])
  }
}
</script>

<style lang="scss" scoped>
.home_wapper{
  width: 92%;
  margin:0 auto;
  margin-bottom:7rem;
  margin-top:5rem;
  .banner_wapper{
    margin-top: 6rem;
    height:14rem;
    img{
      width: 100%;
      height:100%;
      border-radius:10px;
    }
  }
  .home_table{
    width: 100%;
    margin-top: 2rem;
    border-radius:12px;
    ul{
      display: flex;
      width: 85%;
      margin:0 auto;
      justify-content: space-between;
      li{
        width: 30%;
        height:6.2rem;
        background: red;
        text-align: center;
        font-size: 1.1rem;
        color: white;
        padding-top: 4.3rem;
        box-sizing: border-box;
        letter-spacing:2px;
      }
      li:nth-child(1){
        background: url('../../static/img/table1.png');
        background-size: 100% 100%;
      }
      li:nth-child(2){
        background: url('../../static/img/table2.png');
        background-size: 100% 100%;
      }
      li:nth-child(3){
        background: url('../../static/img/table3.png');
        background-size: 100% 100%;
      }
    }
  }
  .home_newsTitle{
    width: 100%;
    margin-top: 2rem;
    font-size: 1.4rem;
    text-align: center;
    color:#252525;
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
          width: 20rem;
          overflow: hidden;
          top:1.5rem;
          left:12rem;
        }
        .home_newsDeta_de{
          display: inline-block;
          font-size: 1.1rem;
          width: 60%;
          position: absolute;
          overflow: hidden;
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
      background: #eee;
      color:#252525;
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
