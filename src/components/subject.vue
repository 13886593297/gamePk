<template>
  <div class="main">
    <audio src="~music/time_out.mp3" id="timeOut" loop="loop" :autoplay="autoplay"></audio>
    <audio src="~music/select_click.mp3" id="selectClick"></audio>
    <div class="time">{{ time }}</div>
    <ul class="scrollbar">
      <li v-for="(value, key) in list" :key="key">
        <div v-if="key == question_index">
          <div class="current">{{key + 1}}/{{list.length}}</div>
          <div class="title">{{ value.question_content }}</div>
          <div class="option_a" v-if="value.option_a != ''" @click="doAnswer(1)">
            <img src="~img/no_select.png" ref="img">
            <span ref="text">{{ value.option_a }}</span>
          </div>
          <div class="option_b" v-if="value.option_b != ''" @click="doAnswer(2)">
            <img src="~img/no_select.png" ref="img">
            <span ref="text">{{ value.option_b }}</span>
          </div>
          <div class="option_c" v-if="value.option_c != ''" @click="doAnswer(3)">
            <img src="~img/no_select.png" ref="img">
            <span ref="text">{{ value.option_c }}</span>
          </div>
          <div class="option_d" v-if="value.option_d != ''" @click="doAnswer(4)">
            <img src="~img/no_select.png" ref="img">
            <span ref="text">{{ value.option_d }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="ad" v-if="ad_isShow">
      <img :src="adInfo_img">
      <span v-text="adInfo_value"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      list: [],
      time: 20,  // 倒计时
      timer: '',  // 计时器id
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: '~img/ad_logo01.png',   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  // 广告标语
      user_id: this.$handler.getStorage('user_id'),
      score: 0,  // 得分
      correct: 0  // 正确题目数量
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    init() {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.findAllSubject, {
        userId: this.user_id,
        levelId: this.$route.params.levelId
      }).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.body
          this.intervalHandler()
          this.showAdInfo()
        } else {
          this.backTrain()
        }
      })
    },
    showAdInfo() {
      // 显示广告
      if (this.list[this.question_index].ad_info != null) {
        this.ad_isShow = 1
        this.adInfo_img = this.list[this.question_index].ad_info.ad_img
        this.adInfo_value = this.list[this.question_index].ad_info.ad_content
      }
    },
    intervalHandler() {
      this.timer = setInterval(() => {
        this.time--
        if (this.time < 1) {
          // 未作答时默认答题选项
          this.sumbit(0)
        }
      }, 1000)
    },
    doAnswer(answerOption) {
      // answerOption: 玩家回答的选项
      if (this.isClick) return  // 防止重复点击
      if (this.autoplay) {
        this.$handler.btnPlay('selectClick')
      }
      this.isClick = true
      clearInterval(this.timer)
      if (this.list[this.question_index].option_answer == answerOption) {
        this.$refs.img[answerOption - 1].src = require('img/right.png')
        this.$refs.text[answerOption - 1].style.color = '#2661b4'
        this.correct++
        this.score += this.list[this.question_index].level_score
      } else {
        this.$refs.img[answerOption - 1].src = require('img/wrong.png')
        this.$refs.text[answerOption - 1].style.color = '#fd8900'
      }
      setTimeout(() => {
        this.sumbit(answerOption)
        this.isClick = false
        this.intervalHandler()
      }, 3000)
    },
    sumbit(answerOption) {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.toanswer, {
        userId: this.user_id,  // 玩家id
        answerOption: answerOption,  // 玩家回答的选项
        questionId: this.list[this.question_index].question_id  // 题目id
      }).then((res) => {
        // 全部题目答完后
        if (this.question_index + 1 == this.list.length) {
          clearInterval(this.timer)
          this.$router.push({
            name: 'finishTraining',
            query: {
              user_id: this.user_id,
              score: this.score,
              correct: this.correct
            }
          })
        } else {
          this.time = 20
          this.question_index++
          this.showAdInfo()
        }
      })
    },
    backTrain() {
      this.$router.push('train')
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #275fb2;
.main {
  background-image: url(~img/subject.png);
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
ul {
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
.ad {
  position: absolute;
  background-image: url(~img/foot.png);
  height: 8vw;
  width: 80vw;
  top: 138vw;
  left: 10vw;
  img {
    position: absolute;
    width: 18vw;
    left: 1.5vw;
    top: 1.5vw;
  }
  span {
    position: absolute;
    display: inline-block;
    left: 28vw;
    width: 50vw;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    top: 1.2vw;
  }
}
</style>