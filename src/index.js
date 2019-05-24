import React from 'react'
import ReactDOM from 'react-dom'
import Route from './router'
import * as serviceWorker from './serviceWorker'
import './config/rem'
import './style/base.scss'

ReactDOM.render(<Route />, document.getElementById('root'))

serviceWorker.unregister();
