import React from 'react'
import Axios from 'axios'
import shareJs from '@/assets/js/share'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import TipShow from '@/components/tipShow'
import Share from '@/components/share'

export default class PkResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      user_id: handler.getStorage('user_id'),
      user_name: handler.getStorage('user_name'),  // 自己名字
      user_img: handler.getStorage('user_img'),  // 自己头像
      data: JSON.parse(this.props.match.params.data),
      result_img: '',  // 根据结果显示不同背景图片
      isFlaunt: 0,
      tipIsShow: 0,
      flaunt: 0
    }
  }
  componentDidMount() {
    document.title = "PK"
    shareJs(() => this.setState({ flaunt: 0 }))
    if (window.history.length === 1) {
      this.setState({ isFlaunt: 1 })
    }
    if (this.state.data.isWin === 1) {
      this.setState({ result_img: require('@img/success.png') })
      this.state.isAutoPlay && handler.handleMusic('pk_cg')
    } else if (this.state.data.isWin === 2) {
      this.setState({ result_img: require('@img/fail.png') })
      this.state.isAutoPlay && handler.handleMusic('pk_sb')
    } else {
      this.setState({ result_img: require('@img/void.png') })
      this.state.isAutoPlay && handler.handleMusic('pk_sb')
    }
  }
  continuePk = () => {
    Axios.post(baseUrl.base + baseUrl.isPK, {
      userId: this.state.user_id,
      pkType: 1
    }).then(res => {
      if (res.data.code === 0) {
        handler.handleBtnBgm(() => this.props.history.push('/pk'))
      } else if (res.data.code === 2) {
        // 训练超过10次
        this.setState({ tipIsShow: 1 })
      }
    })
  }
  doFlaunt = () => {
    handler.handleBtnBgm(() => this.setState({ flaunt: 1 }))
  }
  backHome = () => {
    handler.handleBtnBgm(() => window.location.href = baseUrl.base)
  }
  render() {
    return (
      <div className="main" id='pk'>
        <audio src={require('@music/pk_cg.mp3')} id="pk_cg"></audio>
        <audio src={require('@music/pk_sb.mp3')} id="pk_sb"></audio>
        <audio src={require('@music/button.mp3')} id="buttonPlay"></audio>
        <div className='pk_area'>
          <div className="pk_info">
            <div className="user">
              <img className='crown' style={{ display: this.state.data.isWin === 1 ? '' : 'none' }} src={require('@img/crown.png')} alt="" />
              <img className='avatar' src={this.state.user_img} alt="" />
              <div className="name">{this.state.user_name}</div>
              <div className="text">
                <p className="num">当前答题: &nbsp;{this.state.data.question_index + '/' + this.state.data.question_amount}</p>
                <p className="time">累计用时: &nbsp;{this.state.data.user_time}s</p>
              </div>
            </div>
            <div className="opponent">
              <img className='avatar' src={decodeURIComponent(this.state.data.opponent_img)} alt="" />
              <div className="name">{this.state.data.opponent_name}</div>
              <div className="text">
                <p className="num">当前答题: &nbsp;{this.state.data.question_index + '/' + this.state.data.question_amount}</p>
                <p className="time">累计用时: &nbsp;{this.state.data.opponent_time}s</p>
              </div>
            </div>
          </div>
        </div>
        <div className="result">
          <img className="result_img" src={this.state.result_img} alt="" />
          <p className="score">获得达人积分<span>{this.state.data.score}</span></p>
          <div className="route _center">
            <button onClick={this.continuePk} style={{ display: this.state.isFlaunt ? 'none' : '' }}></button>
            <button onClick={this.doFlaunt} style={{ display: this.state.isFlaunt ? 'none' : '' }}></button>
            <button onClick={this.backHome}></button>
          </div>
        </div>
        <TipShow
          tipIsShow={this.state.tipIsShow}
          tipImg={require('@img/tankuang_10.png')}
          dialogIsShow={0}
        />
        <Share flaunt={this.state.flaunt} />
      </div>
    )
  }
}