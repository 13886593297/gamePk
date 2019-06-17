import React from 'react'
import { Link } from 'react-router-dom'

export default class TipShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tipIsShow: this.props.tipIsShow
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.tipIsShow !== nextProps.tipIsShow) {
      this.setState({
        tipIsShow: nextProps.tipIsShow
      })
    }
  }
  tipChangeState = () => {
    this.setState({ tipIsShow: 0 })
  }
  render() {
    return (
      <div className='modal' style={{ display: this.state.tipIsShow ? '' : 'none' }} onClick={this.tipChangeState}>
        <img src={this.props.tipImg} alt='' />
        <div className="unregistered" style={{ display: this.props.dialogIsShow ? '' : 'none' }}>
          <Link to='/train' />
          <Link to='/' />
        </div>
      </div>
    )
  }
}