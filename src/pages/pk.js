import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import Option from '@/components/option'
import AnswerMusic from '@/components/answerMusic'
import Advertise from '@/components/advertise'

export default class Pk extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      loading_isShow: 1,  // 默认显示loading区域，匹配到对手后隐藏
      user_id: handler.getStorage('user_id'),
      user_name: handler.getStorage('user_name'),  // 自己名字
      user_img: handler.getStorage('user_img'),  // 自己头像
      opponent_name: '',  // 对手名字
      opponent_img: require('@img/wait_person.png'), // 对手头像
      match_countdown: 10,  // 匹配倒计时 
      data: '',  // socket返回的数据
      question_index: 1,  // 当前答第几题
      question_amount: 5,  // 题目总数
      user_time: 0,  // 自己答题时间
      opponent_time: 0,  // 对手答题时间
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: require('@img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  //  
      pk_countdown: 20,  // 答题倒计时
      question_id: '',  // 题目id
      question_content: '',  // 题目标题
      option_answer: '',  // 题目正确答案
      option: [],  // 题目选项
      isWin: '',  // 1 赢   2 输   3 无效
      score: ''  // 获得积分
    }
  }
  componentDidMount() {
    document.title = "PK"
    this.socket = new WebSocket('wss:' + baseUrl.basePk + baseUrl.pk + this.state.user_id)
    this.socket.onmessage = this.getMessage
    Axios.post(baseUrl.base + baseUrl.isPK, {
      userId: this.state.user_id,
      pkType: 1
    }).then(res => {
      if (res.data.code === 2) {
        // 训练超过10次
        this.props.history.push('/gamePK')
      }
    })
  }
  componentWillUnmount() {
    this.socket.close()
  }
  getMessage = (msg) => {
    this.setState({ data: JSON.parse(msg.data) })
    if (this.state.data.c === 0) {
      this.setState({
        match_countdown: this.state.data.s
      })
    } else if (this.state.data.c === 1) {
      this.setState({
        opponent_name: this.state.data.u2.userName
      })
      if (this.state.data.u2.userImg === '/Images/robot.png') {
        this.setState({
          opponent_img: require('@img/robot.png')
        })
      } else {
        this.setState({
          opponent_img: this.state.data.u2.userImg
        })
      }
      this.refs.text.innerHTML = 'PK进行中... ...'
      setTimeout(() => {
        this.socket.send('{"c":1}')
      }, 2000)
    } else if (this.state.data.c === 2) {
      // 没有对手
    } else if (this.state.data.c === 4) {
      if (this.state.data.q.ad_info != null) {
        this.setState({
          ad_isShow: 1,
          adInfo_img: this.state.data.q.ad_info.ad_img,
          adInfo_value: this.state.data.q.ad_info.ad_content
        })
      }
      this.setState({
        loading_isShow: 0,
        tip_isShow: 0,
        question_index: this.state.data.cc,
        question_amount: this.state.data.ct,
        ad_info: this.state.data.q.ad_info,
        question_id: this.state.data.q.question_id,
        question_content: this.state.data.q.question_content,
        option_answer: this.state.data.q.option_answer,
        option: [this.state.data.q.option_a, this.state.data.q.option_b, this.state.data.q.option_c, this.state.data.q.option_d]
      })
      for (let k of this.refs.option.children) {
        k.children[0].src = require('@img/no_select.png')
        k.children[1].style.color = '#000'
      }
    } else if (this.state.data.c === 5) {
      this.setState({
        user_time: this.state.data.t1,
        opponent_time: this.state.data.t2,
        pk_countdown: this.state.data.s,
      })
      if (this.state.pk_countdown <= 1) {
        this.socket.send('{"c":5,"questionId":' + this.state.question_id + ',"answerOption":' + 0 + ',"cc":' + this.state.question_index + '}')
      }
    } else if (this.state.data.c === 6 || this.state.data.c === 7 || this.state.data.c === 8) {
      this.setState({
        tip_isShow: 0,
        user_time: this.state.data.t1,
        opponent_time: this.state.data.t2,
        score: this.state.data.s,
      })
      if (this.state.data.c === 6) {
        this.setState({ isWin: 1 }) // 赢
      } else if (this.state.data.c === 7) {
        this.setState({ isWin: 2 }) // 输
      } else {
        this.setState({ isWin: 0 }) // 无效
      }
      this.socket.close()
      let params = {
        user_id: this.state.user_id,
        opponent_name: this.state.opponent_name,
        opponent_img: encodeURIComponent(this.state.opponent_img),
        question_index: this.state.question_index,
        question_amount: this.state.question_amount,
        user_time: this.state.user_time,
        opponent_time: this.state.opponent_time,
        isWin: this.state.isWin,
        score: this.state.score,
      }
      setTimeout(() => {
        this.props.history.push({ pathname: '/pkResult/' + JSON.stringify(params) })
      }, 500)
    }
  }
  doAnswer(id) {
    this.setState({ tip_isShow: 1 })
    if (this.state.isAutoPlay) {
      handler.handleMusic('selectClick')
    }
    setTimeout(() => {
      this.socket.send('{"c":5,"questionId":' + this.state.question_id + ',"answerOption":' + id + ',"cc":' + this.state.question_index + '}')
    }, 1000)
    if (this.state.option_answer === id) {
      this.refs.option.children[id - 1].children[0].src = require('@img/right.png')
      this.refs.option.children[id - 1].children[1].style.color = '#2661b4'
    } else {
      this.refs.option.children[id - 1].children[0].src = require('@img/wrong.png')
      this.refs.option.children[id - 1].children[1].style.color = '#fd8900'
    }
  }
  render() {
    return (
      <div className='main' id='pk'>
        <AnswerMusic />
        {this.state.loading_isShow ?
          <div className="load">
            <div className="user">
              <span>{this.state.user_name}</span>
              <div>
                <img src={this.state.user_img} alt="" />
              </div>
            </div>
            <div className="opponent">
              <span>{this.state.opponent_name}</span>
              <div>
                <img src={this.state.opponent_img} alt="" />
              </div>
            </div>
            <div className='route _center'>
              <div className="text" ref='text'>匹配倒计时：{this.state.match_countdown} s</div>
              <Link to='/gamePk' />
              <Link to='/' />
            </div>
            <img src={require('@img/pk_03.png')} alt="" />
          </div> :
          <div className="pk_area">
            <div className="pk_info">
              <div className="user">
                <img className='avatar' src={this.state.user_img} alt="" />
                <div className="name">{this.state.user_name}</div>
                <div className="text">
                  <p>当前答题: &nbsp;{this.state.question_index + '/' + this.state.question_amount}</p>
                  <p>累计用时: &nbsp;{this.state.user_time}s</p>
                </div>
              </div>
              <div className="opponent">
                <img className='avatar' src={this.state.opponent_img} alt="" />
                <div className="name">{this.state.opponent_name}</div>
                <div className="text">
                  <p>当前答题: &nbsp;{this.state.question_index + '/' + this.state.question_amount}</p>
                  <p>累计用时: &nbsp;{this.state.opponent_time}s</p>
                </div>
              </div>
            </div>
            <div className="pk_content">
              <span className="count_down">{this.state.pk_countdown}</span>
              <div className='answer_area'>
                <div className="answer_area_li">
                  <div className="answer_title">{this.state.question_content}</div>
                  <ul ref='option'>
                    {this.state.option.map((v, i) => {
                      return (
                        <Option
                          key={i}
                          doAnswer={() => this.doAnswer(i + 1)}
                          img={require('@img/no_select.png')}
                          text={v}
                        >
                        </Option>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
        <Advertise
          ad_isShow={this.state.ad_isShow}
          adInfo_img={this.state.adInfo_img}
          adInfo_value={this.state.adInfo_value}
        />
        {this.state.tip_isShow ?
          <div className="modal">
            <img src={require('@img/wait.png')} alt="" />
          </div> : ''
        }
      </div>
    )
  }
}