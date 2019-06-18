<template>
  <div class="main">
    <answer-music></answer-music>
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
    <div class="count_down">{{ time }}</div>
    <ul class="answer_area">
      <li class="answer_area_li" v-for="(value, key) in list" :key="key">
        <div v-if="key == question_index">
          <div class="answer_current">{{key + 1}}/{{list.length}}</div>
          <div class="answer_title">{{ value.question_content }}</div>
          <ul ref='option'>
            <v-option :doAnswer='() => doAnswer(1)' :img="require('img/no_select.png')" :text='value.option_a'></v-option>
            <v-option :doAnswer='() => doAnswer(2)' :img="require('img/no_select.png')" :text='value.option_b'></v-option>
            <v-option :doAnswer='() => doAnswer(3)' :img="require('img/no_select.png')" :text='value.option_c'></v-option>
            <v-option :doAnswer='() => doAnswer(4)' :img="require('img/no_select.png')" :text='value.option_d'></v-option>
          </ul>
        </div>
      </li>
    </ul>
    <ad-vertise :ad_isShow='ad_isShow' :adInfo_img='adInfo_img' :adInfo_value='adInfo_value'></ad-vertise>
  </div>
</template>
<script>
import common from '@/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      pkId: this.$route.query.pkId,
      list: [],
      time: 20,  // 倒计时
      timerId: '',  // 计时器id
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: require('img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  // 广告标语
      person_num: 0,  // 本场已完成PK人数
      remaining_time: '3599',  // 本场PK剩余时间
      match_time: 0,  // 累计用时
      match_timerId: ''  // 累计用时计时器id
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    clearInterval(this.timerId)
    clearInterval(this.match_timerId)
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
      this.match_timerId = setInterval(() => {
        this.match_time++
        this.remaining_time--
        if (this.remaining_time <= 0) {
          clearInterval(this.match_timerId)
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
      this.timerId = setInterval(() => {
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
      this.$handler.isAutoPlay() && this.$handler.handleMusic('selectClick')
      this.isClick = true
      clearInterval(this.timerId)
      if (this.list[this.question_index].option_answer == answerOption) {
        this.$refs.option[0].children[answerOption - 1].children[0].src = require('img/right.png')
        this.$refs.option[0].children[answerOption - 1].children[1].style.color = '#2661b4'
      } else {
        this.$refs.option[0].children[answerOption - 1].children[0].src = require('img/wrong.png')
        this.$refs.option[0].children[answerOption - 1].children[1].style.color = '#fd8900'
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
            clearInterval(this.timerId)
            clearInterval(this.match_timerId)
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
.main {
  background-image: url(~img/fightAgainst.png);
  top: 32vw;
  height: 130vw;
  .match_info {
    background-image: url(~img/fightAgainst_01.png);
    position: absolute;
    right: 0;
    width: 45vw;
    height: 25vw;
    top: -21vw;
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
  .count_down {
    left: 41vw;
    top: 15vw;
    width: 24vw;
    height: 23vw;
  }
  .answer_area {
    width: 75vw;
    height: 80vw;
    left: 15vw;
    top: 39vw;
  }
  .ad {
    top: 130vw;
  }
}
</style>