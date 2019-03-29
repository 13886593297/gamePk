<template>
  <div class="main">
    <div class="route">
      <router-link class="animated" :to="{name:'subject', params: {level_id: 1}}"></router-link>
      <router-link class="animated" :to="{name:'subject', params: {level_id: 2}}"></router-link>
      <router-link class="animated" :to="{name:'subject', params: {level_id: 3}}"></router-link>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(/static/img/train.png);
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
  a {
    display: inline-block;
    width: 70vw;
    height: 22vw;
    margin-bottom: 5vw;
    animation-name: fadeInLeft;
    &:first-child {
      background-image: url("/static/img/train_01.png");
    }
    &:nth-child(2) {
      background-image: url("/static/img/train_02.png");
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      background-image: url("/static/img/train_03.png");
      animation-delay: 0.5s;
    }
  }
}
</style>
