import React from 'react'
// import Axios from 'axios'
// import baseUrl from '@/assets/js/baseUrl'
import handler from '@/assets/js/handler'
import './index.scss'
// import user from './user.json'
// window.localStorage.setItem('user', JSON.stringify(user.body));

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoplay: JSON.parse(window.sessionStorage.getItem('autoplay')), // 是否自动播放音乐
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
    this.beforeJump(() => this.props.history.push('/train'))
  }
  audioControl() {
    this.setState({
      autoplay: !this.state.autoplay
    }, () => {
      handler.isPlay('myAudio')
      window.sessionStorage.setItem('autoplay', this.state.autoplay)
    })
  }
  beforeJump(cb) {
    if (this.state.autoplay) {
      handler.btnPlay('buttonPlay')
    }
    setTimeout(() => cb(), 500)
  }
  render() {
    return (
      <div className='main index'>
        {this.state.autoplay ? (<audio src={require('@music/index_bg.mp3')} loop id="myAudio" autoPlay></audio>) : <audio src={require('@music/index_bg.mp3')} loop id="myAudio"></audio>}
        <audio src={require('@music/button.mp3')} id="buttonPlay"></audio>
        <div className={'music_btn' + ' ' + (this.state.autoplay ? 'play' : 'pause')} onClick={() => this.audioControl()}></div>
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