import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import * as handler from '@/assets/js/handler'
import BgMusic from '@/components/bgMusic'

export default class PkRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: handler.getStorage('user_id'),
      list: []
    }
  }
  componentDidMount() {
    document.title="PK记录"
    Axios.post(baseUrl.base + baseUrl.record, {
      userId: this.state.user_id
    }).then(res => {
      if (res.data.code === 0) {
        this.setState({
          list: res.data.body
        })
      }
    })
  }
  toPkRoom(type, end, pkId) {
    if (type === 2 && end === 1) {
      this.props.history.push({ pathname: '/pkRoom/' + pkId })
    }
  }
  clickMore = () => {
    this.refs.ul.scrollTop += 60
  }
  backHome = () => {
    handler.handleBtnBgm(() => window.location.href = baseUrl.base)
  }
  render() {
    return (
      <div className="main" id='pkRecord'>
        <BgMusic />
        <ul ref='ul'>
          {
            this.state.list.map((v, i) => {
              return (
                <li key={i} onClick={() => this.toPkRoom(v.type, v.end, v.pkId)}>
                  <span className="endTime">{v.date}</span>
                  <span className="type">{v.type === 1 ? '在线匹配' : '邀请对战'}</span>
                  {v.end === 1 ?
                    <div className="end">
                      <span className="status">
                        <span>{v.res}</span>
                        <br />
                        <img src={require('@img/pkRecord_02.png')} alt='' />
                      </span>
                      <div className="details">
                        <span className="time">用时：{v.time}</span>
                        <span className="rate">正确率：{v.rate}%</span>
                      </div>
                    </div> : <span className="underway">进行中... ...</span>
                  }
                </li>
              )
            })
          }
        </ul>
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