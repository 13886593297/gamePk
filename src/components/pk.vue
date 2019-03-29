<template>
  <div class="main">
    <div class="role self">
      <img :src="headImgUrl" alt>
      <span class="name">{{ nickname }}</span>
    </div>
    <div class="role rival">
      <img :src="rivalHeadImgUrl" alt>
      <span class="name">{{ rivalNickname }}</span>
    </div>
    <p class="time">匹配倒计时：{{ time }}s</p>
    <div class="route">
      <router-link to="/totalPk"></router-link>
      <router-link to="/"></router-link>
    </div>
    <div class="tip">当前无对手应战<br>请稍后再来！<i>X</i></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      nickname: this.$storageHandler.getStorage('nickname'),
      headImgUrl: this.$storageHandler.getStorage('headImgUrl'),
      rivalNickname: '',
      rivalHeadImgUrl: '/static/img/default.png',
      time: 61,
      timer: ''
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time--
      if (this.time <= 0) {
        var route = 'main.pkHandler.cancelMatch'
        pomelo.request(route, {}, data => {
          console.log(data)
          clearInterval(this.timer)
        })
      }
    }, 1000)
    var route = 'main.pkHandler.joinRoomMatch'
    pomelo.request(route, {}, data => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/img/onLinePk_bg.jpg");
}

.role {
  img {
    width: 16vw;
    margin-top: 1vw;
    border-radius: 50%;
  }
  transform: translate(-3000px);
  position: absolute;
  width: 43vw;
  height: 18vw;
  line-height: 18vw;
  border: 2px solid #fff;
  color: #fff;
  letter-spacing: 1.5vw;
  &.self {
    top: 17vw;
    border-left: 0;
    animation: slideInLeft 0.5s 0.5s 1 forwards;
    border-radius: 0 40px 40px 0;
    background-color: #bc0000;
    .name,
    img {
      float: right;
      margin-right: 1vw;
    }
  }
  &.rival {
    top: 83vw;
    right: 0;
    border-right: 0;
    animation: slideInRight 0.5s 1.5s 1 forwards;
    border-radius: 40px 0 0 40px;
    background-color: #000;
    .name {
      float: left;
      margin-left: 2vw;
    }
    img {
      float: left;
      margin-left: 1vw;
    }
  }
}

.time {
  position: absolute;
  top: 111vw;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 1s 2.1s 1 forwards;
}

.route {
  opacity: 0;
  animation: fadeIn 1s 2.1s 1 forwards;
  position: absolute;
  top: 120vw;
  width: 100%;
  text-align: center;
  a {
    display: inline-block;
    width: 80vw;
    height: 14vw;
    margin-bottom: 3vw;
    &:first-child {
      background: url(/static/img/onLinePk_01.png) no-repeat;
      background-size: 100%;
    }
    &:nth-child(2) {
      background: url(/static/img/onLinePk_02.png) no-repeat;
      background-size: 100%;
    }
  }
}

.tip {
  position: absolute;
  top: 50vw;
  width: 80vw;
  height: 30vw;
  margin: 0 auto;
  border: 2px solid #fff;
  
}
</style>
