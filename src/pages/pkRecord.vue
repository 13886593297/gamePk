<template>
  <div class="main">
    <bg-music></bg-music>
    <ul ref="ul">
      <li v-for="(v, i) in list" :key="i" @click="topkroom(v.type, v.end, v.pkId)">
        <span class="endTime">{{ v.date }}</span>
        <span class="type" v-if="v.type == 1">在线匹配</span>
        <span class="type" v-if="v.type == 2">邀请对战</span>
        <div class="end" v-if="v.end == 1">
          <span class="status">
            <span>{{ v.res }}</span>
            <br>
            <img src="~img/pkRecord_02.png">
          </span>
          <div class="details">
            <span class="time">用时：{{ v.time }}</span>
            <span class="rate">正确率：{{ v.rate }}%</span>
          </div>
        </div>
        <span class="underway" v-if="v.end != 1">进行中... ...</span>
      </li>
    </ul>
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
      list: []
    }
  },
  mounted() {
    this.$Axios.post(this.$baseUrl.base + this.$baseUrl.record, {
      userId: this.user_id
    }).then(res => {
      if (res.data.code == 0) {
        this.list = res.data.body
      }
    })
  },
  methods: {
    topkroom(type, end, pkId) {
      if (type == 2 && end == 1) {
        this.$router.push({
          name: 'pkRoom',
          query: {
            pkId
          }
        })
      }
    },
    clickMore() {
      this.$refs.ul.scrollTop += 60
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url(~img/pkRecord.png);
  top: 10vw;
  height: 140vw;
  .arrow {
    top: 120vw;
    img {
      width: 5vw;
    }
  }
  .back_home {
    top: 135vw;
    img {
      width: 60vw;
    }
  }
  ul {
    position: absolute;
    overflow-y: auto;
    width: 70vw;
    height: 68vw;
    top: 45vw;
    left: 15vw;
    font-size: 14px;
    li {
      background-image: url(~img/pkRecord_01.png);
      position: relative;
      height: 16vw;
      margin: 0 2vw 1vw;
      span {
        display: inline-block;
      }
      .underway {
        position: absolute;
        line-height: 16vw;
        text-align: center;
        left: 23vw;
        width: 41vw;
        color: #ae1043;
        font-weight: bold;
      }
      .endTime {
        position: absolute;
        font-size: 8px;
        font-weight: 600;
        color: #fff;
        width: 10vw;
        height: 4vw;
        line-height: 4vw;
        text-align: center;
      }
      .type {
        width: 23vw;
        line-height: 17vw;
        text-align: center;
        font-weight: bold;
        color: #ae1043;
      }
      .end {
        position: absolute;
        height: 100%;
        width: 42vw;
        left: 23vw;
        top: 0;
        .status {
          position: absolute;
          text-align: center;
          padding-top: 5.5vw;
          width: 21vw;
          color: #ae1043;
          font-weight: bold;
          img {
            position: absolute;
            width: 12vw;
            top: 3vw;
            left: 4vw;
          }
        }
        .details {
          position: absolute;
          width: 22vw;
          left: 19vw;
          font-size: 11px;
          color: #898a8a;
          padding-top: 4vw;
        }
      }
    }
  }
}
</style>
