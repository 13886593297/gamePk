import React from 'react'
import Axios from 'axios'
import shareJs from '@/assets/js/share'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import Share from '@/components/share'

export default class MyAchievements extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      flaunt: 0,  // 是否显示分享弹窗
      isFlaunt: 0,  // 是否是分享出去的页面
    }
  }
  componentDidMount() {
    document.title="我的PK战绩"
    shareJs(() => this.setState({flaunt: 0}))
    Axios.post(baseUrl.base + baseUrl.pkInfo, {
      userId: this.props.match.params.user_id
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          list: res.data.body
        })
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
      <div className="main" id='myAchievements'>
        <audio src="@music/button.mp3" id="buttonPlay"></audio>
        <img src={this.state.list.user_img} alt="" className="head" />
        <div className="user_detail">
          <span id="name">{this.state.list.user_name}</span>
          <ul>
            <li>
              <img src={require('@img/myAchievements_01.png')} alt="" />
              <br />
              <span>{this.state.list.pk_count || 0}</span>
            </li>
            <li>
              <img src={require('@img/myAchievements_03.png')} alt="" />
              <br />
              <span>{(this.state.list.user_rate || 0) + '%'}</span>
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