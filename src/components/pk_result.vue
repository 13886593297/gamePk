<template>
  <div>
    <div class="pk_info">
      <div class="user">
        <img :src="user_img">
        <div class="name">{{ user_name }}</div>
        <div class="text">
          <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
          <p class="time">累计用时: &nbsp;{{ user_time }}s</p>
        </div>
      </div>
      <div class="opponent">
        <img :src="opponent_img">
        <div class="name">{{ opponent_name }}</div>
        <div class="text">
          <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
          <p class="time">累计用时: &nbsp;{{ opponent_time }}s</p>
        </div>
      </div>
    </div>
    <div class="result">
      <img class="result_img" :src="result_img" alt>
      <p class="score">
        获得达人积分
        <span>{{ score }}</span>
      </p>
      <div class="btn_div">
        <router-link to="/pk" class="continue"></router-link>
        <button @click="flaunt = 1" class="flaunt"></button>
        <router-link to="/" class="backHome"></router-link>
      </div>
    </div>
    <div class="share" v-show="flaunt" @click="flaunt = 0">
      <img src="/static/images/share.png" alt>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_id: this.$handler.getStorage('user_id'),
      user_name: this.$handler.getStorage('user_name'),  // 自己名字
      user_img: this.$handler.getStorage('user_img'),  // 自己头像
      opponent_name: this.$route.query.opponent_name,  // 对手名字
      opponent_img: this.$route.query.opponent_img, // 对手头像
      question_index: this.$route.query.question_index,  // 当前答第几题
      question_amount: this.$route.query.question_amount,  // 题目总数
      user_time: this.$route.query.user_time,  // 自己答题时间
      opponent_time: this.$route.query.opponent_time,  // 对手答题时间
      isWin: this.$route.query.isWin,
      score: this.$route.query.score,
      result_img: '',
      flaunt: 0
    }
  },
  mounted() {
    if (this.isWin == 1) {
      this.result_img = '/static/images/success.png'
    } else if (this.isWin == 2) {
      this.result_img = '/static/images/fail.png'
    } else {
      this.result_img = '/static/images/void.png'
    }
  }
}
</script>
<style lang="scss" scoped>
.pk_info {
  position: absolute;
  text-align: center;
  color: #2761b5;
  top: 11vw;
  width: 100vw;
  > div {
    &:nth-child(-n + 2) {
      position: relative;
      width: 46vw;
      height: 40vw;
    }
    &:nth-child(1) {
      float: left;
      background-image: url(/static/images/pk_info01.png);
      img {
        right: 1vw;
      }
    }
    &:nth-child(2) {
      float: right;
      background-image: url(/static/images/pk_info02.png);
      img {
        left: 1vw;
      }
      .name {
        margin-left: 21vw;
        text-align: left;
      }
      .text {
        padding: 5vw 0 0 16vw;
      }
    }
    img {
      position: absolute;
      width: 16vw;
      height: 16vw;
      top: 1vw;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    .name {
      width: 25vw;
      height: 19vw;
      line-height: 19vw;
      font-size: 5vw;
      text-align: right;
    }
    .text {
      height: 14vw;
      text-align: left;
      padding: 5vw 4vw 0;
    }
  }
}

.result {
  text-align: center;
  .result_img {
    width: 100vw;
  }
  p {
    color: #fff;
    font-size: 4vw;
    position: absolute;
    width: 100%;
    top: 90vw;
    span {
      font-size: 6vw;
      margin-left: 2vw;
    }
  }
  .btn_div {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 100vw;
    a,
    button {
      display: inline-block;
      width: 60vw;
      height: 15vw;
    }
    .continue {
      background-image: url(/static/images/result_one.png);
    }
    .flaunt {
      background-image: url(/static/images/flaunt.png);
    }
    .backHome {
      background-image: url(/static/images/backhome.png);
    }
  }
}
</style>


