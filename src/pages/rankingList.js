import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import BgMusic from '@/components/bgMusic'

export default class RankingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: handler.getStorage('user_id'),
      rankList: [],
      userInfo: {}
    }
  }
  componentWillMount() {
    Axios.post(baseUrl.base + baseUrl.rankList, {
      userId: this.state.user_id
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          rankList: res.data.body.rankList,
          userInfo: res.data.body.userInfo
        })
      }
    })
  }
  clickMore = () => {
    this.refs.ul.scrollTop += 60
  }
  render() {
    return (
      <div className="main" id='rankingList'>
        <BgMusic />
        <ul ref='ul'>
          {
            this.state.rankList.map((v, i) => {
              return (
                <li key={i}>
                  <span className="rank">{v.rank}</span>
                  <img className='avatar' src={v.user_img} alt="" />
                  <span className="name">{v.user_name}</span>
                  <span className="score">{v.user_score}</span>
                </li>
              )
            })
          }
        </ul>
        <div className="myself">
          <img id='head' src={this.state.userInfo.user_img} alt="" />
          <span id="name">{this.state.userInfo.user_name}</span>
          <div className="rank">
            <div className="rank_month">
              月排名
              <span>第{this.state.userInfo.rank}名</span>
            </div>
            <div className="rank_week">
              周排名
              <span>第{this.state.userInfo.week_rank}名</span>
            </div>
          </div>
        </div>
        <div className="arrow _center" onClick={this.clickMore}>
          <img src={require('@img/arrow.png')} alt="" />
        </div>
      </div>
    )
  }
}