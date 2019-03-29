<template>
  <div class="main">
    <div class="time">{{ time }}</div>
    <div class="container scrollbar">
      <ul>
        <li v-for="(value, key) in list" :key="key">
          <div v-if="key == currentQue">
            <div class="current">{{key + 1}}/{{list.length}}</div>
            <div class="title">{{ value.question_content }}</div>
            <div class="option_a" v-if="value.option_a != ''" @click="doAnswer(key, 1)">
              <img src="/static/img/no_select.png" ref="img">
              <span>{{ value.option_a }}</span>
            </div>
            <div class="option_b" v-if="value.option_b != ''" @click="doAnswer(key, 2)">
              <img src="/static/img/no_select.png" ref="img">
              <span>{{ value.option_b }}</span>
            </div>
            <div class="option_c" v-if="value.option_c != ''" @click="doAnswer(key, 3)">
              <img src="/static/img/no_select.png" ref="img">
              <span>{{ value.option_c }}</span>
            </div>
            <div class="option_d" v-if="value.option_d != ''" @click="doAnswer(key, 4)">
              <img src="/static/img/no_select.png" ref="img">
              <span>{{ value.option_d }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      list: [],
      time: 20,
      timer: '',
      currentQue: 0,
      isClick: false,
      userId: this.$handler.getCookie('userId') || 194
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.findAllSubject, {
      userId: this.userId,
      levelId: this.$route.params.level_id
    }).then(res => {
      console.log(res)
      this.list = res.data.body
      this.timer = setInterval(() => {
        this.time--
        if (this.time < 0) {
          this.time = 20
          this.currentQue++
        }
      }, 1000)
    })
  },
  methods: {
    doAnswer(key, answerOption) {
      // key: 当前第几题
      // answerOption: 玩家回答的选项
      if (this.isClick) return
      this.isClick = true
      clearInterval(this.timer)
      if (this.list[key].option_answer == answerOption) {
        this.$refs.img[answerOption - 1].src = '/static/img/right.png'
      } else {
        this.$refs.img[answerOption - 1].src = '/static/img/error.png'
      }
      this.sumbit(this.list[key].question_id, answerOption)
      setTimeout(() => {
        this.isClick = false
        this.currentQue++
        this.time = 20
        this.timer = setInterval(() => {
          this.time--
          if (this.time < 0) {
            this.time = 20
            this.currentQue++
          }
        }, 1000)
      }, 3000)
    },
    sumbit(questionId, answerOption) {
      // questionId: 题目编号
      // answerOption: 玩家回答的选项
      console.log(questionId, answerOption)
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.toanswer, {
        userId: this.userId,
        answerOption: answerOption,
        questionId: questionId
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #275fb2;
.main {
  background-image: url(/static/img/subject.png);
  position: absolute;
  top: 5vw;
  left: 0;
  width: 100%;
  height: 136vw;
}

.time {
  position: absolute;
  left: 39vw;
  top: 13vw;
  width: 22vw;
  height: 22vw;
  line-height: 22vw;
  text-align: center;
  color: #fff;
  font-size: 11vw;
  font-weight: bold;
  font-family: Arial;
}

.container {
  position: absolute;
  width: 70vw;
  height: 80vw;
  overflow: auto;
  left: 15vw;
  top: 36vw;
  font-weight: bold;
  li > div {
    opacity: 0;
    animation: fadeIn 1s 0.2s forwards;
  }
  .current {
    font-size: 5vw;
    color: $color;
  }
  .title {
    font-size: 15px;
    color: $color;
  }
  div[class^="option"] {
    margin-top: 2.5vw;
  }
  img {
    width: 8vw;
    height: 8vw;
    vertical-align: top;
    transform: translateY(-2px);
  }
  span {
    display: inline-block;
    width: 59vw;
    font-size: 14px;
  }
}
</style>
