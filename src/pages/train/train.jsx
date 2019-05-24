import React from 'react'
import Axios from 'axios'
import baseUrl from '@/assets/js/baseUrl'
import handler from '@/assets/js/handler'
import './train.scss'

export default class Train extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level1: 0,
      level2: 0,
      level3: 0,
      tip_isShow: {
        display: 'none'
      }
    }
  }
  componentDidMount() {
    Axios.post(baseUrl.base + baseUrl.count, {
      userId: handler.getStorage('user_id')
    }).then(res => {
      this.setState({
        level1: res.data.body['1'] || 0,
        level2: res.data.body['2'] || 0,
        level3: res.data.body['3'] || 0,
      })
    })
  }
  chooseLevel(levelId) {
    if (this.state.level1 >= 5 && this.state.level2 >= 5 && this.state.level3 >= 5) {
      this.setState({
        tip_isShow: {
          display: 'block'
        }
      })
      this.refs.img.src = require('@img/projectile_frame_over.png')
    } else {
      if (levelId === 1 && this.state.level1 >= 5) {
        this.setState({
          tip_isShow: {
            display: 'block'
          }
        })
      } else if (levelId === 2 && this.state.level2 >= 5) {
        this.setState({
          tip_isShow: {
            display: 'block'
          }
        })
      } else if (levelId === 3 && this.state.level3 >= 5) {
        this.setState({
          tip_isShow: {
            display: 'block'
          }
        })
      } else {
        this.props.history.push({ pathname: '/subject/' + levelId })
      }
    }
  }
  render() {
    return (
      <div className='main train'>
        <div className='route'>
          <button className='animated' onClick={() => this.chooseLevel(1)}></button>
          <button className='animated' onClick={() => this.chooseLevel(2)}></button>
          <button className='animated' onClick={() => this.chooseLevel(3)}></button>
        </div>
        <div className="modal" style={this.state.tip_isShow} onClick={() => this.setState({
          tip_isShow: {
            display: 'none'
          }
        })}>
          <img src={require('@img/projectile_frame_over_two.png')} alt='' ref="img" />
        </div>
      </div>
    )
  }
}