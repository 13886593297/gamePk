import React from 'react'
import Axios from 'axios'
import shareJs from '@/assets/js/share'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import Share from '@/components/share'

export default class FinishTraining extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flaunt: 0,  // 是否显示分享弹窗
      isFlaunt: 0,  // 是否是分享出去的页面
      detail_isShow: 0, // 显示答题详情
      list: [],
      imgs: [require('@img/finishTraining_04.png'), require('@img/finishTraining_05.png'), require('@img/finishTraining_06.png'), require('@img/finishTraining_07.png'), require('@img/finishTraining_08.png')],
      content_rightArr: [],  // 答题详情中答对的答案
      content_wrongArr: []   // 答题详情中答错的答案
    }
  }
  componentDidMount() {
    document.title = "完成训练"
    shareJs(() => this.setState({ flaunt: 0 }))
    if (window.history.length === 1) {
      this.setState({ isFlaunt: 1 })
    }
    Axios.post(baseUrl.base + 'api/pk/getlastestresult', {
      userId: this.props.match.params.user_id
    }).then(res => {
      this.setState({ list: res.data.body.reverse() })
      for (var i = 0; i < this.state.list.length; i++) {
        if (this.state.list[i].option_answer === 1) {
          this.state.content_rightArr.push(this.state.list[i].option_a)
        } else if (this.state.list[i].option_answer === 2) {
          this.state.content_rightArr.push(this.state.list[i].option_b)
        } else if (this.state.list[i].option_answer === 3) {
          this.state.content_rightArr.push(this.state.list[i].option_c)
        } else if (this.state.list[i].option_answer === 4) {
          this.state.content_rightArr.push(this.state.list[i].option_d)
        }

        if (this.state.list[i].answer_option === 1) {
          this.state.content_wrongArr.push(this.state.list[i].option_a)
        } else if (this.state.list[i].answer_option === 2) {
          this.state.content_wrongArr.push(this.state.list[i].option_b)
        } else if (this.state.list[i].answer_option === 3) {
          this.state.content_wrongArr.push(this.state.list[i].option_c)
        } else if (this.state.list[i].answer_option === 4) {
          this.state.content_wrongArr.push(this.state.list[i].option_d)
        } else {
          this.state.content_wrongArr.push('未作答')
        }
      }
    })
  }
  continueTrain = () => {
    handler.handleBtnBgm(() => this.props.history.push({ pathname: '/train' }))
  }
  showDetail = () => {
    this.setState({ detail_isShow: !this.state.detail_isShow })
  }
  doFlaunt = () => {
    handler.handleBtnBgm(() => this.setState({ flaunt: 1 }))
  }
  backHome = () => {
    handler.handleBtnBgm(() => window.location.href = baseUrl.base)
  }
  render() {
    return (
      <div className='main' id='finishTraining'>
        <audio src={require('@music/button.mp3')} id="buttonPlay"></audio>
        <div className="result">
          <div>
            <div className="num">{this.props.match.params.score}</div>
            <div>获得积分</div>
          </div>
          <div>
            <div className="num">{this.props.match.params.correct + '/' + (5 - this.props.match.params.correct)}</div>
            <div>正确/错误</div>
          </div>
        </div>
        <div className="route _center">
          <button onClick={this.continueTrain} style={{ display: this.state.isFlaunt ? 'none' : '' }}></button>
          <button onClick={this.doFlaunt} style={{ display: this.state.isFlaunt ? 'none' : '' }}></button>
          <button onClick={this.backHome}></button>
        </div>
        <div className='answerDetail' style={{ display: this.state.isFlaunt ? 'none' : '' }}>
          <img className="icon" src={require('@img/finishTraining_01.png')} alt="" />
          <br />
          <img
            className={'arrow ' + (this.state.detail_isShow ? 'active' : '')}
            src={require('@img/finishTraining_02.png')}
            onClick={this.showDetail} alt=""
          />
          {this.state.detail_isShow ?
            (<div className="detail">
              <img src={require('@img/finishTraining_03.png')} alt='' />
              <ul>
                {this.state.list.map((v, i) => {
                  return (
                    <li key={i} className='detail_li'>
                      <img className='rank' src={this.state.imgs[i]} alt="" />
                      <div className="question">
                        <div className="question_title">{v.question_content}</div>
                        <ul>
                          <li>
                            <img src={require('@img/right.png')} alt="" />
                            <span>{this.state.content_rightArr[i]}</span>
                          </li>
                          {this.state.content_rightArr[i] !== this.state.content_wrongArr[i] ?
                            (<li>
                              <img src={require('@img/wrong.png')} alt="" />
                              <span>{this.state.content_wrongArr[i]}</span>
                            </li>) : ''
                          }
                        </ul>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <img
                src={require('@img/finishTraining_09.png')}
                onClick={() => { window.location.href = 'https://wechat-qa.lillyadmin.cn/iDoctorWeChat/ContentArea/Article?wechatid=27&contentAreaModuleId=103&moduleType=ArticleList&contentAreaMPId=1' }}
                alt=""
              />
              <img
                src={require('@img/finishTraining_10.png')}
                onClick={() => { window.location.href = 'https://wechat-qa.lillyadmin.cn/idoctorwechat/medinfosearch/Main?event=MenuClick&wechatid=27&_Callback=1' }}
                alt=""
              />
            </div>) : ''
          }
        </div>
        <Share flaunt={this.state.flaunt} />
      </div>
    )
  }
}