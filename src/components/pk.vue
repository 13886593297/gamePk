<template>
  <div>
    <audio src="~music/time_out.mp3" id="timeOut" loop="loop" :autoplay="autoplay"></audio>
    <audio src="~music/select_click.mp3" id="selectClick"></audio>
    <div class="load" v-if="loadShow">
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
      <div class>
        <div class="text" ref="text">匹配倒计时：{{ match_countdown }} s</div>
        <router-link to="/gamePK"></router-link>
        <router-link to="/"></router-link>
      </div>
      <img src="~img/pk_03.png" alt>
    </div>
    <div class="pk" v-if="!loadShow">
      <div class="pk_info">
        <div class="user">
          <img :src="user_img">
          <div class="name">{{ user_name }}</div>
          <div class="text">
            <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
            <p class="time">累计用时: &nbsp;{{ user_time }}s</p>
          </div>
        </div>
        <div class="opponent">
          <img :src="opponent_img">
          <div class="name">{{ opponent_name }}</div>
          <div class="text">
            <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
            <p class="time">累计用时: &nbsp;{{ opponent_time }}s</p>
          </div>
        </div>
      </div>
      <div class="pk_content">
        <span class="pk_countdown">{{ pk_countdown }}</span>
        <div class="container scrollbar">
          <div class="title">{{ question_content }}</div>
          <ul>
            <li v-for="(v, i) in option" :key="i" @click="doAnswer(i + 1)">
              <img src="~img/no_select.png" alt ref="select">
              <div class="option" ref="option">{{ v }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ad" v-if="ad_isShow">
      <img :src="adInfo_img">
      <span v-text="adInfo_value"></span>
    </div>
    <div class="modal" v-show="isShow">
      <img src="~img/wait.png" ref="img">
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      user_id: this.$handler.getStorage('user_id'),
      loadShow: 1,  // 默认显示loading区域，匹配到对手后隐藏
      user_name: this.$handler.getStorage('user_name'),  // 自己名字
      user_img: this.$handler.getStorage('user_img'),  // 自己头像
      opponent_name: '',  // 对手名字
      opponent_img: require('img/wait_person.png'), // 对手头像
      match_countdown: 10,  // 匹配倒计时 
      socket: '',  // websocket
      isShow: 0,  // 显示正在答题弹窗
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
      score: ''  // 获得积分
    }
  },
  mounted() {
    this.init()
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.isPK, {
      userId: this.user_id,
      pkType: 1
    }).then(res => {
      if (res.data.code == 2) {
        // 训练超过10次
        this.$router.push('gamePK')
      }
    })
  },
  destroyed() {
    this.close()
  },
  methods: {
    init() {
      this.socket = new WebSocket('wss:' + this.$baseUrl.basePk + this.$baseUrl.pk + this.user_id)
      this.socket.onmessage = this.getMessage
      this.socket.onerror = function (e) {
        console.log(e)
      }
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
        this.loadShow = 0
        this.isShow = 0
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
          this.$refs.select.forEach(v => v.src = require('img/no_select.png'))
          this.$refs.option.forEach(v => v.style.color = '#000')
        } catch (err) { }
      } else if (this.data.c == 5) {
        this.user_time = this.data.t1
        this.opponent_time = this.data.t2
        this.pk_countdown = this.data.s
        if (this.pk_countdown <= 1) {
          this.send('{"c":5,"questionId":' + this.question_id + ',"answerOption":' + 0 + ',"cc":' + this.question_index + '}')
        }
      } else if (this.data.c == 6 || this.data.c == 7 || this.data.c == 8) {
        this.isShow = 0
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
    doAnswer(id) {
      this.isShow = 1
      if (this.autoplay) {
        this.$handler.btnPlay('selectClick')
      }
      setTimeout(() => {
        this.send('{"c":5,"questionId":' + this.question_id + ',"answerOption":' + id + ',"cc":' + this.question_index + '}')
      }, 1000)
      if (id == this.option_answer) {
        this.$refs.select[id - 1].src = require('img/right.png')
        this.$refs.option[id - 1].style.color = '#2661b4'
      } else {
        this.$refs.select[id - 1].src = require('img/wrong.png')
        this.$refs.option[id - 1].style.color = '#fd8900'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.load {
  > div {
    &:nth-child(-n + 2) {
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
    &:nth-child(1) {
      top: 15vw;
      background-image: url(~img/pk_01.png);
      div {
        right: 0;
      }
      span {
        text-align: right;
      }
    }
    &:nth-child(2) {
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
    &:nth-child(3) {
      position: absolute;
      text-align: center;
      width: 100vw;
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
  }
  > img {
    position: absolute;
    top: 40vw;
    width: 100vw;
  }
}

.pk {
  .pk_info {
    position: absolute;
    text-align: center;
    color: #2761b5;
    top: 11vw;
    width: 100vw;
    > div {
      &:nth-child(-n + 2) {
        position: relative;
        width: 46vw;
        height: 40vw;
      }
      &:nth-child(1) {
        float: left;
        background-image: url(~img/pk_info01.png);
        img {
          right: 1vw;
        }
      }
      &:nth-child(2) {
        float: right;
        background-image: url(~img/pk_info02.png);
        img {
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
      img {
        position: absolute;
        width: 16vw;
        height: 16vw;
        top: 1vw;
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
  }
  .pk_content {
    background-image: url(~img/pk_bg.png);
    position: absolute;
    text-align: center;
    width: 100vw;
    top: 40vw;
    height: 111vw;
    font-weight: bold;
    .pk_countdown {
      position: absolute;
      font-size: 11vw;
      color: #fff;
      width: 22vw;
      height: 22vw;
      line-height: 22vw;
      left: 39vw;
      top: 2vw;
      font-family: Arial;
    }
    .container {
      padding-left: 15vw;
      margin-top: 25vw;
      text-align: left;
      overflow: auto;
      height: 70vw;
      width: 68vw;
      padding-right: 2vw;
      li {
        margin-top: 2.5vw;
        img {
          width: 8vw;
          height: 8vw;
          vertical-align: top;
          transform: translateY(-2px);
        }
        .option {
          display: inline-block;
          font-size: 14px;
          width: 56vw;
        }
      }
      li.right {
        .option {
          color: #2661b4;
        }
      }
      li.wrong {
        .option {
          color: #fd8900;
        }
      }
    }
  }
}
.ad {
  position: absolute;
  background-image: url(~img/foot.png);
  height: 8vw;
  width: 80vw;
  top: 150vw;
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
