import React from 'react'

export default class AnswerMusic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
    }
  }
  render() {
    return (
      <div>
        <audio src={require('@music/time_out.mp3')} loop id="timeOut" autoPlay={this.state.isAutoPlay}></audio>
        <audio src={require('@music/select_click.mp3')} id="selectClick"></audio>
      </div>
    )
  }
}