import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import TipShow from '@/components/tipShow'

export default class SetPk extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAutoPlay: JSON.parse(window.sessionStorage.getItem('isAutoPlay')),
      tipIsShow: 0,
      user_id: handler.getStorage('user_id'),
      subject_num: '10',  // 题目数量
      time: '',  // PK结束时间
      person_num: '2', // PK人数上限
      type: '0',  // 题目主题
      typeArr: {
        '0': '全部',
        '1': '疾病管理',
        '7': '指南共识',
        '8': '复泰奥',
        '9': '度易达'
      }
    }
  }
  componentDidMount() {
    document.title="设置PK"
    this.getTime()
  }
  getTime = () => {
    var cuttentTime = new Date()
    //获取当前年
    var year = cuttentTime.getFullYear()
    //获取当前月
    var month = cuttentTime.getMonth() + 1
    //获取当前日
    var date = cuttentTime.getDate()
    var h = cuttentTime.getHours() + 1 //获取当前小时数(0-23)
    var m = cuttentTime.getMinutes() //获取当前分钟数(0-59)
    var s = cuttentTime.getSeconds()
    this.setState({
      time: year + '-' + this.p(month) + "-" + this.p(date) + "T" + this.p(h) + ':' + this.p(m) + ":" + this.p(s)
    })
  }
  p = (s) => {
    return s < 10 ? '0' + s : s
  }
  save = () => {
    this.state.isAutoPlay && handler.handleMusic('buttonPlay')
    Axios.post(baseUrl.base + baseUrl.createPk, {
      userId: this.state.user_id,
      questionCount: this.state.subject_num,
      date: this.state.time.substring(0, 16).replace('T', ' ').trim(),
      users: this.state.person_num,
      selectedQuestionTag: this.state.type,
      pkType: 2
    }).then(res => {
      if (res.data.code === 0) {
        this.props.history.push({ pathname: '/invitation/' + res.data.body.pk_id })
      } else if (res.data.code === 2) {
        this.setState({ tipIsShow: 1 })
      } else if (res.data.code === 13) {
        alert('当前分类下面的题目数量不足')
      } else {
        alert("请选择正确的时间" + this.state.time)
      }
    })
  }
  typeList = (typeArr) => {
    let arr = []
    for (let k in typeArr) {
      arr.push(<option key={k} value={k}>{typeArr[k]}</option>)
    }
    return arr
  }
  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div className='main' id='setpk'>
        <audio src={require('@music/button.mp3')} id="buttonPlay"></audio>
        <div className='container'>
          <p>1.请设定题目数量</p>
          <select id="select_subject_num" name='subject_num' value={this.state.subject_num} onChange={this.handleChange}>
            <option value="10">10道题</option>
            <option value="15">15道题</option>
            <option value="20">20道题</option>
          </select>
          <p>2.请设定PK结束时间</p>
          <input id="time" type="datetime-local" name='time' value={this.state.time} onChange={this.handleChange}/>
          <p>3.请设定PK人数上限</p>
          <select id="select_person_num" name='person_num' value={this.state.person_num} onChange={this.handleChange}>
            <option value="2">2人</option>
            <option value="5">5人</option>
            <option value="10">10人</option>
            <option value="99999">不限人数</option>
          </select>
          <p>4.请设定题目主题</p>
          <select id="select_subject_type" name='type' value={this.state.type} onChange={this.handleChange}>
            {this.typeList(this.state.typeArr)}
          </select>
          <div className="determine _center" onClick={this.save}>
            <img src={require('@img/determine.png')} alt='' />
          </div>
        </div>
        <TipShow
          tipIsShow={this.state.tipIsShow}
          tipImg={require('@img/tankuang_10.png')}
          dialogIsShow={0}
        />
      </div>
    )
  }
}