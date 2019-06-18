export default {
  data() {
    return {
      flaunt: 0,  // 是否显示分享弹窗
      isFlaunt: 0  // 是否是分享出去的页面
    }
  },
  mounted() {
    this.$share(() => {
      this.flaunt = 0
    })
    if (window.history.length == 1) {
      this.isFlaunt = 1
    }
  },
  methods: {
    doFlaunt() {
      this.$handler.handleBtnBgm(() => this.flaunt = 1)
    },
    closeShare() {
      this.flaunt = 0
    }
  }
}