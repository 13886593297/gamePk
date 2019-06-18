<template>
  <div>
    <audio src="~music/time_out.mp3" id="timeOut" loop="loop" :autoplay="isAutoPlay"></audio>
    <audio src="~music/select_click.mp3" id="selectClick"></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay'))  // 是否自动播放音乐
    }
  }
};
</script>
