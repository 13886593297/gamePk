import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import Option from '@/components/option'
import AnswerMusic from '@/components/answerMusic'
import Advertise from '@/components/advertise'

export default class Subject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      user_id: handler.getStorage('user_id'),
      list: [],
      time: 20,  // 倒计时
      question_index: 0,   // 当前第几题
      isClick: false,  // 禁止重复点击
      ad_isShow: 0,  // 是否显示广告
      adInfo_img: require('@img/ad_logo01.png'),   // 广告图标
      adInfo_value: '强效促成骨 提高骨质量 预防再骨折',  // 广告标语
      score: 0,  // 得分
      correct: 0  // 正确题目数量
    }
  }
  componentDidMount() {
    document.title="训练营"
    Axios.post(baseUrl.base + baseUrl.findAllSubject, {
      userId: this.state.user_id,
      levelId: this.props.match.params.levelId
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          list: res.data.body
        })
        this.intervalHandler()
      }
    })
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
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
      this.setState({
        correct: this.state.correct + 1,
        score: this.state.score + this.state.list[this.state.question_index].level_score
      })
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
    Axios.post(baseUrl.base + baseUrl.toanswer, {
      userId: this.state.user_id,  // 玩家id
      answerOption: answerOption,  // 玩家回答的选项
      questionId: this.state.list[this.state.question_index].question_id  // 题目id
    }).then(() => {
      // 全部题目答完后
      if (this.state.question_index + 1 === this.state.list.length) {
        clearInterval(this.timerID)
        this.props.history.push({ pathname: '/finishTraining/' + this.state.user_id + '/' + this.state.score + '/' + this.state.correct })
      } else {
        this.setState({
          time: 20,
          question_index: this.state.question_index + 1
        })
        this.showAdInfo()
      }
    })
  }
  render() {
    return (
      <div className='main' id='subject'>
        <AnswerMusic />
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