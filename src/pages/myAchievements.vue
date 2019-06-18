<template>
  <div class="main">
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <img class="head" :src="list.user_img">
    <div class="user_detail">
      <span id="name">{{ list.user_name || '' }}</span>
      <ul>
        <li>
          <img src="~img/myAchievements_01.png">
          <br>
          <span>{{ list.pk_count || 0 }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_03.png">
          <br>
          <span>{{ (list.user_rate || 0) + '%' }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_02.png">
          <br>
          <span>{{ list.pk_win_count || 0 }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_04.png">
          <br>
          <span>{{ list.user_score || 0 }}</span>
        </li>
      </ul>
    </div>
    <div class="route _center">
      <button @click="doFlaunt" v-show="!isFlaunt"></button>
      <button @click="backHome"></button>
    </div>
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
      list: {}
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.pkInfo, {
      userId: this.user_id,
    }).then(res => {
      this.list = res.data.body
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("~img/myAchievements.png");
  top: 10vw;
  left: 8vw;
  width: 86vw;
  height: 112vw;
  .head {
    position: absolute;
    left: 31.5vw;
    top: 2.5vw;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }
  #name {
    color: #2761b5;
    font-size: 16px;
  }
  .user_detail {
    position: absolute;
    width: 54vw;
    height: 60vw;
    left: 15vw;
    top: 33vw;
    text-align: center;
    font-size: 5vw;
    ul {
      overflow: hidden;
      margin-top: 12vw;
      li {
        width: 50%;
        height: 15vw;
        float: left;
        padding-bottom: 2vw;
        img {
          width: 21vw;
        }
        span {
          color: #ad1043;
          font-size: 6vw;
          font-weight: bold;
        }
      }
    }
  }
  .route {
    top: 115vw;
    button {
      width: 58vw;
      height: 15vw;
      &:first-child {
        background-image: url("~img/flaunt.png");
      }
      &:nth-child(2) {
        background-image: url("~img/backhome01.png");
      }
    }
  }
}
</style>
