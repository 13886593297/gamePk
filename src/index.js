import React from 'react'
import ReactDOM from 'react-dom'
import Vconsole from 'vconsole'
import Route from './router'
import * as serviceWorker from './serviceWorker'
import './assets/css/base.scss'

new Vconsole()

// 是否自动播放音乐
if (window.sessionStorage.getItem('isAutoPlay') == null) {
  window.sessionStorage.setItem('isAutoPlay', false)
}

ReactDOM.render(<Route />, document.getElementById('root'))

serviceWorker.unregister();
