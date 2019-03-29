<template>
  <div class="main">
    <router-link to="/">返回</router-link>
    <div class="monthRankArr">
      <ul>
        <li v-for="(item, index) in monthRankArr" :key="index">
          <span class="rank">{{ item.rank }}</span>
          <img :src="item.headImgUrl" alt>
          <span class="name">{{ item.nickname }}</span>
          <span class="point">{{ item.monthPoint }}</span>
        </li>
      </ul>
      <div class="myRank">
        <img :src="headImgUrl" alt>
        <span class="name">{{ nickname }}</span>
        <span class="monthRank">月排名&nbsp;&nbsp;&nbsp;第{{ monthRank }}名</span>
        <span class="weekRank">周排名&nbsp;&nbsp;&nbsp;第{{ weekRank }}名</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monthRank: 1,        // 月排名
      weekRank: 1,         // 周排名
      monthRankArr: [],    // 排行榜
      nickname: this.$storageHandler.getStorage('nickname'),  // 用户姓名
      headImgUrl: this.$storageHandler.getStorage('headImgUrl')   // 用户头像
    }
  },
  mounted() {
    var route = 'main.rankHandler.rank'
    pomelo.request(route, {}, data => {
      console.log(data);
      this.monthRank = data.monthRank
      this.weekRank = data.weekRank
      this.monthRankArr = data.monthRankArr
      console.log(this.monthRankArr);

    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("/static/img/rank_bg.jpg");
}

a {
  position: absolute;
  color: #fff;
  right: 2vw;
  top: 4vw;
  font-size: 16px;
}

.monthRankArr {
  padding: 50vw 11vw 0 12vw;
  ul {
    height: 60vw;
    overflow-y: scroll;
    li {
      height: 17.7vw;
      margin: 0 5vw 3vw;
      background: url("/static/img/rank_01.png") no-repeat;
      background-size: 100%;
      position: relative;
      span {
        color: #bc0000;
        position: absolute;
        top: 3vw;
        font-weight: 600;
      }
      .rank {
        color: #fff;
        font-weight: normal;
        left: 2vw;
        top: 0;
      }
      .point {
        left: 52vw;
      }
      img {
        width: 13vw;
        margin: 2vw 3vw 0 4.5vw;
        border-radius: 50%;
      }
    }
  }
  .myRank {
    background: url("/static/img/rank_02.png") no-repeat;
    background-size: 100%;
    margin-top: 4vw;
    height: 19vw;
    color: #fff;
    position: relative;
    img {
      width: 13vw;
      margin: 3vw;
      border-radius: 50%;
    }
    span {
      position: absolute;
      top: 3.2vw;
      left: 20vw;
    }
    .name {
      letter-spacing: 3px;
    }
    .monthRank {
      left: 46vw;
    }
    .weekRank {
      top: 11vw;
      left: 46vw;
    }
  }
}
</style>
