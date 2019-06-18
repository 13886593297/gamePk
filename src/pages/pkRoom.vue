<template>
  <div class="main">
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="master">
      <span>{{ master.user_name }}</span>
      <img :src="master.user_img">
    </div>
    <div class="content">
      <div class="num">已参与人数：{{ list.length }}</div>
      <ul ref="ul">
        <li v-for="(v, i) in list" :key="i" :class="{active: master.user_name == v.user_name}">
          <img class="head" :src="v.user_img" alt>
          <span class="name">{{ v.user_name }}</span>
          <div class="detail">
            <div>第{{ i+1 }}名</div>
            <div>用时:{{ v.time }}</div>
            <div>正确率:{{ v.rate }}%</div>
          </div>
          <div class="rank_icon" v-if="i == 0">
            <img src="~img/pkRoom_01.png">
            <span>1</span>
          </div>
          <div class="rank_icon" v-if="i == 1">
            <img src="~img/pkRoom_02.png">
            <span>2</span>
          </div>
          <div class="rank_icon" v-if="i == 2">
            <img src="~img/pkRoom_03.png">
            <span>3</span>
          </div>
          <div class="rank_icon" v-if="i >= 3">
            <img src="~img/pkRoom_04.png">
            <span>{{ i+1 }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="arrow _center" @click="clickMore">
      <img src="~img/arrow.png" alt>
    </div>
    <div class="back_home _center" @click="backHome">
      <img src="~img/backhome.png" alt>
    </div>
  </div>
</template>
<script>
import common from '@/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      pkId: this.$route.query.pkId,
      list: [],
      master: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.answerList, {
        pkId: this.pkId
      }).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.body.user
          this.master = res.data.body.master
        }
      })
    },
    clickMore() {
      this.$refs.ul.scrollTop += 60
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .master {
    position: absolute;
    top: 10vw;
    width: 50vw;
    height: 20vw;
    line-height: 18vw;
    text-align: right;
    color: #275fb2;
    font-weight: bold;
    background-image: url(~img/pkRoom_top.png);
    span {
      display: inline-block;
      width: 30vw;
      text-align: center;
    }
    img {
      width: 16vw;
      height: 16vw;
      margin-right: 2vw;
      border-radius: 50%;
      margin-top: 1.5vw;
    }
  }
  .content {
    background-image: url(~img/pkRoom.png);
    position: absolute;
    top: 33vw;
    left: 5vw;
    width: 80vw;
    height: 108vw;
    color: #fff;
    padding: 5vw;
    .num {
      text-align: center;
      line-height: 10vw;
      height: 10vw;
      background-color: #fff;
      border-radius: 20px;
      color: #275fb2;
      font-weight: bold;
      font-size: 4vw;
    }
    ul {
      overflow-y: auto;
      height: 80vw;
      margin-top: 2vw;
      li {
        position: relative;
        height: 18vw;
        padding: 0 2vw;
        background-color: #2761b5;
        margin-bottom: 2vw;
        border-radius: 20px;
        margin-right: 3vw;
        &.active {
          background-color: #fe842f;
        }
        .head {
          border: 2px solid #fff;
          border-radius: 50%;
          width: 15vw;
          height: 15vw;
          margin: 1vw 0;
        }
        .name {
          display: inline-block;
          font-size: 4vw;
          width: 20vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transform: translateY(4px);
        }
        .detail {
          position: absolute;
          font-size: 10px;
          left: 40vw;
          top: 0;
          line-height: 1.2;
          > div:nth-child(1) {
            font-size: 4vw;
            margin: 3vw 0 2vw;
          }
        }
        .rank_icon {
          position: absolute;
          right: 2vw;
          top: 1vw;
          img {
            width: 16vw;
          }
          span {
            position: absolute;
            display: inline-block;
            width: 7vw;
            height: 7vw;
            line-height: 7vw;
            left: 4.5vw;
            top: 4vw;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            font-family: Arial;
          }
        }
      }
    }
  }

  .arrow {
    top: 133vw;
    img {
      width: 5vw;
    }
  }

  .back_home {
    top: 145vw;
    img {
      width: 60vw;
    }
  }
}
</style>