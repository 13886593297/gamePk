<template>
  <div class="main">
    <div class="time" v-text="time"></div>
    <div class="question">
      <ul>
        <li v-if="key==currentQue" v-for="(item, key) in questions" :key="key">
          <div class="current">{{key}}/{{questionLength}}</div>
          <h3 class="title" v-html="item.title"></h3>
          <ul>
            <li
              @click="chooseAnswer(key)"
              v-for="(value, key) in item"
              :key="key"
              :ref="key"
              v-if="arr.includes(key) && value"
            >
              <label>
                <b v-html="value"></b>
              </label>
              <span></span>
            </li>
          </ul>
          <div class="advertise">
            <span class="advertiser" v-html="item.ad_title"></span>
            <span class="slogan" v-html="item.ad_context"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var count = 20; // 默认倒计时时间
export default {
  data() {
    return {
      time: count,        // 倒计时
      arr: ['A', 'B', 'C', 'D', 'E', 'F'],   // 题目key
      questions: {},      // 所有题目内容
      currentQue: 1,      // 当前第几题
      currentAnswer: '',  // 当前题目答案
      isClick: false,     // 是否已回答
      timer: '',          // 定时器id
      questionLength: 5,  // 题目数量
      trainObj: {},       // 答题后返回的参数
      buffer: 1000        // 题目之间的时间间隔
    }
  },
  mounted() {
    var route = "main.trainHandler.startPass";
    pomelo.request(route, { level_id: this.$route.params.level_id }, (data) => {
      this.questions = data.titles;
      this.currentAnswer = this.questions[this.currentQue].answer;
      console.log('答案', this.currentAnswer);
    })
    this.timer = setInterval(() => {
      this.time--
      if (this.time == 0) {
        this.currentQue++
        this.time = count
      }
      this.jumpToEndPage();
    }, 1000)
  },
  methods: {
    chooseAnswer(key) {
      // this.$router.push({ path: '/trainFinish' })
      console.log('玩家选择', key)
      var route = 'main.trainHandler.startAnswer'
      pomelo.request(route, { title_id: this.currentQue, replyAnswer: key }, (data) => {
        this.trainObj = data
        this.trainObj.buffer = this.buffer
        this.trainObj.questionLength = this.questionLength
      })
      clearInterval(this.timer)
      if (this.isClick) return  // 阻止重复点击
      if (this.currentAnswer == key) {
        this.$refs[key][0].firstChild.classList.add('istrue')
      } else {
        this.$refs[key][0].firstChild.classList.add('iswrong')
      }
      this.isClick = true
      // 等待1s后跳转到下一题
      setTimeout(() => {
        this.currentQue++
        this.jumpToEndPage();
        try { this.currentAnswer = this.questions[this.currentQue].answer; } catch (err) { }
        console.log('答案', this.currentAnswer)
        this.time = count
        this.isClick = false

        this.timer = setInterval(() => {
          this.time--
          if (this.time == 0) {
            this.currentQue++
            this.time = count
          }
        }, 1000)
      }, this.buffer)
    },
    jumpToEndPage() {
      if (this.currentQue > this.questionLength) {
        this.$router.push({ name: 'trainFinish', params: { trainObj: this.trainObj } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/images/trainAnswer.jpg");
}

.time {
  position: absolute;
  top: 9.5vw;
  left: 66.5vw;
  color: #fff;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
}
.question {
  padding: 41vw 9vw 0 11vw;
  li {
    animation: fadeIn 1s 0.2s forwards;
    opacity: 0;
    overflow-y: scroll;
    height: 54vw;
    .current {
      position: absolute;
      top: 33vw;
      left: 80vw;
    }
    .advertise {
      position: absolute;
      width: 80vw;
      top: 138.3vw;
      font-weight: 600;
      .advertiser {
        margin-left: 3vw;
        font-size: 18px;
      }
      .slogan {
        margin-left: 13vw;
      }
    }
    li {
      margin: 4vw 0;
      position: relative;
      overflow: hidden;
      height: initial;
      input {
        display: none;
      }
      label {
        padding-left: 30px;
        b {
          font-weight: normal;
          display: inline-block;
          width: 70vw;
        }
      }
      .istrue {
        color: #bc0000;
      }
      .iswrong {
        color: #1d3e7b;
      }
      .istrue + span {
        background-position: 0 2px;
      }
      .iswrong + span {
        background-position: -20px 2px;
      }
      span {
        display: inline-block;
        width: 20px;
        height: 21px;
        background: url("/static/images/trainAnswerSprite.png") no-repeat;
        background-position: -60px 2px;
        background-size: 80px;
        position: absolute;
        left: 0;
        top: -2px;
      }
    }
  }
}
</style>
