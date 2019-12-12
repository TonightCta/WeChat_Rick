<!-- 小哥问卷调查 -->
<template lang="html">
  <div class="about_inve">
    <div class="about_con">
      <div class="about_mes">
        <p class="mes_title"><span style="color:red;">*</span>姓名:</p>
        <p>
          <input type="text" name="" value="" placeholder="请输入您的姓名" v-model="inveMes.name">
        </p>
        <p class="mes_title"><span style="color:red;">*</span>年龄:</p>
        <p>
          <input type="text" name="" value="" placeholder="请输入您的年龄" v-model="inveMes.age">
        </p>
        <p class="mes_title"><span style="color:red;">*</span>当前职位:</p>
        <p>
          <input type="text" name="" value="" placeholder="请输入您的当前职称" v-model="inveMes.position">
        </p>
        <p class="mes_title"><span style="color:red;">*</span>持有证书:</p>
        <p>
          <input type="text" name="" value="" placeholder="请输入您现持有证书" v-model="inveMes.cert">
        </p>
        <ul>
          <li v-for="(subjectText,index) in inveMes.subject">
            <span>{{subjectText.title}}</span>
            <p v-show="!subjectText.isText">
              <p v-for="(ans,ansIndex) in subjectText.answer">{{ans}}</p>
            </p>
            <p v-show="subjectText.isText">
              <input type="text" name="" value="">
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      inveMes:{
        name:null,//姓名
        age:null,//年龄
        position:null,//职位
        cert:null,//持有证书
        subject:[
          {
            title:'您一般什么时间方便兼职？',
            answer:[
              '工作日9：00-18：00','工作日18：00以后','周六周日','周末某一天','随时'
            ],
            useranswer:null,//用户选项
            isText:false,//是否为填空题
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about_inve{
  width: 92%;
  margin:0 auto;
  .about_con{
    margin-top: 2rem;
    p{
      font-size: 1.5rem;
      font-weight: bold;
      input{
        border:1px solid #eee;
        border-radius: 5px;
        width: 100%;
        height:3.6rem;
        margin-top: .5rem;
        font-size: 1.4rem;
        box-sizing: border-box;
        padding-left: .5rem;
      }
    }
    .mes_title{
      margin-top: .8rem;
    }
  }
}
</style>
