<template>
  <div class="main">
    <div class="route">
      <button class="animated" @click="pkMethod(1)"></button>
      <button class="animated" @click="pkMethod(2)"></button>
      <button class="animated" @click="pkRecord"></button>
      <button class="animated" @click="pkGrade"></button>
    </div>
    <div class="modal" v-show="isShow" @click="isShow = 0">
      <img src="/static/images/tankuang_10.png" ref="img">
      <div class="one_dialog" v-if="dialogShow">
        <router-link to="/train"></router-link>
        <router-link to="/"></router-link>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user_id: this.$handler.getStorage('user_id'),
      isShow: 0,
      dialogShow: 0
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
            this.$router.push('pk')
          } else if (pkType == 2) {
            this.$router.push('fightAgainst')
          }
        } else if (res.data.code == 2) {
          // 训练超过10次
          this.isShow = 1
        } else if (res.data.code == 7) {
          // 没有认证
          this.isShow = 1
          this.dialogShow = 1
          this.$refs.img.src = '/static/images/tankuang.png'
        }
      })
    },
    pkRecord() {
      this.$router.push('pkRecord')
    },
    pkGrade() {
      this.$router.push('pkGrade')
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(/static/images/gamePK.png);
  position: absolute;
  top: 10vw;
  left: 0;
  width: 100%;
  height: 140vw;
}

.route {
  position: absolute;
  text-align: center;
  top: 40vw;
  button {
    display: inline-block;
    width: 70vw;
    height: 21vw;
    animation-name: fadeInLeft;
    &:first-child {
      background-image: url("/static/images/gamePK_01.png");
    }
    &:nth-child(2) {
      background-image: url("/static/images/gamePK_02.png");
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      background-image: url("/static/images/gamePK_03.png");
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      background-image: url("/static/images/gamePK_04.png");
      animation-delay: 0.75s;
    }
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
