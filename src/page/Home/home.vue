<!-- 首页 -->
<template lang="html">
  <div class="home_wapper">
    <!-- <Header/> -->
    <div class="banner_wapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img src='../../../static/img/banner1.png' alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src='../../../static/img/banner2.png' alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src='../../../static/img/banner3.png' alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="home_table">
      <ul>
        <router-link to="/login" tag="li" @click.native="homeCon()">小哥注册</router-link>
        <router-link to="/takeOrder" tag="li">接单赚钱</router-link>
        <router-link to="/demandNeed" tag="li">发布需求</router-link>
        <router-link to="/workLog" tag="li">工作日志</router-link>
        <!-- <li>接单赚钱</li>
        <li>发布需求</li>
        <li>工作日志</li> -->
      </ul>
    </div>

    <!-- 新闻列表 -->

    <p class="home_newsTitle">>>公司新闻<<</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(item,index) in newsListT" @click="newsDeHome(index)">
          <img :src="`http://rightservicetech.com:8080/${item.imgName}`" alt="">
          <span class="home_newsDeta_title">{{item.title}}</span>
          <span class="home_newsDeta_de">{{item.intro}}</span>
          <span class="home_newsDeta_time">{{item.timeStr}}</span>
        </li>
      </ul>
      <p class="lookMoreNews" @click="getNewsL()">查看更多新闻</p>
      <!-- <router-link to="/newslist" tag="p" class="lookMoreNews"></router-link> -->
    </div>

    <!-- 咨询列表 -->

    <p class="home_newsTitle">>>行业资讯<<</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(itemZ,index) in conListT" @click="newsConHome(index)">
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
import {mapState,mapMutations} from 'vuex'
import Header from '@/components/header_wapper'
import Footer from '@/components/footer_wapper'

export default {
  data(){
    return{
      bannerUrl:'../../../static/img/banner1.png',
      bannerUrl2:'../../../static/img/banner2.png',
      bannerUrl3:'../../../static/img/banner3.png',
      newsList:[]
    }
  },
  components:{
    Footer,
    Header
  },
  mounted(){
    this.getNewsList();
    this.getConList();
  },
  methods:{
    ...mapMutations(['newsListT_fn','conListT_fn','isBackT_fn','isBackM_fn']),
    //获取新闻列表
    getNewsList(){
      let _this=this;
      let formData=new FormData();
      formData.append('type',1);
      formData.append('size',3);
      formData.append('page',0);
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition',formData).then((res)=>{
        console.log(res)
        _this.newsListT_fn(res.data.data.content);
          for(let i in _this.newsListT){
            if(_this.newsListT[i].title.length>10){
              let subT=_this.newsListT[i].title;
              _this.newsListT[i].title=subT.substring(0,13)+'...'
            }
            if(_this.newsListT[i].intro.length>38){
              let subX=_this.newsListT[i].intro;
              _this.newsListT[i].intro=subX.substring(0,34)+'...'
            }
          };
      }).catch((err)=>{
        console.log(err)
      })
    },
    //获取咨询列表
    getConList(){
      let _this=this;
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition?type=2&size=3&page=0',).then((res)=>{
        _this.conListT_fn(res.data.data.content);
        console.log(res)
        for(let i in _this.conListT){
          if(_this.conListT[i].title.length>10){
            let subT=_this.conListT[i].title;
            _this.conListT[i].title=subT.substring(0,13)+'...'
          }
          if(_this.conListT[i].intro.length>38){
            let subX=_this.conListT[i].intro;
            _this.conListT[i].intro=subX.substring(0,30)+'...'
          }
        };
        // console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    },
    //进入新闻详情
    newsDeHome(index){
      let _this=this;
      let formData=new FormData();
      formData.append('type',1);
      formData.append('size',3);
      formData.append('page',0);
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition',formData).then((res)=>{
        console.log(res)
        _this.newsList=res.data.data.content;
        this.$router.push({
          name:'NewsDetails',
          params:{
            Mes:this.newsListT[index].content,
            title:this.newsList[index].title
          }
        })
      }).catch((err)=>{
        console.log(err)
      })

    },
    // 进入咨询详情
    newsConHome(index){
      let _this=this;
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition?type=2&size=3&page=0',).then((res)=>{
        this.$router.push({
          name:'NewsDetails',
          params:{
            Mes:this.conListT[index].content,
            title:res.data.data.content[index].title
          }
        })
      }).catch((err)=>{
        console.log(err)
      })

    },
    homeCon(){
      this.isBackT_fn(true);
      this.isBackM_fn(false)
    },
    a(){
      // async function sayHello(){
      //   console.log('Hello');
      //   await sleep(1000);
      //   console.log('word')
      // };
      // function sleep(ms){
      //   return new Promise(resolve=>{
      //     console.log('66666');
      //     setTimeout(resolve,ms);
      //     console.log('88888')
      //   })
      // };
      // sayHello();
    },
    //查看更多新闻
    getNewsL(){
      this.$router.push({
        path:'/newslist',
        query:{
          title:'新闻中心',
          listType:1
        }
      })
    },
    //查看更多资讯
    getNews(){
      this.$router.push({
        path:'/newslist',
        query:{
          title:'资讯中心',
          listType:2
        }
      })
    }
  },
  computed:{
    ...mapState(['newsListT','conListT','token'])
  }
}
</script>

<style lang="scss" scoped>
.home_wapper{
  width: 92%;
  margin:0 auto;
  margin-bottom:7rem;
  // margin-top:5rem;
  .banner_wapper{
    margin-top: 1rem;
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
      width: 95%;
      margin:0 auto;
      justify-content: space-between;
      li{
        width: 22%;
        height:6rem;
        background: red;
        text-align: center;
        font-size: 1.1rem;
        color: white;
        padding-top: 4.3rem;
        box-sizing: border-box;
        letter-spacing:2px;
      }
      li:nth-child(1){
        background: url('../../../static/img/table_1_1.png');
        background-size: 100% 100%;
      }
      li:nth-child(2){
        background: url('../../../static/img/table1.png');
        background-size: 100% 100%;
      }
      li:nth-child(3){
        background: url('../../../static/img/table2.png');
        background-size: 100% 100%;
      }
      li:nth-child(4){
        background: url('../../../static/img/table3.png');
        background-size: 100% 100%;
      }
    }
  }
  .home_newsTitle{
    width: 100%;
    margin-top: 3rem;
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
      background: #ccc;
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
