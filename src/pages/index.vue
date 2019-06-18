<template>
  <div class="main">
    <bg-music :top='top'></bg-music>
    <div class="route _center">
      <div>
        <button @click="totrain"></button>
        <button @click="togamePK"></button>
        <button @click="tolink1"></button>
      </div>
      <div>
        <button @click="tolink2"></button>
        <button @click="tolink3"></button>
        <button @click="torankingList"></button>
      </div>
    </div>
    <div class="footer">
      <img src="~img/index_07.png" alt class="game_rule" @click="showRule">
      <button @click="toUser"></button>
      <div class="role_guize" v-show="rule_isShow">
        <img src="~img/role_guize.png">
        <div class="shut" @click="rule_isShow = 0"></div>
      </div>
    </div>
    <div class="record_number _center">PP-LD-CN-1002</div>
  </div>
</template>
<script>
import user from '../../static/user.json'
export default {
  data() {
    return {
      rule_isShow: 0, // 游戏规则
      top: '5vw'
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "development" && !localStorage.getItem('user')) {
      window.localStorage.setItem("user", JSON.stringify(user.body))
    } else {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.wxInfo, {
        userCode: this.$handler.getQueryString("ticket")
      })
      .then(res => {
        if (res.data.code == 0) {
          location.href = location.origin + location.pathname + location.hash;
          window.localStorage.setItem("user", JSON.stringify(res.data.body));
          if (res.data.body.first == 1) {
            this.$router.push("setAvatar")
          }
        }
      });
    }
  },
  methods: {
    totrain() {
      this.$handler.handleBtnBgm(() => this.$router.push("train"))
    },
    togamePK() {
      this.$handler.handleBtnBgm(() => this.$router.push("gamePK"))
    },
    tolink1() {
      this.$handler.handleBtnBgm(() => window.location.href = "https://wechat-qa.lillyadmin.cn/iDoctorWeChat/ContentArea/Article?wechatid=27&contentAreaModuleId=103&moduleType=ArticleList&contentAreaMPId=1")
    },
    tolink2() {
      this.$handler.handleBtnBgm(() => window.location.href = "https://wechat-qa.lillyadmin.cn/idoctorwechat/medinfosearch/Main?event=MenuClick&wechatid=27&_Callback=1")
    },
    tolink3() {
      this.$handler.handleBtnBgm(() => window.location.href = "https://wechat-qa.lillyadmin.cn/iDoctorWeChat/ContentArea/Main?event=MenuClick&wechatid=27")
    },
    torankingList() {
      this.$handler.handleBtnBgm(() =>
        this.$router.push({
          name: "rankingList",
          query: {
            user_id: this.user_id
          }
        })
      );
    },
    showRule() {
      this.$handler.handleBtnBgm(() => this.rule_isShow = 1);
    },
    toUser() {
      this.$handler.handleBtnBgm(() =>
        this.$router.push({
          name: "user",
          query: {
            user_id: this.user_id
          }
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-image: url("~img/index_bg.jpg");
  height: 100vh;
  .route {
    top: 122vw;
    div {
      button {
        width: 28vw;
        height: 12vw;
      }
      &:first-child {
        button {
          &:first-child {
            background-image: url("~img/index_01.png");
          }
          &:nth-child(2) {
            background-image: url("~img/index_02.png");
          }
          &:nth-child(3) {
            background-image: url("~img/index_03.png");
          }
        }
      }
      &:nth-child(2) {
        button {
          &:first-child {
            background-image: url("~img/index_04.png");
          }
          &:nth-child(2) {
            background-image: url("~img/index_05.png");
          }
          &:nth-child(3) {
            background-image: url("~img/index_06.png");
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
    button {
      background-image: url("~img/index_08.png");
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

  .record_number {
    top: 154vw;
    font-size: 10px;
    color: #275fb2;
  }
}


</style>
