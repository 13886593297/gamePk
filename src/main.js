import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import VConsole from '../static/vconsole.min'
import baseUrl from './assets/js/base'
import * as handler from './assets/js/handler'
import share from './assets/js/share'
import bgMusic from '@/components/bgMusic'
import TipShow from '@/components/tipShow'
import AnswerMusic from '@/components/answerMusic'
import Option from '@/components/option'
import Share from '@/components/share'
import Advertise from '@/components/advertise'
import './assets/css/base.scss'

// new VConsole()

// 是否自动播放音乐
if (window.sessionStorage.getItem('isAutoPlay') == null) {
  window.sessionStorage.setItem('isAutoPlay', false)
}

// 挂载全局对象
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$handler = handler
Vue.prototype.$Axios = Axios
Vue.prototype.$share = share

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// 挂载全局组件
Vue.component('bg-music', bgMusic)
Vue.component('tip-show', TipShow)
Vue.component('answer-music', AnswerMusic)
Vue.component('v-option', Option)
Vue.component('v-share', Share)
Vue.component('ad-vertise', Advertise)

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
