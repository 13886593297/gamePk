import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import BgMusic from '@/components/bgMusic'
import TipShow from '@/components/tipShow'

export default class GamePk extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: handler.getStorage('user_id'),
      tipIsShow: 0,
      dialogIsShow: 0,
      tipImg: require('@img/tankuang_10.png')  // 提示框图片
    }
  }
  componentDidMount() {
    document.title="全民PK"
  }
  pkMethod(pkType) {
    Axios.post(baseUrl.base + baseUrl.isPK, {
      userId: this.state.user_id,
      pkType
    }).then(res => {
      if (res.data.code === 0) {
        if (pkType === 1) {
          handler.handleBtnBgm(() => this.props.history.push('/pk'))
        } else if (pkType === 2) {
          handler.handleBtnBgm(() => this.props.history.push('/setpk'))
        }
      } else if (res.data.code === 2) {
        // 训练超过10次
        this.setState({tipIsShow: 1})
      } else if (res.data.code === 7) {
        // 没有认证
        this.setState({
          tipIsShow: 1,
          dialogIsShow: 1,
          tipImg: require('@img/tankuang.png')
        })
      }
    })
  }
  pkRecord = () => {
    handler.handleBtnBgm(() => this.props.history.push('/pkRecord'))
  }
  myAchievements = () => {
    handler.handleBtnBgm(() => this.props.history.push({ pathname: '/myAchievements/' + this.state.user_id }))
  }
  render() {
    return (
      <div className='main' id='gamePk'>
        <BgMusic />
        <div className='route _center'>
          <button className='animated' onClick={() => this.pkMethod(1)}></button>
          <button className='animated' onClick={() => this.pkMethod(2)}></button>
          <button className='animated' onClick={this.pkRecord}></button>
          <button className='animated' onClick={this.myAchievements}></button>
        </div>
        <TipShow
          tipIsShow={this.state.tipIsShow}
          tipImg={this.state.tipImg}
          dialogIsShow={this.state.dialogIsShow}
        />
      </div>
    )
  }
}