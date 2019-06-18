<template>
  <div class="main">
    <bg-music></bg-music>
    <div class="route _center">
      <button class="animated" @click="chooseLevel(1)"></button>
      <button class="animated" @click="chooseLevel(2)"></button>
      <button class="animated" @click="chooseLevel(3)"></button>
    </div>
    <tip-show :tip_isShow='tip_isShow' :closeTip='closeTip' :img='tipImg'></tip-show>
  </div>
</template>
<script>
import common from '@/mixins/common'
export default {
  mixins: [common],
  data() {
    return {
      level1: 0,
      level2: 0,
      level3: 0,
      tipImg: require('img/projectile_frame_over_two.png'),  // 提示框图片
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.count, {
      userId: this.user_id
    }).then(res => {
      this.level1 = res.data.body['1'] || 0
      this.level2 = res.data.body['2'] || 0
      this.level3 = res.data.body['3'] || 0
    })
  },
  methods: {
    chooseLevel(levelId) {
      if (this.level1 >= 5 && this.level2 >= 5 && this.level3 >= 5) {
        this.tip_isShow = 1
        this.tipImg = require('img/projectile_frame_over.png')
      } else {
        if ((levelId == 1 && this.level1 >= 5) || (levelId == 2 && this.level2 >= 5) || (levelId == 3 && this.level3 >= 5)) {
          this.tip_isShow = 1
        } else {
          this.$handler.handleBtnBgm(() => this.$router.push({ name: 'subject', params: { levelId } }))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(~img/train.png);
  top: 10vw;
  height: 140vw;
  .route {
    top: 43vw;
    button {
      width: 70vw;
      height: 22vw;
      margin-bottom: 5vw;
      animation-name: fadeInLeft;
      &:first-child {
        background-image: url("~img/train_01.png");
      }
      &:nth-child(2) {
        background-image: url("~img/train_02.png");
        animation-delay: 0.25s;
      }
      &:nth-child(3) {
        background-image: url("~img/train_03.png");
        animation-delay: 0.5s;
      }
    }
  }
}
</style>
