<template>
  <div class="main">
    <audio src="/static/music/index_bg.mp3" loop id="myAudio" :autoplay="autoplay"></audio>
    <audio src="/static/music/button.mp3" id="buttonPlay"></audio>
    <div class="music_btn" @click="audioControl" :class="{play: autoplay, pause: !autoplay}"></div>
    <div class="route">
      <button class="animated" @click="chooseLevel(1)"></button>
      <button class="animated" @click="chooseLevel(2)"></button>
      <button class="animated" @click="chooseLevel(3)"></button>
    </div>
    <div class="modal" v-show="isShow" @click="isShow = 0">
      <img src="~img/projectile_frame_over_two.png" alt ref="img">
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      user_id: this.$handler.getStorage('user_id'),
      level1: 0,
      level2: 0,
      level3: 0,
      isShow: 0
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.count, {
      userId: this.user_id
    }).then((res) => {
      this.level1 = res.data.body['1'] || 0
      this.level2 = res.data.body['2'] || 0
      this.level3 = res.data.body['3'] || 0
    })
  },
  methods: {
    chooseLevel(levelId) {
      if (this.level1 >= 5 && this.level3 >= 5 && this.level3 >= 5) {
        this.isShow = 1
        this.$refs.img.src = require('img/projectile_frame_over.png')
      } else {
        if (levelId == 1 && this.level1 >= 5) {
          this.isShow = 1
        } else if (levelId == 2 && this.level2 >= 5) {
          this.isShow = 1
        } else if (levelId == 3 && this.level3 >= 5) {
          this.isShow = 1
        } else {
          this.beforeJump(() => this.$router.push({ name: 'subject', params: { levelId } }))
        }
      }
    },
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
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(~img/train.png);
  position: absolute;
  top: 10vw;
  left: 0;
  width: 100%;
  height: 140vw;
}

.route {
  position: absolute;
  text-align: center;
  top: 43vw;
  button {
    display: inline-block;
    width: 70vw;
    height: 22vw;
    margin-bottom: 5vw;
    animation-name: fadeInLeft;
    &:first-child {
      background-image: url("~img/train_01.png");
    }
    &:nth-child(2) {
      background-image: url("~img/train_02.png");
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      background-image: url("~img/train_03.png");
      animation-delay: 0.5s;
    }
  }
}
</style>
