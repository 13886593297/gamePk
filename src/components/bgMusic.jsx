import React from 'react'
import * as handler from '../assets/js/handler'

export default class BgMusic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
    }
  }
  audioControl = () => {
    this.setState({
      isAutoPlay: !this.state.isAutoPlay
    }, () => {
      handler.handleMusic('myAudio')
      window.sessionStorage.setItem('isAutoPlay', this.state.isAutoPlay)
    })
  }
  render() {
    return (
      <div>
        <audio src={require('@music/index_bg.mp3')} loop id="myAudio" autoPlay={this.state.isAutoPlay}></audio>
        <audio src={require('@music/button.mp3')} id="buttonPlay"></audio>
        <div className={'music_btn ' + (this.state.isAutoPlay ? 'play' : 'pause')} onClick={this.audioControl}></div>
      </div>
    )
  }
}