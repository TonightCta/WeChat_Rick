<!-- 首页新闻 -->
<template lang="html">
  <div class="">
    <p class="home_newsTitle">公司新闻</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(item,index) in newsListT" @click="newsDeHome(index)">
          <img :src="oUrl+'/'+item.imgName" alt="">
          <span class="home_newsDeta_title">{{item.title}}</span>
          <span class="home_newsDeta_de">{{item.intro}}</span>
          <span class="home_newsDeta_time">{{item.timeStr}}</span>
        </li>
      </ul>
      <p class="noData" v-show="isData">暂无更多数据</p>
      <p class="lookMoreNews" @click="getNewsL()">查看更多新闻</p>
      <!-- <router-link to="/newslist" tag="p" class="lookMoreNews"></router-link> -->
    </div>

    <!-- 咨询列表 -->

    <p class="home_newsTitle">行业资讯</p>
    <div class="home_newsDeta">
      <ul>
        <li v-for="(itemZ,index) in conListT" @click="newsConHome(index)">
          <img :src="oUrl+'/'+itemZ.imgName" alt="">
          <span class="home_newsDeta_title">{{itemZ.title}}</span>
          <span class="home_newsDeta_de">{{itemZ.intro}}</span>
          <span class="home_newsDeta_time">{{itemZ.timeStr}}</span>
        </li>
      </ul>
      <p class="noData" v-show="isDataCon">暂无更多数据</p>
      <p class="lookMoreNews" @click="getNews()">查看更多资讯</p>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      isData:false,//是否有新闻数据
      isDataCon:false,//是否有咨询数据
      newsList:[]
    }
  },
  computed:{
    ...mapState(['newsListT','conListT','token'])
  },
  mounted(){
    this.getNewsList();
    this.getConList();
  },
  methods:{
    ...mapMutations(['newsListT_fn','conListT_fn','isBackT_fn','isBackM_fn']),
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
    //获取新闻列表
    getNewsList(){
      let _this=this;
      let formData=new FormData();
      formData.append('type',1);
      formData.append('size',3);
      formData.append('page',0);
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition',formData).then((res)=>{
        if(res.data.code==0){
          if(res.data.data.content.length<1){
            _this.isData=true;
          }
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
        }else{
          _this.$Toast(res.data.msg)
        }

      }).catch((err)=>{
        console.log(err)
      })
    },
    getConList(){//获取咨询列表
      let _this=this;
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition?type=2&size=3&page=0',).then((res)=>{
        if(res.data.code==0){
          _this.conListT_fn(res.data.data.content);
          // console.log(res)
          if(res.data.data.content.length<1){
            _this.isDataCon=true;
          }
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
        }

        // console.log(res);
      }).catch((err)=>{
        console.log(err)
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
    },
    getNewsL(){//查看更多新闻
      this.$router.push({
        path:'/newslist',
        query:{
          title:'资讯中心',
          listType:1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home_newsTitle{
  width: 100%;
  margin-top: 3rem;
  font-size: 1.4rem;
  text-align: center;
  color:#252525;
  background: red;
  height: 4.5rem;
  line-height: 4rem;
  background: url('../../../static/img/news_title_bg.png');
  background-size: 100% 100%;
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
  .noData{
    width: 100%;
    height: 6rem;
    text-align: center;
    font-size: 1.4rem;
    line-height:6rem;
    color:#999;
  }
  .lookMoreNews{
    width: 96%;
    height: 3rem;
    background: linear-gradient(#fa891e, #f7bc8b);
    color:white;
    margin: 0 auto;
    border-radius:10px;
    font-size: 1.4rem;
    line-height: 3rem;
    text-align: center;
    margin-top:1rem;
  }
}
</style>
