<!-- 项目数据统计 -->
<template lang="html">
  <div class="pro_gress">
    <div class="">
      <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" ref="myscroller">
        <div class="gress_left" ref="gress_left" id="gress_leftT">

        </div>
        <div class="gress_right" ref="gress_right" id="gress_rightT">

        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data(){
    return{
      left_option:{
        backgroundColor: 'white',
        //弹窗，响应鼠标指向，显示具体细节
        tooltip : {
          trigger: 'item',//以具体项目触发弹窗
          /*
          内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
          value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
          */
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例，选择要显示的项目
        legend:{
          orient:'horizontal',
          bottom:'bottom',
          textStyle:{
            fontSize:'16',
            color:'black'
          },
          data:[]  //注意要和数据的name相对应
        },
      //数据
        series : [
          {
            name:'项目概况',
            type:'pie',
            radius:'45%',
            data:[],
            animationType: 'scale', //初始动画效果，scale是缩放，expansion是展开
            itemStyle: { //图例样式
              normal: {
                // color: '#97413c',
                shadowBlur: 50,//阴影模糊程度
                shadowColor: 'rgba(0, 0, 0, 0.5)'//阴影颜色，一般黑
              }
            },
            label: { //饼图图形的文本标签
              normal: {  //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: 'black',
                  fontSize:'15'
                }
              }
            },
            labelLine:{
              normal:{
                lineStyle:{
                  color:'black'
                }
              },
              smooth: 0.5, //0-1，越大越平滑弯曲
              length: 10,  //从块到文字的第一段长
              length2: 20  //拐弯到文字的段长
            },
            animationEasing: 'elasticOut', //初始动画缓动效果
            animationDelay: function (idx) {  //数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200;
            }
          }
        ]
      },
      right_option:{
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          type: 'bar',
          data:[],
          itemStyle:{
            color:'rgba(235,122,29,.9)'
          },
          label:{
            show:true,
            textStyle:{
              color:'white',
              fontSize:'16'
            }
          },
          animationType: 'scale', //初始动画效果，scale是缩放，expansion是展开
          animationEasing: 'elasticOut', //初始动画缓动效果
          animationDelay: function (idx) {  //数据更新动画时长，idx限定了每个数据块从无到有的速度
            return Math.random() * 200;
          }
        }],
      }
    }
  },
  created(){
    this.getEcharts()
  },
  methods:{
    getEcharts(){//获取图表数据
      let _vm=this;
      _vm.$axios.get(_vm.oUrl+'/view/statisticsProject').then((res)=>{
        if(res.data.code==0){
          _vm.left_option.legend.data=[];
          _vm.left_option.series[0].data=[];
          _vm.right_option.xAxis.data=[];
          _vm.right_option.series[0].data=[];
          let color=['#FF8C69','#ccff99','#ffff99','#ccffff','#66ccff'];
          for(let i in res.data.data.projectResultByStateDTOList){
            _vm.left_option.legend.data.push(res.data.data.projectResultByStateDTOList[i].stateStr);
            let data={
              name:res.data.data.projectResultByStateDTOList[i].stateStr,
              value:res.data.data.projectResultByStateDTOList[i].countNumber,
              itemStyle:{
                color:color[i]
              }
            };
            _vm.left_option.series[0].data.push(data);
          }
          res.data.data.projectResultByTechnologyDTOList.forEach((q)=>{
            _vm.right_option.xAxis.data.push(q.technologyName);
            _vm.right_option.series[0].data.push(q.countNumber);
          })
          _vm.initEcharts()
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
        console.log(err)
      })
    },
    initEcharts(){//初始化图表
      let left=echarts.init(document.getElementById('gress_leftT'));
      left.setOption(this.left_option)
      window.addEventListener("resize", () => { left.resize();});
      let right=echarts.init(document.getElementById('gress_rightT'));
       right.setOption(this.right_option)
    },
    onRefresh(done){//下拉刷新
      this.getEcharts();
      setTimeout(()=>{
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done(true)
      },1500)
    },
  }
}
</script>

<style lang="scss" scoped>
.pro_gress{
  height: 100%;
  margin-top: -13rem;
  .gress_left{
    width: 100%;
    height:400px;
  }
  .gress_right{
    width: 100%;
    height: 330px;
  }
}
</style>
