import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import VConsole from '../static/vconsole.min'
import baseUrl from './assets/js/base'
import handler from './assets/js/handler'
import './assets/css/base.css'

new VConsole()

console.log(window.localStorage.getItem('ticket'))
Axios.post(baseUrl.base + baseUrl.wxInfo, {
  userCode: handler.getQueryString('ticket') || window.localStorage.getItem('ticket')
}).then(res => {
  window.localStorage.setItem('user', JSON.stringify(res.data.body));
  if (res.data.body.first == 1) {
    router.push('setAvatar')
  }
})

// Axios.get('../static/user.json')
//   .then(res => {
//     window.localStorage.setItem('user', JSON.stringify(res.data.body));
//   })

// 是否自动播放音乐
if (window.sessionStorage.getItem('autoplay') == null) {
  window.sessionStorage.setItem('autoplay', false)
}

// 挂载全局对象
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$handler = handler
Vue.prototype.$Axios = Axios

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
