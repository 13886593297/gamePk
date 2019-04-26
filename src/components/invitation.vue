<template>
  <div class="main">
    <audio src="/static/music/button.mp3" id="buttonPlay"></audio>
    <p class="text">
      邀请您参加
      <br>《乐拼王者》
      <br>糖尿病知识答题
      <br>精彩活动
    </p>
    <div class="game_begin">
      <img src="~img/invitation_01.png" @click="game_begin">
      <div id="qrcode">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
    <div class="share" v-show="flaunt" @click="flaunt = 0">
      <img src="~img/share.png" alt>
    </div>
    <div class="modal" v-show="isShow" @click="isShow = 0">
      <img src="~img/tankuang_10.png" ref="img">
      <div class="one_dialog" v-if="dialogShow">
        <router-link to="/train"></router-link>
        <router-link to="/"></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import QrCodeWithLogo from 'qr-code-with-logo'
export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      user_id: this.$handler.getStorage('user_id'),
      pkId: this.$route.query.pkId,
      flaunt: 1,
      isShow: 0,
      dialogShow: 0
    }
  },
  mounted() {
    if (window.history.length == 1) {
      this.flaunt = 0
    }
    this.qrcode()
  },
  methods: {
    qrcode() {
      QrCodeWithLogo.toCanvas({
        canvas: this.$refs.canvas,
        content: 'window.location.href',
        // content: 'https://pkgame-q.lillyadmin.cn/client/pkgame/html/invitation.html?pkId=' + this.pkId,
        width: 80,
        nodeQrCodeOptions: {
          margin: 0,
        }
      })
    },
    game_begin() {
      if (this.autoplay) {
        this.$handler.btnPlay('buttonPlay')
      }
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.isPK, {
        userId: this.user_id,
        pkId: this.pkId,
        pkType: 2
      }).then(res => {
        if (res.data.code == 0) {
          this.$router.push({
            name: 'fightAgainst',
            query: {
              pkId: this.pkId
            }
          })
        } else if (res.data.code == 2) {
          // 训练超过10次
          this.isShow = 1
        } else if (res.data.code == 7) {
          // 没有认证
          this.isShow = 1
          this.dialogShow = 1
          this.$refs.img.src = require('img/tankuang.png')
        } else if (res.data.code == 11){
          alert('您已经答过该题了，请等待结果')
        } else if (res.data.code == 9) {
          alert('该活动已结束')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  background-image: url(~img/invitation.png);
  position: absolute;
  top: 12vw;
  left: 8vw;
  width: 88vw;
  height: 140vw;
}

p.text {
  margin-top: 40vw;
  margin-left: 16vw;
  width: 44vw;
  padding: 8vw 5vw;
  color: #2860b5;
  font-size: 5vw;
  font-weight: bold;
  text-align: center;
}

.game_begin {
  position: absolute;
  text-align: center;
  width: 97%;
  top: 86vw;
  img {
    width: 45vw;
  }
  #qrcode {
    margin-top: 10vw;
  }
}

.one_dialog {
  position: absolute;
  top: 86vw;
  width: 100%;
  text-align: center;
  z-index: 3;
  a {
    display: inline-block;
    width: 30vw;
    height: 10vw;
  }
}
</style>

