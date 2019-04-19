// import VConsole from 'vconsole'
// new VConsole()

import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import VConsole from '../static/js/vconsole.min'
import baseUrl from '../static/js/base'
import handler from '../static/js/handler'
import '../static/css/base.css'

// new VConsole()

// Axios.post(baseUrl.base + baseUrl.wxInfo, {
//   userCode: ticket
// })
// Axios.get('/static/user.json', {})
//   .then(function (res) {
//     window.localStorage.setItem('user', JSON.stringify(res.data.body));
//     if (res.data.body.first == 1) {
//       router.push('setAvatar')
//     }
//   })

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
