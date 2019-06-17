import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import BgMusic from '@/components/bgMusic'
import TipShow from '@/components/tipShow'

export default class Train extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level1: 0,
      level2: 0,
      level3: 0,
      tipIsShow: 0,  // 5次限制满了后显示提示框
      tipImg: require('@img/projectile_frame_over_two.png')  // 提示框图片
    }
  }
  componentDidMount() {
    document.title="训练场"
    Axios.post(baseUrl.base + baseUrl.count, {
      userId: handler.getStorage('user_id')
    }).then(res => {
      this.setState({
        level1: res.data.body['1'] || 0,
        level2: res.data.body['2'] || 0,
        level3: res.data.body['3'] || 0,
      })
    })
  }
  chooseLevel = levelId => {
    if (this.state.level1 >= 5 && this.state.level2 >= 5 && this.state.level3 >= 5) {
      this.setState({
        tipIsShow: 1,
        tipImg: require('@img/projectile_frame_over.png')
      })
    } else {
      if ((levelId === 1 && this.state.level1 >= 5) || (levelId === 2 && this.state.level2 >= 5) || (levelId === 3 && this.state.level3 >= 5)) {
        this.setState({ tipIsShow: 1 })
      } else {
        handler.handleBtnBgm(() => this.props.history.push({ pathname: '/subject/' + levelId }))
      }
    }
  }
  render() {
    return (
      <div className='main' id='train'>
        <BgMusic />
        <div className='route _center'>
          <button className='animated' onClick={() => this.chooseLevel(1)}></button>
          <button className='animated' onClick={() => this.chooseLevel(2)}></button>
          <button className='animated' onClick={() => this.chooseLevel(3)}></button>
        </div>
        <TipShow
          tipIsShow={this.state.tipIsShow}
          tipImg={this.state.tipImg}
          dialogIsShow={0}
        />
      </div>
    )
  }
}