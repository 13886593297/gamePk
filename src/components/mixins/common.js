export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),  // 是否自动播放音乐
      user_id: this.$route.query.user_id || this.$handler.getStorage('user_id'),  // 玩家ID
      tip_isShow: 0  // 提示窗口是否显示
    }
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
    backHome() {
      this.beforeJump(() => this.$router.push('/'))
    },
  }
}