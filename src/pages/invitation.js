import React from 'react'
import Axios from 'axios'
import shareJs from '@/assets/js/share'
import QrCodeWithLogo from 'qr-code-with-logo'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import TipShow from '@/components/tipShow'

export default class Invitation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      user_id: handler.getQueryString('user_id') || handler.getStorage('user_id'),
      flaunt: 1,
      tipIsShow: 0,
      dialogIsShow: 0,
      tipImg: require('@img/tankuang_10.png')  // 提示框图片
    }
  }
  componentDidMount() {
    document.title="PK邀请"
    shareJs(() => this.setState({flaunt: 0}))
    if (window.history.length === 1) {
      this.setState({ flaunt: 0 })
    }
    if (!this.state.user_id) {
      handler.handleBtnBgm(() => window.location.href = baseUrl.base)
    }
    this.qrcode()
  }
  qrcode = () => {
    QrCodeWithLogo.toCanvas({
      canvas: this.refs.canvas,
      content: window.location.href,
      width: 80,
      nodeQrCodeOptions: {
        margin: 0,
      }
    })
  }
  game_begin = () => {
    this.state.isAutoPlay && handler.handleMusic('buttonPlay')
    Axios.post(baseUrl.base + baseUrl.isPK, {
      userId: this.state.user_id,
      pkId: this.props.match.params.pkId,
      pkType: 2
    }).then(res => {
      if (res.data.code === 0) {
        this.props.history.push({ pathname: '/fightAgainst/' + this.props.match.params.pkId })
      } else if (res.data.code === 2) {
        // 训练超过10次
        this.setState({ tipIsShow: 1 })
      } else if (res.data.code === 7) {
        // 没有认证
        this.setState({
          tipIsShow: 1,
          dialogIsShow: 1,
          tipImg: require('@img/tankuang.png')
        })
      } else if (res.data.code === 9) {
        alert('该活动已结束')
      } else if (res.data.code === 10) {
        alert("PK达到人数上限")
      } else if (res.data.code === 11) {
        alert('您已经答过该题了，请等待结果')
      }
    })
  }
  render() {
    return (
      <div className='main' id='invitation'>
        <audio src={require('@music/button.mp3')} id="buttonPlay"></audio>
        <p className="text">
          邀请您参加
          <br />《乐拼王者》
          <br />糖尿病知识答题
          <br />精彩活动
        </p>
        <div className="start_answer _center">
          <img src={require('@img/invitation_01.png')} onClick={this.game_begin} alt="" />
          <div id="qrcode">
            <canvas ref="canvas"></canvas>
          </div>
        </div>
        {this.state.flaunt ?
          <div className="share" onClick={() => this.setState({ flaunt: 0 })}>
            <img src={require('@img/share.png')} alt="" />
          </div> : ''
        }
        <TipShow
          tipIsShow={this.state.tipIsShow}
          tipImg={this.state.tipImg}
          dialogIsShow={this.state.dialogIsShow}
        />
      </div>
    )
  }
}