<template>
  <div>
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
      <img src="/static/images/pk_03.png" alt>
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
            <li v-for="(v, i) in option" :key="i" @click="doAnswer(i)">
              <img src="/static/images/no_select.png" alt ref="select">
              <div class="option" ref="option">{{ v }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="modal" v-show="isShow">
      <img src="/static/images/wait.png" ref="img">
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user_id: this.$handler.getStorage('user_id'),
      loadShow: 1,  // 默认显示loading区域，匹配到对手后隐藏
      user_name: this.$handler.getStorage('user_name'),  // 自己名字
      user_img: this.$handler.getStorage('user_img'),  // 自己头像
      opponent_name: '',  // 对手名字
      opponent_img: '/static/images/wait_person.png', // 对手头像
      match_countdown: 10,  // 匹配倒计时 
      socket: '',  // websocket
      isShow: 0,  // 显示正在答题弹窗
      data: '',  // socket返回的数据
      question_index: 1,  // 当前答第几题
      question_amount: 5,  // 题目总数
      user_time: 0,  // 自己答题时间
      opponent_time: 0,  // 对手答题时间
      ad_info: {  // 广告
        ad_img: '',
        ad_content: ''
      },
      pk_countdown: 20,
      question_id: '',
      question_content: '',
      option_answer: '',
      option: [],
      no_select: ''
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      this.socket = new WebSocket('wss:' + this.$baseUrl.basePk + this.$baseUrl.pk + this.user_id)
      this.socket.onmessage = this.getMessage
    },
    getMessage(msg) {
      this.data = JSON.parse(msg.data)
      console.log(this.data)
      if (this.data.c == 0) {
        this.match_countdown = this.data.s
      } else if (this.data.c == 1) {
        this.opponent_name = this.data.u2.userName
        if (this.data.u2.userImg == '/Images/robot.png') {
          this.opponent_img = '/static/images/robot.png'
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
        this.question_index = this.data.cc
        this.question_amount = this.data.ct
        this.ad_info = this.data.q.ad_info
        this.question_id = this.data.q.question_id
        this.question_content = this.data.q.question_content
        this.option_answer = this.data.q.option_answer
        this.option = [this.data.q.option_a, this.data.q.option_b, this.data.q.option_c, this.data.q.option_d]
        try {
          this.$refs.select.forEach((v, i) => {
            v.src = '/static/images/no_select.png'
          })
          this.$refs.option.forEach((v, i) => {
            v.style.color = '#000'
          })
        } catch (err) { }
      } else if (this.data.c == 5) {
        this.user_time = this.data.t1
        this.opponent_time = this.data.t2
        this.pk_countdown = this.data.s
        if (this.pk_countdown <= 1) {
          this.send('{"c":5,"questionId":' + this.question_id + ',"answerOption":' + 0 + ',"cc":' + this.question_index + '}')
        }
      } else if (this.data.c == 6) {
        this.isShow = 0
        this.user_time = this.data.t1
        this.opponent_time = this.data.t2
      }
    },
    send(params) {
      this.socket.send(params)
    },
    doAnswer(id) {
      this.isShow = 1
      this.send('{"c":5,"questionId":' + this.question_id + ',"answerOption":' + id + 1 + ',"cc":' + this.question_index + '}')
      if (id + 1 == this.option_answer) {
        this.$refs.select[id].src = '/static/images/right.png'
        this.$refs.option[id].style.color = '#2661b4'
      } else {
        this.$refs.select[id].src = '/static/images/error.png'
        this.$refs.option[id].style.color = '#fd8900'
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
        background-image: url(/static/images/avatar_bg.png);
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
      background-image: url(/static/images/pk_01.png);
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
      background-image: url(/static/images/pk_02.png);
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
          background-image: url(/static/images/back_pk.png);
        }
        &:nth-of-type(2) {
          background-image: url(/static/images/backhome.png);
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
        background-image: url(/static/images/pk_info01.png);
        img {
          right: 1vw;
        }
      }
      &:nth-child(2) {
        float: right;
        background-image: url(/static/images/pk_info02.png);
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
    background-image: url(/static/images/pk_bg.png);
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
</style>
