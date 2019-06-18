<template>
  <div class="main">
    <answer-music></answer-music>
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
import common from '@/mixins/common'
export default {
  mixins: [common],
  data() {
    return {
      list: [],
      time: 20,  // 倒计时
      timerId: '',  // 计时器id
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: require('img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  // 广告标语
      score: 0,  // 得分
      correct: 0  // 正确题目数量
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    clearInterval(this.timerId)
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
      this.timerId = setInterval(() => {
        this.time--
        // 未作答时默认答题选项
        this.time < 1 && this.sumbit(0)
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
        this.correct++
        this.score += this.list[this.question_index].level_score
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
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.toanswer, {
        userId: this.user_id,  // 玩家id
        answerOption: answerOption,  // 玩家回答的选项
        questionId: this.list[this.question_index].question_id  // 题目id
      }).then((res) => {
        // 全部题目答完后
        if (this.question_index + 1 == this.list.length) {
          clearInterval(this.timerId)
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
.main {
  background-image: url(~img/subject.png);
  top: 5vw;
  height: 136vw;
  .count_down {
    left: 39vw;
    top: 13vw;
    width: 22vw;
    height: 22vw;
  }
  .answer_area {
    width: 70vw;
    height: 80vw;
    left: 15vw;
    top: 36vw;
  }
}
</style>