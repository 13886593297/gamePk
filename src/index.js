import React from 'react'
import ReactDOM from 'react-dom'
import Route from './router'
import * as serviceWorker from './serviceWorker'
import './config/rem'
import './style/base.scss'

// 是否自动播放音乐
if (window.sessionStorage.getItem('autoplay') == null) {
  window.sessionStorage.setItem('autoplay', false)
}

ReactDOM.render(<Route />, document.getElementById('root'))

serviceWorker.unregister();
