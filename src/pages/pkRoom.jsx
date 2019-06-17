import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'

export default class PkRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: handler.getStorage('user_id'),
      list: [],
      master: {}
    }
  }
  componentDidMount() {
    document.title="PKroom"
    Axios.post(baseUrl.base + baseUrl.answerList, {
      pkId: this.props.match.params.pkId
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          list: res.data.body.user,
          master: res.data.body.master
        })
      }
    })
  }
  clickMore = () => {
    this.refs.ul.scrollTop += 60
  }
  backHome = () => {
    handler.handleBtnBgm(() => window.location.href = baseUrl.base)
  }
  render() {
    return (
      <div className="main" id='pkRoom'>
        <audio src="@music/button.mp3" id="buttonPlay"></audio>
        <div className="master">
          <span>{this.state.master.user_name}</span>
          <img src={this.state.master.user_img} alt="" />
        </div>
        <div className="content">
          <div className="num">已参与人数：{this.state.list.length}</div>
          <ul ref='ul'>
            {
              this.state.list.map((v, i) => {
                return (
                  <li key={i} className={this.state.master.user_name === v.user_name ? 'active' : ''}>
                    <img src={v.user_img} alt="" className="head" />
                    <span className="name">{v.user_name}</span>
                    <div className="detail">
                      <div>第{i + 1}名</div>
                      <div>用时:{v.time}</div>
                      <div>正确率:{v.rate}%</div>
                    </div>
                    <div className="rank_icon">
                      <img src={i < 3 ? require('@img/pkRoom_0' + (i + 1) + '.png') : require('@img/pkRoom_04.png')} alt=""/>
                      <span>{i + 1}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="arrow _center" onClick={this.clickMore}>
          <img src={require('@img/arrow.png')} alt="" />
        </div>
        <div className="back_home _center" onClick={this.backHome}>
          <img src={require('@img/backhome.png')} alt="" />
        </div>
      </div>
    )
  }
}