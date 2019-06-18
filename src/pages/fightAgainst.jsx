import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import AnswerMusic from '@/components/answerMusic'
import Advertise from '@/components/advertise'
import Option from '@/components/option'

export default class FightAgainst extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      user_id: handler.getStorage('user_id'),
      list: [],
      time: 20,  // 倒计时
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      ad_isShow: 1,  // 是否显示广告
      adInfo_img: require('@img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  // 广告标语
      person_num: 0,  // 本场已完成PK人数
      remaining_time: '3599',  // 本场PK剩余时间
      match_time: 0,  // 累计用时
    }
  }
  componentDidMount() {
    document.title = "PK"
    this.init()
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
    clearInterval(this.match_timerID)
  }
  init = () => {
    Axios.post(baseUrl.base + baseUrl.questions, {
      userId: this.state.user_id,
      pkId: this.props.match.params.pkId
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          list: res.data.body.questions,
          remaining_time: res.data.body.time,
          person_num: res.data.body.userCount
        })
        this.addTime()
        this.intervalHandler()
        this.showAdInfo()
      } else if (res.data.code === 11) {
        alert("您已经答过题了")
        this.props.history.push('/gamePK')
      }
    })
  }
  addTime() {
    this.match_timerID = setInterval(() => {
      this.setState({
        match_time: this.state.match_time + 1,
        remaining_time: this.state.remaining_time - 1
      })
      if (this.remaining_time <= 0) {
        clearInterval(this.match_timerID)
      }
    }, 1000)
  }
  intervalHandler() {
    this.timerID = setInterval(() => {
      this.setState({ time: this.state.time - 1 })
      if (this.state.time < 1) {
        // 未作答时默认答题选项
        this.sumbit(0)
      }
    }, 1000)
  }
  showAdInfo() {
    // 显示广告
    if (this.state.list[this.state.question_index].ad_info != null) {
      this.setState({
        ad_isShow: 1,
        adInfo_img: this.state.list[this.state.question_index].ad_info.ad_img,
        adInfo_value: this.state.list[this.state.question_index].ad_info.ad_content
      })
    }
  }
  doAnswer(answerOption /*玩家回答的选项*/) {
    if (this.state.isClick) return  // 防止重复点击
    clearInterval(this.timerID)
    if (this.state.isAutoPlay) {
      handler.handleMusic('selectClick')
    }
    this.setState({ isClick: true })
    if (this.state.list[this.state.question_index].option_answer === answerOption) {
      this.refs.option.children[answerOption - 1].children[0].src = require('@img/right.png')
      this.refs.option.children[answerOption - 1].children[1].style.color = '#2661b4'
    } else {
      this.refs.option.children[answerOption - 1].children[0].src = require('@img/wrong.png')
      this.refs.option.children[answerOption - 1].children[1].style.color = '#fd8900'
    }
    setTimeout(() => {
      this.sumbit(answerOption)
      this.setState({ isClick: false })
      this.intervalHandler()
    }, 3000)
  }
  sumbit(answerOption) {
    Axios.post(baseUrl.base + baseUrl.toanswerpk, {
      userId: this.state.user_id,  // 玩家id
      answerOption: answerOption,  // 玩家回答的选项
      questionId: this.state.list[this.state.question_index].question_id,  // 题目id
      pkId: this.props.match.params.pkId
    }).then(() => {
      // 全部题目答完后
      if (this.state.question_index + 1 === this.state.list.length) {
        clearInterval(this.timerID)
        clearInterval(this.match_timerID)
        alert('您已完成PK邀请答题，请稍后进入PK中心查看结果')
        this.props.history.push('/pkRecord')
      } else {
        this.setState({
          time: 20,
          question_index: this.state.question_index + 1
        })
        this.showAdInfo()
      }
    })
  }
  moment = (time) => {
    var h = parseInt(time / 3600)
    var m = parseInt(time % 3600 / 60)
    var s = parseInt(time % 3600 % 60)
    return h + "h" + m + "m" + s + "s"
  }
  render() {
    return (
      <div className='main' id='fightAgainst'>
        <AnswerMusic />
        <div className="match_info">
          <p>
            本场PK剩余时间：
            <br />
            <span id="remaining_time">{this.moment(this.state.remaining_time)}</span>
          </p>
          <p>
            本场已完成PK人数：
        <span id="person_num">{this.state.person_num}</span>
          </p>
          <p>
            累计用时：
        <span id="match_time">{this.state.match_time}s</span>
          </p>
        </div>
        <div className='count_down'>{this.state.time}</div>
        <ul className='answer_area'>
          {this.state.list.map((ele, i, arr) => {
            return i === this.state.question_index ? (
              <li className='answer_area_li' key={i}>
                <div className='answer_current'>{i + 1}/{arr.length}</div>
                <div className='answer_title'>{ele.question_content}</div>
                <ul ref='option'>
                  <Option doAnswer={() => this.doAnswer(1)} img={require('@img/no_select.png')} text={ele.option_a}></Option>
                  <Option doAnswer={() => this.doAnswer(2)} img={require('@img/no_select.png')} text={ele.option_b}></Option>
                  <Option doAnswer={() => this.doAnswer(3)} img={require('@img/no_select.png')} text={ele.option_c}></Option>
                  <Option doAnswer={() => this.doAnswer(4)} img={require('@img/no_select.png')} text={ele.option_d}></Option>
                </ul>
              </li>
            ) : ''
          })}
        </ul>
        <Advertise
          ad_isShow={this.state.ad_isShow}
          adInfo_img={this.state.adInfo_img}
          adInfo_value={this.state.adInfo_value}
        />
      </div>
    )
  }
}