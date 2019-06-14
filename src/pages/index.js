import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import BgMusic from '@/components/bgMusic'
import user from './user.json'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ruleIsShow: 0
    }
  }
  componentDidMount() {
    document.title="首页"
    // 判断是生产环境还是开发环境
    if (process.env.NODE_ENV === 'development' && !localStorage.getItem('user')) {
      window.localStorage.setItem('user', JSON.stringify(user.body));
    } else {
      Axios.post(baseUrl.base + baseUrl.wxInfo, {
        userCode: handler.getQueryString('ticket')
      }).then(res => {
        if (res.data.code === 0) {
          window.location.href = window.location.origin + window.location.pathname + window.location.hash
          window.localStorage.setItem('user', JSON.stringify(res.data.body))
          if (res.data.body.first === 1) {
            this.props.history.push('/setAvatar')
          }
        }
      })
    }
  }
  toTrain = () => {
    handler.handleBtnBgm(() => this.props.history.push('/train'))
  }
  toGamePK = () => {
    handler.handleBtnBgm(() => this.props.history.push('/gamePK'))
  }
  toLink1 = () => {
    handler.handleBtnBgm(() => window.location.href = "https://wechat-qa.lillyadmin.cn/iDoctorWeChat/ContentArea/Article?wechatid=27&contentAreaModuleId=103&moduleType=ArticleList&contentAreaMPId=1")
  }
  toLink2 = () => {
    handler.handleBtnBgm(() => window.location.href = "https://wechat-qa.lillyadmin.cn/idoctorwechat/medinfosearch/Main?event=MenuClick&wechatid=27&_Callback=1")
  }
  toLink3 = () => {
    handler.handleBtnBgm(() => window.location.href = "https://wechat-qa.lillyadmin.cn/iDoctorWeChat/ContentArea/Main?event=MenuClick&wechatid=27")
  }
  toRankingList = () => {
    handler.handleBtnBgm(() => this.props.history.push('/rankingList'))
  }
  showRule = () => {
    handler.handleBtnBgm(() => this.setState({ ruleIsShow: 1 }));
  }
  toUser = () => {
    handler.handleBtnBgm(() => this.props.history.push('/user/' + handler.getStorage('user_id')))
  }
  render() {
    return (
      <div className='main' id='index'>
        <BgMusic />
        <div className='route _center'>
          <div>
            <button onClick={this.toTrain}></button>
            <button onClick={this.toGamePK}></button>
            <button onClick={this.toLink1}></button>
          </div>
          <div>
            <button onClick={this.toLink2}></button>
            <button onClick={this.toLink3}></button>
            <button onClick={this.toRankingList}></button>
          </div>
        </div>
        <div className="footer">
          <img className='game_rule' src={require('@img/index_07.png')} onClick={this.showRule} alt="" />
          <button onClick={this.toUser}></button>
          <div className="role_guize" style={{display: this.state.ruleIsShow ? '' : 'none'}}>
            <img src={require('@img/role_guize.png')} alt=""/>
            <div className="shut" onClick={() => this.setState({ruleIsShow: 0})}></div>
          </div>
        </div>
        <div className="record_number">PP-LD-CN-1002</div>
      </div>
    )
  }
}