<template>
  <div class="main">
    <div class="set_avatar">
      <div class="default_user" @click="changeActive(0)" :class="activeClass == 0 ? 'active' : ''">
        <img class="avatar" :src="headImgUrl">
        <h5>{{ nickname }}</h5>
        <div class="select"></div>
        <div class="tip">
          该选项表面您同意礼来在“希力王者”的PK中心、个人中心和排行榜中使用您的微信昵称和头像，并且“希力王者”的其他参与者亦可以看到并在微信中分享含有您微信昵称和头像的游戏页面。
        </div>
      </div>
      <div class="set_user" @click="changeActive(1)" :class="activeClass == 1 ? 'active' : ''">
        <img @click="changeAvatar" class="avatar" v-if="type == 2" src="/static/img/default-woman.png">
        <img @click="changeAvatar" class="avatar" v-if="type == 1" src="/static/img/default.png">
        <div class="avatarIcon">
          <img :src="iconUrl" alt>
          <input type="text" name="user_name" placeholder="请输入昵称" autocomplete="off" ref="name">
        </div>
        <div class="select"></div>
        <div class="tip">默认头像可以点击切换哦</div>
      </div>
      <input type="submit" @click="saveMsg" value>
    </div>
  </div>
</template>

<script>
// 引入 vuebus
import Bus from './bus.js'
export default {
  data() {
    return {
      nickname: this.$handler.getStorage('nickname'),
      headImgUrl: this.$handler.getStorage('headImgUrl') || '/static/img/default.png',
      activeClass: 0,
      type: 1,  // 1 男人  2 女人
      iconUrl: '/static/img/man.png'
    }
  },
  methods: {
    changeActive(index) {
      this.activeClass = index;
    },
    changeAvatar() {
      this.type = this.type == 2 ? 1 : 2
      this.iconUrl = this.type == 2 ? '/static/img/woman.png' : '/static/img/man.png'
    },
    saveMsg() {
      // 获取用户输入的名称
      this.nickname = this.$refs.name.value.trim() ? this.$refs.name.value.trim() : this.nickname
      // 更新localStorage
      this.$handler.setStorage('nickname', this.nickname)
      this.$router.push('user')
      Bus.$emit('isFixedHead', 1)
      Bus.$emit('resetNameAndAvatar', {
        nickname: this.nickname,
        type: this.type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/img/me_info.png");
  position: absolute;
  width: 100%;
  height: 132vw;
  left: 0;
  top: 12vw;
  text-align: center;
}

.set_avatar {
  position: absolute;
  text-align: center;
  width: 80vw;
  top: 35vw;
  left: 10vw;
  > div {
    float: left;
    width: 50%;
    height: 65vw;
    h5 {
      color: #c32677;
      margin: 3vw 0;
    }
    .avatar {
      border-radius: 50%;
      display: inline-block;
      width: 24vw;
      height: 24vw;
      border: 1vw solid #fff;
      box-shadow: 0 0 20px #1a4290;
    }
  }
  .select {
    border: 2px solid #c32678;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: relative;
    display: inline-block;
    margin-bottom: 1vw;
  }
  .active {
    .select::before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #c32678;
      left: 2px;
      top: 2px;
    }
  }
  .avatarIcon {
    position: relative;
    margin: 2vw 0;
    img {
      width: 28vw;
    }
    input {
      position: absolute;
      left: 10vw;
      width: 20vw;
      color: #5686c3;
      font-size: 12px;
      text-align: center;
      line-height: 7vw;
      transform: translateX(-2vw);
      -webkit-user-select: text !important;
    }
  }
  .tip {
    font-size: 10px;
    height: 30vw;
    padding-left: 3vw;
    text-align: left;
    overflow: auto;
    color: #fff;
  }
  input[type="submit"] {
    background-image: url("/static/img/me_info_01.png");
    width: 60vw;
    height: 15vw;
    margin-top: 8vw;
  }
  .set_user .tip {
    text-align: center;
    padding-left: 0;
  }
}
</style>
