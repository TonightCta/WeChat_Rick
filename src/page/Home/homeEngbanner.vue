<!-- 工程师lunbo -->
<template lang="html">
  <div class="eng_banner">
    <p class="home_newsTitle">公司人才库</p>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide eng_mes" v-for="(engMes,index) in engList">
          <div class="eng_pic">
            <p>
              <img :src="engMes.pic" alt="">
            </p>
          </div>
          <div class="eng_msg">
            <p>
              <span>{{engMes.name}}</span>
              <span>{{engMes.title1}}</span>
              <span>{{engMes.title2}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data(){
    return{
      engList:[
        {
          pic:'static/img/engPic/person_zyz.png',
          name:'郑彦振',
          title1:'UC&CC',
          title2:'HCNA,HCNP'
        },
        {
          pic:'static/img/engPic/person_ght.png',
          name:'耿海涛',
          title1:'UC&C',
          title2:'HCNA,HCNP'
        },
        {
          pic:'static/img/engPic/person_wys.png',
          name:'王永胜',
          title1:'系统集成',
          title2:'-'
        },
        {
          pic:'static/img/engPic/person_lsh.png',
          name:'李少华',
          title1:'系统集成',
          title2:'HCNA,HCNP'
        },
        {
          pic:'static/img/engPic/person_zzw.png',
          name:'张志伟',
          title1:'IT，数通',
          title2:'-'
        },
        {
          pic:'static/img/engPic/person_tfq.png',
          name:'腾福庆',
          title1:'能基',
          title2:'-'
        },
        {
          pic:'static/img/engPic/person_sly.png',
          name:'孙立业',
          title1:'运维',
          title2:'HCNA'
        },
        {
          pic:'static/img/engPic/person_zl.png',
          name:'张磊',
          title1:'光伏,VC',
          title2:'-'
        }
      ]
    }
  },
  mounted(){
   let  swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 150,
        stretch: 20,
        depth:1600,
        modifier: 1,
        slideShadows : true,
      },
      autoplay: {
        delay:2000,//2秒切换一次
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
    });

  }
}
</script>

<style lang="scss" scoped>
@import 'swiper/dist/css/swiper.css';
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
.swiper-container {
  width: 100%;
  padding-top: 3rem;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 24rem;
  height: 12rem;
  background: url('../../../static/img/engBanner_bg.png');
  background-size: 100% 100%;
}
.eng_mes{
  display: flex;
  .eng_pic{
    height: 100%;
    width: 55%;
    p{
      width: 65%;
      height: 65%;
      border-radius: 50%;
      margin-top:17.5%;
      margin-left: 17.5%;
      background: red;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }

  }
  .eng_msg{
    width: 45%;
    height:100%;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    p{
      width: 100%;
      height: 70%;
      margin-top: 15%;
      span{
        display: inline-block;
        width: 100%;
        line-height: 3rem;
        font-size: 1.3rem;
        color:white;
        padding-left: .5rem;
      }
    }
  }
}
</style>
