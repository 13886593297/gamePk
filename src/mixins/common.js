export default {
  data() {
    return {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),  // 是否自动播放音乐
      user_id: this.$route.query.user_id || this.$handler.getStorage('user_id'),  // 玩家ID
      tip_isShow: 0  // 提示窗口是否显示
    }
  },
  methods: {
    audioControl() {
      this.isAutoPlay = !this.isAutoPlay;
      this.$handler.handleMusic("myAudio");
      window.sessionStorage.setItem("isAutoPlay", this.isAutoPlay);
    },
    backHome() {
      this.$handler.handleBtnBgm(() => window.location.href = this.$baseUrl.base)
    },
    closeTip() {
      this.tip_isShow = 0
    }
  }
}