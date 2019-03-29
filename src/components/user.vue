<template>
  <div class="main">
    <img class="head" :src="headImgUrl" @click="set">
    <router-link class="tip" to="/setAvatar">点击设置头像</router-link>
    <div class="user_detail">
      <span id="name">{{ nickname }}</span>
      <ul>
        <li>
          <img src="/static/img/me_02.png">
          <br>
          <span>{{ list.point || 0 }}</span>
        </li>
        <li>
          <img src="/static/img/me_01.png">
          <br>
          <span>{{ list.pkTotal || 0 }}</span>
        </li>
        <li>
          <img src="/static/img/myAchievements_01.png">
          <br>
          <span>{{ list.myRank || 0 }}</span>
        </li>
        <li>
          <img src="/static/img/myAchievements_02.png">
          <br>
          <span>{{ list.pkWin || 0 }}</span>
        </li>
        <li>
          <img src="/static/img/myAchievements_04.png">
          <br>
          <span>{{ list.train || 0 }}</span>
        </li>
        <li>
          <img src="/static/img/myAchievements_03.png">
          <br>
          <span>{{ list.pkWinRate || 0 }}</span>
        </li>
      </ul>
    </div>
    <div class="route">
      <button @click="flaunt = 1"></button>
      <button></button>
    </div>
    <div class="modal" v-show="flaunt" @click="flaunt = 0">
      <img src="/static/img/shape.png" alt="">
    </div>
  </div>
</template>

<script>
// 引入 vuebus
import Bus from './bus.js';
export default {
  data() {
    return {
      nickname: this.$handler.getStorage('nickname'),
      headImgUrl: this.$handler.getStorage('headImgUrl') || '/static/img/default.png',
      list: {},
      flaunt: 0
    }
  },
  mounted() {
    
  },
  methods: {
    set() {
      this.$router.push('setAvatar')
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/img/myAchievements.png");
  position: absolute;
  top: 13vw;
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
      background-image: url("/static/img/flaunt.png");
    }
    &:nth-child(2) {
      background-image: url("/static/img/backhome01.png");
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .8);
  z-index: 1;
  img {
    width: 100vw;
  }
}
</style>
