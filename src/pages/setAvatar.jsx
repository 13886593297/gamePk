import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'

export default class SetAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      wx_user_name: handler.getStorage('wx_user_name'),  // 微信昵称
      cs_user_name: handler.getStorage('cs_user_name'),  // 游戏中昵称
      wx_user_img: handler.getStorage('wx_user_img') || require('@img/default-wx.png'),  // 微信头像
      img_type: handler.getStorage('img_type') || 0,  // 默认选中微信选项还是游戏选项，当未关注公众号时只能选择游戏选项
      user_sex: handler.getStorage('user_sex'),  // 游戏头像性别 0 man  1 woman
    }
  }
  componentDidMount() {
    document.title="用户编辑"
  }
  changeActive(index) {
    this.state.wx_user_name && this.setState({ img_type: index })
  }
  changeAvatar = () => {
    this.setState({
      user_sex: this.state.user_sex === 0 ? 1 : 0
    })
  }
  handleInput = (e) => {
    this.setState({
      cs_user_name: e.target.value
    })
  }
  update = () => {
    this.state.isAutoPlay && handler.handleMusic('buttonPlay')
    let data = {}
    if (this.state.img_type === 1) {
      if (!this.state.cs_user_name) {
        alert('请输入昵称！')
        return
      }
      data.userName = this.state.cs_user_name
      data.userSex = this.state.user_sex
    } else {
      data.userName = this.state.wx_user_name
      data.userImg = this.state.wx_user_img
    }
    data.userId = handler.getStorage('user_id')
    data.type = this.state.img_type
    Axios.post(baseUrl.base + 'api/user/update', data).then(res => {
      if (res.data.code === 0) {
        handler.setStorage('user_img', data.userImg)
        handler.setStorage('user_name', data.userName)
        handler.setStorage('img_type', data.type)
        if (this.state.img_type === 1) {
          handler.setStorage('cs_user_name', data.userName)
          handler.setStorage('user_sex', data.userSex)
        }
        this.props.history.go(-1)
      }
    })
  }
  render() {
    return (
      <div className="main" id='setAvatar'>
        <audio src="@music/button.mp3" id="buttonPlay"></audio>
        <div className="set_avatar">
          <div
            className={'default_user ' + (this.state.img_type === 0 ? 'active' : '')}
            onClick={() => this.changeActive(0)}
          >
            <img className='avatar' src={this.state.wx_user_img} alt="" />
            <h5>{this.state.wx_user_name}</h5>
            <div className="select"></div>
            <div className="tip">
              {this.state.wx_user_name ?
                <span>该选项表面您同意礼来在“乐拼王者”的PK中心、个人中心和排行榜中使用您的微信昵称和头像，并且“希力王者”的其他参与者亦可以看到并在微信中分享含有您微信昵称和头像的游戏页面。</span>
                :
                <span>关注礼医公众号可以显示您的微信昵称和头像</span>
              }
            </div>
          </div>
          <div
            className={'set_user ' + (this.state.img_type === 1 ? 'active' : '')}
            onClick={() => this.changeActive(1)}
          >
            <img onClick={this.changeAvatar} className='avatar' src={this.state.user_sex === 1 ? require('@img/default-woman.png') : require('@img/default.png')} alt="" />
            <div className="avatarIcon">
              <img src={this.state.user_sex === 1 ? require('@img/woman.png') : require('@img/man.png')} alt="" />
              <input
                type="text"
                name='user_name'
                placeholder="请输入昵称"
                autoComplete="off"
                value={this.state.cs_user_name}
                onChange={this.handleInput}
              />
            </div>
            <div className="select"></div>
            <div className="tip">默认头像可以点击切换哦</div>
          </div>
          <button onClick={this.update}></button>
        </div>
      </div>
    )
  }
}