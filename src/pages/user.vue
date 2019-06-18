<template>
  <div class="main">
    <bg-music :top='top'></bg-music>
    <div class="content">
      <img class="head" :src="list.user_img" @click="set">
      <router-link class="tip" to="/setAvatar" v-show="!isFlaunt">点击设置头像</router-link>
      <div class="user_detail">
        <span id="name">{{ list.user_name }}</span>
        <ul>
          <li>
            <img src="~img/me_02.png">
            <br>
            <span>{{ list.week_rank || 0 }}</span>
          </li>
          <li>
            <img src="~img/me_01.png">
            <br>
            <span>{{ list.rank || 0}}</span>
          </li>
          <li>
            <img src="~img/myAchievements_01.png">
            <br>
            <span>{{ list.pk_count || 0}}</span>
          </li>
          <li>
            <img src="~img/myAchievements_02.png">
            <br>
            <span>{{ list.pk_win_count || 0}}</span>
          </li>
          <li>
            <img src="~img/myAchievements_04.png">
            <br>
            <span>{{ list.user_score || 0}}</span>
          </li>
          <li>
            <img src="~img/myAchievements_03.png">
            <br>
            <span>{{ (list.user_rate || 0) + '%' }}</span>
          </li>
        </ul>
      </div>
      <div class="route _center">
        <button @click="doFlaunt" v-show="!isFlaunt"></button>
        <button @click="backHome"></button>
      </div>
      <v-share :flaunt='flaunt' :closeShare='closeShare'></v-share>
    </div>
  </div>
</template>

<script>
import common from '@/mixins/common.js'
import flauntJs from '@/mixins/flaunt.js'
export default {
  mixins: [common, flauntJs],
  data() {
    return {
      list: {},
      top: '5vw'
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.meinfo, {
      userId: this.user_id,
    }).then((res) => {
      this.list = res.data.body
    })
  },
  methods: {
    set() {
      if (this.isFlaunt != 1) {
        this.$handler.handleBtnBgm(() => this.$router.push('setAvatar'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  text-align: center;
  .content {
    position: absolute;
    background-image: url("~img/myAchievements.png");
    top: 10vw;
    left: 8vw;
    width: 86vw;
    height: 112vw;
  }
  .head {
    position: absolute;
    left: 31.5vw;
    top: 2.5vw;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }
  .tip {
    position: absolute;
    left: 0;
    width: 98%;
    top: 25.5vw;
    font-size: 3vw;
    color: #fff;
    z-index: 1;
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
      margin-top: 1vw;
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
