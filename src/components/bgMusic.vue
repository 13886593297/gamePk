<template>
  <div>
    <audio src="~music/index_bg.mp3" loop id="myAudio" :autoplay="isAutoPlay"></audio>
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="music_btn" :class="{play: isAutoPlay, pause: !isAutoPlay}" :style='{ top: top }' @click="audioControl"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay'))  // 是否自动播放音乐
    }
  },
  props: {
    top: String
  },
  methods: {
    audioControl() {
      this.isAutoPlay = !this.isAutoPlay
      this.$handler.handleMusic("myAudio")
      window.sessionStorage.setItem("isAutoPlay", this.isAutoPlay)
    }
  }
};
</script>
