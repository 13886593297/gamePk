<template>
  <div class="main">
    <div class="result">
      <div>
        <span class="big" v-text="totalTime"></span>
        <span>用时</span>
      </div>
      <div>
        <span class="big" v-text="correctNum"></span>
        <span>正确</span>
      </div>
      <div>
        <span class="big" v-text="addPoint"></span>
        <span>积分</span>
      </div>
    </div>
    <div class="route">
      <router-link to="/train"></router-link>
      <router-link to="/train"></router-link>
      <router-link to="/"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalTime: '10s',
      correctNum: 0,
      addPoint: 0
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.totalTime = Math.floor((this.$route.params.trainObj.totalTime - this.$route.params.trainObj.buffer * this.$route.params.trainObj.questionLength) / 1000) + 's'
    this.correctNum = this.$route.params.trainObj.correctNum
    this.addPoint = '+' + this.$route.params.trainObj.addPoint
    if (this.correctNum == 0) {
      document.querySelector('.main').classList.add('main1')
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/img/trainFinish_bg1.jpg");
}

.main1 {
  background-image: url("/static/img/trainFinish_bg2.jpg");
}

.result {
  padding: 45vw 8vw 0 11vw;
  display: flex;
  justify-content: center;
  div {
    text-align: center;
    width: 50%;
    .big {
      font-size: 30px;
      font-weight: 600;
      margin: 4vw 0 1vw;
      display: block;
      color: #bc0000;
    }
  }
}

.route {
  padding-left: 22vw;
  padding-top: 4vw;
  a {
    width: 55vw;
    height: 16vw;
    display: inline-block;
    &:first-child {
      background: url("/static/img/trainFinish_01.png") no-repeat;
      background-size: 100%;
    }
    &:nth-child(2) {
      background: url("/static/img/trainFinish_02.png") no-repeat;
      background-size: 100%;
    }
    &:nth-child(3) {
      background: url("/static/img/trainFinish_03.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>
