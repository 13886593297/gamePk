import React from 'react'
// import Axios from 'axios'
// import baseUrl from '@/assets/js/baseUrl'
// import handler from '@/assets/js/handler'
import './index.scss'
// import user from './user.json'
// window.localStorage.setItem('user', JSON.stringify(user.body));

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rule_isShow: 0, // 游戏规则
    }
  }
  componentDidMount() {
    // Axios.post(baseUrl.base + baseUrl.wxInfo, {
    //   userCode: handler.getQueryString('ticket')
    // }).then(res => {
    //   if (res.data.code == 0) {
    //     window.location.href = window.location.origin + window.location.pathname + window.location.hash
    //     window.localStorage.setItem('user', JSON.stringify(res.data.body))
    //     if (res.data.body.first == 1) {
    //       this.$router.push('setAvatar')
    //     }
    //   }
    // })
  }
  toTrain() {
    this.props.history.push('/train')
  }

  render() {
    return (
      <div className='main index'>
        <div className='route'>
          <div>
            <button onClick={() => this.toTrain()}></button>
            <button></button>
            <button></button>
          </div>
          <div>
            <button></button>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    )
  }
}