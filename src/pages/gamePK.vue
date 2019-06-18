<template>
  <div class="main">
    <bg-music></bg-music>
    <div class="route _center">
      <button class="animated" @click="pkMethod(1)"></button>
      <button class="animated" @click="pkMethod(2)"></button>
      <button class="animated" @click="pkRecord"></button>
      <button class="animated" @click="myAchievements"></button>
    </div>
    <div class="modal" v-show="tip_isShow" @click="tip_isShow = 0">
      <img src="~img/tankuang_10.png" ref="img">
      <div class="one_dialog" v-if="dialog_isShow">
        <router-link to="/train"></router-link>
        <router-link to="/"></router-link>
      </div>
    </div>
    <tip-show :tip_isShow='tip_isShow' :closeTip='closeTip' :img='tipImg' :dialog_isShow='dialog_isShow'></tip-show>
  </div>
</template>
<script>
import common from '@/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      dialog_isShow: 0,
      tipImg: require('img/tankuang_10.png')
    }
  },
  methods: {
    pkMethod(pkType) {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.isPK, {
        userId: this.user_id,
        pkType
      }).then(res => {
        if (res.data.code == 0) {
          if (pkType == 1) {
            this.$handler.handleBtnBgm(() => this.$router.push('pk'))
          } else if (pkType == 2) {
            this.$handler.handleBtnBgm(() => this.$router.push('setpk'))
          }
        } else if (res.data.code == 2) {
          // 训练超过10次
          this.tip_isShow = 1
        } else if (res.data.code == 7) {
          // 没有认证
          this.tip_isShow = 1
          this.dialog_isShow = 1
          this.tipImg = require('img/tankuang.png')
        }
      })
    },
    pkRecord() {
      this.$handler.handleBtnBgm(() => this.$router.push('pkRecord'))
    },
    myAchievements() {
      this.$handler.handleBtnBgm(() => this.$router.push({
        name: 'myAchievements',
        query: {
          user_id: this.user_id
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(~img/gamePK.png);
  top: 10vw;
  height: 140vw;
  .route {
    top: 40vw;
    button {
      width: 70vw;
      height: 21vw;
      animation-name: fadeInLeft;
      &:first-child {
        background-image: url("~img/gamePK_01.png");
      }
      &:nth-child(2) {
        background-image: url("~img/gamePK_02.png");
        animation-delay: 0.25s;
      }
      &:nth-child(3) {
        background-image: url("~img/gamePK_03.png");
        animation-delay: 0.5s;
      }
      &:nth-child(4) {
        background-image: url("~img/gamePK_04.png");
        animation-delay: 0.75s;
      }
    }
  }
}
</style>
