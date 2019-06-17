import React from 'react'
import Axios from 'axios'
import shareJs from '@/assets/js/share'
import { Link } from 'react-router-dom'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import BgMusic from '@/components/bgMusic'
import Share from '@/components/share'

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      flaunt: 0,  // 是否显示分享弹窗
      isFlaunt: 0,  // 是否是分享出去的页面
    }
  }
  componentDidMount() {
    document.title="个人中心"
    shareJs(() => this.setState({flaunt: 0}))
    Axios.post(baseUrl.base + baseUrl.meinfo, {
      userId: this.props.match.params.user_id
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          list: res.data.body
        })
      }
    })
  }
  set = () => {
    handler.handleBtnBgm(() => this.props.history.push('/setAvatar'))
  }
  doFlaunt = () => {
    handler.handleBtnBgm(() => this.setState({ flaunt: 1 }))
  }
  backHome = () => {
    handler.handleBtnBgm(() => window.location.href = baseUrl.base)
  }
  render() {
    return (
      <div className="main" id='user'>
        <BgMusic />
        <img src={this.state.list.user_img} alt="" className="head" onClick={this.set} />
        <Link className='tip' style={{ display: this.state.isFlaunt ? 'none' : '' }} to='/setAvatar'>点击设置头像</Link>
        <div className="user_detail">
          <span id="name">{this.state.list.user_name}</span>
          <ul>
            <li>
              <img src={require('@img/me_02.png')} alt="" />
              <br />
              <span>{this.state.list.week_rank || 0}</span>
            </li>
            <li>
              <img src={require('@img/me_01.png')} alt="" />
              <br />
              <span>{this.state.list.rank || 0}</span>
            </li>
            <li>
              <img src={require('@img/myAchievements_01.png')} alt="" />
              <br />
              <span>{this.state.list.pk_count || 0}</span>
            </li>
            <li>
              <img src={require('@img/myAchievements_02.png')} alt="" />
              <br />
              <span>{this.state.list.pk_win_count || 0}</span>
            </li>
            <li>
              <img src={require('@img/myAchievements_04.png')} alt="" />
              <br />
              <span>{this.state.list.user_score || 0}</span>
            </li>
            <li>
              <img src={require('@img/myAchievements_03.png')} alt="" />
              <br />
              <span>{(this.state.list.user_rate || 0) + '%'}</span>
            </li>
          </ul>
        </div>
        <div className="route _center">
          <button style={{ display: this.state.isFlaunt ? 'none' : '' }} onClick={this.doFlaunt}></button>
          <button onClick={this.backHome}></button>
        </div>
        <Share flaunt={this.state.flaunt} />
      </div>
    )
  }
}