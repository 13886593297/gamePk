<template>
  <div>
    <audio src="~music/time_out.mp3" id="timeOut" loop="loop" :autoplay="autoplay"></audio>
    <audio src="~music/select_click.mp3" id="selectClick"></audio>
    <div class="match_info">
      <p>
        本场PK剩余时间：
        <br>
        <span id="remaining_time" v-text="moment(remaining_time)"></span>
      </p>
      <p>
        本场已完成PK人数：
        <span id="person_num">{{ person_num }}</span>
      </p>
      <p>
        累计用时：
        <span id="match_time">{{ match_time }}s</span>
      </p>
    </div>
    <div class="main">
      <div class="time">{{ time }}</div>
      <div class="container scrollbar">
        <ul>
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
      </div>
    </div>
    <div class="ad" v-if="ad_isShow">
      <img :src="adInfo_img">
      <span v-text="adInfo_value"></span>
    </div>
  </div>
</template>
<script>
import common from './mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      pkId: this.$route.query.pkId,
      list: [],
      time: 20,  // 倒计时
      timer: '',  // 计时器id
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: require('img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  // 广告标语
      person_num: 0,  // 本场已完成PK人数
      remaining_time: '3599',  // 本场PK剩余时间
      match_time: 0,  // 累计用时
      match_timer: ''  // 累计用时计时器id
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    clearInterval(this.timer)
    clearInterval(this.match_timer)
  },
  methods: {
    init() {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.questions, {
        userId: this.user_id,
        pkId: this.pkId
      }).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.body.questions
          this.remaining_time = res.data.body.time
          this.person_num = res.data.body.userCount
          this.addTime()
          this.intervalHandler()
          this.showAdInfo()
        } else if (res.data.code == 11) {
          alert("您已经答过题了")
          this.back()
        }
      })
    },
    addTime() {
      this.match_timer = setInterval(() => {
        this.match_time++
        this.remaining_time--
        if (this.remaining_time <= 0) {
          clearInterval(this.match_timer)
        }
      }, 1000)
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
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.toanswerpk, {
        userId: this.user_id,  // 玩家id
        answerOption: answerOption,  // 玩家回答的选项
        questionId: this.list[this.question_index].question_id,  // 题目id
        pkId: this.pkId
      }).then(res => {
        if (res.data.code == 0) {
          // 全部题目答完后
          if (this.question_index + 1 == this.list.length) {
            clearInterval(this.timer)
            clearInterval(this.match_timer)
            alert('您已完成PK邀请答题，请稍后进入PK中心查看结果')
            this.$router.push('pkRecord')
          } else {
            this.time = 20
            this.question_index++
            this.showAdInfo()
          }
        }
      })
    },
    moment(time) {
      var h = parseInt(time / 3600)
      var m = parseInt(time % 3600 / 60)
      var s = parseInt(time % 3600 % 60)
      return h + "h" + m + "m" + s + "s"
    },
    back() {
      this.$router.push('gamePK')
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #275fb2;
.match_info {
  background-image: url(~img/fightAgainst_01.png);
  position: absolute;
  right: 0;
  width: 45vw;
  height: 25vw;
  top: 12vw;
  padding: 6vw 5vw 5vw 10vw;
  p {
    font-size: 4vw;
    color: #2860b4;
    text-align: right;
    font-weight: bold;
    &:nth-child(1) {
      text-align: center;
      padding-left: 3vw;
    }
  }
}

.main {
  background-image: url(~img/fightAgainst.png);
  position: absolute;
  top: 33vw;
  left: 0;
  width: 100%;
  height: 130vw;
}
.time {
  position: absolute;
  left: 41vw;
  top: 15vw;
  width: 24vw;
  height: 23vw;
  line-height: 22vw;
  text-align: center;
  color: #fff;
  font-size: 11vw;
  font-weight: bold;
  font-family: Arial;
}
.container {
  position: absolute;
  width: 75vw;
  height: 80vw;
  overflow: auto;
  left: 15vw;
  top: 39vw;
  font-weight: bold;
  ul {
    width: 70vw;
    li {
      > div {
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
  }
}
.ad {
  position: absolute;
  background-image: url(~img/foot.png);
  height: 8vw;
  width: 80vw;
  top: 163vw;
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