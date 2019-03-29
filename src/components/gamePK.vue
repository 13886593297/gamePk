<template>
  <div class="main">
    <div class="choose">
      <img src="/static/img/totalPk_01.png" alt>
    </div>
    <div class="route">
      <router-link to="/onLinePk"></router-link>
      <router-link :to="{name:'trainAnswer', params: {level_id: 2}}"></router-link>
      <router-link :to="{name:'trainAnswer', params: {level_id: 3}}"></router-link>
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
  background-image: url("/static/img/p03_bg.jpg");
}

.choose {
  text-align: center;
  padding: 49vw 0 10vw;
  img {
    width: 70vw;
  }
}

.route {
  position: absolute;
  bottom: 20vh;
  padding-left: 10vw;
  a {
    width: 80vw;
    height: 19vw;
    transform: translate(-3000px);
    display: block;
    margin-bottom: 8vw;
    &:first-child {
      animation: bounceInLeft 1s 0.1s 1 forwards;
      background: url("/static/img/totalPk_02.png") no-repeat;
      background-size: 100%;
    }
    &:nth-child(2) {
      animation: bounceInLeft 1s 1.1s 1 forwards;
      background: url("/static/img/totalPk_03.png") no-repeat;
      background-size: 100%;
    }
    &:nth-child(3) {
      animation: bounceInLeft 1s 2.1s 1 forwards;
      background: url("/static/img/totalPk_04.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>
