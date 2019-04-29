<template>
  <div class="main">
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="set_avatar">
      <div class="default_user" @click="changeActive(0)" :class="img_type == 0 ? 'active' : ''">
        <img class="avatar" :src="wx_user_img">
        <h5>{{ wx_user_name }}</h5>
        <div class="select"></div>
        <div class="tip">
          <span v-if="!wx_user_name">关注礼医公众号可以显示您的微信昵称和头像</span>
          <span
            v-if="wx_user_name"
          >该选项表面您同意礼来在“乐拼王者”的PK中心、个人中心和排行榜中使用您的微信昵称和头像，并且“希力王者”的其他参与者亦可以看到并在微信中分享含有您微信昵称和头像的游戏页面。</span>
        </div>
      </div>
      <div class="set_user" @click="changeActive(1)" :class="img_type == 1 ? 'active' : ''">
        <img
          @click="changeAvatar"
          class="avatar"
          v-if="user_sex == 1"
          src="~img/default-woman.png"
        >
        <img
          @click="changeAvatar"
          class="avatar"
          v-if="user_sex == 0"
          src="~img/default.png"
        >
        <div class="avatarIcon">
          <img v-if="user_sex == 1" src="~img/woman.png">
          <img v-if="user_sex == 0" src="~img/man.png">
          <input
            type="text"
            name="user_name"
            v-model.trim="cs_user_name"
            placeholder="请输入昵称"
            autocomplete="off"
          >
        </div>
        <div class="select"></div>
        <div class="tip">默认头像可以点击切换哦</div>
      </div>
      <button @click="update"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      wx_user_name: this.$handler.getStorage('wx_user_name'),  // 微信昵称
      cs_user_name: this.$handler.getStorage('cs_user_name'),  // 游戏中昵称
      wx_user_img: this.$handler.getStorage('wx_user_img') || require('img/default-wx.png'),  // 微信头像
      img_type: this.$handler.getStorage('img_type'),  // 默认选中微信选项还是游戏选项，当未关注公众号时只能选择游戏选项
      user_sex: this.$handler.getStorage('user_sex'),  // 游戏头像性别 0 man  1 woman
    }
  },
  methods: {
    changeActive(index) {
      if (this.wx_user_name) {
        this.img_type = index;
      }
    },
    changeAvatar() {
      this.user_sex = this.user_sex == 0 ? 1 : 0
    },
    update() {
      if (this.autoplay) {
        this.$handler.btnPlay('buttonPlay')
      }
      var data = {}
      if (this.img_type == 1) {
        if (!this.cs_user_name) {
          alert('请输入昵称！')
          return
        }
        data.userName = this.cs_user_name
        data.userSex = this.user_sex
        data.userImg = this.user_sex == 0 ? this.$baseUrl.headImageUrl : this.$baseUrl.wuManHeadImageUrl
      } else {
        data.userName = this.wx_user_name
        data.userImg = this.wx_user_img
      }
      data.userId = this.$handler.getStorage('user_id')
      data.type = this.img_type
      this.$Axios.post(this.$baseUrl.base + 'api/user/update', data).then(res => {
        if (res.data.code == 0) {
          this.$handler.setStorage('user_img', data.userImg)
          this.$handler.setStorage('user_name', data.userName)
          this.$handler.setStorage('img_type', data.type)
          if (this.img_type == 1) {
            this.$handler.setStorage('cs_user_name', data.userName)
            this.$handler.setStorage('user_sex', data.userSex)
          }
          this.$router.push('user')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("~img/me_info.png");
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
      height: 4vw;
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
  button {
    background-image: url("~img/me_info_01.png");
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
