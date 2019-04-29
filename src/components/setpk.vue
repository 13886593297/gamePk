<template>
  <div class="main">
    <audio src="~music/button.mp3" id="buttonPlay"></audio>
    <div class="setpk">
      <p>1.请设定题目数量</p>
      <select id="select_subject_num" v-model="subject_num">
        <option value="10">10道题</option>
        <option value="15">15道题</option>
        <option value="20">20道题</option>
      </select>
      <p>2.请设定PK结束时间</p>
      <input id="time" type="datetime-local" v-model="time">
      <p>3.请设定PK人数上限</p>
      <select id="select_person_num" v-model="person_num">
        <option value="2">2人</option>
        <option value="5">5人</option>
        <option value="10">10人</option>
        <option value="99999">不限人数</option>
      </select>
      <p>4.请设定题目主题</p>
      <select id="select_subject_type" v-model="type">
        <option v-for="(v, i) in typeArr" :key="i" v-bind:value="i">{{ v }}</option>
      </select>
      <div class="submit" @click="save">
        <img src="~img/determine.png" alt>
      </div>
    </div>
    <div class="modal" v-show="isShow" @click="isShow = 0">
      <img src="~img/tankuang_10.png" ref="img">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')),
      user_id: this.$handler.getStorage('user_id'),
      subject_num: '10',
      time: '',
      person_num: '2',
      type: '0',
      typeArr: {
        '0': '全部',
        '1': '疾病管理',
        '7': '指南共识',
        '8': '复泰奥',
        '9': '度易达'
      },
      isShow: 0
    }
  },
  mounted() {
    this.getTime()
  },
  methods: {
    getTime() {
      var cuttentTime = new Date()
      //获取当前年
      var year = cuttentTime.getFullYear()
      //获取当前月
      var month = cuttentTime.getMonth() + 1
      //获取当前日
      var date = cuttentTime.getDate()
      var h = cuttentTime.getHours() + 1 //获取当前小时数(0-23)
      var m = cuttentTime.getMinutes() //获取当前分钟数(0-59)
      var s = cuttentTime.getSeconds()
      this.time = year + '-' + this.p(month) + "-" + this.p(date) + "T" + this.p(h) + ':' + this.p(m) + ":" + this.p(s)
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },
    save() {
      if (this.autoplay) {
        this.$handler.btnPlay('buttonPlay')
      }
      this.$Axios.post(this.$baseUrl.base + this.$baseUrl.createPk, {
        userId: this.user_id,
        questionCount: this.subject_num,
        date: this.time.substring(0, 16).replace('T', ' ').trim(),
        users: this.person_num,
        selectedQuestionTag: this.type,
        pkType: 2
      }).then(res => {
        if (res.data.code == 0) {
          this.$router.push({
            name: 'invitation', 
            query: {
              pkId: res.data.body.pk_id
            }
          })
        } else if (res.data.code == 2) {
          this.isShow = 1
        } else if (res.data.code == 13) {
          alert('当前分类下面的题目数量不足')
        } else {
          alert("请选择正确的时间" + this.time)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  background-image: url(~img/setPK.png);
  position: absolute;
  top: 12vw;
  left: 8vw;
  width: 88vw;
  height: 140vw;
}

.setpk {
  width: 60vw;
  height: 70vw;
  position: absolute;
  top: 40vw;
  left: 9vw;
  border: 1vw solid #c2def6;
  border-radius: 20px;
  background-color: #fff;
  padding-left: 5vw;
  color: #275fb4;
  p {
    font-weight: 600;
    line-height: 9vw;
    font-size: 14px;
  }
  select,
  input {
    width: 54vw;
    height: 8vw;
    border: 0;
    text-indent: 2vw;
    outline: none;
    border-radius: 20px;
    background-color: #bdddf6;
    color: #275fb4;
    font-weight: 600;
  }
  select {
    text-indent: 5vw;
    background-image: url(~img/downArrow.png);
    background-position: 48vw;
    background-size: 16px;
    appearance: none;
  }
  input {
    width: 51vw;
    padding-right: 3vw;
  }
  .submit {
    position: absolute;
    text-align: center;
    width: 100%;
    left: 0;
    top: 73vw;
    img {
      width: 45vw;
    }
  }
}
</style>

