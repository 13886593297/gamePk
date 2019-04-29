<template>
  <div class="main">
    <audio src="~music/index_bg.mp3" loop id="myAudio" :autoplay="autoplay"></audio>
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="music_btn" @click="audioControl" :class="{play: autoplay, pause: !autoplay}"></div>
    <img class="head" :src="list.user_img" @click="set">
    <router-link class="tip" to="/setAvatar">点击设置头像</router-link>
    <div class="user_detail">
      <span id="name">{{ list.user_name }}</span>
      <ul>
        <li>
          <img src="~img/me_02.png">
          <br>
          <span>{{ list.week_rank }}</span>
        </li>
        <li>
          <img src="~img/me_01.png">
          <br>
          <span>{{ list.rank }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_01.png">
          <br>
          <span>{{ list.pk_count }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_02.png">
          <br>
          <span>{{ list.pk_win_count }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_04.png">
          <br>
          <span>{{ list.user_score }}</span>
        </li>
        <li>
          <img src="~img/myAchievements_03.png">
          <br>
          <span>{{ list.user_rate + '%' }}</span>
        </li>
      </ul>
    </div>
    <div class="route">
      <button @click="toFlaunt" v-show="!isFlaunt"></button>
      <button @click="backHome"></button>
    </div>
    <div class="share" v-show="flaunt" @click="flaunt = 0">
      <img src="~img/share.png" alt>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      user_id: this.$route.query.user_id,
      list: {},
      flaunt: 0,
      isFlaunt: 0
    }
  },
  mounted() {
    this.$share(this.flaunt)
    if (window.history.length == 1) {
      this.isFlaunt = 1
    }
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.meinfo, {
      userId: this.user_id,
    }).then((res) => {
      this.list = res.data.body
    })
  },
  methods: {
    audioControl() {
      this.autoplay = !this.autoplay
      this.$handler.isPlay('myAudio')
      window.sessionStorage.setItem('autoplay', this.autoplay)
    },
    beforeJump(cb) {
      if (this.autoplay) {
        this.$handler.btnPlay('buttonPlay')
      }
      setTimeout(() => cb(), 500)
    },
    set() {
      this.beforeJump(() => this.$router.push('setAvatar'))
    },
    toFlaunt() {
      this.beforeJump(() => this.flaunt = 1)
    },
    backHome() {
      this.beforeJump(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("~img/myAchievements.png");
  position: absolute;
  top: 13vw;
  left: 8vw;
  width: 86vw;
  height: 112vw;
}

.music_btn {
  left: -5vw;
  top: -8vw;
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
  text-align: center;
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
  width: 54vw;
  height: 60vw;
  padding-left: 15vw;
  padding-top: 33vw;
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
  text-align: center;
  margin-top: 20vw;
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
</style>
