export default {
  getStorage(name) {
    return JSON.parse(window.localStorage.getItem('user'))[name]
  },
  setStorage(name, value) {
    var user = JSON.parse(window.localStorage.getItem('user'))
    user[name] = value
    window.localStorage.setItem('user', JSON.stringify(user))
  },
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  },
  isPlay(ele) {
    if (document.getElementById(ele).paused) {
      document.getElementById(ele).play();
    } else {
      document.getElementById(ele).pause();
    }
  },
  btnPlay(ele) {
    document.getElementById(ele).play();
  }
}
