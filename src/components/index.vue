<template>
  <div class="main">
    <div class="music_btn" @click="isPlay" :class="{play: isplay, pause: !isplay}"></div>
    <div class="route">
      <div>
        <router-link to="/train"></router-link>
        <router-link to="/gamePK"></router-link>
        <router-link to="/"></router-link>
      </div>
      <div>
        <router-link to="/"></router-link>
        <router-link to="/"></router-link>
        <router-link to="/rankingList"></router-link>
      </div>
    </div>
    <div class="footer">
      <img src="/static/img/index_07.png" alt class="game_rule" @click="showRule">
      <router-link to="/user"></router-link>
      <div class="role_guize" v-show="show_role">
        <img src="/static/img/role_guize.png">
        <div class="shut" @click="showRule"></div>
      </div>
    </div>
    <div class="examine">PP-LD-CN-1002</div>
  </div>
</template>

<script>
// 引入 vuebus
import Bus from './bus.js'
export default {
  data() {
    return {
      isFixedHead: JSON.parse(window.localStorage.getItem('login')).isFixedHead,
      show_role: 0,
      isplay: 0
    }
  },
  mounted() {
    var _this = this
    Bus.$on('isFixedHead', (e) => {
      _this.isFixedHead = e;
    })
  },
  methods: {
    showRule() {
      this.show_role = !this.show_role
    },
    isPlay() {
      this.isplay = !this.isplay
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-image: url("/static/img/index_bg.jpg");
}

.music_btn {
  position: absolute;
  width: 9vw;
  height: 9vw;
  top: 5vw;
  left: 3vw;
}

.play {
  background-image: url("/static/img/play.png");
}

.pause {
  background-image: url("/static/img/suspend.png");
}

.route {
  position: absolute;
  text-align: center;
  width: 100%;
  top: 122vw;
  div {
    a {
      display: inline-block;
      width: 28vw;
      height: 12vw;
    }
    &:first-child {
      a {
        &:first-child {
          background-image: url("/static/img/index_01.png");
        }
        &:nth-child(2) {
          background-image: url("/static/img/index_02.png");
        }
        &:nth-child(3) {
          background-image: url("/static/img/index_03.png");
        }
      }
    }
    &:nth-child(2) {
      a {
        &:first-child {
          background-image: url("/static/img/index_04.png");
        }
        &:nth-child(2) {
          background-image: url("/static/img/index_05.png");
        }
        &:nth-child(3) {
          background-image: url("/static/img/index_06.png");
        }
      }
    }
  }
}

.footer {
  position: absolute;
  top: 152vw;
  width: 90vw;
  padding: 0 5vw;
  z-index: 1;
  img {
    width: 26vw;
  }
  a {
    background-image: url('/static/img/index_08.png');
    float: right;
    width: 21vw;
    height: 5vw;
  }
  .role_guize {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 4;
    img {
      width: 100vw;
      margin-top: 13vw;
    }
    .shut {
      position: absolute;
      width: 10vw;
      height: 10vw;
      top: 15vw;
      right: 7vw;
    }
  }
}

.examine {
  position: absolute;
  top: 154vw;
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: #275fb2;
}
</style>
