<template>
  <div class="main">
    <bg-music></bg-music>
    <ul ref="ul">
      <li v-for="(v, i) in info.rankList" :key="i">
        <span class="rank">{{v.rank}}</span>
        <img class="avatar" :src="v.user_img" alt>
        <span class="name">{{v.user_name}}</span>
        <span class="score">{{v.user_score}}</span>
      </li>
    </ul>
    <div class="myself">
      <img id="head" :src="user_img">
      <span id="name">{{user_name}}</span>
      <div class="rank">
        <div class="rank_month">
          月排名
          <span>第{{month_rank}}名</span>
        </div>
        <div class="rank_week">
          周排名
          <span>第{{week_rank}}名</span>
        </div>
      </div>
    </div>
    <div class="arrow _center" @click="clickMore">
      <img src="~img/arrow.png" alt>
    </div>
  </div>
</template>
<script>
import common from '@/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      info: {},
      user_img: '',
      user_name: '',
      month_rank: '',
      week_rank: '',
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.rankList, {
      userId: this.user_id
    }).then(res => {
      if (res.data.code == 0) {
        this.info = res.data.body
        this.user_img = this.info.userInfo.user_img
        this.user_name = this.info.userInfo.user_name
        this.month_rank = this.info.userInfo.rank
        this.week_rank = this.info.userInfo.week_rank
      }
    })
  },
  methods: {
    clickMore() {
      this.$refs.ul.scrollTop += 60
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(~img/rankingList.png);
  top: 10vw;
  height: 140vw;
  ul {
    position: absolute;
    overflow-y: auto;
    color: #ae1042;
    font-weight: bold;
    height: 58vw;
    width: 70vw;
    left: 15vw;
    top: 46vw;
    li {
      background-image: url(~img/rankingList_01.png);
      position: relative;
      height: 16vw;
      margin: 0 2vw 2vw;
      &:last-child {
        margin-bottom: 0;
      }
      .rank {
        position: absolute;
        color: #fff;
        left: 1vw;
        font-size: 12px;
      }
      .avatar {
        position: absolute;
        border: 2px solid #fff;
        border-radius: 50%;
        width: 12vw;
        height: 12vw;
        left: 4vw;
        top: 2vw;
      }
      .name {
        position: absolute;
        font-size: 3.5vw;
        left: 18vw;
        top: 3vw;
      }
      .score {
        position: absolute;
        font-size: 4vw;
        left: 47vw;
        top: 3vw;
      }
    }
  }
  .myself {
    background-image: url(~img/rankingList_02.png);
    position: absolute;
    height: 16vw;
    width: 68vw;
    top: 110vw;
    left: 17vw;
    color: #ae1042;
    font-weight: bold;
    #head {
      position: absolute;
      border: 2px solid #fff;
      border-radius: 50%;
      width: 12vw;
      height: 12vw;
      left: 2vw;
      top: 1vw;
    }
    #name {
      display: inline-block;
      margin-left: 17vw;
      margin-top: 2vw;
      font-size: 3.5vw;
    }
    .rank {
      position: absolute;
      line-height: 6vw;
      left: 39vw;
      top: 1.5vw;
      font-size: 12px;
      span {
        margin-left: 4vw;
      }
    }
  }
  .arrow {
    top: 127vw;
    img {
      width: 5vw;
    }
  }
}
</style>
