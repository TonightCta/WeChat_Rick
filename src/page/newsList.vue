<!-- 新闻列表页 -->
<template lang="html">
  <div class="news_list">
    <WorkHeader/>
    <div class="news_newsDeta">
      <ul>
        <li v-for="(item,index) in newsList" @click="newsDe(index)">
          <img :src="`http://rightservicetech.com:8080/${item.imgName}`" alt="">
          <span class="news_newsDeta_title">{{item.title}}</span>
          <span class="news_newsDeta_de">{{item.intro}}</span>
          <span class="news_newsDeta_time">{{item.timeStr}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      bannerUrl:'../../static/img/banner.jpg',
      newsList:[]
    }
  },
  mounted(){
    this.getNewsList();
  },
  methods:{
    //获取新闻列表
    getNewsList(){
      let _this=this;
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition',{
        'type':'1',
        'size':'10',
        'page':'1'
      }).then((res)=>{
        _this.newsList=res.data.data.content;
        for(let i in _this.newsList){
          if(_this.newsList[i].title.length>10){
            let subT=_this.newsList[i].title;
            console.log(subT)
            _this.newsList[i].title=subT.substring(0,14)+'...'
          }
          if(_this.newsList[i].intro.length>38){
            let subX=_this.newsList[i].intro;
            _this.newsList[i].intro=subX.substring(0,39)+'...'
          }
        };
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    },
    //点击新闻详情
    newsDe(index){
      this.$router.push({
        path:'/newDetails',
        query:{
          Mes:this.newsList[index].content
        }
      })
    }
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
  .news_list{
    width: 100%;
    height:100%;
    .news_newsDeta{
      width: 100%;
      ul{
        width: 100%;
        li{
          height:11rem;
          position: relative;
          box-sizing: border-box;
          img{
            width: 8rem;
            height:8rem;
            position: absolute;
            top:2rem;
            left:2rem;
          }
          .news_newsDeta_title{
            font-size: 1.4rem;
            position: absolute;
            top:1.5rem;
            left:12rem;
          }
          .news_newsDeta_de{
            font-size: 1.2rem;
            width: 19rem;
            position: absolute;
            top:4rem;
            left:12rem;
            line-height: 1.9rem;
             text-align: justify
          }
          .news_newsDeta_time{
            color: #999;
            font-size: 1.2rem;
            position: absolute;
            right:.5rem;
            bottom:1.4rem;
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
