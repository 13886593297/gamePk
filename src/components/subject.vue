<template>
  <div class="main">
    <div class="time">{{ time }}</div>
    <div class="container scrollbar">
      <ul>
        <li v-for="(value, key) in list" :key="key">
          <div v-if="key == question_index">
            <div class="current">{{key + 1}}/{{list.length}}</div>
            <div class="title">{{ value.question_content }}</div>
            <div class="option_a" v-if="value.option_a != ''" @click="doAnswer(1)">
              <img src="/static/images/no_select.png" ref="img">
              <span>{{ value.option_a }}</span>
            </div>
            <div class="option_b" v-if="value.option_b != ''" @click="doAnswer(2)">
              <img src="/static/images/no_select.png" ref="img">
              <span>{{ value.option_b }}</span>
            </div>
            <div class="option_c" v-if="value.option_c != ''" @click="doAnswer(3)">
              <img src="/static/images/no_select.png" ref="img">
              <span>{{ value.option_c }}</span>
            </div>
            <div class="option_d" v-if="value.option_d != ''" @click="doAnswer(4)">
              <img src="/static/images/no_select.png" ref="img">
              <span>{{ value.option_d }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="ad" v-if="isShow">
      <img :src="img_adInfo">
      <span v-text="value_adinfo"></span>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      list: [],
      time: 20,  // 倒计时
      timer: '',  // 计时器id
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      isShow: 0,  // 是否显示广告
      img_adInfo: '/static/images/ad_logo01.png',   // 调试用
      value_adinfo: '强效促成骨 提高骨质量 预防再骨折',  // 调试用
      user_id: this.$handler.getStorage('user_id'),
      score: 0,  // 得分
      correct: 0  // 正确题目数量
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.findAllSubject, {
      userId: this.user_id,
      levelId: this.$route.params.levelId
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        this.list = res.data.body
        // 显示广告
        if (this.list[0].ad_info) {
          this.isShow = 1
          this.img_adInfo = this.list[0].ad_info.ad_img
          this.value_adinfo = this.list[0].ad_info.ad_content
        }
        this.timer = setInterval(() => {
          this.time--
          if (this.time < 0) {
            // 未作答时默认答题选项
            this.doAnswer(0)
            this.time = 20
            this.question_index++
          }
        }, 1000)
      } else {
        // 达到每日上限
        this.$router.push('train')
      }
    })
  },
  methods: {
    doAnswer(answerOption) {
      // answerOption: 玩家回答的选项
      if (this.isClick) return  // 防止重复点击
      if (answerOption) {
        this.isClick = true
        clearInterval(this.timer)
        if (this.list[this.question_index].option_answer == answerOption) {
          this.$refs.img[answerOption - 1].src = '/static/images/right.png'
          this.correct++
          this.score += this.list[this.question_index].level_score
        } else {
          this.$refs.img[answerOption - 1].src = '/static/images/error.png'
        }
        setTimeout(() => {
          this.isClick = false
          if (this.question_index + 1 < this.list.length) {
            this.question_index++
            this.time = 20
            // 显示广告
            if (this.list[this.question_index].ad_info) {
              this.img_adInfo = this.list[this.question_index].ad_info.ad_img
              this.value_adinfo = this.list[this.question_index].ad_info.ad_content
            }
            this.timer = setInterval(() => {
              this.time--
              if (this.time < 0) {
                // 未作答时默认答题选项
                this.sumbit(this.list[this.question_index].question_id, 0)
                this.time = 20
                this.question_index++
              }
            }, 1000)
          }
        }, 3000)
      }
      this.sumbit(this.list[this.question_index].question_id, answerOption)
    },
    sumbit(questionId, answerOption) {
      // answerOption: 玩家回答的选项
      // questionId: 题目编号
      console.log(questionId, '玩家回答-->', answerOption, '当前第', this.question_index + 1, '题')
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.toanswer, {
        userId: this.user_id,
        answerOption: answerOption,
        questionId: questionId
      }).then((res) => {
        // 全部题目答完后
        if (this.question_index + 1 == this.list.length) {
          setTimeout(() => {
            this.$router.push({ name: 'finishTraining', query: { score: this.score, correct: this.correct } })
          }, 3000)
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
  background-image: url(/static/images/subject.png);
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

.ad {
  position: absolute;
  background-image: url(/static/images/foot.png);
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
