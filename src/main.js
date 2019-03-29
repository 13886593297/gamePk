// import VConsole from 'vconsole'
// new VConsole()

import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import baseUrl from '../static/js/base'
import handler from '../static/js/handler'
import '../static/css/base.css'

function getUserInfo() {
  var ticket = handler.getQueryString('ticket');
  Axios.post(baseUrl.base + baseUrl.wxInfo, {
    userCode: ticket
  }).then(function (res) {
    console.log(res)
  })
}

// getUserInfo()

function getMeInfo() {
  Axios.post(baseUrl.base + baseUrl.meinfo, {
    // userId: getQueryString('userId'),
    userId: 194,
  }).then((res) => {
    // console.log(res)
  })
}

getMeInfo()

Axios.get('/static/user.json', {})
  .then(function (res) {
    window.localStorage.setItem('login', JSON.stringify(res.data));
  })

// 挂载全局对象
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$handler = handler
Vue.prototype.$Axios = Axios

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
