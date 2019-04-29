<template>
  <div class="main">
    <audio src="~music/index_bg.mp3" loop id="myAudio" :autoplay="autoplay"></audio>
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="music_btn" @click="audioControl" :class="{play: autoplay, pause: !autoplay}"></div>
    <ul class="scrollbar" ref="ul">
      <li v-for="(v, i) in list" :key="i" @click="topkroom(v.type, v.end, v.pkId)">
        <span class="endTime">{{ v.date }}</span>
        <span class="type" v-if="v.type == 1">在线匹配</span>
        <span class="type" v-if="v.type == 2">邀请对战</span>
        <div class="end" v-if="v.end == 1">
          <span class="status">
            <span>{{ v.res }}</span>
            <br>
            <img src="~img/pkRecord_02.png">
          </span>
          <div class="details">
            <span class="time">用时：{{ v.time }}</span>
            <span class="rate">正确率：{{ v.rate }}%</span>
          </div>
        </div>
        <span class="continue" v-if="v.end != 1">进行中... ...</span>
      </li>
    </ul>
    <div class="arrow" @click="clickMore">
      <img src="~img/arrow.png" alt>
    </div>
    <div class="back_home" @click="backHome">
      <img src="~img/backhome.png" alt>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      user_id: this.$handler.getStorage('user_id'),
      list: []
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.record, {
      userId: this.user_id
    }).then(res => {
      if (res.data.code == 0) {
        this.list = res.data.body
      }
    })
  },
  methods: {
    audioControl() {
      this.autoplay = !this.autoplay
      this.$handler.isPlay('myAudio')
      window.sessionStorage.setItem('autoplay', this.autoplay)
    },
    beforeJump(cb) {
      if (this.autoplay) {
        this.$handler.btnPlay('buttonPlay')
      }
      setTimeout(() => cb(), 500)
    },
    topkroom(type, end, pkId) {
      if (type == 2 && end == 1) {
        this.$router.push({
          name: 'pkRoom',
          query: {
            pkId
          }
        })
      }
    },
    clickMore() {
      this.$refs.ul.scrollTop += 60
    },
    backHome() {
      this.beforeJump(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(~img/pkRecord.png);
  position: absolute;
  top: 10vw;
  left: 0;
  width: 100%;
  height: 140vw;
  .arrow {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 120vw;
    img {
      width: 5vw;
    }
  }
  .back_home {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 136vw;
    img {
      width: 60vw;
    }
  }
  ul {
    position: absolute;
    overflow-y: auto;
    width: 70vw;
    height: 68vw;
    top: 45vw;
    left: 15vw;
    font-size: 14px;
    li {
      background-image: url(~img/pkRecord_01.png);
      position: relative;
      height: 16vw;
      margin: 0 2vw 1vw;
      span {
        display: inline-block;
      }
      .continue {
        position: absolute;
        line-height: 16vw;
        text-align: center;
        left: 23vw;
        width: 41vw;
        color: #ae1043;
        font-weight: bold;
      }
      .endTime {
        position: absolute;
        font-size: 8px;
        font-weight: 600;
        color: #fff;
        width: 10vw;
        height: 4vw;
        line-height: 4vw;
        text-align: center;
      }
      .type {
        width: 23vw;
        line-height: 17vw;
        text-align: center;
        font-weight: bold;
        color: #ae1043;
      }
      .end {
        position: absolute;
        height: 100%;
        width: 42vw;
        left: 23vw;
        top: 0;
        .status {
          position: absolute;
          text-align: center;
          padding-top: 5.5vw;
          width: 21vw;
          color: #ae1043;
          font-weight: bold;
          img {
            position: absolute;
            width: 12vw;
            top: 3vw;
            left: 4vw;
          }
        }
        .details {
          position: absolute;
          width: 22vw;
          left: 19vw;
          font-size: 11px;
          color: #898a8a;
          padding-top: 4vw;
        }
      }
    }
  }
}
</style>
