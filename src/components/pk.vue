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
        <div class="text" ref="text">匹配倒计时：{{ countNum }} s</div>
        <router-link to="/gamePK"></router-link>
        <router-link to="/"></router-link>
      </div>
      <img src="/static/images/pk_03.png" alt>
    </div>
    <div class="march">
      
    </div>
    <div class="modal" v-show="isShow" @click="isShow = 0">
      <img src="/static/images/tankuang_10.png" ref="img">
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user_id: this.$handler.getStorage('user_id'),
      loadShow: 1,  // 默认显示loading区域，匹配到对手后隐藏
      user_name: this.$handler.getStorage('user_name'),
      user_img: this.$handler.getStorage('user_img'),
      opponent_name: '',
      opponent_img: '/static/images/wait_person.png',
      countNum: 10,  // 倒计时
      socket: '',
      isShow: 0,
      data: ''
    }
  },
  mounted() {
    this.init()
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
        this.countNum = this.data.s
      } else if (this.data.c == 1) {
        this.opponent_name = this.data.u2.userName
        this.opponent_img = this.data.u2.userImg.replace('/Images', '/static/images')
        this.$refs.text.innerHTML = 'PK进行中... ...'
        setTimeout(() => {
          this.send('{"c":1}')
        }, 2000)
      } else if (this.data.c == 2) {
        // 没有对手
      } else if (this.data.c == 4) {
        this.loadShow = 0
      }
    },
    send(params) {
      this.socket.send(params)
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
</style>
