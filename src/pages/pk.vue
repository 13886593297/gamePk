<template>
  <div class="main">
    <answer-music></answer-music>
    <div class="load" v-if="loading_isShow">
      <div class="user">
        <span>{{ user_name }}</span>
        <div>
          <img :src="user_img">
        </div>
      </div>
      <div class="opponent">
        <span>{{ opponent_name }}</span>
        <div>
          <img :src="opponent_img">
        </div>
      </div>
      <div class='route _center'>
        <div class="text" ref="text">匹配倒计时：{{ match_countdown }} s</div>
        <router-link to="/gamePK"></router-link>
        <router-link to="/"></router-link>
      </div>
      <img src="~img/pk_03.png" alt>
    </div>
    <div class="pk_area" v-if="!loading_isShow">
      <div class="pk_info">
        <div class="user">
          <img class="avatar" :src="user_img">
          <div class="name">{{ user_name }}</div>
          <div class="text">
            <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
            <p class="time">累计用时: &nbsp;{{ user_time }}s</p>
          </div>
        </div>
        <div class="opponent">
          <img class="avatar" :src="opponent_img">
          <div class="name">{{ opponent_name }}</div>
          <div class="text">
            <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
            <p class="time">累计用时: &nbsp;{{ opponent_time }}s</p>
          </div>
        </div>
      </div>
      <div class="pk_content">
        <span class="count_down">{{ pk_countdown }}</span>
        <div class="answer_area">
          <div class="answer_area_li">
            <div class="answer_title">{{ question_content }}</div>
            <ul ref="option">
              <v-option 
                v-for="(v, i) in option" 
                :key="i" 
                :doAnswer='() => doAnswer(i + 1)' 
                :img="require('img/no_select.png')" 
                :text='v'
                :spanWidth='spanWidth'
              >
              </v-option>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ad-vertise :ad_isShow='ad_isShow' :adInfo_img='adInfo_img' :adInfo_value='adInfo_value'></ad-vertise>
    <div class="modal" v-show="tip_isShow">
      <img src="~img/wait.png">
    </div>
  </div>
</template>
<script>
import common from '@/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      loading_isShow: 1,  // 默认显示loading区域，匹配到对手后隐藏
      user_name: this.$handler.getStorage('user_name'),  // 自己名字
      user_img: this.$handler.getStorage('user_img'),  // 自己头像
      opponent_name: '',  // 对手名字
      opponent_img: require('img/wait_person.png'), // 对手头像
      match_countdown: 10,  // 匹配倒计时 
      socket: '',  // websocket
      data: '',  // socket返回的数据
      question_index: 1,  // 当前答第几题
      question_amount: 5,  // 题目总数
      user_time: 0,  // 自己答题时间
      opponent_time: 0,  // 对手答题时间
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: require('img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  //  
      pk_countdown: 20,  // 答题倒计时
      question_id: '',  // 题目id
      question_content: '',  // 题目标题
      option_answer: '',  // 题目正确答案
      option: [],  // 题目选项
      isWin: '',  // 1 赢   2 输   3 无效
      score: '',  // 获得积分
      spanWidth: '56vw'  // 答案区域宽度
    }
  },
  mounted() {
    this.init()
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.isPK, {
      userId: this.user_id,
      pkType: 1
    }).then(res => {
      // 训练超过10次
      res.data.code == 2 && this.$router.push('gamePK')
    })
  },
  destroyed() {
    this.close()
  },
  methods: {
    init() {
      this.socket = new WebSocket('wss:' + this.$baseUrl.basePk + this.$baseUrl.pk + this.user_id)
      this.socket.onmessage = this.getMessage
    },
    getMessage(msg) {
      this.data = JSON.parse(msg.data)
      if (this.data.c == 0) {
        this.match_countdown = this.data.s
      } else if (this.data.c == 1) {
        this.opponent_name = this.data.u2.userName
        if (this.data.u2.userImg == '/Images/robot.png') {
          this.opponent_img = require('img/robot.png')
        } else {
          this.opponent_img = this.data.u2.userImg
        }
        this.$refs.text.innerHTML = 'PK进行中... ...'
        setTimeout(() => {
          this.send('{"c":1}')
        }, 2000)
      } else if (this.data.c == 2) {
        // 没有对手
      } else if (this.data.c == 4) {
        this.loading_isShow = 0
        this.tip_isShow = 0
        if (this.data.q.ad_info != null) {
          this.ad_isShow = 1
          this.adInfo_img = this.data.q.ad_info.ad_img
          this.adInfo_value = this.data.q.ad_info.ad_content
        }
        this.question_index = this.data.cc
        this.question_amount = this.data.ct
        this.ad_info = this.data.q.ad_info
        this.question_id = this.data.q.question_id
        this.question_content = this.data.q.question_content
        this.option_answer = this.data.q.option_answer
        this.option = [this.data.q.option_a, this.data.q.option_b, this.data.q.option_c, this.data.q.option_d]
        try {
          for (let k of this.$refs.option.children) {
            k.children[0].src = require('img/no_select.png')
            k.children[1].style.color = '#000'
          }
        } catch(err) {}
      } else if (this.data.c == 5) {
        this.user_time = this.data.t1
        this.opponent_time = this.data.t2
        this.pk_countdown = this.data.s
        if (this.pk_countdown <= 1) {
          this.send('{"c":5,"questionId":' + this.question_id + ',"answerOption":' + 0 + ',"cc":' + this.question_index + '}')
        }
      } else if (this.data.c == 6 || this.data.c == 7 || this.data.c == 8) {
        this.tip_isShow = 0
        this.user_time = this.data.t1
        this.opponent_time = this.data.t2
        this.score = this.data.s
        if (this.data.c == 6) {
          this.isWin = 1  // 赢
        } else if (this.data.c == 7) {
          this.isWin = 2  // 输
        } else {
          this.isWin = 0  // 无效
        }
        this.close()
        setTimeout(() => {
          this.$router.push({
            name: 'pk_result',
            query: {
              user_id: this.user_id,
              opponent_name: this.opponent_name,
              opponent_img: this.opponent_img,
              question_index: this.question_index,
              question_amount: this.question_amount,
              user_time: this.user_time,
              opponent_time: this.opponent_time,
              isWin: this.isWin,
              score: this.score
            }
          })
        }, 500)
      }
    },
    send(params) {
      this.socket.send(params)
    },
    close() {
      this.socket.close()
    },
    doAnswer(answerOption) {
      this.tip_isShow = 1
      this.isAutoPlay && this.$handler.handleMusic('selectClick')
      setTimeout(() => {
        this.send('{"c":5,"questionId":' + this.question_id + ',"answerOption":' + answerOption + ',"cc":' + this.question_index + '}')
      }, 1000)
      if (this.option_answer == answerOption) {
        this.$refs.option.children[answerOption - 1].children[0].src = require('img/right.png')
        this.$refs.option.children[answerOption - 1].children[1].style.color = '#2661b4'
      } else {
        this.$refs.option.children[answerOption - 1].children[0].src = require('img/wrong.png')
        this.$refs.option.children[answerOption - 1].children[1].style.color = '#fd8900'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.load {
  .user,
  .opponent {
    position: absolute;
    width: 60vw;
    height: 28vw;
    div {
      position: absolute;
      width: 26vw;
      height: 26vw;
      top: 1vw;
      background-image: url(~img/avatar_bg.png);
      img {
        width: 20vw;
        height: 20vw;
        position: absolute;
        top: 2.3vw;
        left: 2.8vw;
        border-radius: 50%;
      }
    }
    span {
      display: inline-block;
      line-height: 26vw;
      font-size: 5vw;
      width: 33vw;
      color: #2761b5;
    }
  }
  .user {
    top: 15vw;
    background-image: url(~img/pk_01.png);
    div {
      right: 0;
    }
    span {
      text-align: right;
    }
  }
  .opponent {
    top: 80vw;
    right: 0;
    background-image: url(~img/pk_02.png);
    div {
      left: 0;
    }
    span {
      margin-left: 27vw;
      text-align: left;
    }
  }
  .route {
    top: 115vw;
    .text {
      margin-bottom: 4vw;
      font-weight: 600;
      font-size: 16px;
      color: #2761b5;
    }
    a {
      display: inline-block;
      width: 56vw;
      height: 15vw;
      &:nth-of-type(1) {
        background-image: url(~img/back_pk.png);
      }
      &:nth-of-type(2) {
        background-image: url(~img/backhome.png);
      }
    }
  }
  > img {
    position: absolute;
    top: 40vw;
    width: 100vw;
  }
}

.pk_area {
  .pk_info {
    position: absolute;
    text-align: center;
    color: #2761b5;
    top: 11vw;
    width: 100vw;
    .user,
    .opponent {
      position: relative;
      width: 46vw;
      height: 40vw;
      .avatar {
        position: absolute;
        width: 16vw;
        height: 16vw;
        top: 1vw;
        right: 1vw;
        border-radius: 50%;
        border: 2px solid #fff;
      }
      .name {
        width: 25vw;
        height: 19vw;
        line-height: 19vw;
        font-size: 5vw;
        text-align: right;
      }
      .text {
        height: 14vw;
        text-align: left;
        padding: 5vw 4vw 0;
      }
    }
    .user {
      float: left;
      background-image: url(~img/pk_info01.png);
    }
    .opponent {
      float: right;
      background-image: url(~img/pk_info02.png);
      .avatar {
        left: 1vw;
      }
      .name {
        margin-left: 21vw;
        text-align: left;
      }
      .text {
        padding: 5vw 0 0 16vw;
      }
    }
    
  }
  .pk_content {
    background-image: url(~img/pk_bg.png);
    position: absolute;
    width: 100vw;
    top: 40vw;
    height: 111vw;
    .count_down {
      width: 22vw;
      height: 22vw;
      left: 39vw;
      top: 2vw;
    }
    .answer_area {
      width: 68vw;
      height: 70vw;
      left: 15vw;
      top: 25vw;
      li {
       span {
          width: 56vw;
        }
      }
    }
  }
}
.ad {
  top: 150vw;
}
</style>
