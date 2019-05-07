<template>
  <div class="main">
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="result">
      <div>
        <div class="num" v-text="score"></div>
        <div>获得积分</div>
      </div>
      <div>
        <div class="num" v-text="correct"></div>
        <div>正确/错误</div>
      </div>
    </div>
    <div class="route">
      <button @click="continueTrain" v-show="!isFlaunt"></button>
      <button @click="doFlaunt" v-show="!isFlaunt"></button>
      <button @click="backHome"></button>
    </div>
    <div class="answerDetail" v-show="!isFlaunt">
      <img class="icon" src="~img/finishTraining_01.png">
      <br>
      <img
        src="~img/finishTraining_02.png"
        class="arrow"
        :class="{active: detail_isShow}"
        @click="showDetail"
      >
      <div class="detail" v-show="detail_isShow">
        <img src="~img/finishTraining_03.png">
        <div class="subject_answer">
          <ul>
            <li v-for="(value, key) in list" :key="key">
              <img class="rank" :src="imgs[key]" alt>
              <div class="question">
                <div class="question_content">{{value.question_content}}</div>
                <ul>
                  <li class="option">
                    <img src="~img/right.png" alt>
                    <span class="content" v-text="content_rightArr[key]"></span>
                  </li>
                  <li class="option" v-if="content_rightArr[key] != content_wrongArr[key]">
                    <img src="~img/wrong.png" alt>
                    <span class="content" v-text="content_wrongArr[key]"></span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <img
          src="~img/finishTraining_09.png"
          onclick="location.href = 'https://wechat-qa.lillyadmin.cn/iDoctorWeChat/ContentArea/Article?wechatid=27&contentAreaModuleId=103&moduleType=ArticleList&contentAreaMPId=1'"
        >
        <img
          src="~img/finishTraining_10.png"
          onclick="location.href = 'https://wechat-qa.lillyadmin.cn/idoctorwechat/medinfosearch/Main?event=MenuClick&wechatid=27&_Callback=1'"
        >
      </div>
    </div>
    <div class="share" v-show="flaunt" @click="flaunt = 0">
      <img src="~img/share.png" alt>
    </div>
  </div>
</template>

<script>
import common from './mixins/common.js'
import flauntJs from './mixins/flaunt.js'
export default {
  mixins: [common, flauntJs],
  data() {
    return {
      correct: this.$route.query.correct + '/' + (5 - this.$route.query.correct),  // 正确题数
      score: this.$route.query.score,  // 获得积分
      detail_isShow: 0,  // 显示答题详情
      list: [],
      imgs: [require('img/finishTraining_04.png'), require('img/finishTraining_05.png'), require('img/finishTraining_06.png'), require('img/finishTraining_07.png'), require('img/finishTraining_08.png')],
      content_rightArr: [],  // 答题详情中答对的答案
      content_wrongArr: []   // 答题详情中答错的答案
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + 'api/pk/getlastestresult', {
      userId: this.user_id
    }).then(res => {
      this.list = res.data.body.reverse()
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].option_answer == 1) {
          this.content_rightArr.push(this.list[i].option_a)
        } else if (this.list[i].option_answer == 2) {
          this.content_rightArr.push(this.list[i].option_b)
        } else if (this.list[i].option_answer == 3) {
          this.content_rightArr.push(this.list[i].option_c)
        } else if (this.list[i].option_answer == 4) {
          this.content_rightArr.push(this.list[i].option_d)
        }

        if (this.list[i].answer_option == 1) {
          this.content_wrongArr.push(this.list[i].option_a)
        } else if (this.list[i].answer_option == 2) {
          this.content_wrongArr.push(this.list[i].option_b)
        } else if (this.list[i].answer_option == 3) {
          this.content_wrongArr.push(this.list[i].option_c)
        } else if (this.list[i].answer_option == 4) {
          this.content_wrongArr.push(this.list[i].option_d)
        } else {
          this.content_wrongArr.push('未作答')
        }
      }
    })
  },
  methods: {
    continueTrain() {
      this.beforeJump(() => this.$router.push('train'))
    },
    showDetail(e) {
      this.detail_isShow = !this.detail_isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("~img/finishTraining.png");
  height: 138vw;
}

.result {
  padding: 60vw 15vw 0;
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  > div {
    text-align: center;
    width: 50%;
    .num {
      font-size: 8vw;
    }
  }
}

.route {
  text-align: center;
  button {
    width: 60vw;
    height: 15vw;
    &:first-child {
      background-image: url("~img/continue.png");
      margin-top: 2vw;
    }
    &:nth-child(2) {
      background-image: url("~img/flaunt.png");
    }
    &:nth-child(3) {
      background-image: url("~img/backhome01.png");
    }
  }
}

.answerDetail {
  text-align: center;
  margin-top: 11vw;
  .icon {
    width: 54vw;
  }
  .arrow {
    width: 10vw;
    &.active {
      transform: rotateZ(180deg);
    }
  }
  .detail {
    margin: 30vw 0 5vw 5vw;
    width: 90vw;
    border: 1vw solid #2761b5;
    border-radius: 10px;
    background-color: #97c6f0;
    padding-bottom: 5vw;
    > img {
      &:first-child {
        width: 70vw;
        margin-top: -25vw;
      }
      &:nth-last-child(-n + 2) {
        width: 40vw;
      }
    }
    .subject_answer {
      .rank {
        width: 10vw;
        margin-left: 2vw;
      }
      > ul > li {
        border-radius: 100px 15px 15px 100px;
        text-align: left;
        width: 86vw;
        background-color: #cbe1f7;
        margin-left: 2vw;
        display: flex;
        align-items: center;
        padding: 4vw 0;
        margin-bottom: 3vw;
      }
      .question {
        width: 69vw;
        margin-left: 3vw;
        display: inline-block;
        color: #2761b5;
        font-weight: bold;
        .question_content {
          font-size: 13px;
        }
        li {
          font-size: 11px;
          line-height: 6vw;
          display: flex;
          align-items: flex-start;
          img {
            width: 6vw;
            height: 6vw;
          }
          .content {
            width: 60vw;
          }
        }
      }
    }
  }
}
</style>
