<!-- 新闻列表页 -->
<template lang="html">
  <div class="news_list">
    <WorkHeader>
      <span>{{pageTitle}}</span>
    </WorkHeader>
    <div class="">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" :showBtn="listLength">
        <div class="news_newsDeta" ref="newsDa">
          <ul>
            <li v-for="(item,index) in newsList" @click="newsDe(index)">
              <img v-lazy="oUrl+'/'+item.imgName" alt="">
              <span class="news_newsDeta_title">{{item.title}}</span>
              <span class="news_newsDeta_de">{{item.intro}}</span>
              <span class="news_newsDeta_time">{{item.timeStr}}</span>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <p class="noData" v-show="isHasData">暂无更多数据</p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  inject:['reload'],
  data(){
    return{
      bannerUrl:'../../static/img/banner.jpg',
      newsList:[],//数据列表
      pageTitle:'',//头部标题
      lisType:'',//数据类型
      pageNum:0,//页码
      newsDaHeight:null,//动态盒子高度
      isHasData:false,//当前列表是否有数据
      listLength:false
    }
  },
  created(){
      this.pageTitle=this.$route.query.title;
      this.lisType=this.$route.query.listType;
  },
  mounted(){
    this.getNewsList();
    this.newsDaHeight=document.documentElement.clientHeight - this.$refs.newsDa.getBoundingClientRect().top;
  },
  methods:{
    //刷新数据
    onRefresh(done){
      this.getNewsList();
      this.reload()
      setTimeout(()=>{
        done();
      },1000)
    },
    //加载更多
    onInfinite(done){
      // this.pageNum++;
      // setTimeout(()=>{
      //   let _this=this;
      //   _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition?type='+_this.lisType+'&size=10&page='+this.pageNum).then((res)=>{
      //     res.data.data.content.forEach((e)=>{
      //         _this.newsList.push(e)
      //     });
      //     if(res.data.data.content.length>=10){
      //       this.listLength=true;
      //     }else{
      //       this.listLength=false
      //     }
      //     for(let i in _this.newsList){
      //       if(_this.newsList[i].title.length>10){
      //         let subT=_this.newsList[i].title;
      //         _this.newsList[i].title=subT.substring(0,14)+'...'
      //       }
      //       if(_this.newsList[i].intro.length>38){
      //         let subX=_this.newsList[i].intro;
      //         _this.newsList[i].intro=subX.substring(0,39)+'...'
      //       }
      //     };
      //     done()
      //   }).catch((err)=>{
      //     _this.$Toast('未知异常')
      //     _this.$Indicator.close();
      //     console.log(err)
      //   })
      // })
      setTimeout(()=>{
        done(true)
      },1500)
    },
    //获取新闻列表
    getNewsList(){
      let _this=this;
      _this.$Indicator.open();
      _this.$axios.post(_this.oUrl+'/view/findNewsListByCondition?type='+_this.lisType+'&size=10&page=0').then((res)=>{
        // this.$refs.loadmore.onTopLoaded();
        _this.$Indicator.close()
        _this.newsList=res.data.data.content;
        if(_this.newsList.length<1){
          _this.isHasData=true;
        }
        if(res.data.data.content.length>=10){
          this.listLength=true;
        }else{
          this.listLength=false
        }
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
        _this.$Toast('未知异常')
        _this.$Indicator.close();
        console.log(err)
      })
    },
    //点击新闻详情
    newsDe(index){
      this.$router.push({
        name:'NewsDetails',
        params:{
          Mes:this.newsList[index].content
        }
      })
    },
  },
  components:{
    WorkHeader,
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  margin-top: 5rem!important;
}
  .news_list{
    width: 100%;
    .news_newsDeta{
      width: 100%;
      ul{
        width: 100%;
        li{
          height:11rem;
          position: relative;
          box-sizing: border-box;
          border-bottom:1px solid #ccc;
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
    .noData{
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      color:#666;
      top:10.5rem;
    }
  }
</style>
