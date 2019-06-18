<template>
  <div class="main">
    <audio src="~music/pk_cg.mp3" id="pk_cg"></audio>
    <audio src="~music/pk_sb.mp3" id="pk_sb"></audio>
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="pk_info">
      <div class="user">
        <img class="crown" v-if="isWin == 1" src="~img/crown.png" alt>
        <img class="avatar" :src="user_img">
        <div class="name">{{ user_name }}</div>
        <div class="text">
          <p class="num">当前答题: &nbsp;{{ question_index + '/' + question_amount }}</p>
          <p class="time">累计用时: &nbsp;{{ user_time }}s</p>
        </div>
      </div>
      <div class="opponent">
        <img class="avatar" :src="opponent_img">
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
      <div class="route _center">
        <button @click="continuePk" v-show="!isFlaunt"></button>
        <button @click="doFlaunt" v-show="!isFlaunt"></button>
        <button @click="backHome"></button>
      </div>
    </div>
    <tip-show :tip_isShow='tip_isShow' :closeTip='closeTip' :img='tipImg'></tip-show>
    <v-share :flaunt='flaunt' :closeShare='closeShare'></v-share>
  </div>
</template>
<script>
import common from '@/mixins/common.js'
import flauntJs from '@/mixins/flaunt.js'
export default {
  mixins: [common, flauntJs],
  data() {
    return {
      user_name: this.$handler.getStorage('user_name'),  // 自己名字
      user_img: this.$handler.getStorage('user_img'),  // 自己头像
      opponent_name: this.$route.query.opponent_name,  // 对手名字
      opponent_img: this.$route.query.opponent_img, // 对手头像
      question_index: this.$route.query.question_index,  // 当前答第几题
      question_amount: this.$route.query.question_amount,  // 题目总数
      user_time: this.$route.query.user_time,  // 自己答题时间
      opponent_time: this.$route.query.opponent_time,  // 对手答题时间
      isWin: this.$route.query.isWin,  // 赢或输
      score: this.$route.query.score,  // 获得积分
      result_img: '',  // 根据结果显示不同背景图片
      tipImg: require('img/tankuang_10.png')
    }
  },
  mounted() {
    if (this.isWin == 1) {
      this.result_img = require('img/success.png')
      this.isAutoPlay && this.$handler.handleMusic('pk_cg')
    } else if (this.isWin == 2) {
      this.result_img = require('img/fail.png')
      this.isAutoPlay && this.$handler.handleMusic('pk_sb')
    } else {
      this.result_img = require('img/void.png')
      this.isAutoPlay && this.$handler.handleMusic('pk_sb')
    }
  },
  methods: {
    continuePk() {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.isPK, {
        userId: this.user_id,
        pkType: 1
      }).then(res => {
        if (res.data.code == 0) {
          this.$handler.handleBtnBgm(() => this.$router.push('pk'))
        } else if (res.data.code == 2) {
          // 训练超过10次
          this.tip_isShow = 1
        }
      })
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
  .user,
  .opponent {
    position: relative;
    width: 46vw;
    height: 40vw;
    .avatar {
      position: absolute;
      width: 16vw;
      height: 16vw;
      top: 1vw;
      right: 1vw;
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
    .crown {
      position: absolute;
      width: 14vw;
      height: 14vw;
      top: -9vw;
      left: 37vw;
      border: none;
    }
  }
  .user {
    float: left;
    background-image: url(~img/pk_info01.png);
  }
  .opponent {
    float: right;
    background-image: url(~img/pk_info02.png);
    .avatar {
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
}

.result {
  text-align: center;
  .result_img {
    width: 100vw;
  }
  .score {
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
  .route {
    top: 100vw;
    button {
      width: 60vw;
      height: 15vw;
      &:nth-child(1) {
        background-image: url(~img/result_one.png);
      }
      &:nth-child(2) {
        background-image: url(~img/flaunt.png);
      }
      &:nth-child(3) {
        background-image: url(~img/backhome.png);
      }
    }
  }
}
</style>


