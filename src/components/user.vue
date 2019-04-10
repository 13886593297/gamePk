<template>
  <div class="main">
    <img class="head" :src="list.user_img" @click="set">
    <router-link class="tip" to="/setAvatar">点击设置头像</router-link>
    <div class="user_detail">
      <span id="name">{{ list.user_name }}</span>
      <ul>
        <li>
          <img src="/static/images/me_02.png">
          <br>
          <span>{{ list.week_rank }}</span>
        </li>
        <li>
          <img src="/static/images/me_01.png">
          <br>
          <span>{{ list.rank }}</span>
        </li>
        <li>
          <img src="/static/images/myAchievements_01.png">
          <br>
          <span>{{ list.pk_count }}</span>
        </li>
        <li>
          <img src="/static/images/myAchievements_02.png">
          <br>
          <span>{{ list.pk_win_count }}</span>
        </li>
        <li>
          <img src="/static/images/myAchievements_04.png">
          <br>
          <span>{{ list.user_score }}</span>
        </li>
        <li>
          <img src="/static/images/myAchievements_03.png">
          <br>
          <span>{{ list.user_rate + '%' }}</span>
        </li>
      </ul>
    </div>
    <div class="route">
      <button @click="flaunt = 1"></button>
      <button @click="backHome"></button>
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
      list: {},
      flaunt: 0
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.meinfo, {
      userId: this.$handler.getStorage('user_id'),
    }).then((res) => {
      console.log(res)
      this.list = res.data.body
    })
  },
  methods: {
    set() {
      this.$router.push('setAvatar')
    },
    backHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/images/myAchievements.png");
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
      background-image: url("/static/images/flaunt.png");
    }
    &:nth-child(2) {
      background-image: url("/static/images/backhome01.png");
    }
  }
}
</style>
